// 森林測驗統計頁的資料來源：用通行碼向 Apps Script 取回「森林測驗」分頁的所有列
// 通行碼由 Apps Script 驗證（FOREST_STATS_KEY），這裡只負責轉送

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ ok: false });
  }

  const key = String(req.query?.key || "").slice(0, 64);
  if (!key) return res.status(401).json({ ok: false, message: "missing_key" });

  const url = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (!url) return res.status(500).json({ ok: false, message: "not_configured" });

  try {
    const response = await fetch(`${url}?action=forest&key=${encodeURIComponent(key)}`, { redirect: "follow" });
    const text = await response.text();
    let data;
    try { data = JSON.parse(text); } catch { data = null; }
    if (!data) return res.status(502).json({ ok: false, message: "script_not_updated" });
    if (!data.ok) return res.status(401).json({ ok: false, message: data.message || "wrong_key" });
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(502).json({ ok: false, message: "fetch_failed" });
  }
}
