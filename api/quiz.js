// 森林心理測驗：每個人看到結果時，寫一筆到 Google Sheet（沿用 GOOGLE_SHEET_WEBHOOK_URL）
// 欄位對應既有表頭：方案選擇＝結果類型、最在意的痛點＝主題與作答路徑、想改善的狀態＝準備度、其他補充＝其餘作答與來源

const RESULTS = new Set([
  "等待的人", "溪邊的守望者", "未說完的話", "獨自渡河的人",
  "找家的旅人", "門前徘徊的人", "空白門牌的探路者", "替別人點燈的人",
  "用力掙脫的人", "耐心的解結人", "被纏住的溫柔", "等一雙手的人",
  "等一盞燈的人", "獨處的守夜人", "需要冬眠的熊", "想回到起點的人",
]);

const clip = (value, max = 80) => String(value || "").replace(/[\r\n]+/g, " ").slice(0, max);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false });
  }

  const body = req.body || {};
  if (!RESULTS.has(body.result)) {
    return res.status(400).json({ ok: false, message: "invalid_result" });
  }

  const url = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (!url) return res.status(200).json({ ok: true, skipped: true });

  const submittedAt = new Date().toLocaleString("zh-TW", {
    timeZone: "Asia/Taipei",
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
    hour12: false,
  });

  const row = {
    type: "森林測驗",
    plan: clip(body.result),
    name: "",
    email: "",
    contact: "",
    pain: `${clip(body.topic)}｜${clip(body.path)}`,
    state: clip(body.ready),
    note: [
      `想起的人：${clip(body.who)}`,
      `卡多久：${clip(body.howlong)}`,
      `因應方式：${clip(body.cope)}`,
      `來源：${clip(body.source, 120)}`,
    ].join("\n"),
    submittedAt,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(row),
    });
    return res.status(200).json({ ok: response.ok });
  } catch (error) {
    console.error(error);
    return res.status(200).json({ ok: false });
  }
}
