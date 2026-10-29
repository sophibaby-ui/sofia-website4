const SHEET_ID = "1sntaG9MPQ449YDN6T9KKMWkzC7nwbDyNUuLXpKZjecY";
const NOTIFY_EMAIL = "sophibaby@gmail.com";

// 森林測驗：寫在獨立的「森林測驗」分頁，統計頁用這組通行碼讀取
const FOREST_SHEET = "森林測驗";
const FOREST_STATS_KEY = "forest-14977e";
// 每完成一份森林測驗就寄一封通知信；不想收時改成 false 再重新部署
const FOREST_EMAIL = true;
const FOREST_HEADERS = [
  "開始時間", "最後更新", "識別碼", "狀態", "停在", "結果類型", "主題", "作答路徑",
  "想起的人", "卡多久", "因應方式", "準備度", "來源", "點加好友", "複製結果", "開啟LINE傳送",
];

function buildEmailBody(data) {
  return [
    "Sofia 新表單通知",
    "",
    "表單類型：" + (data.type || ""),
    "方案選擇：" + (data.plan || (data.raw && data.raw["方案選擇"]) || ""),
    "姓名：" + (data.name || ""),
    "Email：" + (data.email || ""),
    "LINE / IG：" + (data.contact || ""),
    "最在意的痛點：",
    data.pain || "",
    "",
    "想改善的狀態：",
    data.state || "",
    "",
    "其他補充：",
    data.note || "",
    "",
    "送出時間：" + (data.submittedAt || new Date()),
  ].join("\n");
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
}

function sendNotifyEmail(data) {
  const options = {
    to: NOTIFY_EMAIL,
    subject: "Sofia 新表單通知｜" + (data.name || "未填姓名"),
    body: buildEmailBody(data),
  };

  if (isValidEmail(data.email)) {
    options.replyTo = data.email;
  }

  MailApp.sendEmail(options);
  return "sent";
}

function testNotifyEmail() {
  sendNotifyEmail({
    type: "Apps Script 測試",
    name: "測試通知",
    plan: "先嘗試兩個月｜NT$2,999",
    email: NOTIFY_EMAIL,
    contact: "test",
    pain: "測試痛點",
    state: "測試想改善的狀態",
    note: "如果你收到這封，代表 Google Sheet 備援通知已經可以寄信。",
    submittedAt: new Date(),
  });
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/* ---------- 森林測驗 ---------- */

function forestSheet_() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sheet = ss.getSheetByName(FOREST_SHEET);
  if (!sheet) {
    sheet = ss.insertSheet(FOREST_SHEET, ss.getNumSheets());
    sheet.appendRow(FOREST_HEADERS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function saveForest_(d) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = forestSheet_();
    const sid = String(d.sid || "");
    const width = FOREST_HEADERS.length;
    let row = 0;
    if (sid && sheet.getLastRow() > 1) {
      const found = sheet.getRange(2, 3, sheet.getLastRow() - 1, 1)
        .createTextFinder(sid).matchEntireCell(true).findNext();
      if (found) row = found.getRow();
    }
    const now = new Date();
    const prev = row ? sheet.getRange(row, 1, 1, width).getValues()[0] : null;
    const wasDone = prev && prev[3] === "完成";
    const isDone = wasDone || d.status === "完成";
    const yes = (v, old) => (v || old === "是") ? "是" : "";

    const values = [
      prev ? prev[0] : now,
      now,
      sid,
      isDone ? "完成" : "中途離開",
      d.step || "",
      d.result || "",
      d.topic || "",
      d.path || "",
      d.who || "",
      d.howlong || "",
      d.cope || "",
      d.ready || "",
      d.source || "",
      yes(d.clickedAdd, prev && prev[13]),
      yes(d.copied, prev && prev[14]),
      yes(d.clickedSend, prev && prev[15]),
    ];
    if (row) sheet.getRange(row, 1, 1, width).setValues([values]);
    else sheet.appendRow(values);

    if (FOREST_EMAIL && isDone && !wasDone) {
      try {
        MailApp.sendEmail({
          to: NOTIFY_EMAIL,
          subject: "Sofia 森林測驗｜" + (d.result || "新結果"),
          body: [
            "有人完成了森林測驗",
            "",
            "結果類型：" + (d.result || ""),
            "主題：" + (d.topic || ""),
            "作答路徑：" + (d.path || ""),
            "想起的人：" + (d.who || ""),
            "卡多久：" + (d.howlong || ""),
            "因應方式：" + (d.cope || ""),
            "準備度：" + (d.ready || ""),
            "來源：" + (d.source || ""),
          ].join("\n"),
        });
      } catch (err) {}
    }
  } finally {
    lock.releaseLock();
  }
}

function forestRows_() {
  const sheet = forestSheet_();
  const last = sheet.getLastRow();
  if (last < 2) return [];
  const keys = ["startedAt", "updatedAt", "sid", "status", "step", "result", "topic", "path",
    "who", "howlong", "cope", "ready", "source", "clickedAdd", "copied", "clickedSend"];
  return sheet.getRange(2, 1, last - 1, keys.length).getValues().map(r => {
    const o = {};
    keys.forEach((k, i) => {
      const v = r[i];
      o[k] = v instanceof Date ? v.toISOString() : v;
    });
    return o;
  });
}

/* ---------- 入口 ---------- */

function doGet(e) {
  const p = (e && e.parameter) || {};
  if (p.action === "forest") {
    if (p.key !== FOREST_STATS_KEY) return json_({ ok: false, message: "wrong_key" });
    return json_({ ok: true, rows: forestRows_() });
  }
  return ContentService
    .createTextOutput("Sofia Google Sheet webhook is running.")
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  const data = JSON.parse(e.postData.contents || "{}");

  if (data.type === "森林測驗") {
    saveForest_(data);
    return json_({ ok: true });
  }

  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "送出時間",
      "表單類型",
      "方案選擇",
      "姓名",
      "Email",
      "LINE / IG",
      "最在意的痛點",
      "想改善的狀態",
      "其他補充",
    ]);
  }

  sheet.appendRow([
    data.submittedAt || new Date(),
    data.type || "",
    data.plan || (data.raw && data.raw["方案選擇"]) || "",
    data.name || "",
    data.email || "",
    data.contact || "",
    data.pain || "",
    data.state || "",
    data.note || "",
  ]);

  var emailStatus = "skipped";
  try {
    emailStatus = sendNotifyEmail(data);
  } catch (err) {
    emailStatus = "failed: " + err.message;
  }

  return json_({ ok: true, emailStatus: emailStatus });
}
