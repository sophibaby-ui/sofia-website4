const SHEET_ID = "1sntaG9MPQ449YDN6T9KKMWkzC7nwbDyNUuLXpKZjecY";

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

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
