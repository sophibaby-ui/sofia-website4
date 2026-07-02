const SHEET_ID = "1sntaG9MPQ449YDN6T9KKMWkzC7nwbDyNUuLXpKZjecY";
const NOTIFY_EMAIL = "sophibaby@gmail.com";

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

function doGet() {
  return ContentService
    .createTextOutput("Sofia Google Sheet webhook is running.")
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
  const data = JSON.parse(e.postData.contents || "{}");

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

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, emailStatus: emailStatus }))
    .setMimeType(ContentService.MimeType.JSON);
}
