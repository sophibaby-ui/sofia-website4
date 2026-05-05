const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const formatEmailHtml = (lead) => {
  const rows = [
    ["表單類型", lead.type],
    ["姓名", lead.name],
    ["Email", lead.email],
    ["LINE / IG", lead.contact],
    ["最在意的痛點", lead.pain],
    ["想改善的狀態", lead.state],
    ["其他補充", lead.note],
    ["送出時間", lead.submittedAt],
  ].filter(([, value]) => value);

  return `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Noto Sans TC','Segoe UI',sans-serif;color:#2C2825;line-height:1.7">
      <h2 style="font-weight:400;margin:0 0 20px">Sofia 新表單通知</h2>
      <table style="border-collapse:collapse;width:100%;max-width:680px">
        ${rows.map(([key, value]) => `
          <tr>
            <td style="width:150px;padding:12px;border-bottom:1px solid #DDD5C8;color:#6B6259;vertical-align:top">${escapeHtml(key)}</td>
            <td style="padding:12px;border-bottom:1px solid #DDD5C8;white-space:pre-wrap">${escapeHtml(value)}</td>
          </tr>
        `).join("")}
      </table>
    </div>
  `;
};

const formatTelegramText = (lead) => [
  `<b>Sofia 新表單通知</b>`,
  `<b>表單類型</b>\n${escapeHtml(lead.type)}`,
  `<b>姓名</b>\n${escapeHtml(lead.name)}`,
  `<b>Email</b>\n${escapeHtml(lead.email)}`,
  lead.contact ? `<b>LINE / IG</b>\n${escapeHtml(lead.contact)}` : "",
  lead.pain ? `<b>最在意的痛點</b>\n${escapeHtml(lead.pain)}` : "",
  lead.state ? `<b>想改善的狀態</b>\n${escapeHtml(lead.state)}` : "",
  lead.submittedAt ? `<b>送出時間</b>\n${escapeHtml(lead.submittedAt)}` : "",
].filter(Boolean).join("\n\n");

const postSheet = async (lead) => {
  const url = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (!url) return { skipped: true };

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
  });

  return { ok: response.ok };
};

const sendEmail = async (lead) => {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL || "Sophibaby@gmail.com";
  const from = process.env.NOTIFY_FROM_EMAIL || "Sofia Website <onboarding@resend.dev>";
  if (!apiKey || !to) return { skipped: true };

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      subject: `Sofia 新表單通知｜${lead.name || "未填姓名"}`,
      html: formatEmailHtml(lead),
      reply_to: lead.email || undefined,
    }),
  });

  return { ok: response.ok };
};

const sendTelegram = async (lead) => {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return { skipped: true };

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: formatTelegramText(lead),
      parse_mode: "HTML",
    }),
  });

  return { ok: response.ok };
};

const sendLine = async () => {
  // Reserved for future LINE Messaging API integration.
  return { skipped: true };
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false });
  }

  try {
    const submittedAt = new Date().toLocaleString("zh-TW", {
      timeZone: "Asia/Taipei",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    const lead = {
      type: req.body?.type || "表單",
      name: req.body?.name || "",
      email: req.body?.email || "",
      contact: req.body?.contact || "",
      pain: req.body?.pain || "",
      state: req.body?.state || "",
      note: req.body?.note || "",
      raw: req.body?.raw || {},
      submittedAt,
    };

    if (!lead.name || !lead.email) {
      return res.status(400).json({ ok: false, message: "missing_required_fields" });
    }

    const results = await Promise.allSettled([
      postSheet(lead),
      sendEmail(lead),
      sendTelegram(lead),
      sendLine(lead),
    ]);

    return res.status(200).json({ ok: true, results });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false });
  }
}
