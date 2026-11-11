import { useEffect, useMemo, useState } from "react";
import "./frequency2027.css";

/* ─── 2027 年度好運頻率計畫（/2027）──────────────────────────────
   價格、加購與優惠集中在這裡。正式公開前：PREVIEW 改為 false。          */
const PREVIEW = true;
const LINE_ID = "@567avtfh";
const ADDON_PRICE = 1500;            // 年度中加入一個主題
const SESSION_DISCOUNT = "9 折";     // 開始後一年內的個人會談
const PLANS = [
  { id: "focus",     count: 2, name: "年度聚焦",   price: 3000, desc: "把心力放在最重要的兩件事。" },
  { id: "abundance", count: 3, name: "年度豐盛",   price: 4200, desc: "工作、關係與生活，找到自己的節奏。", featured: true },
  { id: "whole",     count: 5, name: "年度全方位", price: 6000, desc: "同時照顧更多重要的生活面向。" },
];
const THEMES = [
  { t: "財富豐盛", en: "Abundance",   img: "abundance",   icon: "✺", x: "金錢安全感、資源運用與豐盛意識。",   f: "讓豐盛，從有意識的選擇開始。" },
  { t: "健康平衡", en: "Wellbeing",   img: "wellbeing",   icon: "❋", x: "身心照顧、日常節奏與自我關懷。",     f: "把照顧自己，放回生活裡。" },
  { t: "桃花良緣", en: "Love",        img: "love",        icon: "♡", x: "親密關係、情感連結與良好互動。",     f: "為值得的關係，留一點空間。" },
  { t: "事業順遂", en: "Career",      img: "career",      icon: "↗", x: "工作方向、行動力與事業規劃。",       f: "用更清晰的腳步，走向下一站。" },
  { t: "貴人善緣", en: "Connection",  img: "connection",  icon: "✧", x: "人際互動、合作資源與支持性連結。",   f: "讓好的連結，在生活裡發芽。" },
  { t: "家庭和諧", en: "Home",        img: "home",        icon: "⌂", x: "親子、伴侶與家庭中的互相理解。",     f: "在熟悉的日常裡，重新靠近。" },
  { t: "情緒安定", en: "Inner Peace", img: "peace",       icon: "☾", x: "情緒覺察、內在安全感與自我調適。",   f: "讓心，也有被好好安放的地方。" },
  { t: "人生新局", en: "New Chapter", img: "new-chapter", icon: "☼", x: "轉變、新開始與個人目標聚焦。",       f: "下一頁，交給更清楚的自己。" },
];
const money = n => "NT$" + Number(n).toLocaleString("en-US");
const track = (name, params) => { try { if (window.gtag) window.gtag("event", name, params || {}); } catch (_) {} };

function useFade27() {
  useEffect(() => {
    const els = document.querySelectorAll(".f27 .fi");
    const ob = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add("v"); }), { threshold: 0.07 });
    els.forEach(el => ob.observe(el));
    return () => ob.disconnect();
  }, []);
}

function usePageMeta() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "2027 年度好運頻率計畫｜Sofia 蘇菲療癒轉化";
    const metas = [];
    const add = (attrs) => { const m = document.createElement("meta"); Object.entries(attrs).forEach(([k, v]) => m.setAttribute(k, v)); document.head.appendChild(m); metas.push(m); };
    if (PREVIEW) add({ name: "robots", content: "noindex, nofollow" });
    add({ property: "og:image", content: "https://www.sofiahealing.com/2027/img/og-2027.jpg" });
    return () => { document.title = prevTitle; metas.forEach(m => m.remove()); };
  }, []);
}

export default function Frequency2027({ go }) {
  useFade27();
  usePageMeta();
  const [planId, setPlanId] = useState("abundance");
  const [chosen, setChosen] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");
  const [openFaq, setOpenFaq] = useState(null);
  const [floatOn, setFloatOn] = useState(true);
  useEffect(() => {
    const targets = [document.getElementById("f27-choose"), document.querySelector(".site-footer"), document.querySelector(".f27-hero")].filter(Boolean);
    const seen = new Set();
    const ob = new IntersectionObserver(es => { es.forEach(e => e.isIntersecting ? seen.add(e.target) : seen.delete(e.target)); setFloatOn(seen.size === 0); }, { threshold: 0.05 });
    targets.forEach(t => ob.observe(t));
    return () => ob.disconnect();
  }, []);
  const plan = PLANS.find(p => p.id === planId);
  const remaining = plan.count - chosen.length;

  const scrollToChoose = () => document.getElementById("f27-choose")?.scrollIntoView({ behavior: "smooth", block: "start" });
  const pickPlan = (id, scroll) => {
    const next = PLANS.find(p => p.id === id);
    if (id !== planId) track("f2027_plan", { plan: id });
    setPlanId(id);
    setChosen(c => c.slice(0, next.count));
    setShowResult(false);
    if (scroll) scrollToChoose();
  };
  const toggle = t => {
    setShowResult(false);
    setChosen(c => c.includes(t) ? c.filter(x => x !== t) : (c.length < plan.count ? [...c, t] : c));
  };
  const message = useMemo(() =>
    `Sofia 你好，我想了解《2027 年度好運頻率計畫》。\n\n我選擇：${plan.name}（${plan.count} 項）\n方案價格：${money(plan.price)}\n年度主題：${chosen.join("、")}\n\n想請你提供付款方式與報名資訊，謝謝！`,
    [plan, chosen]);
  const lineHref = "https://line.me/R/oaMessage/" + encodeURIComponent(LINE_ID) + "/?" + encodeURIComponent(message);
  const compose = () => {
    if (remaining !== 0) return;
    setShowResult(true);
    setCopyStatus("手機可直接按「開啟 LINE」，訊息會自動帶入；電腦版請先複製再貼到 LINE。");
    track("f2027_compose", { plan: plan.id, themes: chosen.join("|") });
    setTimeout(() => document.getElementById("f27-result")?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 50);
  };
  const copy = async () => {
    let ok = false;
    try { if (navigator.clipboard && window.isSecureContext) { await navigator.clipboard.writeText(message); ok = true; } } catch (_) {}
    if (!ok) { const ta = document.getElementById("f27-text"); ta.focus(); ta.select(); try { ok = document.execCommand("copy"); } catch (_) {} }
    track("f2027_copy", { ok });
    setCopyStatus(ok ? "已複製！請開啟 LINE，貼上並傳給 Sofia。" : "自動複製未成功，請長按文字並選擇「複製」。");
  };

  const faqs = [
    ["可以選擇幾個主題？", `可以依需求選擇 2、3 或 5 項主題。年度中如果想再加入新的主題，隨時都可以，每多加一項 ${money(ADDON_PRICE)}。`],
    ["什麼時候可以開始？", "隨時都可以開始，不需要等到 1 月 1 日。從你開始的那一天起算，連續一整年。報名後，Sofia 會依照你選擇的主題完成年度設定，並在一開始就提供你的專屬年度頻率藍圖。"],
    ["專屬年度頻率藍圖什麼時候收到？", "在年度計畫開始時，你就會收到一份電子版《個人年度頻率藍圖》，內容依你所選的主題與實際分析資料整理。"],
    ["參加年度計畫還有其他好處嗎？", `有。從年度計畫開始起的一整年內，你與 Sofia 的每一次個人會談都享 ${SESSION_DISCOUNT}優惠。`],
    ["頻率調整需要我做什麼嗎？", "不需要。年度設定完成後，你不需要配戴任何設備，也不需要固定在線，照常生活即可。"],
    ["這能保證財運、感情或健康改善嗎？", "不能。TimeWaver 在這裡是自我覺察與生活狀態整理的輔助工具，不保證財務、關係、工作或健康上的特定結果，也不取代醫療、心理、法律或財務等專業協助。"],
  ];

  return (
    <div className="page frequency-page f27">
      {PREVIEW && <div className="f27-preview" role="note">預覽版本 · 價格與服務內容尚待 Sofia 最後確認，暫不對外公開</div>}

      {/* HERO */}
      <section className="frequency-hero f27-hero">
        <div className="f27-hero-bg" aria-hidden="true" />
        <div className="frequency-hero-overlay" />
        <div className="frequency-hero-inner">
          <div className="frequency-eyebrow fi">TimeWaver 頻率調整 · 2027 年度計畫</div>
          <h1 className="frequency-title fi">為自己，<br /><em>養一整年的好運</em></h1>
          <p className="frequency-lead fi">
            新的一年，讓心願不只停在許下的那一刻。<br />
            挑選你最重視的生活面向，為財富、健康、關係與未來，<br className="f27-br" />
            安排<strong>一整年的專屬頻率支持</strong>。
          </p>
          <div className="frequency-tags fi">
            {["隨時開始 · 走滿一年", "2 / 3 / 5 項自由選擇", "開始即享專屬藍圖", `一年內會談 ${SESSION_DISCOUNT}`].map(t => <span className="frequency-tag" key={t}>{t}</span>)}
          </div>
          <div className="f27-hero-actions fi">
            <button className="bp f27-bp-light" onClick={scrollToChoose}>挑選我的年度主題</button>
            <button className="f27-textlink" onClick={() => go("frequency")}>先了解 TimeWaver 頻率調整 →</button>
          </div>
        </div>
      </section>

      {/* INTENTION */}
      <section className="frequency-section">
        <div className="frequency-inner f27-intro">
          <div className="fi">
            <div className="frequency-label">The intention</div>
            <h2 className="frequency-heading">新的一年，<br />你想好好經營什麼？</h2>
            <div className="frequency-rule" />
          </div>
          <div className="f27-intro-copy fi">
            <p>有人期待財務更有方向，有人想把身體與情緒照顧好，也有人希望與重要的人相處得更自在。每個人的心願都不同，也值得被認真看待。</p>
            <p>《2027 年度好運頻率計畫》以 TimeWaver 頻率調整作為探索與支持的工具，讓你依照自己的生活重點，自由搭配多個年度主題，在整整一年裡持續被支持。</p>
            <p className="f27-quote">不必在不同心願之間二選一。這一年，從你最在意的開始。</p>
          </div>
        </div>
      </section>

      {/* INCLUDED */}
      <section className="f27-included">
        <div className="frequency-inner">
          <div className="fi">
            <div className="frequency-label">Every plan includes</div>
            <h2 className="frequency-heading">每一個年度方案，都包含</h2>
            <div className="frequency-rule" />
          </div>
          <div className="f27-inc-grid">
            {[
              ["01", "一整年頻率設定", "隨時都能開始，從開始那天起連續一年，你選擇的主題同步納入設定。"],
              ["02", "專屬年度頻率藍圖", "計畫一開始，就收到一份屬於你的《個人年度頻率藍圖》電子報告。"],
              ["03", `一年內會談 ${SESSION_DISCOUNT}`, "計畫開始後的一整年內，與 Sofia 的每一次個人會談都享優惠。"],
            ].map(([n, t, x]) => (
              <article className="f27-inc fi" key={n}><div className="f27-inc-n">{n}</div><h3>{t}</h3><p>{x}</p></article>
            ))}
          </div>
          <p className="f27-addon fi">年度中想再加入新的主題，隨時都可以，每多加一項 <strong>{money(ADDON_PRICE)}</strong>。</p>
        </div>
      </section>

      {/* THEMES */}
      <section className="frequency-section f27-themes">
        <div className="frequency-inner">
          <div className="fi">
            <div className="frequency-label">Eight wishes</div>
            <h2 className="frequency-heading">八種願望，每一種都值得</h2>
            <div className="frequency-rule" />
            <p className="f27-sub">每一個主題，都是一個對自己的溫柔承諾。選擇最貼近你此刻生活的方向。</p>
          </div>
          <div className="f27-theme-grid">
            {THEMES.map((th, i) => (
              <article className="f27-theme fi" key={th.t}>
                <figure>
                  <img src={`/2027/img/${th.img}.webp`} alt="" width="720" height="900" loading="lazy" decoding="async" />
                  <span className="f27-theme-icon" aria-hidden="true">{th.icon}</span>
                </figure>
                <div className="f27-theme-body">
                  <div className="f27-theme-n">{String(i + 1).padStart(2, "0")} / {th.en}</div>
                  <h3>{th.t}</h3>
                  <p>{th.x}</p>
                  <div className="f27-theme-foot">{th.f}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PLANS */}
      <section className="frequency-section f27-plans" id="f27-plans">
        <div className="frequency-inner">
          <div className="fi f27-center">
            <div className="frequency-label">Find your fit</div>
            <h2 className="frequency-heading">依照你的心願，選一份年度支持</h2>
            <div className="frequency-rule" />
          </div>
          <div className="f27-plan-grid">
            {PLANS.map((p, i) => (
              <article className={"f27-plan fi" + (p.featured ? " is-featured" : "")} key={p.id}>
                {p.featured && <div className="f27-ribbon">熱門選擇</div>}
                <div className="f27-plan-n">Plan {String(i + 1).padStart(2, "0")}</div>
                <h3>{p.name}</h3>
                <div className="f27-plan-count">自由選擇 {p.count} 個年度主題</div>
                <div className="f27-price"><small>NT$</small>{p.price.toLocaleString("en-US")}</div>
                <p className="f27-plan-desc">{p.desc}</p>
                <ul>
                  <li>{p.count} 項年度主題設定</li>
                  <li>隨時開始，一整年頻率支持</li>
                  <li>開始即提供專屬年度藍圖</li>
                  <li>一年內個人會談 {SESSION_DISCOUNT}</li>
                </ul>
                <button className={p.featured ? "bp" : "f27-outline"} onClick={() => pickPlan(p.id, true)} aria-label={`挑選${p.name}（${p.count} 個主題）`}>挑選這個方案</button>
              </article>
            ))}
          </div>
          <p className="f27-small fi">年度中可隨時加入新主題，每項 {money(ADDON_PRICE)}。不同主題數量不代表不同的調和結果。</p>
        </div>
      </section>

      {/* REPORT */}
      <section className="frequency-section f27-report">
        <div className="frequency-inner f27-report-grid">
          <div className="f27-paper-wrap fi" aria-hidden="true">
            <div className="f27-paper back" /><div className="f27-paper mid" />
            <div className="f27-paper front">
              <div className="f27-paper-top">SOFIA <span>2027</span></div>
              <div className="f27-paper-orn">✧</div>
              <small>Personal Annual Blueprint</small>
              <h3>你的年度<br />頻率藍圖</h3>
              <div className="f27-paper-line" />
              <p>心願 · 覺察 · 行動</p>
            </div>
          </div>
          <div className="fi">
            <div className="frequency-label">A gift to begin</div>
            <h2 className="frequency-heading">一份看得見的心意，<br />陪你開啟新的一年</h2>
            <div className="frequency-rule" />
            <p className="f27-report-lead">每一位參加年度計畫的朋友，都會收到一份《個人年度頻率藍圖》電子報告。不是等到一年結束才回頭看，而是在開始的時候，先替自己的方向留下一份清楚的紀錄。</p>
            <ol className="f27-checks">
              <li><span>01</span><div><strong>年度願望與主題</strong><p>整理你親自選擇的生活面向與目標。</p></div></li>
              <li><span>02</span><div><strong>分析整理與設定方向</strong><p>依實際 TimeWaver 資料進行探索性整理。</p></div></li>
              <li><span>03</span><div><strong>Sofia 的生活提醒</strong><p>搭配可以實踐的小練習，把心願放進日常。</p></div></li>
            </ol>
          </div>
        </div>
      </section>

      {/* SELECTOR */}
      <section className="frequency-section f27-choose" id="f27-choose">
        <div className="frequency-inner f27-choose-grid">
          <div className="fi">
            <div className="frequency-label">Design your year</div>
            <h2 className="frequency-heading">你的 2027，<br />想先從哪裡開始？</h2>
            <div className="frequency-rule" />
            <p className="f27-sub">選擇方案，再挑選對你最重要的主題。完成後，訊息會整理好，直接透過 LINE 傳給 Sofia。</p>
          </div>
          <div className="f27-selector">
            <div className="f27-step"><span>Step 01</span><h3>選擇方案</h3></div>
            <div className="f27-sel-plans" role="group" aria-label="年度方案">
              {PLANS.map(p => (
                <button key={p.id} type="button" aria-pressed={p.id === planId} className="f27-sel-plan" onClick={() => pickPlan(p.id)}>
                  <strong>{p.count} 個主題</strong><small>{money(p.price)}</small>
                </button>
              ))}
            </div>
            <div className="f27-step second"><span>Step 02</span><h3>挑選 {plan.count} 個年度主題</h3><small aria-live="polite">{remaining ? `還可以選 ${remaining} 項` : "已完成選擇 ✓"}</small></div>
            <div className="f27-sel-themes">
              {THEMES.map(th => {
                const on = chosen.includes(th.t);
                return (
                  <label key={th.t} className={"f27-opt" + (on ? " on" : "") + (!on && remaining === 0 ? " off" : "")}>
                    <input type="checkbox" checked={on} disabled={!on && remaining === 0} onChange={() => toggle(th.t)} />
                    <i aria-hidden="true">{th.icon}</i><span>{th.t}</span>
                  </label>
                );
              })}
            </div>
            <div className="f27-summary" aria-live="polite">
              <div><span>你的年度計畫</span><strong>{plan.name} · {plan.count} 項主題</strong></div>
              <div className="f27-summary-price">{money(plan.price)}</div>
            </div>
            <div className="f27-tags">{chosen.length ? chosen.map(c => <span key={c}>{c}</span>) : <span className="empty">尚未選擇主題</span>}</div>
            <button className="bp f27-submit" type="button" disabled={remaining !== 0} onClick={compose}>
              {remaining ? `請先選滿 ${plan.count} 個主題` : "整理我的 LINE 詢問訊息"}
            </button>
            <p className="f27-explain">訊息由你自己確認後送出；此網頁不會收集或傳送任何個人資料。</p>
            {showResult && (
              <div className="f27-result" id="f27-result">
                <h4>你的詢問訊息已整理好 ✧</h4>
                <textarea id="f27-text" readOnly value={message} aria-label="LINE 詢問訊息" />
                <div className="f27-result-actions">
                  <a className="bp" href={lineHref} target="_blank" rel="noopener noreferrer" onClick={() => track("f2027_line", { plan: plan.id })}>開啟 LINE，帶入這段訊息</a>
                  <button type="button" className="f27-outline" onClick={copy}>複製訊息</button>
                </div>
                <p role="status">{copyStatus}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="frequency-section">
        <div className="frequency-inner">
          <div className="fi">
            <div className="frequency-label">FAQ</div>
            <h2 className="frequency-heading">關於年度計畫</h2>
            <div className="frequency-rule" />
          </div>
          <div className="frequency-faq fi">
            {faqs.map(([q, a], i) => (
              <div className={`frequency-faq-item${openFaq === i ? " is-open" : ""}`} key={q}>
                <button className="frequency-faq-button" aria-expanded={openFaq === i} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{q}</span><span className="frequency-faq-icon">+</span>
                </button>
                <div className="frequency-faq-answer">{a}</div>
              </div>
            ))}
            <div className="frequency-note">本頁「好運」「頻率」等用語用於個人意圖與探索性描述。TimeWaver 與頻率調整屬於自我覺察及生活狀態整理的輔助工具，不進行疾病診斷或治療，不保證財運、健康、感情、事業或人際關係改善，也不取代醫療、心理治療或其他專業服務。</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="frequency-cta">
        <div className="frequency-cta-bg" />
        <div className="frequency-cta-overlay" />
        <div className="frequency-cta-inner fi">
          <div className="frequency-label">Sofia · 2027</div>
          <h2>先安頓好情緒，<br />好運自然會發生</h2>
          <p>帶著自己的心願，開始新的篇章。</p>
          <button className="bp" onClick={scrollToChoose}>開始挑選年度主題</button>
          <button className="f27-textlink f27-cta-link" onClick={() => go("frequency")}>認識 TimeWaver 頻率調整 →</button>
        </div>
      </section>

      <button className={"f27-float" + (floatOn ? "" : " is-hidden")} onClick={scrollToChoose} aria-hidden={!floatOn} tabIndex={floatOn ? 0 : -1}>選擇我的年度主題</button>
    </div>
  );
}
