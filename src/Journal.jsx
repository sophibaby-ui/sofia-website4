/* 文章專區 — 列表頁 + 單篇頁
   放置位置：src/Journal.jsx（新檔案，不動 App.jsx 既有元件）

   App.jsx 需要加：
     import { Journal, JournalPost } from "./Journal.jsx";
     <Route path="/journal" element={<Journal go={go} />} />
     <Route path="/journal/:id" element={<JournalPost go={go} />} />

   資料來源：/api/posts（見 api/posts.js）
------------------------------------------------------------------ */

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CATS = ["全部", "情緒穩定", "關係覺察", "生命數字", "內在主導權"];

const S = {
  page: { minHeight: "100vh", background: "#FAF7F2", fontFamily: "'Noto Sans TC',sans-serif" },
  kicker: { fontFamily: "'Cormorant Garamond',serif", fontSize: "11px", letterSpacing: ".22em", textTransform: "uppercase" },
  h1: { fontFamily: "'Noto Serif TC',serif", fontWeight: 200, lineHeight: 1.6, color: "#33443B", textWrap: "balance" },
  body: { fontSize: "15px", lineHeight: 2.05, color: "#5F564E", textWrap: "pretty" },
  meta: { display: "flex", alignItems: "center", gap: "12px", fontSize: "13px", color: "#8A8078" },
  dash: { width: "16px", height: "1px", background: "#D4C8B5" },
  card: { display: "flex", flexDirection: "column", gap: "14px", cursor: "pointer" },
  thumb: { borderRadius: "18px", overflow: "hidden", aspectRatio: "1/1", background: "#F1EAE1" },
  img: { width: "100%", height: "100%", objectFit: "cover", display: "block" },
  clamp3: { display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" },
};

const fmtDate = (s) => (s ? s.replaceAll("-", ".") : "");

function Rich({ rich = [] }) {
  return (
    <>
      {rich.map((r, i) => {
        let el = r.text;
        if (r.bold) el = <strong key={"b" + i} style={{ fontWeight: 500 }}>{el}</strong>;
        if (r.italic) el = <em key={"i" + i}>{el}</em>;
        if (r.href) el = <a key={"a" + i} href={r.href} target="_blank" rel="noreferrer" style={{ color: "#3E7B80" }}>{el}</a>;
        return <React.Fragment key={i}>{el}</React.Fragment>;
      })}
    </>
  );
}

function Block({ b }) {
  switch (b.type) {
    case "h2":
      return <h2 style={{ fontFamily: "'Noto Serif TC',serif", fontSize: "clamp(20px,2.2vw,25px)", fontWeight: 300, color: "#2A2723", margin: "44px 0 20px" }}><Rich rich={b.rich} /></h2>;
    case "h3":
      return <h3 style={{ fontFamily: "'Noto Serif TC',serif", fontSize: "19px", fontWeight: 400, color: "#2A2723", margin: "32px 0 14px" }}><Rich rich={b.rich} /></h3>;
    case "quote":
      return (
        <div style={{ padding: "28px 32px", borderRadius: "20px", background: "linear-gradient(135deg,#FBEFE6,#EDF1F2)", margin: "34px 0" }}>
          <p style={{ fontFamily: "'Noto Serif TC',serif", fontSize: "18px", lineHeight: 2.05, color: "#33443B", textWrap: "pretty" }}><Rich rich={b.rich} /></p>
        </div>
      );
    case "callout":
      return (
        <div style={{ padding: "22px 24px", borderRadius: "16px", background: "#FFFDF8", border: "1px solid rgba(212,200,181,.6)", margin: "24px 0" }}>
          <p style={{ fontSize: "15px", lineHeight: 2, color: "#5F564E", textWrap: "pretty" }}><Rich rich={b.rich} /></p>
        </div>
      );
    case "li":
      return (
        <div style={{ display: "flex", gap: "12px", margin: "0 0 12px" }}>
          <span style={{ color: "#C08A5E" }}>—</span>
          <p style={{ fontSize: "17px", lineHeight: 2.15, color: "#4A443E", textWrap: "pretty" }}><Rich rich={b.rich} /></p>
        </div>
      );
    case "hr":
      return <div style={{ height: "1px", background: "rgba(212,200,181,.6)", margin: "38px 0" }} />;
    case "img":
      return (
        <figure style={{ margin: "32px 0" }}>
          <div style={{ borderRadius: "20px", overflow: "hidden", background: "#F1EAE1" }}>
            <img src={b.src} alt={b.caption || ""} style={{ width: "100%", display: "block" }} />
          </div>
          {b.caption ? <figcaption style={{ fontSize: "13px", color: "#8A8078", marginTop: "10px", textAlign: "center" }}>{b.caption}</figcaption> : null}
        </figure>
      );
    default:
      return <p style={{ fontSize: "17px", lineHeight: 2.2, color: "#4A443E", margin: "0 0 26px", textWrap: "pretty" }}><Rich rich={b.rich} /></p>;
  }
}

const CASES = [
  {
    text: "一路走來的成長，原生家庭與過往的心路歷程，讓我慢慢變成了一個連自己都不太確定的樣子。在這 90 天的陪伴裡，沒有對錯、沒有批判，只有一次次被溫柔地接住。它讓我明白——我本身的存在，就已經很美好。現在的我，做自己的女王，笑起來都很美麗。",
    name: "S.",
    tag: "深度陪跑 90 天",
  },
  {
    text: "這 13 週，我最大的轉變是，我開始看見自己的模式，而不只是反應它。",
    name: "鳳",
    tag: "深度陪跑 90 天",
    full: `以前的我，很習慣把時間排滿，覺得只要夠忙、夠努力，就可以不用面對那些不舒服的感覺。

開始陪跑之後，Sofia 幫我看見——我不是不知道自己想要什麼，我只是一直在用「忙碌」來避開那個需要做選擇的時刻。

這 13 週，我最大的改變不是「學到什麼技巧」，而是我開始可以在情緒來的時候，慢下來一點，問自己：這是我真正想要的嗎？

我還在練習，但我知道我已經不一樣了。`,
  },
];

function Cases() {
  const [open, setOpen] = useState({});
  return (
    <section style={{ background: "#F4EFE7", padding: "clamp(52px,8vh,88px) clamp(24px,5vw,48px)" }}>
      <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
        <div style={{ ...S.kicker, letterSpacing: ".24em", color: "#A88763", marginBottom: "14px" }}>Real Stories</div>
        <h2 style={{ fontFamily: "'Noto Serif TC',serif", fontSize: "clamp(21px,2.4vw,28px)", fontWeight: 300, color: "#2A2723", marginBottom: "10px" }}>個案分享</h2>
        <p style={{ fontSize: "14px", lineHeight: 1.95, color: "#8A8078", marginBottom: "clamp(28px,4vh,44px)" }}>以下是學員的回饋，經本人同意後分享。</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "20px" }}>
          {CASES.map((c, i) => {
            const isOpen = !!open[i];
            const body = c.full && isOpen ? c.full : c.text;
            return (
              <article key={i} style={{ padding: "34px 34px", borderRadius: "20px", background: "rgba(255,253,248,.82)", boxShadow: "0 20px 52px rgba(86,70,50,.06)" }}>
                <div style={{ fontSize: "13px", color: "#C9A227", letterSpacing: "3px", marginBottom: "16px" }}>★★★★★</div>
                <p style={{ fontFamily: "'Noto Serif TC',serif", fontSize: "16px", fontWeight: 300, lineHeight: 2, color: "#403A35", whiteSpace: "pre-line", marginBottom: "22px", textWrap: "pretty" }}>「{body}」</p>
                {c.full && (
                  <button onClick={() => setOpen((o) => ({ ...o, [i]: !isOpen }))} style={{ background: "none", border: "none", padding: 0, cursor: "pointer", fontSize: "12px", letterSpacing: ".15em", color: "#3D5A4C", fontFamily: "'Cormorant Garamond',serif", marginBottom: "18px", display: "block" }}>{isOpen ? "收起 ↑" : "展開全文 ↓"}</button>
                )}
                <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "13px", color: "#8A8078", letterSpacing: ".12em" }}>{c.name}</span>
                  <span style={{ fontSize: "11px", letterSpacing: ".16em", color: "#3D5A4C", border: "1px solid rgba(61,90,76,.42)", padding: "4px 10px" }}>{c.tag}</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CtaDark({ go }) {
  return (
    <section style={{ position: "relative", padding: "clamp(56px,9vh,96px) clamp(24px,5vw,60px)", overflow: "hidden", background: "linear-gradient(150deg,#3D5A4C 0%,#33513F 46%,#24312A 100%)" }}>
      <div style={{ position: "absolute", inset: "-20%", pointerEvents: "none", background: "radial-gradient(ellipse 44% 40% at 76% 12%,rgba(247,201,164,.26) 0%,transparent 64%),radial-gradient(ellipse 40% 40% at 16% 88%,rgba(201,225,234,.16) 0%,transparent 62%)" }} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: "640px", margin: "0 auto", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Noto Serif TC',serif", fontSize: "clamp(20px,2.4vw,28px)", fontWeight: 200, color: "#F7EFE3", lineHeight: 1.8, marginBottom: "20px", textWrap: "balance" }}>讀完之後，想更靠近自己一點嗎</h2>
        <p style={{ fontSize: "15px", lineHeight: 2.05, color: "rgba(247,239,227,.72)", marginBottom: "30px", textWrap: "pretty" }}>文章談的是共通的模式；真正落到你的生活裡時，適合的方法會不一樣。一次諮詢，我們一起看清楚你現在的位置。</p>
        <button onClick={() => go("apply")} style={{ display: "inline-flex", alignItems: "center", gap: "12px", padding: "17px 42px", border: "none", borderRadius: "999px", background: "linear-gradient(120deg,#E29E49,#EFC49C)", color: "#3A4F42", fontSize: "15px", letterSpacing: ".14em", cursor: "pointer", fontFamily: "'Noto Sans TC',sans-serif" }}>
          預約諮詢<span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "17px" }}>→</span>
        </button>
      </div>
    </section>
  );
}

export function Journal({ go }) {
  const navigate = useNavigate();
  const [posts, setPosts] = useState(null);
  const [cat, setCat] = useState("全部");
  const [err, setErr] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch("/api/posts")
      .then((r) => r.json())
      .then((d) => { setPosts(d.posts || []); if (!d.ok) setErr(d.error || ""); })
      .catch((e) => { setPosts([]); setErr(String(e)); });
  }, []);

  const list = posts && cat !== "全部" ? posts.filter((p) => p.category === cat) : posts;
  const featured = list && list.length ? list[0] : null;
  const rest = list ? list.slice(1) : [];

  return (
    <div style={S.page}>
      <section style={{ position: "relative", margin: "20px clamp(16px,3vw,40px) 0", borderRadius: "32px", overflow: "hidden", padding: "clamp(64px,11vh,120px) clamp(24px,5vw,68px)", background: "linear-gradient(140deg,#FBEFE6 0%,#F5EAF1 44%,#E9F1F1 100%)" }}>
        <div style={{ position: "absolute", inset: "-12%", pointerEvents: "none", opacity: 0.38, mixBlendMode: "soft-light", animation: "aw-drift 30s ease-in-out infinite alternate" }}>
          <img src="/hero-light.jpeg" alt="" style={S.img} />
        </div>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 62% 68% at 50% 6%,rgba(255,255,255,.6),transparent 64%)" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "720px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ ...S.kicker, fontSize: "12px", letterSpacing: ".34em", color: "#A88763", marginBottom: "24px" }}>Journal</div>
          <h1 style={{ ...S.h1, fontSize: "clamp(28px,4vw,46px)", marginBottom: "24px" }}>寫給正在轉彎的你</h1>
          <p style={{ fontSize: "16px", lineHeight: 2.1, color: "#5F5A52", textWrap: "pretty" }}>這裡放的是我在諮詢裡看見的真實故事、情緒與關係的觀察，還有一些能立刻用在生活裡的方法。不急著給答案，但希望你讀完，會覺得自己不是一個人。</p>
        </div>
      </section>

      <section style={{ maxWidth: "1080px", margin: "0 auto", padding: "clamp(44px,7vh,76px) clamp(24px,5vw,48px)" }}>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "clamp(32px,5vh,48px)" }}>
          {CATS.map((c) => (
            <button key={c} onClick={() => setCat(c)} style={{ padding: "9px 20px", borderRadius: "999px", border: "1px solid rgba(212,200,181,.75)", background: c === cat ? "#3D5A4C" : "#FFFDF8", color: c === cat ? "#F7EFE3" : "#5F564E", fontSize: "13px", letterSpacing: ".08em", cursor: "pointer", fontFamily: "'Noto Sans TC',sans-serif" }}>{c}</button>
          ))}
        </div>

        {posts === null && <p style={S.body}>文章載入中…</p>}

        {posts !== null && !list.length && (
          <p style={S.body}>{err ? "文章暫時無法載入，請稍後再試。" : "這個分類目前還沒有文章。"}</p>
        )}

        {featured && (
          <article onClick={() => navigate("/journal/" + featured.id)} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(24px,3vw,40px)", alignItems: "center", paddingBottom: "clamp(40px,6vh,64px)", marginBottom: "clamp(40px,6vh,64px)", borderBottom: "1px solid rgba(212,200,181,.6)", cursor: "pointer" }}>
            <div style={{ ...S.thumb, borderRadius: "22px" }}>
              {featured.cover && <img src={featured.cover} alt="" style={S.img} />}
            </div>
            <div>
              <div style={{ ...S.kicker, color: "#A88763", marginBottom: "14px" }}>Featured{featured.category ? " · " + featured.category : ""}</div>
              <h2 style={{ fontFamily: "'Noto Serif TC',serif", fontSize: "clamp(22px,2.6vw,30px)", fontWeight: 300, lineHeight: 1.62, color: "#2A2723", marginBottom: "16px", textWrap: "balance" }}>{featured.title}</h2>
              <p style={{ ...S.body, marginBottom: "20px", ...S.clamp3 }}>{featured.excerpt}</p>
              <div style={S.meta}>
                <span>{fmtDate(featured.date)}</span>
              </div>
            </div>
          </article>
        )}

        {rest.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "clamp(24px,3vw,36px)" }}>
            {rest.map((p) => (
              <article key={p.id} onClick={() => navigate("/journal/" + p.id)} style={S.card}>
                <div style={S.thumb}>{p.cover && <img src={p.cover} alt="" style={S.img} />}</div>
                {p.category ? <div style={{ ...S.kicker, letterSpacing: ".2em", color: "#B4693F" }}>{p.category}</div> : null}
                <h3 style={{ fontFamily: "'Noto Serif TC',serif", fontSize: "19px", fontWeight: 300, lineHeight: 1.7, color: "#2A2723", textWrap: "pretty" }}>{p.title}</h3>
                <p style={{ fontSize: "14px", lineHeight: 2, color: "#5F564E", textWrap: "pretty", ...S.clamp3 }}>{p.excerpt}</p>
                <div style={{ ...S.meta, fontSize: "12px", marginTop: "auto" }}>
                  <span>{fmtDate(p.date)}</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <Cases />
      <CtaDark go={go} />
    </div>
  );
}

export function JournalPost({ go }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setData(null);
    fetch("/api/posts?id=" + id).then((r) => r.json()).then(setData).catch(() => setData({ ok: false }));
    fetch("/api/posts").then((r) => r.json()).then((d) => setRelated((d.posts || []).filter((p) => p.id !== id).slice(0, 3))).catch(() => {});
  }, [id]);

  if (!data) return <div style={{ ...S.page, padding: "120px 24px", textAlign: "center", color: "#8A8078" }}>載入中…</div>;
  if (!data.ok || !data.post) {
    return (
      <div style={{ ...S.page, padding: "120px 24px", textAlign: "center" }}>
        <p style={{ ...S.body, marginBottom: "20px" }}>找不到這篇文章。</p>
        <button onClick={() => navigate("/journal")} style={{ padding: "12px 28px", borderRadius: "999px", border: "1px solid rgba(212,200,181,.8)", background: "#FFFDF8", color: "#5F564E", cursor: "pointer" }}>回文章列表</button>
      </div>
    );
  }

  const { post, content } = data;

  return (
    <div style={S.page}>
      <article style={{ maxWidth: "760px", margin: "0 auto", padding: "clamp(40px,7vh,72px) clamp(24px,5vw,40px) 0" }}>
      <article style={{ maxWidth: "760px", margin: "0 auto", padding: "calc(var(--nav) + clamp(40px,7vh,72px)) clamp(24px,5vw,40px) 0" }}>
        {post.category ? <div style={{ ...S.kicker, letterSpacing: ".24em", color: "#B4693F", marginBottom: "18px" }}>{post.category}</div> : null}
        <h1 style={{ fontFamily: "'Noto Serif TC',serif", fontSize: "clamp(26px,3.4vw,40px)", fontWeight: 200, lineHeight: 1.62, color: "#2A2723", marginBottom: "22px", textWrap: "balance" }}>{post.title}</h1>
        <div style={{ ...S.meta, paddingBottom: "30px", borderBottom: "1px solid rgba(212,200,181,.6)", marginBottom: "34px" }}>
          <span>{fmtDate(post.date)}</span>
          <span style={S.dash} /><span>Sofia</span>
        </div>
        {post.cover && (
          <div style={{ borderRadius: "24px", overflow: "hidden", aspectRatio: "1/1", maxWidth: "520px", margin: "0 auto 38px", background: "#F1EAE1" }}>
            <img src={post.cover} alt="" style={S.img} />
          </div>
        )}
        {content.map((b, i) => <Block key={i} b={b} />)}
      </article>

      <section style={{ maxWidth: "760px", margin: "0 auto", padding: "clamp(24px,4vh,40px) clamp(24px,5vw,40px) clamp(48px,8vh,80px)" }}>
        <div style={{ padding: "32px 34px", borderRadius: "22px", background: "linear-gradient(140deg,#FBEFE6,#F5EAF1 60%,#E9F1F1)" }}>
          <div style={{ ...S.kicker, letterSpacing: ".24em", color: "#A88763", marginBottom: "14px" }}>Next Step</div>
          <p style={{ fontFamily: "'Noto Serif TC',serif", fontSize: "18px", lineHeight: 2, color: "#33443B", marginBottom: "22px", textWrap: "pretty" }}>如果這篇讓你想到某個一直沒被處理的情境，我們可以一起把它看清楚。</p>
          <button onClick={() => go("apply")} style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "15px 34px", border: "none", borderRadius: "999px", background: "#3D5A4C", color: "#F7EFE3", fontSize: "14px", letterSpacing: ".12em", cursor: "pointer", fontFamily: "'Noto Sans TC',sans-serif" }}>
            預約諮詢<span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "16px" }}>→</span>
          </button>
        </div>
      </section>

      {related.length > 0 && (
        <section style={{ maxWidth: "1080px", margin: "0 auto", padding: "0 clamp(24px,5vw,48px) clamp(56px,9vh,96px)" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "16px", marginBottom: "26px" }}>
            <h2 style={{ fontFamily: "'Noto Serif TC',serif", fontSize: "22px", fontWeight: 300, color: "#2A2723" }}>你可能也會想看</h2>
            <span style={{ ...S.kicker, fontSize: "12px", letterSpacing: ".22em", color: "#A88763" }}>More</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: "26px" }}>
            {related.map((p) => (
              <article key={p.id} onClick={() => navigate("/journal/" + p.id)} style={S.card}>
                <div style={{ ...S.thumb, borderRadius: "16px" }}>{p.cover && <img src={p.cover} alt="" style={S.img} />}</div>
                {p.category ? <div style={{ ...S.kicker, letterSpacing: ".2em", color: "#B4693F" }}>{p.category}</div> : null}
                <h3 style={{ fontFamily: "'Noto Serif TC',serif", fontSize: "18px", fontWeight: 300, lineHeight: 1.7, color: "#2A2723", textWrap: "pretty" }}>{p.title}</h3>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
