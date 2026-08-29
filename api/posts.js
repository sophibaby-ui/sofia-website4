/* Notion 文章來源 API
   放置位置：api/posts.js（Vercel Serverless Function）

   需要的環境變數（Vercel → Settings → Environment Variables）：
     NOTION_TOKEN    ntn_ 開頭的 Access token
     NOTION_PAGE_ID  「文章」頁面 ID（3cb32ce92d728031b076e24018bf3599）
     NOTION_DB_ID    選填。若直接知道資料庫 ID 可填，會略過自動搜尋。

   用法：
     GET /api/posts            → 文章列表（只回 Published 打勾的）
     GET /api/posts?id=<pageId> → 單篇文章（含內文區塊）
------------------------------------------------------------------ */

const NOTION = "https://api.notion.com/v1";
const VERSION = "2022-06-28";

let cachedDbId = null;

const nfetch = async (path, init = {}) => {
  const r = await fetch(NOTION + path, {
    ...init,
    headers: {
      Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
      "Notion-Version": VERSION,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });
  if (!r.ok) throw new Error(`Notion ${path} → ${r.status} ${await r.text()}`);
  return r.json();
};

/** 從「文章」頁面裡找出內嵌的資料庫 ID */
const resolveDbId = async () => {
  if (process.env.NOTION_DB_ID) return process.env.NOTION_DB_ID;
  if (cachedDbId) return cachedDbId;
  const pageId = process.env.NOTION_PAGE_ID;
  const { results } = await nfetch(`/blocks/${pageId}/children?page_size=100`);
  const db = results.find((b) => b.type === "child_database");
  if (!db) throw new Error("在該頁面找不到資料庫，請確認頁面 ID 與連線權限");
  cachedDbId = db.id;
  return db.id;
};

const plain = (rich = []) => rich.map((t) => t.plain_text).join("");

const richText = (rich = []) =>
  rich.map((t) => ({
    text: t.plain_text,
    bold: !!t.annotations?.bold,
    italic: !!t.annotations?.italic,
    href: t.href || null,
  }));

const fileUrl = (prop) => {
  const f = prop?.files?.[0];
  if (!f) return null;
  return f.type === "external" ? f.external.url : f.file?.url || null;
};

const mapRow = (page) => {
  const p = page.properties || {};
  return {
    id: page.id,
    title: plain(p.Title?.title),
    category: p.Category?.select?.name || "",
    excerpt: plain(p.Excerpt?.rich_text),
    date: p.Date?.date?.start || page.created_time?.slice(0, 10) || "",
    readTime: plain(p.ReadTime?.rich_text),
    cover: fileUrl(p.Cover) || page.cover?.external?.url || page.cover?.file?.url || null,
  };
};

/** Notion 區塊 → 前端好處理的簡單格式 */
const mapBlock = (b) => {
  switch (b.type) {
    case "paragraph":
      return { type: "p", rich: richText(b.paragraph.rich_text) };
    case "heading_1":
    case "heading_2":
      return { type: "h2", rich: richText(b[b.type].rich_text) };
    case "heading_3":
      return { type: "h3", rich: richText(b.heading_3.rich_text) };
    case "quote":
      return { type: "quote", rich: richText(b.quote.rich_text) };
    case "bulleted_list_item":
    case "numbered_list_item":
      return { type: "li", rich: richText(b[b.type].rich_text) };
    case "callout":
      return { type: "callout", rich: richText(b.callout.rich_text) };
    case "divider":
      return { type: "hr" };
    case "image": {
      const src = b.image.type === "external" ? b.image.external.url : b.image.file?.url;
      return src ? { type: "img", src, caption: plain(b.image.caption) } : null;
    }
    default:
      return null;
  }
};

const estimateRead = (blocks) => {
  const chars = blocks.reduce((n, b) => n + (b.rich ? b.rich.map((r) => r.text).join("").length : 0), 0);
  return Math.max(2, Math.round(chars / 350)) + " 分鐘";
};

export default async function handler(req, res) {
  if (!process.env.NOTION_TOKEN || !process.env.NOTION_PAGE_ID) {
    return res.status(200).json({ ok: false, posts: [], error: "尚未設定 NOTION_TOKEN / NOTION_PAGE_ID" });
  }

  try {
    const { id } = req.query || {};

    if (id) {
      const page = await nfetch(`/pages/${id}`);
      let blocks = [];
      let cursor;
      do {
        const q = cursor ? `?start_cursor=${cursor}&page_size=100` : "?page_size=100";
        const data = await nfetch(`/blocks/${id}/children${q}`);
        blocks = blocks.concat(data.results);
        cursor = data.has_more ? data.next_cursor : null;
      } while (cursor);

      const content = blocks.map(mapBlock).filter(Boolean);
      const post = mapRow(page);
      if (!post.readTime) post.readTime = estimateRead(content);

      res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=600");
      return res.status(200).json({ ok: true, post, content });
    }

    const dbId = await resolveDbId();
    const data = await nfetch(`/databases/${dbId}/query`, {
      method: "POST",
      body: JSON.stringify({
        filter: { property: "Published", checkbox: { equals: true } },
        sorts: [{ property: "Date", direction: "descending" }],
        page_size: 50,
      }),
    });

    res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=600");
    return res.status(200).json({ ok: true, posts: data.results.map(mapRow) });
  } catch (error) {
    console.error(error);
    return res.status(200).json({ ok: false, posts: [], error: String(error.message || error) });
  }
}
