// 森林心理測驗：每一次造訪在「森林測驗」分頁留一行，依識別碼（sid）更新
// 轉送到 GOOGLE_SHEET_WEBHOOK_URL（Apps Script），由 Apps Script 寫入分頁

const RESULTS = new Set([
  "", "等待的人", "溪邊的守望者", "未說完的話", "獨自渡河的人",
  "找家的旅人", "門前徘徊的人", "空白門牌的探路者", "替別人點燈的人",
  "用力掙脫的人", "耐心的解結人", "被纏住的溫柔", "等一雙手的人",
  "等一盞燈的人", "獨處的守夜人", "需要冬眠的熊", "想回到起點的人",
]);
const STEPS = new Set(["開場", "開始", "第1題", "第2題", "第3題", "第4題", "第5題", "第6題", "看到結果"]);

const clip = (value, max = 60) => String(value || "").replace(/[\r\n]+/g, " ").slice(0, max);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false });
  }

  let body = req.body || {};
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch { body = {}; }
  }

  const sid = clip(body.sid, 40);
  const result = clip(body.result);
  const step = clip(body.step);
  if (!/^[a-z0-9]{6,40}$/.test(sid) || !RESULTS.has(result) || !STEPS.has(step)) {
    return res.status(400).json({ ok: false, message: "invalid" });
  }

  const url = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (!url) return res.status(200).json({ ok: true, skipped: true });

  const row = {
    type: "森林測驗",
    sid,
    status: body.status === "完成" ? "完成" : "中途離開",
    step,
    result,
    topic: clip(body.topic),
    path: clip(body.path, 80),
    who: clip(body.who),
    howlong: clip(body.howlong),
    cope: clip(body.cope),
    ready: clip(body.ready),
    source: clip(body.source, 120),
    clickedAdd: !!body.clickedAdd,
    copied: !!body.copied,
    clickedSend: !!body.clickedSend,
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
