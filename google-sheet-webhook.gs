const SHEET_ID = "1sntaG9MPQ449YDN6T9KKMWkzC7nwbDyNUuLXpKZjecY";
const NOTIFY_EMAIL = "sophibaby@gmail.com";

function buildEmailBody(data) {
  return [
    "Sofia 新表單通知",
    "",
    "表單類型：" + (data.type || ""),
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

function sendNotifyEmail(data) {
  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: "Sofia 新表單通知｜" + (data.name || "未填姓名"),
    body: buildEmailBody(data),
    replyTo: data.email || NOTIFY_EMAIL,
  });
}

function doPost(e) {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
  const data = JSON.parse(e.postData.contents || "{}");

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "送出時間",
      "表單類型",
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
    data.name || "",
    data.email || "",
    data.contact || "",
    data.pain || "",
    data.state || "",
    data.note || "",
  ]);

  sendNotifyEmail(data);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
