const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const formatMessage = (type, data = {}) => {
  const lines = Object.entries(data)
    .filter(([, value]) => value !== undefined && value !== null && String(value).trim())
    .map(([key, value]) => `<b>${escapeHtml(key)}</b>\n${escapeHtml(value)}`);

  return [`<b>Sofia 新表單通知</b>`, `<b>類型</b>\n${escapeHtml(type)}`, ...lines].join("\n\n");
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return res.status(200).json({ ok: true, skipped: true });
  }

  try {
    const { type = "表單", data = {} } = req.body || {};
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: formatMessage(type, data),
        parse_mode: "HTML",
      }),
    });

    if (!response.ok) {
      return res.status(200).json({ ok: false });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error(error);
    return res.status(200).json({ ok: false });
  }
}
