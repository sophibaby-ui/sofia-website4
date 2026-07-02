import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";

const PHOTO = "https://raw.githubusercontent.com/sophibaby-ui/sofia-website4/main/public/sofia.png";
const HOME_SCENARIO_REPLY = "/home-scenario-reply.png";
const HOME_SCENARIO_TIRED = "/home-scenario-tired.png";
const HOME_SCENARIO_CARE = "/home-scenario-care.png";
const HOME_SOFIA_WORK = "/home-sofia-work.png";
const HOME_SOUL_REPORT = "/home-soul-report.png";
const LEAD_API_ORIGIN = "https://sofia-website4.vercel.app";

const submitLead = async (lead) => {
  const host = window.location.hostname;
  const apiOrigin = host === "localhost" || host === "127.0.0.1" || host.includes("jrtm.vercel.app")
    ? LEAD_API_ORIGIN
    : "";
  const response = await fetch(`${apiOrigin}/api/lead`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
  });

  if (!response.ok) throw new Error("lead_submit_failed");
  return response.json();
};

/* ─── STYLES ─────────────────────────────────────────────────── */
const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Noto+Serif+TC:wght@300;400;500&family=Noto+Sans+TC:wght@300;400&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    :root{
      --w:#FAF7F2; --cream:#F5F0E8; --sand:#E8DFD0; --sandm:#D4C8B5;
      --wg:#9E9087; --text:#2C2825; --soft:#6B6259; --div:#DDD5C8;
      --forest:#3D5A4C; --flt:#5A7A68; --gold:#B8A882; --nav:72px;
      --type-display:clamp(42px,4.2vw,58px);
      --type-page:clamp(34px,3.4vw,46px);
      --type-section:clamp(28px,2.6vw,36px);
      --type-card:clamp(20px,1.6vw,23px);
      --type-body:clamp(16px,1.05vw,17px);
      --type-small:13px;
      --leading-display:1.38;
      --leading-heading:1.55;
      --leading-body:1.95;
    }
    html{scroll-behavior:smooth}
    body{background:var(--w);color:var(--text);font-family:'Noto Sans TC',sans-serif;font-weight:300;line-height:1.8;-webkit-font-smoothing:antialiased;overflow-x:hidden}
    h1,h2,h3{font-family:'Noto Serif TC',serif}
    .es{font-family:'Cormorant Garamond',serif}
    .page{animation:fup .55s ease forwards}
    @keyframes fup{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
    .fi{opacity:0;transform:translateY(22px);transition:opacity .7s ease,transform .7s ease}
    .fi.v{opacity:1;transform:translateY(0)}

    /* NAV */
    nav{position:fixed;top:0;left:0;right:0;z-index:200;height:var(--nav);padding:0 60px;display:flex;align-items:center;justify-content:space-between;transition:background .4s,box-shadow .4s}
    nav.sc{background:rgba(250,247,242,.96);backdrop-filter:blur(12px);box-shadow:0 1px 0 var(--div)}
    .nl{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:400;letter-spacing:.08em;color:var(--text);cursor:pointer;line-height:1.1}
    .nl span{display:block;font-size:10px;font-family:'Noto Sans TC',sans-serif;font-weight:300;letter-spacing:.2em;color:var(--wg);margin-top:3px}
    .nm{display:flex;gap:32px;list-style:none}
    .nm li{font-size:13px;font-weight:300;letter-spacing:.1em;color:var(--soft);cursor:pointer;transition:color .2s;position:relative}
    .nm li::after{content:'';position:absolute;bottom:-4px;left:0;width:0;height:1px;background:var(--forest);transition:width .3s}
    .nm li:hover,.nm li.on{color:var(--forest)}
    .nm li:hover::after,.nm li.on::after{width:100%}
    .nc{font-size:12px;letter-spacing:.15em;padding:9px 22px;border:1px solid var(--forest);color:var(--forest);background:transparent;cursor:pointer;transition:all .25s}
    .nc:hover{background:var(--forest);color:var(--w)}
    .hb{display:none}
    .mo{display:none;position:fixed;inset:0;z-index:190;background:var(--w);flex-direction:column;justify-content:center;align-items:center}
    .mo.op{display:flex;animation:fup .3s ease}
    .mo ul{list-style:none;text-align:center}
    .mo li{font-family:'Noto Serif TC',serif;font-size:26px;font-weight:300;letter-spacing:.06em;color:var(--text);padding:20px 0;border-bottom:1px solid var(--div);cursor:pointer;width:280px;transition:color .2s}
    .mo li:first-child{border-top:1px solid var(--div)}
    .mo li:hover{color:var(--forest)}
    .mo-ft{margin-top:36px;font-size:11px;letter-spacing:.2em;color:var(--wg)}

    /* LAYOUT */
    .C{max-width:1140px;margin:0 auto;padding:0 60px}
    .CN{max-width:820px;margin:0 auto;padding:0 60px}
    section{padding:100px 0}

    /* TYPOGRAPHY */
    .slb{display:flex;align-items:center;gap:16px;font-family:'Cormorant Garamond',serif;font-size:11px;letter-spacing:.3em;color:var(--wg);text-transform:uppercase;margin-bottom:40px}
    .slb::before{content:'';display:block;width:40px;height:1px;background:var(--sandm)}
    .orn{text-align:center;padding:20px 0;color:var(--sandm);font-family:'Cormorant Garamond',serif;font-size:18px;letter-spacing:.5em}

    /* BUTTONS */
    .bp{background:var(--forest);color:var(--w);padding:16px 40px;font-size:13px;letter-spacing:.15em;border:none;cursor:pointer;transition:all .3s;font-family:'Noto Sans TC',sans-serif}
    .bp:hover{background:var(--flt)}
    .bg{background:transparent;color:var(--soft);padding:16px 0;font-size:13px;letter-spacing:.12em;border:none;border-bottom:1px solid var(--div);cursor:pointer;transition:all .3s;font-family:'Noto Sans TC',sans-serif}
    .bg:hover{color:var(--forest);border-color:var(--forest)}

    /* HERO */
    .hero{min-height:100vh;display:grid;grid-template-columns:1fr 1fr;position:relative;overflow:hidden}
    .hl{display:flex;flex-direction:column;justify-content:center;padding:160px 80px 100px;position:relative;z-index:2}
    .hl::before{content:'';position:absolute;inset:0;z-index:0;pointer-events:none;background:radial-gradient(ellipse 60% 50% at 80% 20%,rgba(184,168,130,.18) 0%,transparent 70%),radial-gradient(ellipse 40% 60% at 10% 80%,rgba(61,90,76,.07) 0%,transparent 60%);animation:hglow 8s ease-in-out infinite alternate}
    @keyframes hglow{0%{opacity:.7}100%{opacity:1;transform:scale(1.03)}}
    .hl>*{position:relative;z-index:1}
    .hey{font-size:11px;letter-spacing:.3em;color:var(--wg);margin-bottom:32px;display:flex;align-items:center;gap:12px}
    .hey::before{content:'';display:block;width:32px;height:1px;background:var(--wg)}
    .htit{font-family:'Noto Serif TC',serif;font-size:52px;font-weight:300;line-height:1.4;letter-spacing:.04em;color:var(--text);margin-bottom:36px}
    .htit em{font-style:italic;color:var(--forest)}
    .hbo{font-size:15px;line-height:2;color:var(--soft);max-width:420px;margin-bottom:56px}
    .hac{display:flex;gap:24px;align-items:center;flex-wrap:wrap}
    .hr{position:relative;overflow:hidden;background:#F2E5E0}
    .hri{position:absolute;inset:0}
    .hri img{width:100%;height:100%;object-fit:cover;object-position:20% center;display:block}
    .hov{position:absolute;inset:0;background:linear-gradient(to right,var(--w) 0%,rgba(250,247,242,.25) 18%,transparent 42%),linear-gradient(to top,rgba(250,247,242,.5) 0%,transparent 28%)}
    .hray{position:absolute;inset:0;pointer-events:none;z-index:2;background:linear-gradient(125deg,transparent 30%,rgba(255,248,235,.2) 50%,transparent 70%);background-size:200% 200%;animation:ray 7s ease-in-out infinite}
    @keyframes ray{0%{background-position:200% 200%;opacity:0}40%{opacity:1}100%{background-position:-100% -100%;opacity:0}}
    .hsc{position:absolute;bottom:40px;left:80px;z-index:3;font-size:11px;letter-spacing:.2em;color:var(--wg);display:flex;align-items:center;gap:12px}
    .hsc::after{content:'';display:block;width:1px;height:40px;background:var(--wg);animation:sl 2s ease-in-out infinite}
    @keyframes sl{0%,100%{transform:scaleY(1);opacity:.4}50%{transform:scaleY(.3);opacity:.8}}

    /* STRIP */
    .strip{background:var(--forest);padding:60px 0;position:relative;overflow:hidden}
    .strip::after{content:'';position:absolute;top:0;left:-100%;width:60%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.04),transparent);animation:shim 5s ease-in-out infinite}
    @keyframes shim{0%{left:-100%}100%{left:200%}}
    .si{max-width:1140px;margin:0 auto;padding:0 60px;display:grid;grid-template-columns:repeat(3,1fr)}
    .pil{padding:0 48px;border-right:1px solid rgba(255,255,255,.11)}
    .pil:first-child{padding-left:0}
    .pil:last-child{border-right:none}
    .pn{font-family:'Cormorant Garamond',serif;font-size:34px;font-weight:300;color:rgba(255,255,255,.18);margin-bottom:14px}
    .pt{font-family:'Noto Serif TC',serif;font-size:17px;color:var(--sand);margin-bottom:10px;letter-spacing:.06em}
    .px{font-size:13px;color:rgba(232,223,208,.62);line-height:1.9}

    /* PERSPECTIVE */
    .persp{background:linear-gradient(160deg,var(--cream) 0%,#EDE6D8 60%,var(--cream) 100%);position:relative;overflow:hidden}
    .persp::before{content:'';position:absolute;top:-40%;right:-10%;width:70%;height:140%;background:radial-gradient(ellipse,rgba(184,168,130,.14) 0%,transparent 65%);pointer-events:none;z-index:0;animation:sg 10s ease-in-out infinite alternate}
    @keyframes sg{0%{transform:translate(0,0) scale(1)}100%{transform:translate(-3%,3%) scale(1.06)}}
    .pi{max-width:1140px;margin:0 auto;padding:0 60px;display:grid;grid-template-columns:1fr 1.2fr;gap:100px;align-items:center;position:relative;z-index:1}
    .plb{font-family:'Cormorant Garamond',serif;font-size:11px;letter-spacing:.3em;color:var(--wg);text-transform:uppercase;margin-bottom:26px}
    .ptit{font-family:'Noto Serif TC',serif;font-size:32px;font-weight:300;line-height:1.6;color:var(--text);margin-bottom:26px}
    .ptx{font-size:15px;line-height:2.1;color:var(--soft)}
    .pvis{position:relative;height:370px}
    .pv{position:absolute;border-radius:2px}
    .pv1{top:0;left:30px;width:200px;height:265px;background:linear-gradient(160deg,var(--sand),var(--sandm))}
    .pv2{bottom:0;right:0;width:248px;height:185px;background:linear-gradient(160deg,#D9D0C1,var(--sand))}
    .pv3{top:76px;right:48px;width:128px;height:128px;background:var(--forest);opacity:.11}
    .pvq{position:absolute;bottom:38px;left:0;z-index:2;font-family:'Noto Serif TC',serif;font-size:13px;line-height:2;color:var(--text);background:var(--w);padding:20px 24px;max-width:218px;border-left:2px solid var(--forest);box-shadow:0 8px 40px rgba(0,0,0,.06)}

    /* SERVICE TIERS */
    .tiers{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;background:var(--div)}
    .tier{background:var(--w);padding:60px 48px;cursor:pointer;transition:background .3s;display:flex;flex-direction:column}
    .tier:hover{background:var(--cream)}
    .tier-tag{font-size:11px;letter-spacing:.25em;color:var(--forest);margin-bottom:18px;display:flex;align-items:center;gap:10px}
    .tier-tag::before{content:'';width:20px;height:1px;background:var(--forest)}
    .tier-tit{font-family:'Noto Serif TC',serif;font-size:22px;font-weight:300;color:var(--text);margin-bottom:14px;line-height:1.5}
    .tier-tx{font-size:14px;line-height:2;color:var(--soft);margin-bottom:32px;flex:1}
    .tier-pr{font-family:'Cormorant Garamond',serif;font-size:24px;font-weight:300;color:#4A4540;margin-bottom:6px}
    .tier-lk{font-size:12px;letter-spacing:.18em;color:var(--forest);display:flex;align-items:center;gap:8px}
    .tier-lk::after{content:'→';transition:transform .2s}
    .tier:hover .tier-lk::after{transform:translateX(4px)}

    /* CTA BANNER */
    .ctab{background:radial-gradient(ellipse 80% 120% at 50% 0%,rgba(184,168,130,.2) 0%,var(--cream) 55%),var(--cream);text-align:center;padding:110px 60px;position:relative;overflow:hidden}
    .ctab-e{font-family:'Cormorant Garamond',serif;font-size:13px;letter-spacing:.3em;color:var(--wg);margin-bottom:26px}
    .ctab-t{font-family:'Noto Serif TC',serif;font-size:40px;font-weight:300;color:var(--text);line-height:1.5;margin-bottom:20px}
    .ctab-x{font-size:15px;color:var(--soft);line-height:2;max-width:520px;margin:0 auto 48px}

    /* ABOUT */
    .ab-hero{display:grid;grid-template-columns:1.1fr 1fr;min-height:65vh}
    .ab-l{padding:160px 80px 100px;background:var(--cream);display:flex;align-items:center}
    .ab-r{position:relative;min-height:440px;overflow:hidden;background:#F0E4E0;display:flex;align-items:flex-end;justify-content:center}
    .ab-r::after{content:'';position:absolute;inset:0;pointer-events:none;background:linear-gradient(160deg,rgba(255,248,235,.32) 0%,transparent 50%,rgba(61,90,76,.07) 100%);z-index:1}
    .ab-r img{width:100%;height:100%;object-fit:cover;object-position:center 5%;display:block}
    .ab-cap{position:absolute;bottom:28px;left:26px;font-family:'Cormorant Garamond',serif;font-size:13px;font-style:italic;color:rgba(255,255,255,.65);letter-spacing:.1em;z-index:2}
    .two{display:grid;grid-template-columns:256px 1fr;gap:68px;align-items:start}
    .slb2{font-family:'Cormorant Garamond',serif;font-size:13px;letter-spacing:.2em;color:var(--wg);padding-top:6px;border-top:1px solid var(--div)}
    .ct{font-family:'Noto Serif TC',serif;font-size:22px;font-weight:300;color:var(--text);margin-bottom:20px;line-height:1.7}
    .cx{font-size:15px;line-height:2.1;color:var(--soft)}
    .dirs{margin-top:40px;display:flex;flex-direction:column;gap:14px}
    .di{display:flex;align-items:flex-start;gap:16px;padding:20px 24px;background:var(--cream)}
    .dn{font-family:'Cormorant Garamond',serif;font-size:24px;font-weight:300;color:var(--sandm);flex-shrink:0;margin-top:-4px}
    .dt{font-family:'Noto Serif TC',serif;font-size:15px;color:var(--text);line-height:1.8}

    /* MEMBERSHIP */
    .mem-h{background:var(--forest);padding:140px 0 100px;text-align:center;position:relative;overflow:hidden}
    .mem-h::before{content:'';position:absolute;top:-50%;left:-20%;width:140%;height:200%;background:radial-gradient(ellipse 60% 40% at 60% 40%,rgba(184,168,130,.12) 0%,transparent 60%);animation:mg 12s ease-in-out infinite alternate;pointer-events:none}
    @keyframes mg{0%{transform:translate(0,0)}100%{transform:translate(5%,-5%)}}
    .mh-e{font-size:11px;letter-spacing:.3em;color:rgba(232,223,208,.42);margin-bottom:26px}
    .mh-t{font-family:'Noto Serif TC',serif;font-size:44px;font-weight:300;color:var(--sand);margin-bottom:20px;line-height:1.4}
    .mh-x{font-size:15px;color:rgba(232,223,208,.7);line-height:2;max-width:500px;margin:0 auto}
    .ben{display:grid;grid-template-columns:repeat(2,1fr);gap:2px;background:var(--div);margin-top:52px}
    .bi{background:var(--w);padding:44px 48px}
    .bb{width:34px;height:1px;background:var(--forest);margin-bottom:20px}
    .bt{font-family:'Noto Serif TC',serif;font-size:16px;color:var(--text);margin-bottom:8px}
    .bx{font-size:13px;color:var(--soft);line-height:2}
    .prs{display:grid;grid-template-columns:1fr 1fr;gap:20px;max-width:680px;margin:52px auto 0}
    .pc{padding:48px 44px;background:var(--w);border:1px solid var(--div);position:relative}
    .pc.ft{background:var(--forest);border-color:var(--forest)}
    .pl{font-size:11px;letter-spacing:.2em;color:var(--wg);margin-bottom:20px}
    .pc.ft .pl{color:rgba(232,223,208,.52)}
    .pa{font-family:'Cormorant Garamond',serif;font-size:44px;font-weight:300;color:var(--text);line-height:1;margin-bottom:5px}
    .pc.ft .pa{color:var(--sand)}
    .pu{font-size:12px;color:var(--wg);margin-bottom:28px;letter-spacing:.1em}
    .pc.ft .pu{color:rgba(232,223,208,.52)}
    .pb{width:100%;padding:13px;font-size:12px;letter-spacing:.18em;cursor:pointer;transition:all .25s;font-family:'Noto Sans TC',sans-serif}
    .po{background:transparent;color:var(--forest);border:1px solid var(--forest)}
    .po:hover{background:var(--forest);color:var(--w)}
    .ps{background:var(--sand);color:var(--forest);border:none}
    .ps:hover{background:var(--sandm)}
    .pbg{position:absolute;top:-10px;right:24px;background:var(--gold);color:var(--w);font-size:11px;letter-spacing:.1em;padding:3px 12px}

    /* ADVANCED */
    .adv-h{background:var(--cream);padding:140px 0 100px;position:relative;overflow:hidden}
    .adv-h::before{content:'';position:absolute;top:0;right:0;width:50%;height:100%;background:radial-gradient(ellipse 80% 60% at 100% 30%,rgba(212,200,181,.3) 0%,transparent 70%);pointer-events:none}
    .flow-steps{display:flex;flex-direction:column;gap:0;margin-top:56px}
    .fs{display:grid;grid-template-columns:80px 1fr;gap:32px;align-items:start;padding:36px 0;border-bottom:1px solid var(--div)}
    .fs:first-child{border-top:1px solid var(--div)}
    .fsn{font-family:'Cormorant Garamond',serif;font-size:48px;font-weight:300;color:var(--sandm);line-height:1}
    .fst{font-family:'Noto Serif TC',serif;font-size:17px;color:var(--text);margin-bottom:8px}
    .fsx{font-size:14px;color:var(--soft);line-height:2}
    .core-sentence{background:var(--forest);padding:60px;margin-top:80px;text-align:center}
    .cs-t{font-family:'Noto Serif TC',serif;font-size:20px;font-weight:300;color:var(--sand);line-height:1.8;letter-spacing:.06em}

    /* DEEP */
    .deep-h{background:var(--cream);padding:140px 0 100px;position:relative;overflow:hidden}
    .deep-h::before{content:'';position:absolute;top:0;right:0;width:60%;height:100%;background:radial-gradient(ellipse 70% 50% at 100% 30%,rgba(212,200,181,.28) 0%,transparent 65%);pointer-events:none}
    .df{display:flex;align-items:flex-start;gap:26px;padding:26px 0;border-bottom:1px solid var(--div)}
    .df:first-child{border-top:1px solid var(--div)}
    .dfn{font-family:'Cormorant Garamond',serif;font-size:17px;color:var(--sandm);flex-shrink:0;width:26px}
    .dft{font-family:'Noto Serif TC',serif;font-size:16px;color:var(--text);line-height:1.8}
    .dfw{background:var(--forest);padding:100px 0;position:relative;overflow:hidden}
    .dfw::before{content:'';position:absolute;top:-50%;left:20%;width:60%;height:200%;background:radial-gradient(ellipse,rgba(184,168,130,.1) 0%,transparent 60%);animation:dg 9s ease-in-out infinite alternate;pointer-events:none}
    @keyframes dg{0%{transform:scale(1)}100%{transform:scale(1.1) translate(4%,2%)}}
    .dg{display:grid;grid-template-columns:repeat(2,1fr);gap:2px;background:rgba(255,255,255,.1);margin-top:48px}
    .dwi{background:rgba(61,90,76,.68);padding:34px 38px}
    .dwc{width:20px;height:20px;border:1px solid var(--sandm);display:inline-flex;align-items:center;justify-content:center;margin-bottom:12px;font-size:11px;color:var(--sandm)}
    .dwt{font-size:14px;color:rgba(232,223,208,.8);line-height:1.9}

    /* ARTICLES */
    .art-h{background:radial-gradient(ellipse 60% 80% at 90% 20%,rgba(212,200,181,.25) 0%,transparent 60%),var(--cream);padding:140px 0 80px}
    .art-r{display:grid;grid-template-columns:108px 1fr auto;gap:40px;align-items:start;padding:42px 0;border-bottom:1px solid var(--div);cursor:pointer;transition:opacity .2s}
    .art-r:hover{opacity:.62}
    .art-r:first-child{border-top:1px solid var(--div)}
    .art-d{font-family:'Cormorant Garamond',serif;font-size:13px;color:var(--wg);letter-spacing:.1em;padding-top:3px}
    .art-t{font-family:'Noto Serif TC',serif;font-size:17px;font-weight:400;color:var(--text);margin-bottom:7px;line-height:1.6}
    .art-x{font-size:13px;color:var(--soft);line-height:1.9}
    .art-tg{font-size:11px;letter-spacing:.15em;color:var(--forest);border:1px solid var(--forest);padding:4px 12px;white-space:nowrap;align-self:start;margin-top:3px}
    .art-cta{background:var(--cream);padding:60px;text-align:center;margin-top:60px}
    .art-cta p{font-family:'Noto Serif TC',serif;font-size:16px;color:var(--soft);line-height:2;margin-bottom:28px}

    /* APPLY */
    .apl-h{background:var(--forest);padding:140px 0 100px;text-align:center;position:relative;overflow:hidden}
    .apl-h::before{content:'';position:absolute;top:-30%;left:20%;width:60%;height:160%;background:radial-gradient(ellipse,rgba(184,168,130,.14) 0%,transparent 60%);animation:ag 9s ease-in-out infinite alternate;pointer-events:none}
    @keyframes ag{0%{transform:scale(1)}100%{transform:scale(1.1) translate(4%,2%)}}
    .apl-t{font-family:'Noto Serif TC',serif;font-size:40px;font-weight:300;color:var(--sand);margin-bottom:20px;line-height:1.5}
    .apl-x{font-size:15px;color:rgba(232,223,208,.7);line-height:2;max-width:480px;margin:0 auto}
    .fg{display:grid;grid-template-columns:1fr 1fr;gap:20px}
    .fgp{display:flex;flex-direction:column;gap:7px}
    .fgp.ful{grid-column:1/-1}
    .fl{font-size:12px;letter-spacing:.15em;color:var(--wg)}
    .fi2,.fs2,.ft2{background:var(--cream);border:1px solid var(--div);border-bottom:1px solid var(--sandm);padding:13px 15px;font-size:14px;font-family:'Noto Sans TC',sans-serif;color:var(--text);outline:none;transition:border-color .2s;-webkit-appearance:none;border-radius:0}
    .fi2:focus,.fs2:focus,.ft2:focus{border-bottom-color:var(--forest);background:var(--w)}
    .ft2{resize:vertical;min-height:108px}
    .fsb{background:var(--forest);color:var(--sand);border:none;padding:16px 50px;font-size:13px;letter-spacing:.2em;cursor:pointer;transition:all .3s;margin-top:12px;font-family:'Noto Sans TC',sans-serif}
    .fsb:hover{background:var(--flt)}
    .deep-entry-cta{background:linear-gradient(145deg,#385B4C 0%,#315143 48%,#24211E 100%);padding:100px 0;text-align:center;position:relative;overflow:hidden}
    .deep-entry-cta::before{content:"";position:absolute;inset:0;background:radial-gradient(ellipse 70% 60% at 50% 20%,rgba(232,223,208,.12),transparent 62%);pointer-events:none}
    .deep-entry-cta > div{position:relative;z-index:1}
    .deep-entry-kicker{font-family:'Cormorant Garamond',serif;font-size:13px;letter-spacing:.32em;color:rgba(232,223,208,.76);margin-bottom:24px;text-transform:uppercase}
    .deep-entry-main{font-family:'Noto Serif TC',serif;font-size:clamp(19px,2.2vw,24px);font-weight:300;color:#F5EFE4;line-height:1.9;margin-bottom:22px;text-wrap:balance}
    .deep-entry-sub{font-size:15px;color:rgba(250,247,242,.78);line-height:2;margin-bottom:40px;text-wrap:balance}
    .num-insight-panel{margin-top:22px;padding:28px;background:linear-gradient(145deg,#385B4C 0%,#315143 52%,#24211E 100%);display:grid;grid-template-columns:1fr 1fr;gap:14px}
    .num-insight-card{padding:24px 26px;background:rgba(250,247,242,.08);border:1px solid rgba(232,223,208,.18)}
    .num-insight-mark{font-family:'Cormorant Garamond',serif;font-size:22px;color:#D8C9A5;margin-bottom:12px;line-height:1}
    .num-insight-card p{font-size:14px;color:rgba(250,247,242,.82);line-height:2;margin:0}
    .num-result-cta{padding:58px 52px;background:linear-gradient(145deg,#385B4C 0%,#315143 46%,#24211E 100%);text-align:center;position:relative;overflow:hidden}
    .num-result-cta::before{content:"";position:absolute;inset:0;background:radial-gradient(ellipse 70% 58% at 50% 12%,rgba(232,223,208,.13),transparent 64%);pointer-events:none}
    .num-result-cta>*{position:relative;z-index:1}
    .num-cta-kicker{font-family:'Cormorant Garamond',serif;font-size:14px;letter-spacing:.32em;color:rgba(232,223,208,.76);margin-bottom:20px}
    .num-cta-text{font-family:'Noto Serif TC',serif;font-size:clamp(21px,2.4vw,28px);font-weight:300;color:#F5EFE4;line-height:1.8;margin-bottom:34px;text-wrap:balance}
    .num-cta-actions{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
    .num-cta-secondary{background:rgba(250,247,242,.08)!important;border:1px solid rgba(232,223,208,.46)!important;color:#F5EFE4!important}
    .num-mini-label{display:inline-flex;align-items:center;gap:8px;font-family:'Noto Sans TC',sans-serif;font-size:12px;letter-spacing:.14em;color:var(--forest);background:rgba(58,92,76,.1);border-left:3px solid var(--forest);padding:7px 12px;margin-bottom:12px}
    .num-mini-label::before{content:"";width:6px;height:6px;border-radius:50%;background:var(--sandm);flex-shrink:0}
    .num-section-title{display:flex;align-items:center;gap:18px;font-family:'Noto Serif TC',serif;font-size:26px;font-weight:300;color:var(--text);line-height:1.4;margin-bottom:18px}
    .num-section-title::before{content:"";width:54px;height:1px;background:var(--sandm);flex-shrink:0}
    .num-section-title span{font-family:'Cormorant Garamond',serif;font-size:15px;letter-spacing:.22em;color:var(--forest);text-transform:uppercase}
    .about-ability-panel{background:linear-gradient(145deg,#385B4C 0%,#315143 55%,#24211E 100%)}
    .about-ability-title{font-family:'Noto Serif TC',serif;font-size:clamp(20px,2.4vw,28px);font-weight:300;color:#F5EFE4;line-height:1.85;margin-bottom:34px;text-wrap:balance}
    .about-ability-row{display:flex;gap:14px;margin-bottom:16px}
    .about-ability-row span:first-child{color:#D8C9A5;flex-shrink:0}
    .about-ability-row span:last-child{font-size:15px;color:rgba(250,247,242,.82);line-height:1.9}
    .green-cta{background:linear-gradient(145deg,#385B4C 0%,#315143 55%,#24211E 100%);padding:80px 0;text-align:center;position:relative;overflow:hidden}
    .green-cta::before{content:"";position:absolute;inset:0;background:radial-gradient(ellipse 75% 62% at 50% 18%,rgba(232,223,208,.13),transparent 65%);pointer-events:none}
    .green-cta > div{position:relative;z-index:1}
    .green-cta-kicker{font-family:'Cormorant Garamond',serif;font-size:13px;letter-spacing:.28em;color:rgba(232,223,208,.72);margin-bottom:20px;text-transform:uppercase}
    .green-cta-price{font-family:'Cormorant Garamond',serif;font-size:52px;font-weight:300;color:#F5EFE4;margin-bottom:8px}
    .green-cta-meta{font-size:13px;color:rgba(250,247,242,.68);margin-bottom:40px;letter-spacing:.08em}
    .green-cta-title{font-family:'Noto Serif TC',serif;font-size:clamp(21px,2.4vw,28px);font-weight:300;color:#F5EFE4;line-height:1.85;margin-bottom:18px;text-wrap:balance}
    .green-cta-text{font-size:15px;color:rgba(250,247,242,.8);line-height:2;margin-bottom:36px;text-wrap:balance}
    .green-cta-actions{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
    .green-cta-secondary{background:rgba(250,247,242,.08)!important;border:1px solid rgba(232,223,208,.46)!important;color:#F5EFE4!important}
    .num-date-grid{display:grid;grid-template-columns:2fr 1fr 1fr;gap:14px}
    .num-rel-panel{padding:32px 36px;background:var(--cream);margin-bottom:32px;border-left:2px solid var(--sandm)}
    .num-guide-grid{display:grid;grid-template-columns:1fr 1fr;gap:32px;margin-bottom:24px}
    .num-lunar-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
    .num-birthday-panel{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:28px}
    .num-birthday-card{padding:22px 24px;background:var(--w);border-left:3px solid var(--sandm)}
    .num-birthday-card:nth-child(2){border-left-color:var(--forest)}
    .num-birthday-label{font-size:12px;letter-spacing:.18em;color:var(--forest);margin-bottom:8px;font-family:'Cormorant Garamond',serif;text-transform:uppercase}
    .num-birthday-date{font-family:'Noto Serif TC',serif;font-size:18px;font-weight:300;color:var(--text);line-height:1.7}
    .subscribe-hero-title{font-family:'Noto Serif TC',serif;font-size:clamp(34px,5vw,58px);font-weight:300;color:#F5EFE4;line-height:1.45;margin-bottom:30px;text-wrap:balance}
    .subscribe-hero-copy{font-family:'Noto Serif TC',serif;font-size:clamp(20px,2.4vw,28px);font-weight:300;color:rgba(250,247,242,.84);line-height:1.9;margin-bottom:38px;text-wrap:balance}
    .subscribe-section{background:var(--w)}
    .subscribe-section.alt{background:var(--cream)}
    .subscribe-inner{max-width:680px;margin:0 auto;padding:90px 24px}
    .subscribe-copy{font-family:'Noto Serif TC',serif;font-size:22px;font-weight:300;color:var(--text);line-height:2;text-wrap:pretty}
    .subscribe-copy p{margin:0 0 18px}
    .subscribe-copy .gap{height:10px}
    .subscribe-list{display:grid;gap:14px;margin-top:28px}
    .subscribe-list.two-col{grid-template-columns:repeat(2,minmax(0,1fr))}
    .subscribe-list-item{padding:22px 26px;background:var(--w);border-left:3px solid var(--forest);font-size:16px;color:var(--soft);line-height:1.9}
    .subscribe-list-item strong{font-family:'Noto Serif TC',serif;font-size:18px;font-weight:300;color:var(--text)}
    .subscribe-section:not(.alt) .subscribe-list-item{background:var(--cream)}
    .subscribe-preview{margin:34px 0 32px;background:var(--w);border:1px solid var(--div);overflow:hidden}
    .subscribe-preview img{display:block;width:100%;height:auto}
    .subscribe-preview.is-muted img{opacity:.8}
    .subscribe-preview-caption{padding:22px 28px;background:linear-gradient(145deg,#385B4C 0%,#315143 55%,#24211E 100%);font-family:'Noto Serif TC',serif;font-size:18px;font-weight:300;color:#F5EFE4;line-height:1.85;text-wrap:balance}
    .subscribe-test-hero{background:linear-gradient(145deg,#385B4C 0%,#315143 52%,#24211E 100%);padding:132px 0 92px;position:relative;overflow:hidden}
    .subscribe-test-hero::before{content:"";position:absolute;inset:0;background:radial-gradient(ellipse 55% 65% at 18% 42%,rgba(232,223,208,.08),transparent 66%);pointer-events:none}
    .subscribe-test-title{font-family:'Noto Serif TC',serif;font-size:clamp(34px,4.6vw,58px);font-weight:300;color:#F5EFE4;line-height:1.52;margin-bottom:26px;text-wrap:balance}
    .subscribe-test-copy{font-size:15px;line-height:2.05;color:rgba(250,247,242,.9)!important;max-width:520px;text-wrap:pretty;text-shadow:0 1px 18px rgba(0,0,0,.2)}
    .subscribe-test-section{background:var(--w);padding:108px 0}
    .subscribe-test-section.alt{background:var(--cream)}
    .subscribe-test-head{max-width:660px;margin:0 auto 48px;text-align:center;padding:0 24px}
    .subscribe-test-head h2{font-family:'Noto Serif TC',serif;font-size:clamp(28px,3.2vw,42px);font-weight:300;line-height:1.65;color:var(--text);margin-bottom:18px}
    .subscribe-test-head p{font-size:15px;line-height:2;color:var(--soft)}
    .subscribe-test-plans{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:22px;max-width:1040px;margin:0 auto;padding:0 60px}
    .subscribe-test-card{background:#FFFDF8;border:1px solid rgba(212,200,181,.62);border-radius:22px;padding:34px 32px;box-shadow:0 22px 54px rgba(86,70,50,.07);display:flex;flex-direction:column;min-height:520px;transition:transform .25s ease,box-shadow .25s ease}
    .subscribe-test-card:hover{transform:translateY(-4px);box-shadow:0 28px 64px rgba(86,70,50,.1)}
    .subscribe-test-badge{align-self:flex-start;font-size:12px;letter-spacing:.16em;color:var(--forest);border:1px solid rgba(61,90,76,.32);padding:6px 12px;margin-bottom:24px}
    .subscribe-test-card h3{font-family:'Noto Serif TC',serif;font-size:24px;font-weight:300;line-height:1.55;color:var(--text);margin-bottom:18px}
    .subscribe-test-price{font-family:'Cormorant Garamond',serif;font-size:46px;font-weight:300;line-height:1;color:var(--forest);margin-bottom:10px}
    .subscribe-test-note{font-size:14px;line-height:1.8;color:#9A8B7C;margin-bottom:24px}
    .subscribe-test-description{font-size:15px;line-height:2;color:var(--soft);margin-bottom:8px}
    .subscribe-test-features{display:grid;gap:12px;margin:24px 0 32px;list-style:none}
    .subscribe-test-features li{font-size:14px;line-height:1.8;color:#5F574F;border-bottom:1px solid rgba(212,200,181,.58);padding-bottom:12px}
    .subscribe-test-card button{margin-top:auto;width:100%}
    .subscribe-test-preview-grid{max-width:900px;margin:0 auto;padding:0 60px;display:grid;gap:26px}
    .subscribe-test-final{background:linear-gradient(145deg,#385B4C 0%,#315143 52%,#24211E 100%);text-align:center;padding:106px 24px}
    .subscribe-test-final h2{font-family:'Noto Serif TC',serif;font-size:clamp(28px,3.2vw,42px);font-weight:300;line-height:1.75;color:#F5EFE4;margin-bottom:20px}
    .subscribe-test-final p{font-size:15px;line-height:2;color:rgba(250,247,242,.75);margin-bottom:34px}
    .register-plan-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin-top:12px}
    .register-plan-option{border:1px solid var(--div);background:var(--cream);padding:20px 18px;cursor:pointer;transition:all .22s}
    .register-plan-option input{display:none}
    .register-plan-option.is-selected{border-color:var(--forest);background:#F8F3EA;box-shadow:inset 3px 0 0 var(--forest)}
    .register-plan-title{display:block;font-family:'Noto Serif TC',serif;font-size:17px;font-weight:300;color:var(--text);line-height:1.6;margin-bottom:6px}
    .register-plan-price{display:block;font-size:13px;letter-spacing:.08em;color:var(--forest)}
    .subscribe-start-title{font-family:'Noto Serif TC',serif;font-size:clamp(30px,4vw,46px);font-weight:300;color:#F5EFE4;line-height:1.55;margin-bottom:26px;text-wrap:balance}
    .subscribe-start-copy{font-family:'Noto Serif TC',serif;font-size:clamp(19px,2.2vw,24px);font-weight:300;color:rgba(250,247,242,.86);line-height:2;max-width:560px;text-wrap:pretty}
    .short-hero{background:linear-gradient(145deg,#385B4C 0%,#315143 48%,#24211E 100%);padding:136px 0 92px;position:relative;overflow:hidden}
    .short-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 60% 70% at 18% 42%,rgba(232,223,208,.09) 0%,transparent 66%);pointer-events:none}
    .short-title{font-family:'Noto Serif TC',serif;font-size:clamp(32px,4.8vw,58px);font-weight:300;color:#F5EFE4;line-height:1.5;margin-bottom:30px;text-wrap:balance}
    .short-copy{font-family:'Noto Serif TC',serif;font-size:clamp(18px,2.1vw,23px);font-weight:300;color:rgba(250,247,242,.84);line-height:2;text-wrap:pretty}
    .short-hero .short-copy,.short-hero .short-copy p{color:#F5EFE4!important;text-shadow:0 1px 18px rgba(0,0,0,.2)}
    .short-section{background:var(--w)}
    .short-section.alt{background:var(--cream)}
    .short-inner{max-width:780px;margin:0 auto;padding:88px 24px}
    .short-kicker{display:flex;align-items:center;gap:16px;font-family:'Cormorant Garamond',serif;font-size:12px;letter-spacing:.28em;color:var(--wg);text-transform:uppercase;margin-bottom:34px}
    .short-kicker::before{content:'';display:block;width:48px;height:1px;background:var(--sandm)}
    .short-body{font-family:'Noto Serif TC',serif;font-size:21px;font-weight:300;color:var(--text);line-height:2;text-wrap:pretty}
    .short-body p{margin:0 0 18px}
    .short-dashboard{margin:34px 0;background:var(--w);border:1px solid var(--div);overflow:hidden;padding:34px 28px}
    .short-dashboard-title{text-align:center;font-family:'Noto Serif TC',serif;font-size:18px;color:var(--forest);letter-spacing:.12em;margin-bottom:24px}
    .short-dashboard-visual{max-width:720px;margin:0 auto}
    .short-radar svg{display:block;width:100%;height:auto}
    .short-radar-label{font-family:'Noto Serif TC',serif;font-size:16px;font-weight:400;fill:var(--text)}
    .short-radar-value{font-family:'Cormorant Garamond',serif;font-size:30px;font-weight:400;fill:var(--forest)}
    .short-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;background:var(--div);margin:24px 0 36px}
    .short-stat{background:var(--cream);padding:24px 22px;border-top:3px solid var(--forest)}
    .short-stat strong{display:block;font-family:'Noto Serif TC',serif;font-size:18px;font-weight:400;color:var(--forest);margin-bottom:10px}
    .short-stat p{font-size:14px;line-height:1.85;color:var(--soft);margin:0}
    .short-cards{display:grid;grid-template-columns:repeat(2,1fr);gap:2px;background:var(--div);margin:30px 0}
    .short-card{background:var(--w);padding:34px 32px}
    .short-card h3{font-size:24px;font-weight:300;color:var(--text);margin-bottom:18px}
    .short-checks{display:grid;gap:12px;margin-top:28px}
    .short-check{background:var(--cream);border-left:3px solid var(--forest);padding:18px 22px;font-size:16px;color:var(--soft);line-height:1.8}
    .short-price{background:var(--forest);color:#F5EFE4;text-align:center;padding:76px 24px}
    .short-price h2{font-size:clamp(28px,4vw,46px);font-weight:300;line-height:1.6;margin-bottom:24px}
    .short-price .amount{font-family:'Cormorant Garamond',serif;font-size:clamp(56px,8vw,88px);font-weight:300;line-height:1.1;margin-bottom:10px}
    .form-question label{font-size:15px!important;letter-spacing:.08em!important;color:#2C2825!important;line-height:1.8!important;font-family:'Noto Serif TC',serif!important}
    .form-question-note{font-size:14px;color:#655B52;margin-bottom:12px;line-height:1.9}

    /* FAQ */
    .fq{border-bottom:1px solid var(--div)}
    .fqq{display:flex;justify-content:space-between;align-items:center;padding:25px 0;cursor:pointer;font-family:'Noto Serif TC',serif;font-size:15px;color:var(--text)}
    .fqi{font-family:'Cormorant Garamond',serif;font-size:22px;color:var(--forest);transition:transform .3s;flex-shrink:0}
    .fqa{font-size:14px;color:var(--soft);line-height:2;overflow:hidden;transition:max-height .4s ease,padding .4s ease}
    .fqa.op{padding-bottom:20px}

    /* FOOTER */
    footer{background:var(--text);padding:80px 0 40px}
    .fti{max-width:1140px;margin:0 auto;padding:0 60px}
    .ftt{display:grid;grid-template-columns:1.5fr 1fr 1fr;gap:68px;padding-bottom:52px;border-bottom:1px solid rgba(255,255,255,.07);margin-bottom:32px}
    .fn{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:300;color:var(--sand);letter-spacing:.08em;margin-bottom:5px}
    .fs3{font-size:11px;letter-spacing:.2em;color:rgba(255,255,255,.26);margin-bottom:18px}
    .fd{font-size:13px;color:rgba(255,255,255,.36);line-height:2}
    .fnt{font-size:11px;letter-spacing:.2em;color:rgba(255,255,255,.3);margin-bottom:16px}
    .ful2{list-style:none;display:flex;flex-direction:column;gap:9px}
    .ful2 li{font-size:13px;color:rgba(255,255,255,.45);cursor:pointer;transition:color .2s}
    .ful2 li:hover{color:var(--sand)}
    .fb{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px}
    .fc{font-size:12px;color:rgba(255,255,255,.17);letter-spacing:.04em}

    /* CHECKLIST */
    .chk{margin-top:32px;display:flex;flex-direction:column;gap:9px}
    .chkr{display:flex;gap:12px;align-items:flex-start}
    .chkd{color:var(--forest);font-size:14px;margin-top:2px;flex-shrink:0}
    .chkt{font-size:14px;color:var(--soft);line-height:1.9}

    /* TESTIMONIALS */
    .testi-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:24px;margin-top:48px}
    .testi-card{background:var(--w);padding:40px 36px;border-top:2px solid var(--sandm)}
    .testi-stars{color:var(--gold);font-size:14px;letter-spacing:3px;margin-bottom:18px}
    .testi-text{font-family:'Noto Serif TC',serif;font-size:15px;font-weight:300;color:var(--text);line-height:2;margin-bottom:24px}
    .testi-name{font-size:13px;color:var(--soft);letter-spacing:.12em;margin-bottom:6px}
    .testi-tag{font-size:11px;letter-spacing:.2em;color:var(--forest);border:1px solid var(--forest);display:inline-block;padding:3px 12px}
    .tone-panel{background:linear-gradient(145deg,#1F1B18 0%,#2C2825 46%,#38594B 100%);padding:76px 60px;position:relative;overflow:hidden}
    .tone-panel::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 70% 90% at 100% 0%,rgba(184,168,130,.16),transparent 62%);pointer-events:none}
    .tone-panel-inner{max-width:720px;margin:0 auto;position:relative;z-index:1;text-align:center}
    .tone-kicker{font-family:'Cormorant Garamond',serif;font-size:12px;letter-spacing:.35em;color:var(--gold);text-transform:uppercase;margin-bottom:24px}
    .tone-text{font-family:'Noto Serif TC',serif;font-size:clamp(20px,2.6vw,30px);font-weight:300;line-height:1.9;color:var(--sand)}
    .tone-sub{font-size:14px;line-height:2;color:rgba(232,223,208,.68);margin-top:24px}
    .apply-tone{padding:46px 60px}
    .apply-tone .tone-kicker{margin-bottom:14px}
    .apply-tone .tone-text{font-size:clamp(18px,2vw,24px);line-height:1.75}
    .apply-tone .tone-sub{margin-top:12px}
    .apply-form-section{padding-top:16px;padding-bottom:100px}
    .thanks-title{font-size:clamp(26px,3.2vw,36px)!important;line-height:1.55!important;margin-bottom:24px!important}
    .thanks-copy{font-size:17px!important;line-height:1.95!important;gap:16px!important;max-width:560px!important}
    .thanks-line-copy{font-size:16px!important;line-height:1.95!important}

    /* HOME REFRESH */
    .home-shell{background:#FAF7F2}
    .home-section{padding:118px 0}
    .home-quiet-hero{min-height:95vh;display:flex;align-items:center;background:#F7F2EA;padding:0;position:relative;overflow:hidden}
    .home-quiet-hero::before{content:"";position:absolute;inset:0;z-index:2;background:linear-gradient(90deg,#F7F2EA 0%,#F7F2EA 35%,rgba(247,242,234,.96) 42%,rgba(247,242,234,.72) 47%,rgba(247,242,234,.24) 53%,transparent 59%);pointer-events:none}
    .home-quiet-hero::after{content:"";position:absolute;inset:auto -18% -34% auto;width:62vw;height:62vw;z-index:2;background:radial-gradient(ellipse,rgba(184,168,130,.1),transparent 66%);pointer-events:none}
    .home-hero-copy{position:relative;z-index:3;max-width:650px;width:48%;margin-left:max(60px,calc((100vw - 1140px)/2));padding:132px 40px 84px 0}
    .home-eyebrow{font-size:12px;letter-spacing:.18em;color:#7B7168;margin-bottom:28px;line-height:1.9}
    .home-hero-title{font-family:'Noto Serif TC',serif;font-size:clamp(36px,4.4vw,58px);font-weight:300;color:#292520;line-height:1.34;letter-spacing:.03em;margin-bottom:30px}
    .home-hero-body{font-size:16px;color:#5E554D;line-height:2.05;max-width:500px;margin-bottom:42px}
    .home-hero-actions{display:flex;gap:16px;flex-wrap:wrap;align-items:center}
    .home-secondary-btn{background:rgba(250,247,242,.46);border:1px solid rgba(61,90,76,.28);color:var(--forest);padding:15px 34px;font-size:13px;letter-spacing:.15em;cursor:pointer;font-family:'Noto Sans TC',sans-serif;transition:all .25s}
    .home-secondary-btn:hover{background:rgba(61,90,76,.08)}
    .home-portrait-frame{position:absolute;z-index:0;inset:0 0 0 39%;min-width:0;overflow:hidden;background:#E9DED2}
    .home-portrait-frame img{width:100%;height:100%;position:absolute;inset:0;object-fit:cover;object-position:left center;display:block}
    .home-portrait-frame::after{content:"";position:absolute;inset:0;background:linear-gradient(to top,rgba(250,247,242,.25),transparent 30%),linear-gradient(to bottom,rgba(250,247,242,.14),transparent 18%);pointer-events:none}
    .home-intro{max-width:720px;margin:0 auto 54px;text-align:center}
    .home-intro-kicker{font-family:'Cormorant Garamond',serif;font-size:12px;letter-spacing:.32em;color:#A19179;text-transform:uppercase;margin-bottom:16px}
    .home-section-title{font-family:'Noto Serif TC',serif;font-size:clamp(28px,3vw,40px);font-weight:300;color:#2C2825;line-height:1.55;letter-spacing:.03em}
    .home-section-copy{font-size:15px;color:#665E56;line-height:2;max-width:560px;margin:18px auto 0}
    .home-scenario-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
    .home-scenario-card{background:#FFFDF8;border:1px solid rgba(212,200,181,.55);border-radius:22px;overflow:hidden;box-shadow:0 24px 60px rgba(86,70,50,.08);transition:transform .25s,box-shadow .25s}
    .home-scenario-card:hover{transform:translateY(-4px);box-shadow:0 30px 70px rgba(86,70,50,.12)}
    .home-scenario-img{height:300px;overflow:hidden;background:#E9DED2}
    .home-scenario-img img{width:100%;height:100%;object-fit:cover;display:block}
    .home-scenario-text{padding:30px 30px 36px}
    .home-card-title{font-family:'Noto Serif TC',serif;font-size:22px;font-weight:300;color:#302B27;line-height:1.55;margin-bottom:16px}
    .home-card-copy{font-size:14px;color:#665E56;line-height:2}
    .home-split{display:grid;grid-template-columns:minmax(0,.92fr) minmax(0,1fr);gap:72px;align-items:center}
    .home-split.reverse{grid-template-columns:minmax(0,1fr) minmax(0,.95fr)}
    .home-image-card{border-radius:26px;overflow:hidden;background:#E9DED2;box-shadow:0 30px 70px rgba(76,60,44,.1);border:1px solid rgba(212,200,181,.45)}
    .home-image-card img{width:100%;height:auto;display:block}
    .home-work-image img{aspect-ratio:1.04/1;object-fit:cover;object-position:center}
    .home-split-copy{max-width:560px}
    .home-large-title{font-family:'Noto Serif TC',serif;font-size:clamp(28px,3.1vw,42px);font-weight:300;color:#2C2825;line-height:1.6;margin-bottom:28px;letter-spacing:.03em}
    .home-body-lines{display:flex;flex-direction:column;gap:14px;margin-bottom:34px}
    .home-body-lines p{font-size:15px;color:#5F574F;line-height:2}
    .home-focus-row{display:flex;gap:12px;flex-wrap:wrap}
    .home-focus-pill{border:1px solid rgba(61,90,76,.28);background:rgba(255,253,248,.72);border-radius:999px;padding:9px 18px;font-size:13px;letter-spacing:.1em;color:var(--forest)}
    .home-report-panel{background:linear-gradient(135deg,#F6F0E7 0%,#EFE3D2 100%)}
    .home-report-list{display:grid;gap:10px;margin:28px 0 34px}
    .home-report-list div{font-size:14px;color:#514941;line-height:1.8}
    .home-start-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
    .home-start-card{background:#FFFDF8;border:1px solid rgba(212,200,181,.58);border-radius:22px;padding:22px 26px;box-shadow:0 22px 54px rgba(86,70,50,.07);display:flex;flex-direction:column;min-height:248px;transition:transform .25s ease,box-shadow .25s ease}
    .home-start-card:hover{transform:translateY(-4px);box-shadow:0 26px 64px rgba(86,70,50,.08)}
    .home-start-number{font-family:'Cormorant Garamond',serif;font-size:25px;color:#C2AF89;margin-bottom:11px;line-height:1}
    .home-start-title{font-family:'Noto Serif TC',serif;font-size:20px;font-weight:300;color:#2C2825;line-height:1.45;margin-bottom:10px}
    .home-start-fit{font-size:12px;letter-spacing:.18em;color:#A19179;margin-bottom:10px;text-transform:uppercase}
    .home-start-card p{font-size:13px;color:#665E56;line-height:1.75;margin-bottom:16px}
    .home-start-card button{margin-top:auto;align-self:flex-start}
    .home-start-card .home-secondary-btn{padding:12px 24px}
    .home-v2-story .home-body-lines{gap:10px}
    .home-v2-story .home-body-lines p:nth-last-child(2){margin-top:18px}
    .home-report-panel .home-split-copy{transform:translateY(-44px)}
    .home-v2-quote{padding:148px 24px;text-align:center;background:linear-gradient(145deg,#385B4C 0%,#315143 55%,#24211E 100%);position:relative;overflow:hidden}
    .home-v2-quote::before{content:"";position:absolute;inset:0;background:radial-gradient(ellipse 75% 62% at 50% 18%,rgba(232,223,208,.13),transparent 65%);pointer-events:none}
    .home-v2-quote-main{font-family:'Noto Serif TC',serif;font-size:clamp(28px,3.3vw,44px);font-weight:300;line-height:1.8;color:#F1E8DB;position:relative;z-index:1}
    .home-v2-quote-rule{width:38px;height:1px;background:rgba(216,201,165,.55);margin:34px auto}
    .home-v2-quote-sub{font-family:'Noto Serif TC',serif;font-size:clamp(19px,2vw,27px);font-weight:300;line-height:1.85;color:rgba(241,232,219,.72)}
    .home-v2-testimonials{background:var(--cream)}
    .home-v2-testimonial-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px;margin-top:50px}
    .home-v2-testimonial{padding:34px 34px;border-radius:20px;background:rgba(255,253,248,.74);box-shadow:0 20px 52px rgba(86,70,50,.06)}
    .home-v2-testimonial p{font-family:'Noto Serif TC',serif;font-size:16px;font-weight:300;line-height:2;color:#403A35;margin-bottom:26px}
    .home-v2-testimonial-meta{display:flex;align-items:center;gap:12px;flex-wrap:wrap}
    .home-v2-testimonial-name{font-size:13px;color:var(--soft);letter-spacing:.12em}
    .home-v2-testimonial-tag{font-size:11px;letter-spacing:.16em;color:var(--forest);border:1px solid rgba(56,89,75,.45);padding:4px 10px}
    .home-v2-faq{background:var(--w)}
    .home-v2-faq-inner{max-width:760px;margin:0 auto}
    .home-v2-faq .home-intro{text-align:left;margin-left:0}
    .home-v2-faq .fqq{font-size:17px;padding:28px 0}
    .home-v2-faq .fqa{font-size:15px}
    .home-v2-final{padding:160px 24px;text-align:center;background:#F1E9DE}
    .home-v2-final h2{font-family:'Noto Serif TC',serif;font-size:clamp(30px,3.8vw,50px);font-weight:300;line-height:1.75;color:#2C2825}
    .home-v2-final p{font-family:'Noto Serif TC',serif;font-size:clamp(18px,1.8vw,24px);font-weight:300;line-height:1.9;color:#6B6259;margin:34px 0 42px}

    /* ABOUT REFRESH */
    .about-new{background:#FAF7F2}
    .about-new-hero{min-height:92vh;padding:calc(var(--nav) + 58px) 0 72px;display:flex;align-items:center;background:linear-gradient(135deg,#F8F4ED 0%,#F2E9DE 100%)}
    .about-new-hero-grid{max-width:1240px;width:100%;margin:0 auto;padding:0 60px;display:grid;grid-template-columns:minmax(0,.82fr) minmax(0,1.18fr);gap:72px;align-items:center}
    .about-new-kicker{font-family:'Cormorant Garamond',serif;font-size:12px;letter-spacing:.34em;text-transform:uppercase;color:#A28D70;margin-bottom:24px}
    .about-new-title{font-family:'Noto Serif TC',serif;font-size:clamp(38px,4.4vw,60px);font-weight:300;line-height:1.35;color:#292520;margin-bottom:34px}
    .about-new-lead{font-family:'Noto Serif TC',serif;font-size:clamp(20px,2vw,28px);font-weight:300;line-height:1.9;color:#403A35;margin-bottom:38px;text-wrap:balance}
    .about-new-hero-photo{height:min(680px,72vh);min-height:520px;border-radius:24px;overflow:hidden;box-shadow:0 30px 80px rgba(73,57,43,.13);background:#E9DED2}
    .about-new-hero-photo img{width:100%;height:100%;display:block;object-fit:cover;object-position:55% center}
    .about-new-section{padding:120px 0}
    .about-new-inner{max-width:1120px;margin:0 auto;padding:0 60px}
    .about-new-story{max-width:760px;margin:0 auto}
    .about-new-story h2{font-family:'Noto Serif TC',serif;font-size:clamp(30px,3.5vw,48px);font-weight:300;line-height:1.72;color:#2C2825;margin-bottom:38px;text-wrap:balance}
    .about-new-story-copy{display:grid;grid-template-columns:1fr 1fr;gap:40px}
    .about-new-story-copy p{font-size:16px;line-height:2.15;color:#60574F}
    .about-new-methods{background:#F1E9DE}
    .about-new-section-head{text-align:center;max-width:640px;margin:0 auto 52px}
    .about-new-section-head h2{font-family:'Noto Serif TC',serif;font-size:clamp(30px,3.2vw,42px);font-weight:300;line-height:1.55;color:#2C2825}
    .about-new-card-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
    .about-new-card{background:rgba(255,253,248,.9);border:1px solid rgba(212,200,181,.56);border-radius:18px;padding:42px 34px;box-shadow:0 20px 56px rgba(77,60,43,.07);min-height:250px}
    .about-new-card-num{font-family:'Cormorant Garamond',serif;font-size:30px;color:#BEAA83;line-height:1;margin-bottom:28px}
    .about-new-card h3{font-family:'Noto Serif TC',serif;font-size:23px;font-weight:300;line-height:1.5;color:#302B27;margin-bottom:16px}
    .about-new-card p{font-size:15px;line-height:2;color:#665E56}
    .about-new-work{display:grid;grid-template-columns:minmax(0,1.08fr) minmax(0,.92fr);gap:72px;align-items:center}
    .about-new-work-photo{height:640px;border-radius:24px;overflow:hidden;background:#E9DED2;box-shadow:0 28px 70px rgba(72,57,43,.11)}
    .about-new-work-photo img{width:100%;height:100%;display:block;object-fit:cover;object-position:42% center;transform:scale(1.08)}
    .about-new-work-copy h2{font-family:'Noto Serif TC',serif;font-size:clamp(30px,3.2vw,44px);font-weight:300;line-height:1.55;color:#2C2825;margin-bottom:28px}
    .about-new-work-copy p{font-size:15px;line-height:2.08;color:#60574F;margin-bottom:20px}
    .about-new-work-list{margin:30px 0;display:grid;gap:12px}
    .about-new-work-list div{font-family:'Noto Serif TC',serif;font-size:17px;font-weight:300;color:#3F4942;padding-bottom:12px;border-bottom:1px solid #DDD5C8}
    .about-new-link{border:0;background:transparent;padding:8px 0;border-bottom:1px solid #869687;color:var(--forest);font-size:13px;letter-spacing:.12em;cursor:pointer;font-family:'Noto Sans TC',sans-serif}
    .about-new-start{background:#EEE5D9}
    .about-new-start-card{background:#FFFDF8;border:1px solid rgba(212,200,181,.62);border-radius:18px;padding:36px 32px;min-height:248px;display:flex;flex-direction:column;box-shadow:0 18px 48px rgba(77,60,43,.06)}
    .about-new-start-card h3{font-family:'Noto Serif TC',serif;font-size:21px;font-weight:300;line-height:1.55;color:#302B27;margin:18px 0 30px}
    .about-new-start-card button{margin-top:auto;align-self:flex-start}
    .about-new-closing{padding:112px 24px;text-align:center;background:#2B302C}
    .about-new-closing p{font-family:'Noto Serif TC',serif;font-size:clamp(25px,3vw,38px);font-weight:300;line-height:1.9;color:#F2E9DC}

    /* FREQUENCY */
    .frequency-page{background:var(--w)}
    .frequency-hero{position:relative;min-height:92vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:calc(var(--nav) + 70px) 24px 90px;overflow:hidden;background:var(--forest)}
    .frequency-hero-bg{position:absolute;inset:0;background:url('/frequency/hero-bg.jpg') center/cover no-repeat;opacity:.2;filter:saturate(.75)}
    .frequency-hero-overlay{position:absolute;inset:0;background:linear-gradient(180deg,rgba(34,48,41,.66),rgba(47,75,62,.88) 58%,#3D5A4C 100%)}
    .frequency-hero-inner{position:relative;z-index:1;max-width:720px}
    .frequency-eyebrow{font-family:'Cormorant Garamond',serif;font-size:12px;letter-spacing:.36em;color:rgba(232,223,208,.68);text-transform:uppercase;margin-bottom:24px}
    .frequency-title{font-family:'Noto Serif TC',serif;font-size:clamp(42px,6vw,70px);font-weight:300;line-height:1.22;color:#F7F1E7;letter-spacing:.03em}
    .frequency-title em{font-style:normal;color:#D8C9A5}
    .frequency-lead{max-width:570px;margin:32px auto 0;font-size:15px;line-height:2.15;color:rgba(250,247,242,.78)}
    .frequency-lead strong{font-weight:400;color:#F4EBDD}
    .frequency-tags{display:flex;justify-content:center;flex-wrap:wrap;gap:10px;margin-top:36px}
    .frequency-tag{padding:7px 17px;border:1px solid rgba(232,223,208,.3);font-size:12px;letter-spacing:.08em;color:rgba(250,247,242,.76);background:rgba(250,247,242,.05)}
    .frequency-section{padding:110px 0}
    .frequency-inner{max-width:1040px;margin:0 auto;padding:0 60px}
    .frequency-label{font-family:'Cormorant Garamond',serif;font-size:11px;letter-spacing:.36em;text-transform:uppercase;color:var(--wg);margin-bottom:14px}
    .frequency-heading{font-family:'Noto Serif TC',serif;font-size:clamp(28px,3.2vw,40px);font-weight:300;line-height:1.55;color:var(--text)}
    .frequency-rule{width:40px;height:1px;background:var(--sandm);margin:22px 0 0}
    .frequency-principle{position:relative;min-height:560px;margin-top:52px;padding:70px 56% 70px 64px;display:flex;align-items:center;overflow:hidden;background:#F4EFE8;border-top:1px solid var(--div);border-bottom:1px solid var(--div)}
    .frequency-principle::before{content:"";position:absolute;inset:0;background:url('/frequency/flow.jpeg') 72% center/cover no-repeat;transform:scale(1.02)}
    .frequency-principle::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(247,243,237,.98) 0%,rgba(247,243,237,.96) 38%,rgba(247,243,237,.78) 52%,rgba(247,243,237,.2) 75%,rgba(247,243,237,.04) 100%)}
    .frequency-principle-copy{position:relative;z-index:1}
    .frequency-principle-copy p{font-size:15px;line-height:2.15;color:var(--soft);margin-bottom:20px}
    .frequency-principle-copy strong{font-weight:400;color:var(--forest)}
    .frequency-support-grid{display:grid;grid-template-columns:1.05fr .95fr;gap:0;margin-top:48px;align-items:stretch;overflow:hidden;background:linear-gradient(135deg,#F7F2EA 0%,#FBF8F3 48%,rgba(61,90,76,.08) 100%);border:1px solid var(--div);border-radius:8px;box-shadow:0 22px 55px rgba(80,60,50,.055)}
    .frequency-support-card{position:relative;background:transparent;border:0;border-right:1px solid var(--div);border-radius:0;padding:54px 50px;box-shadow:none}
    .frequency-support-card-mark{font-family:'Cormorant Garamond',serif;font-size:11px;letter-spacing:.34em;text-transform:uppercase;color:var(--gold);margin-bottom:26px}
    .frequency-support-card h3{font-family:'Noto Serif TC',serif;font-size:clamp(24px,2.4vw,32px);font-weight:300;line-height:1.55;color:var(--text);margin-bottom:14px}
    .frequency-support-card .sub{font-size:16px;line-height:1.9;color:var(--forest);margin-bottom:24px}
    .frequency-support-card p{font-size:15px;line-height:2.05;color:var(--soft);margin-bottom:18px}
    .frequency-timeline{position:relative;display:grid;gap:0;padding:42px 42px}
    .frequency-timeline::before{content:"";position:absolute;left:62px;top:86px;bottom:58px;width:1px;background:linear-gradient(180deg,rgba(186,158,110,.18),rgba(61,90,76,.38),rgba(186,158,110,.18))}
    .frequency-timeline-label{font-family:'Cormorant Garamond',serif;font-size:12px;letter-spacing:.28em;text-transform:uppercase;color:var(--wg);margin:0 0 10px 72px}
    .frequency-timeline-step{position:relative;background:transparent;border:0;border-bottom:1px solid rgba(212,200,181,.62);border-radius:0;padding:24px 0 24px 72px}
    .frequency-timeline-step:last-child{border-bottom:0}
    .frequency-timeline-step::before{content:attr(data-step);position:absolute;left:0;top:27px;width:42px;height:42px;border-radius:50%;border:1px solid var(--gold);background:rgba(250,247,242,.9);display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-size:15px;color:var(--forest);letter-spacing:.08em;z-index:1}
    .frequency-timeline-step h3{font-family:'Noto Serif TC',serif;font-size:19px;font-weight:300;color:var(--text);line-height:1.5;margin-bottom:8px}
    .frequency-timeline-step p{font-size:14px;line-height:1.9;color:var(--soft)}
    .frequency-feature-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;margin-top:42px}
    .frequency-feature{position:relative;min-height:260px;overflow:hidden;background:linear-gradient(180deg,#FBF8F3 0%,#F5F0E8 100%);border:1px solid rgba(212,200,181,.78);border-radius:8px;padding:34px 28px;box-shadow:0 18px 42px rgba(80,60,50,.05);transition:transform .25s,box-shadow .25s}
    .frequency-feature::before{content:"";position:absolute;inset:auto -20% -45% -20%;height:55%;background:radial-gradient(ellipse at center,rgba(61,90,76,.13),transparent 62%);opacity:.72;pointer-events:none}
    .frequency-feature:hover{transform:translateY(-4px);box-shadow:0 22px 44px rgba(80,60,50,.085)}
    .frequency-feature.is-accent{background:linear-gradient(145deg,var(--forest),#26332D);border-color:transparent}
    .frequency-feature.is-accent::before{background:radial-gradient(ellipse at center,rgba(232,223,208,.18),transparent 62%)}
    .frequency-feature.is-accent .frequency-feature-icon{color:rgba(232,223,208,.74)}
    .frequency-feature.is-accent h3{color:var(--sand)}
    .frequency-feature.is-accent p{color:rgba(232,223,208,.74)}
    .frequency-feature-icon{position:relative;z-index:1;font-family:'Cormorant Garamond',serif;color:var(--gold);font-size:13px;letter-spacing:.28em;margin-bottom:30px}
    .frequency-feature h3{font-family:'Noto Serif TC',serif;font-size:18px;font-weight:300;color:var(--text);line-height:1.5;margin-bottom:12px}
    .frequency-feature p{font-size:13px;line-height:1.9;color:var(--soft)}
    .frequency-feature h3,.frequency-feature p{position:relative;z-index:1}
    .frequency-highlight{margin-top:54px;padding:48px 56px;text-align:center;background:linear-gradient(135deg,var(--forest),#26332D);color:var(--sand);border-radius:8px;box-shadow:0 18px 42px rgba(40,48,42,.12)}
    .frequency-highlight p{font-family:'Noto Serif TC',serif;font-size:clamp(22px,2.5vw,31px);font-weight:300;line-height:1.75;letter-spacing:.03em}
    .frequency-apps{background:var(--cream)}
    .frequency-app-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin-top:48px}
    .frequency-app-hint{display:none}
    .frequency-app{position:relative;display:flex;flex-direction:column;background:var(--w);border:1px solid var(--div);border-radius:8px;overflow:hidden;min-height:330px;box-shadow:0 12px 34px rgba(80,60,50,.04)}
    .frequency-app-image{height:132px;overflow:hidden;background:#E9DED2}
    .frequency-app-image img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .45s ease}
    .frequency-app:hover .frequency-app-image img{transform:scale(1.04)}
    .frequency-app-copy{padding:22px 24px 26px;display:flex;flex-direction:column;flex:1}
    .frequency-app-number{font-family:'Cormorant Garamond',serif;font-size:12px;letter-spacing:.35em;color:var(--gold);margin-bottom:8px}
    .frequency-app-title{font-family:'Noto Serif TC',serif;font-size:18px;font-weight:300;color:var(--text);line-height:1.5;margin-bottom:10px}
    .frequency-app-rule{width:28px;height:1px;background:var(--sandm);margin-bottom:12px}
    .frequency-app-copy p{font-size:13px;line-height:1.9;color:var(--soft)}
    .frequency-faq{max-width:860px;margin:46px auto 0}
    .frequency-faq-item{border-bottom:1px solid var(--div)}
    .frequency-faq-button{width:100%;border:0;background:transparent;padding:22px 0;display:flex;align-items:center;justify-content:space-between;gap:20px;text-align:left;font-family:'Noto Serif TC',serif;font-size:16px;font-weight:300;color:var(--text);cursor:pointer}
    .frequency-faq-icon{width:24px;height:24px;border:1px solid var(--gold);border-radius:50%;display:flex;align-items:center;justify-content:center;color:var(--gold);font-size:16px;flex-shrink:0;transition:transform .25s}
    .frequency-faq-item.is-open .frequency-faq-icon{transform:rotate(45deg)}
    .frequency-faq-answer{max-height:0;overflow:hidden;transition:max-height .35s ease,padding .35s ease;font-size:14px;line-height:2;color:var(--soft)}
    .frequency-faq-item.is-open .frequency-faq-answer{max-height:520px;padding-bottom:24px}
    .frequency-note{margin-top:32px;padding:24px 28px;border-left:2px solid var(--forest);background:var(--cream);font-size:13px;line-height:2;color:var(--soft)}
    .frequency-cta{position:relative;overflow:hidden;text-align:center;background:var(--forest)}
    .frequency-cta-bg{position:absolute;inset:0;background:url('/frequency/cta-bg.jpg') center 30%/cover no-repeat;opacity:.16}
    .frequency-cta-overlay{position:absolute;inset:0;background:linear-gradient(180deg,rgba(61,90,76,.96),rgba(38,43,39,.9))}
    .frequency-cta-inner{position:relative;z-index:1;max-width:620px;margin:0 auto;padding:120px 24px 130px}
    .frequency-cta .frequency-label{color:rgba(232,223,208,.58)}
    .frequency-cta h2{font-family:'Noto Serif TC',serif;font-size:clamp(29px,4vw,44px);font-weight:300;line-height:1.6;color:var(--sand)}
    .frequency-cta p{font-size:15px;line-height:2.1;color:rgba(232,223,208,.74);margin:24px 0 38px}
    .frequency-cta .bp{background:var(--sand);color:var(--forest)}

    /* TABLET */
    @media(max-width:1024px){
      nav,nav.sc{padding:0 32px}
      .C{padding:0 32px}.CN{padding:0 32px}
      .hl{padding:140px 48px 80px}.htit{font-size:42px}
      .si{padding:0 32px}.pil{padding:0 26px}
      .pi{padding:0 32px;gap:56px}
      .ab-l{padding:120px 44px 80px}
      .two{gap:44px;grid-template-columns:196px 1fr}
      .fti{padding:0 32px}.ctab{padding:80px 32px}
      .tier{padding:48px 36px}
      .home-hero-copy{margin-left:32px;max-width:560px;width:50%;padding-right:32px}
      .home-portrait-frame{left:38%}
      .home-split,.home-split.reverse{grid-template-columns:1fr;gap:44px}
      .home-start-grid{grid-template-columns:1fr}
      .about-new-hero-grid{padding:0 32px;gap:42px;grid-template-columns:.9fr 1.1fr}
      .about-new-inner{padding:0 32px}
      .about-new-work{gap:44px}
      .about-new-work-photo{height:560px}
      .frequency-inner{padding:0 32px}
      .frequency-principle{padding-right:48%;padding-left:48px}
      .frequency-support-grid{grid-template-columns:1fr}
      .frequency-support-card{border-right:0;border-bottom:1px solid var(--div)}
      .frequency-feature-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
    }

    /* NAV DARK */
    nav.dk .nl{color:rgba(250,247,242,.95)}
    nav.dk .nl span{color:rgba(250,247,242,.65)}
    nav.dk .nm li{color:rgba(250,247,242,.8)}
    nav.dk .nm li::after{background:rgba(250,247,242,.8)}
    nav.dk .nm li:hover,nav.dk .nm li.on{color:rgba(250,247,242,1)}
    nav.dk .nc{border-color:rgba(250,247,242,.7);color:rgba(250,247,242,.9)}
    nav.dk .nc:hover{background:rgba(250,247,242,.15);color:var(--w)}

    /* MOBILE */
    @media(max-width:768px){
      :root{--nav:60px;--soft:#4E4741;--wg:#655B52}
      nav,nav.sc{padding:0 18px}
      .nm,.nc{display:none}
      .hb{display:flex;flex-direction:column;justify-content:center;gap:5px;width:38px;height:38px;background:none;border:none;cursor:pointer;padding:4px;flex-shrink:0}
      .hb span{display:block;width:22px;height:1px;background:var(--text);transition:all .3s;transform-origin:center}
      .hb.op span:nth-child(1){transform:translateY(6px) rotate(45deg)}
      .hb.op span:nth-child(2){opacity:0}
      .hb.op span:nth-child(3){transform:translateY(-6px) rotate(-45deg)}
      nav.dk .hb span{background:rgba(250,247,242,.9)}
      .C{padding:0 18px}.CN{padding:0 18px}
      section{padding:64px 0}
      .home-section{padding:62px 0}
      .home-quiet-hero{display:flex;flex-direction:column;padding:calc(var(--nav) + 12px) 18px 28px;gap:16px;min-height:100svh;background:linear-gradient(155deg,#FAF7F2 0%,#F4EEE6 68%,#EDE2D5 100%)}
      .home-quiet-hero::before,.home-quiet-hero::after{display:none}
      .home-portrait-frame{position:relative;order:1;width:100%;inset:auto;min-height:180px;height:46vw;max-height:230px;border-radius:18px;box-shadow:0 18px 44px rgba(72,57,43,.1);background:#EADFD8}
.home-portrait-frame img{object-fit:cover;object-position:24% 16%}
      .home-portrait-frame::after{background:linear-gradient(to top,rgba(250,247,242,.16),transparent 24%)}
      .home-hero-copy{order:2;width:100%;max-width:100%;margin:0;padding:0;z-index:1}
      .home-eyebrow{font-size:11px;letter-spacing:.1em;line-height:1.7;margin-bottom:12px;color:#5C524A}
      .home-hero-title{font-size:32px;line-height:1.36;margin-bottom:14px}
      .home-hero-body{font-size:15px;line-height:1.85;color:#4E4741;margin-bottom:18px}
      .home-hero-actions{flex-direction:column;align-items:stretch;gap:12px}
      .home-secondary-btn{width:100%;text-align:center}
      .home-intro{margin-bottom:34px;text-align:left}
      .home-intro-kicker{font-size:12px;letter-spacing:.24em}
      .home-section-title{font-size:28px;line-height:1.55}
      .home-section-copy{font-size:16px;line-height:2;margin-top:16px}
      .home-scenario-grid{display:flex;overflow-x:auto;gap:16px;padding:0 18px 10px;margin:0 -18px;scroll-snap-type:x mandatory}
      .home-scenario-card{min-width:84vw;border-radius:18px;scroll-snap-align:start}
      .home-scenario-img{height:62vw;min-height:240px}
      .home-scenario-text{padding:26px 24px 30px}
      .home-card-title{font-size:22px;line-height:1.55}
      .home-card-copy{font-size:16px;line-height:2;color:#4E4741}
      .home-split,.home-split.reverse{grid-template-columns:1fr;gap:32px}
      .home-split-copy{max-width:100%}
      .home-report-panel .home-split{gap:22px}
      .home-report-panel .home-split-copy{transform:none}
      .home-large-title{font-size:28px;line-height:1.62;margin-bottom:22px}
      .home-body-lines{gap:12px;margin-bottom:26px}
      .home-body-lines p{font-size:16px;line-height:2;color:#4E4741}
      .home-focus-row{gap:10px}
      .home-focus-pill{font-size:13px;padding:9px 15px}
      .home-image-card{border-radius:18px}
      .home-start-grid{grid-template-columns:1fr;gap:16px}
      .home-start-card{min-height:auto;padding:22px 22px;border-radius:18px}
      .home-start-title{font-size:20px}
      .home-start-card p{font-size:15px !important;line-height:1.75 !important;color:#4E4741;margin-bottom:16px}
      .home-start-card button{width:100%;align-self:stretch}
      .home-v2-quote{padding:88px 22px}
      .home-v2-quote-main{font-size:27px}
      .home-v2-quote-sub{font-size:20px}
      .home-v2-testimonial-grid{grid-template-columns:1fr;gap:14px;margin-top:32px}
      .home-v2-testimonial{padding:24px 24px;border-radius:16px}
      .home-v2-testimonial p{font-size:16px;line-height:1.95}
      .home-v2-faq .home-intro{text-align:left}
      .home-v2-faq .fqq{font-size:17px;line-height:1.7}
      .home-v2-faq .fqa{font-size:16px}
      .home-v2-final{padding:96px 22px}
      .home-v2-final h2{font-size:29px}
      .home-v2-final p{font-size:19px;margin:28px 0 34px}
      .footer-main{grid-template-columns:1fr !important;gap:32px !important;margin-bottom:40px !important}
      .about-new-hero{min-height:auto;padding:calc(var(--nav) + 24px) 0 64px}
      .about-new-hero-grid{padding:0 18px;grid-template-columns:1fr;gap:34px}
      .about-new-hero-copy{order:2}
      .about-new-hero-photo{order:1;height:108vw;max-height:520px;min-height:340px;border-radius:18px}
      .about-new-hero-photo img{object-position:48% center}
      .about-new-kicker{font-size:11px;margin-bottom:16px}
      .about-new-title{font-size:35px;margin-bottom:22px}
      .about-new-lead{font-size:20px;line-height:1.85;margin-bottom:30px}
      .about-new-section{padding:76px 0}
      .about-new-inner{padding:0 18px}
      .about-new-story h2{font-size:29px;line-height:1.7;margin-bottom:28px}
      .about-new-story-copy{grid-template-columns:1fr;gap:14px}
      .about-new-story-copy p{font-size:16px;line-height:2.05}
      .about-new-section-head{text-align:left;margin-bottom:32px}
      .about-new-section-head h2{font-size:29px}
      .about-new-card-grid{grid-template-columns:1fr;gap:14px}
      .about-new-card{min-height:auto;padding:30px 26px;border-radius:16px}
      .about-new-card-num{margin-bottom:18px}
      .about-new-card h3{font-size:22px}
      .about-new-card p{font-size:16px}
      .about-new-work{grid-template-columns:1fr;gap:34px}
      .about-new-work-photo{height:112vw;max-height:540px;border-radius:18px}
      .about-new-work-photo img{object-position:45% center;transform:scale(1.04)}
      .about-new-work-copy h2{font-size:29px;margin-bottom:22px}
      .about-new-work-copy p{font-size:16px;line-height:2.05}
      .about-new-work-list div{font-size:17px}
      .about-new-start-card{min-height:auto;padding:30px 26px}
      .about-new-start-card button{width:100%;align-self:stretch}
      .about-new-closing{padding:76px 22px}
      .about-new-closing p{font-size:27px}
      .frequency-hero{min-height:auto;padding:calc(var(--nav) + 64px) 18px 78px}
      .frequency-title{font-size:52px}
      .frequency-lead{font-size:16px;line-height:2.05}
      .frequency-tags{gap:8px}
      .frequency-tag{font-size:12px;padding:7px 13px}
      .frequency-section{padding:76px 0}
      .frequency-inner{padding:0 18px}
      .frequency-heading{font-size:29px}
      .frequency-principle{min-height:590px;margin:34px -18px 0;padding:38px 36px 245px;align-items:flex-start}
      .frequency-principle::before{background-position:center 66%;background-size:cover;transform:scale(1.04);-webkit-mask-image:linear-gradient(180deg,#000 0%,#000 78%,transparent 100%);mask-image:linear-gradient(180deg,#000 0%,#000 78%,transparent 100%)}
      .frequency-principle::after{background:linear-gradient(180deg,rgba(247,243,237,.98) 0%,rgba(247,243,237,.95) 47%,rgba(247,243,237,.72) 61%,rgba(247,243,237,.12) 86%,rgba(247,243,237,.03) 100%)}
      .frequency-principle-copy p{font-size:16px;line-height:2.05}
      .frequency-support-grid{gap:0;margin:30px -18px 0;border-radius:0}
      .frequency-support-card{padding:34px 24px;border-right:0;border-bottom:1px solid var(--div)}
      .frequency-support-card-mark{margin-bottom:18px}
      .frequency-support-card p{font-size:16px;line-height:2}
      .frequency-timeline{padding:28px 22px}
      .frequency-timeline::before{left:43px;top:72px;bottom:50px}
      .frequency-timeline-label{margin-left:58px}
      .frequency-timeline-step{padding:20px 0 20px 58px}
      .frequency-timeline-step::before{width:34px;height:34px;top:22px;font-size:13px}
      .frequency-feature-grid{grid-template-columns:1fr;gap:12px;margin-top:30px}
      .frequency-feature{min-height:auto;padding:28px 24px}
      .frequency-feature p{font-size:15px;line-height:1.9}
      .frequency-highlight{margin-top:36px;padding:34px 24px}
      .frequency-app-hint{display:block;margin-top:20px;font-size:12px;letter-spacing:.16em;color:var(--wg)}
      .frequency-app-list{display:grid;grid-template-columns:none;grid-auto-flow:column;grid-auto-columns:minmax(246px,72vw);gap:14px;margin-top:18px;overflow-x:auto;scroll-snap-type:x mandatory;padding:0 18px 16px;margin-left:-18px;margin-right:-18px;scrollbar-width:none}
      .frequency-app-list::-webkit-scrollbar{display:none}
      .frequency-app{min-height:0;display:flex;scroll-snap-align:center}
      .frequency-app-image{height:auto;min-height:0;aspect-ratio:1/1}
      .frequency-app-copy{padding:18px 18px 22px}
      .frequency-app-number{font-size:11px;margin-bottom:4px}
      .frequency-app-title{font-size:18px;margin-bottom:7px}
      .frequency-app-rule{margin-bottom:8px}
      .frequency-app-copy p{font-size:14px;line-height:1.75;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
      .frequency-faq{margin-top:30px}
      .frequency-faq-button{font-size:17px;line-height:1.7}
      .frequency-faq-answer{font-size:16px;line-height:2}
      .frequency-note{font-size:15px;padding:22px 20px}
      .frequency-cta-inner{padding:88px 18px 96px}
      .frequency-cta p{font-size:16px;line-height:2}
      .hero{grid-template-columns:1fr;min-height:auto;display:flex;flex-direction:column}
      .hl{padding:48px 18px 48px;align-items:flex-start;order:2}
      .htit{font-size:34px}.hbo{font-size:16px;max-width:100%;margin-bottom:36px;color:#4E4741;line-height:2.05}
      .hr{order:1;height:90vw;max-height:460px;min-height:300px}
      .hri img{object-position:20% center}
      .hov{background:linear-gradient(to bottom,rgba(250,247,242,0) 60%,var(--w) 100%) !important}
      .hray,.hsc{display:none}
      .hac{flex-direction:column;align-items:stretch;gap:14px}
      .bp{text-align:center;padding:16px 20px}.bg{padding:12px 0}
      .si{grid-template-columns:1fr;padding:0 18px}
      .pil{padding:24px 0;border-right:none;border-bottom:1px solid rgba(255,255,255,.09)}
      .pil:first-child{padding-left:0}.pil:last-child{border-bottom:none}
      .pi{grid-template-columns:1fr;gap:40px;padding:0 18px}
      .pvis{height:240px}
      .pv1{width:140px;height:190px;left:0}.pv2{width:170px;height:130px;right:0}
      .pvq{max-width:175px;font-size:12px;padding:14px 16px}
      .tiers{grid-template-columns:1fr}.tier{padding:44px 18px}
      .ctab{padding:68px 18px}.ctab-t{font-size:28px}.ctab-x{font-size:16px;color:#4E4741;line-height:2}
      .ab-hero{grid-template-columns:1fr}
      .ab-l{padding:calc(var(--nav) + 48px) 18px 48px}
      .ab-r{min-height:90vw;max-height:440px}
      .two{grid-template-columns:1fr;gap:24px}
      .slb2{border-top:none;border-bottom:1px solid var(--div);padding-bottom:7px;margin-bottom:4px}
      .mem-h{padding:calc(var(--nav) + 48px) 18px 68px}.mh-t{font-size:32px}.mh-x{font-size:16px;color:rgba(250,247,242,.82);line-height:2}
      .ben{grid-template-columns:1fr}.bi{padding:34px 18px}
      .prs{grid-template-columns:1fr;max-width:340px;margin:36px auto 0}
      .adv-h{padding:calc(var(--nav) + 48px) 0 68px}
      .core-sentence{padding:40px 18px}
      .deep-h{padding:calc(var(--nav) + 48px) 0 68px}
      .dg{grid-template-columns:1fr}.dwi{padding:26px 18px}
      .art-h{padding:calc(var(--nav) + 36px) 0 56px}
      .art-r{grid-template-columns:1fr;gap:8px;padding:28px 0}
      .art-d{display:none}.art-tg{align-self:auto}
      .art-cta{padding:40px 18px}
      .msample-grid{grid-template-columns:1fr !important}
      .apl-h{padding:calc(var(--nav) + 48px) 18px 68px}.apl-t{font-size:30px}.apl-x{font-size:16px;color:rgba(250,247,242,.82);line-height:2}
      .fg{grid-template-columns:1fr}.fgp.ful{grid-column:auto}.fsb{width:100%;padding:16px}
      .fti{padding:0 18px}
      .ftt{grid-template-columns:1fr;gap:36px;padding-bottom:36px}
      .fb{flex-direction:column;align-items:flex-start}
      .slb::before{width:24px}
      .fs{grid-template-columns:60px 1fr;gap:20px}
      .page .slb{font-size:16px !important;letter-spacing:.16em !important;color:#4A433D !important;margin-bottom:34px !important;line-height:1.7 !important}
      .page .slb::before{width:46px !important;background:#B8A882 !important}
      p,.cx,.ptx,.tier-tx,.art-x,.fsx,.fqa,.chkt,.testi-text{font-size:16px !important;color:#4E4741 !important;line-height:2 !important}
      .tier-tit,.art-t,.fst,.ct,.dt{color:#2C2825 !important}
      .px,.bx,.fd,.ful2 li,.fc{color:rgba(250,247,242,.72) !important}
      .home-compare-label{font-size:16px !important;letter-spacing:.16em !important}
      .home-cta-text{color:#FFFFFF !important;font-size:24px !important;line-height:1.8 !important}
      .home-tool-link{font-size:16px !important;letter-spacing:.08em !important;color:var(--forest) !important}
      .tone-panel{padding:58px 22px !important}
      .subscribe-start-hero{padding:96px 0 58px !important}
      .subscribe-start-tone{padding:42px 22px !important}
      .apply-tone{padding:28px 22px !important}
      .apply-tone .tone-kicker{margin-bottom:10px !important}
      .apply-tone .tone-text{font-size:19px !important;line-height:1.65 !important}
      .apply-tone .tone-sub{font-size:14px !important;line-height:1.75 !important;margin-top:10px !important}
      .apply-form-section{padding-top:6px !important;padding-bottom:64px !important}
      .tone-kicker{font-size:14px !important;letter-spacing:.22em !important}
      .tone-text{font-size:24px !important;line-height:1.85 !important;text-wrap:balance}
      .tone-sub{font-size:16px !important;color:rgba(250,247,242,.72) !important}
      .dark-hero{background:linear-gradient(145deg,#385B4C 0%,#315143 48%,#24211E 100%) !important}
      .dark-hero .hero-kicker{font-size:14px !important;letter-spacing:.22em !important;color:rgba(232,223,208,.72) !important}
      .dark-hero h1{color:#F5EFE4 !important;text-shadow:0 1px 14px rgba(0,0,0,.12)}
      .dark-hero p{font-size:17px !important;color:rgba(250,247,242,.82) !important;line-height:2.05 !important;max-width:100% !important}
      .deep-entry-cta{padding:78px 0 !important}
      .deep-entry-kicker{font-size:14px !important;letter-spacing:.22em !important;color:rgba(232,223,208,.76) !important}
      .deep-entry-main{font-size:24px !important;color:#F5EFE4 !important;line-height:1.85 !important}
      .deep-entry-sub{font-size:17px !important;color:rgba(250,247,242,.78) !important;line-height:2 !important}
      .num-insight-panel{grid-template-columns:1fr !important;padding:20px !important;gap:12px !important}
      .num-insight-card{padding:22px 20px !important}
      .num-insight-card p{font-size:17px !important;color:rgba(250,247,242,.84) !important;line-height:1.95 !important}
      .num-result-cta{padding:52px 22px !important}
      .num-cta-kicker{font-size:14px !important;letter-spacing:.24em !important;color:rgba(232,223,208,.76) !important}
      .num-cta-text{font-size:24px !important;color:#F5EFE4 !important;line-height:1.85 !important}
      .num-cta-actions{flex-direction:column !important;align-items:stretch !important}
      .num-cta-actions .bp{width:100% !important}
      .num-mini-label{font-size:14px !important;color:var(--forest) !important;background:rgba(58,92,76,.12) !important;letter-spacing:.12em !important;line-height:1.4 !important}
      .num-section-title{font-size:30px !important;color:#2C2825 !important;margin-bottom:22px !important;gap:14px !important}
      .num-section-title::before{width:44px !important;background:#B8A882 !important}
      .num-section-title span{font-size:14px !important;color:var(--forest) !important}
      .deep-fit-grid{grid-template-columns:1fr !important;gap:14px !important}
      .deep-fit-card{padding:34px 26px !important}
      .deep-fit-card p{font-size:18px !important;line-height:1.9 !important;text-wrap:pretty !important}
      .about-ability-panel{padding:46px 28px !important}
      .about-ability-title{font-size:24px !important;color:#F5EFE4 !important;line-height:1.85 !important}
      .about-ability-row span:first-child{color:#D8C9A5 !important}
      .about-ability-row span:last-child{font-size:17px !important;color:rgba(250,247,242,.84) !important;line-height:1.9 !important}
      .ongoing-ways-grid{grid-template-columns:1fr !important;gap:14px !important}
      .ongoing-way-card{padding:34px 26px !important}
      .ongoing-way-card p{font-size:17px !important;line-height:1.9 !important;text-wrap:pretty !important}
      .ongoing-way-card button{width:100% !important;font-size:15px !important}
      .green-cta{padding:70px 0 !important}
      .green-cta-kicker{font-size:14px !important;color:rgba(232,223,208,.76) !important}
      .green-cta-price{font-size:48px !important;color:#F5EFE4 !important}
      .green-cta-meta{font-size:15px !important;color:rgba(250,247,242,.68) !important;line-height:1.8 !important}
      .green-cta-title{font-size:24px !important;color:#F5EFE4 !important;line-height:1.85 !important}
      .green-cta-text{font-size:17px !important;color:rgba(250,247,242,.82) !important;line-height:2 !important}
      .green-cta-actions{flex-direction:column !important;align-items:stretch !important}
      .green-cta-actions .bp{width:100% !important}
      .num-date-grid{grid-template-columns:1fr 1fr !important;gap:16px 14px !important}
      .num-date-grid>div:first-child{grid-column:1/-1 !important}
      .num-date-grid label{white-space:nowrap !important;font-size:14px !important;letter-spacing:.1em !important}
      .num-rel-panel{padding:28px 22px !important}
      .num-guide-grid,.num-lunar-grid{grid-template-columns:1fr !important;gap:18px !important}
      .num-guide-panel{padding:32px 24px !important}
      .num-lunar-grid>div{padding:20px 22px !important}
      .num-lunar-grid p{font-size:17px !important;line-height:1.9 !important;text-wrap:pretty !important}
      .num-birthday-panel{grid-template-columns:1fr !important;gap:12px !important}
      .num-birthday-card{padding:20px 22px !important}
      .num-birthday-date{font-size:19px !important}
      .subscribe-hero-title{font-size:36px !important;line-height:1.45 !important}
      .subscribe-hero-copy{font-size:22px !important;line-height:1.9 !important;color:rgba(250,247,242,.84) !important}
      .subscribe-inner{padding:68px 24px !important}
      .subscribe-copy{font-size:20px !important;line-height:2 !important}
      .subscribe-copy p{margin-bottom:18px !important}
      .subscribe-copy .gap{height:10px !important}
      .subscribe-list-item{font-size:17px !important;line-height:1.9 !important;padding:20px 22px !important}
      .subscribe-preview{margin:30px 0 28px !important}
      .subscribe-preview-caption{font-size:17px !important;line-height:1.85 !important;padding:20px 22px !important}
      .subscribe-test-hero{padding:104px 0 72px}
      .subscribe-test-title{font-size:34px;line-height:1.52}
      .subscribe-test-copy{font-size:16px;line-height:2;color:#F5EFE4!important;text-shadow:0 1px 18px rgba(0,0,0,.22)}
      .subscribe-test-section{padding:74px 0}
      .subscribe-test-head{text-align:left;margin-bottom:34px;padding:0 18px}
      .subscribe-test-head h2{font-size:29px}
      .subscribe-test-head p{font-size:16px}
      .subscribe-test-plans{grid-template-columns:1fr;gap:16px;padding:0 18px}
      .subscribe-test-card{min-height:auto;border-radius:18px;padding:28px 24px}
      .subscribe-test-card h3{font-size:23px}
      .subscribe-test-price{font-size:42px}
      .subscribe-test-description{font-size:16px;line-height:1.95}
      .subscribe-test-features li{font-size:15px;line-height:1.75}
      .subscribe-test-preview-grid{padding:0 18px;gap:20px}
      .subscribe-test-final{padding:86px 18px}
      .register-plan-grid{grid-template-columns:1fr}
      .register-plan-option{padding:18px 16px}
      .subscribe-start-title{font-size:32px !important;line-height:1.55 !important}
      .subscribe-start-copy{font-size:19px !important;line-height:2 !important;color:rgba(250,247,242,.88) !important}
      .short-hero{padding:112px 0 70px !important}
      .short-title{font-size:34px !important;line-height:1.5 !important}
      .short-copy{font-size:19px !important;line-height:1.95 !important}
      .short-inner{padding:64px 24px !important}
      .short-body{font-size:19px !important;line-height:1.95 !important}
      .short-stats,.short-cards{grid-template-columns:1fr !important;gap:12px !important;background:transparent !important}
      .short-stat,.short-card{padding:24px 22px !important}
      .short-dashboard{padding:26px 18px !important}
      .short-radar-label{font-size:17px !important}
      .short-radar-value{font-size:31px !important}
      .short-price{padding:64px 24px !important}
      .thanks-title{font-size:25px !important;line-height:1.55 !important;margin-bottom:20px !important}
      .thanks-copy{font-size:15px !important;line-height:1.85 !important;gap:12px !important}
      .thanks-line-copy{font-size:15px !important;line-height:1.85 !important}
      .form-question label{font-size:17px !important;letter-spacing:.06em !important;color:#2C2825 !important;line-height:1.85 !important}
      .form-question-note{font-size:15px !important;color:#655B52 !important;line-height:1.9 !important}

      /* HOME HERO */
      .home-hero{flex-direction:column !important;align-items:stretch !important;min-height:auto !important}
      .home-photo{position:relative !important;top:auto !important;right:auto !important;left:auto !important;width:100% !important;height:104vw !important;max-height:560px !important;min-height:390px !important;margin-top:var(--nav) !important;background:#F3E8E2 !important}
      .home-photo img{object-position:22% top !important;filter:contrast(1.06) saturate(1.05) brightness(1.02)}
      .home-photo>div{opacity:.22 !important}
      .home-text{padding:36px 18px 56px !important}
      .home-text>div{max-width:100% !important}
      .home-text h1{font-size:34px !important;line-height:1.35 !important;color:#2C2825 !important}
      .home-text p{font-size:17px !important;color:#4A433D !important;line-height:2.05 !important}
      .home-compare{grid-template-columns:1fr !important}
      .home-results{grid-template-columns:1fr !important;gap:1px !important;background:rgba(250,247,242,.18) !important}
      .home-results>div{padding:30px 24px !important;background:var(--forest) !important;min-height:0 !important;display:grid !important;grid-template-columns:52px minmax(72px,.45fr) 1fr !important;grid-template-rows:auto !important;gap:14px !important;align-items:center !important;justify-items:start !important}
      .home-results>div>div:nth-child(1){font-size:28px !important;color:rgba(250,247,242,.9) !important;margin-bottom:0 !important;line-height:1 !important;display:flex !important;align-items:center !important}
      .home-results>div>div:nth-child(2){font-size:20px !important;color:#FFFFFF !important;margin-bottom:0 !important;line-height:1.35 !important;display:flex !important;align-items:center !important}
      .home-results>div>div:nth-child(3){font-size:15px !important;color:rgba(250,247,242,.86) !important;line-height:1.75 !important;max-width:none !important;text-align:left !important;text-wrap:pretty !important}
      .home-tools{grid-template-columns:1fr !important}
      .testi-grid{grid-template-columns:1fr !important}

      /* ABOUT HERO */
      .about-hero{min-height:680px !important;padding-top:var(--nav) !important;justify-content:flex-end !important;background:#F0E4E0 !important}
      .about-hero-photo{position:absolute !important;inset:0 !important;width:100% !important;height:100% !important;margin-top:0 !important}
      .about-hero-photo img{width:100% !important;max-width:none !important;object-position:left top !important;transform:scaleX(-1) !important;filter:contrast(1.08) saturate(1.04)}
      .about-hero-photo>div:first-of-type{background:linear-gradient(105deg,rgba(18,16,15,.82) 0%,rgba(24,22,20,.74) 22%,rgba(32,29,27,.48) 42%,rgba(44,40,37,.18) 60%,transparent 78%) !important}
      .about-hero-photo>div:last-of-type{background:radial-gradient(ellipse 115% 72% at 0% 90%,rgba(18,16,15,.72) 0%,rgba(28,25,23,.5) 34%,rgba(44,40,37,.22) 58%,transparent 84%) !important}
      .about-text{position:relative !important;z-index:1 !important;padding:calc(var(--nav) + 46px) 18px 58px !important;background:transparent !important;margin:0 !important}
      .about-text>div{max-width:310px !important}
      .about-text h1{color:var(--sand) !important}
      .about-text p{font-size:17px !important;color:rgba(250,247,242,.88) !important;line-height:2.05 !important}
      .about-text div[style*="background"]{background:rgba(232,223,208,.4) !important}
      section:nth-of-type(2) > .CN > .fi:first-child > p{color:#FFFFFF !important}

      /* MOBILE TYPE SCALE */
      body{font-size:16px}
      .page section :is(p,li,label,input,select,textarea,button){font-size:17px !important;line-height:1.9 !important}
      .page section :is(h1,.htit){font-size:clamp(30px,8vw,42px) !important;line-height:1.45 !important}
      .page section :is(h2,h3){font-size:clamp(22px,6vw,30px) !important;line-height:1.55 !important}
      .page section [style*="font-size: 11px"],
      .page section [style*="font-size: 12px"]{font-size:15px !important}
      .page section [style*="font-size: 13px"],
      .page section [style*="font-size: 14px"],
      .page section [style*="font-size: 15px"]{font-size:17px !important}
      .page section [style*="font-size: 16px"]{font-size:17px !important}
      .page section [style*="font-size: 17px"]{font-size:17px !important}
      .page section .slb,
      .page section .slb2,
      .page section [style*="letter-spacing: 0.25em"]{font-size:16px !important;line-height:1.7 !important}
      .page section .bp,
      .page section .bg,
      .page section .fsb,
      .page section .pb{font-size:16px !important;line-height:1.5 !important}
      .page section :is(p,span,div,a){text-wrap:pretty}
      .page section .CN,
      .page section .C{max-width:100% !important}
      .page section .CN>div[style*="padding: 52px 56px"],
      .page section .CN>div[style*="padding:52px 56px"]{padding:40px 24px !important}
      .page section .CN>div[style*="padding: 40px 56px"],
      .page section .CN>div[style*="padding:40px 56px"]{padding:32px 24px !important}
      .page section div[style*="display: flex"][style*="gap: 16px"],
      .page section div[style*="display:flex"][style*="gap:\"16px\""]{gap:12px !important}
      .page section div[style*="display: flex"][style*="gap: 28px"],
      .page section div[style*="display:flex"][style*="gap:\"28px\""]{gap:14px !important}
      .page section div[style*="display: flex"] > span:last-child,
      .page section div[style*="display:flex"] > span:last-child{font-size:17px !important;line-height:1.85 !important;min-width:0;text-wrap:balance}
      .page section div[style*="background: var(--forest)"] p,
      .page section div[style*="background:var(--forest)"] p{text-wrap:balance}
      footer .C>div:first-child{grid-template-columns:1fr !important;gap:34px !important;margin-bottom:44px !important}
      footer a{font-size:16px !important;line-height:1.7 !important;display:block !important;width:max-content !important;max-width:100% !important}
      footer p,
      footer .C>div:last-child>div{font-size:15px !important;line-height:1.9 !important}

      /* MOBILE CARD LAYOUTS */
      .start-pricing-grid,
      .aware-tools-grid{grid-template-columns:1fr !important;gap:16px !important}
      .start-plan-card,
      .aware-tool-card{padding:32px 26px !important;text-align:left !important}
      .start-plan-card{display:grid !important;grid-template-columns:1fr auto !important;column-gap:18px !important;align-items:start !important}
      .start-plan-card .plan-meta{grid-column:1 !important}
      .start-plan-card .plan-price{grid-column:2 !important;grid-row:1 / span 2 !important;text-align:right !important;font-size:32px !important;white-space:nowrap !important;margin:0 !important}
      .start-plan-card .plan-desc{grid-column:1 / -1 !important;font-size:16px !important;line-height:1.85 !important;margin:18px 0 22px !important;text-wrap:pretty}
      .start-plan-card .plan-button{grid-column:1 / -1 !important;width:100% !important;white-space:normal !important}
      .start-plan-card .plan-badge{position:static !important;transform:none !important;display:inline-block !important;margin-bottom:12px !important}
      .aware-tool-card{border-left:3px solid var(--sandm) !important;border-top:none !important}
      .aware-tool-card p{margin-bottom:22px !important;text-wrap:pretty}
      .aware-tool-card .aware-tool-link{font-size:16px !important;letter-spacing:.08em !important}
      .aware-next-step{padding:46px 24px !important}
      .aware-next-step .aware-next-label{font-size:15px !important;color:rgba(250,247,242,.68) !important}
      .aware-next-step p{color:#FFFFFF !important;font-size:18px !important;line-height:1.9 !important;text-wrap:pretty}
      .site-footer{background:linear-gradient(155deg,#171412 0%,#25211D 42%,#2D3F35 100%) !important}
      .site-footer::before{content:"";position:absolute;inset:0;background:radial-gradient(ellipse 85% 60% at 100% 0%,rgba(184,168,130,.12),transparent 62%);pointer-events:none}
      .site-footer>.C{position:relative;z-index:1}
      .site-footer .footer-brand{color:#E8DFD0 !important}
      .site-footer .footer-tagline{color:#B8A882 !important}
      .site-footer .footer-copy{color:#C7BBAE !important}
      .site-footer .footer-heading{color:#B8A882 !important}
      .site-footer a{color:#D4C8B5 !important}
      .site-footer .footer-bottom{border-top-color:rgba(250,247,242,.18) !important}
      .site-footer .footer-bottom div{color:rgba(250,247,242,.5) !important}
    }
    @media(max-width:390px){
      .htit{font-size:28px}.mh-t{font-size:26px}.ctab-t{font-size:24px}.apl-t{font-size:24px}
    }

    /* UNIFIED SITE TYPE SCALE */
    .home-hero-title,
    .frequency-title,
    .subscribe-hero-title,
    .short-title,
    .about-text h1{
      font-size:var(--type-display) !important;
      line-height:var(--leading-display) !important;
      letter-spacing:0 !important;
    }
    .htit,
    .mh-t,
    .apl-t,
    .subscribe-start-title,
    .thanks-title,
    .about-new-title,
    .dark-hero h1{
      font-size:var(--type-page) !important;
      line-height:1.48 !important;
      letter-spacing:0 !important;
    }
    .home-section-title,
    .home-large-title,
    .frequency-heading,
    .about-new-story h2,
    .about-new-section-head h2,
    .about-new-work-copy h2,
    .ctab-t,
    .num-section-title,
    .green-cta-title,
    .short-price h2,
    .tone-text{
      font-size:var(--type-section) !important;
      line-height:var(--leading-heading) !important;
      letter-spacing:0 !important;
    }
    .home-card-title,
    .home-start-title,
    .about-new-card h3,
    .about-new-start-card h3,
    .frequency-app-title,
    .tier-tit,
    .ct,
    .short-card h3,
    .subscribe-copy,
    .deep-entry-main,
    .num-cta-text,
    .about-ability-title{
      font-size:var(--type-card) !important;
      line-height:1.65 !important;
      letter-spacing:0 !important;
    }
    .home-hero-body,
    .home-section-copy,
    .home-card-copy,
    .home-body-lines p,
    .home-start-card p,
    .about-new-story-copy p,
    .about-new-card p,
    .about-new-work-copy p,
    .frequency-lead,
    .frequency-principle-copy p,
    .frequency-faq-answer,
    .frequency-cta p,
    .hbo,
    .mh-x,
    .apl-x,
    .ptx,
    .tier-tx,
    .cx,
    .fsx,
    .art-x,
    .art-cta p,
    .testi-text,
    .subscribe-hero-copy,
    .subscribe-start-copy,
    .subscribe-list-item,
    .short-copy,
    .short-body,
    .green-cta-text,
    .deep-entry-sub,
    .num-insight-card p,
    .about-ability-row span:last-child,
    .ongoing-way-card p,
    .thanks-copy,
    .thanks-line-copy{
      font-size:var(--type-body) !important;
      line-height:var(--leading-body) !important;
      letter-spacing:0 !important;
    }
    .slb,
    .slb2,
    .home-eyebrow,
    .home-intro-kicker,
    .about-new-kicker,
    .frequency-eyebrow,
    .frequency-label,
    .short-kicker,
    .tone-kicker,
    .hero-kicker,
    .deep-entry-kicker,
    .num-cta-kicker,
    .green-cta-kicker{
      font-size:var(--type-small) !important;
      line-height:1.7 !important;
    }
    .page :is(.bp,.bg,.pb,.fsb,.home-secondary-btn,.about-new-link){
      font-size:14px !important;
      line-height:1.5 !important;
    }
    .page :is(p,li,label,input,select,textarea,button){
      text-wrap:pretty;
    }

    @media(max-width:768px){
      :root{
        --type-display:36px;
        --type-page:32px;
        --type-section:27px;
        --type-card:21px;
        --type-body:16px;
        --type-small:13px;
        --leading-display:1.42;
        --leading-heading:1.58;
        --leading-body:1.95;
      }
      body{font-size:16px}
      .home-hero-title{
        line-height:1.3 !important;
      }
      .page .home-hero-body{
        line-height:1.75 !important;
      }
      .page section :is(p,li,label,input,select,textarea){
        font-size:var(--type-body) !important;
        line-height:var(--leading-body) !important;
      }
      .page .slb{
        font-size:var(--type-small) !important;
        letter-spacing:.16em !important;
      }
      .home-results>div>div:nth-child(2){
        font-size:19px !important;
      }
      .home-results>div>div:nth-child(3){
        font-size:14px !important;
        line-height:1.75 !important;
      }
      .green-cta-price{
        font-size:44px !important;
      }
      .short-price .amount{
        font-size:54px !important;
      }
      .thanks-copy,
      .thanks-line-copy{
        font-size:15px !important;
        line-height:1.9 !important;
      }
      .page :is(.bp,.bg,.pb,.fsb,.home-secondary-btn,.about-new-link){
        font-size:15px !important;
      }
    }
  `}</style>
);

/* ─── UTILS ─────────────────────────────────────────────────────── */
function useFade() {
  useEffect(() => {
    const t = setTimeout(() => {
      const els = document.querySelectorAll(".fi");
      const ob = new IntersectionObserver(
        es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add("v"); }),
        { threshold: 0.07 }
      );
      els.forEach(el => ob.observe(el));
      return () => ob.disconnect();
    }, 60);
    return () => clearTimeout(t);
  }, []);
}

function Faq({ q, a }) {
  const [o, setO] = useState(false);
  return (
    <div className="fq">
      <div className="fqq" onClick={() => setO(!o)}>
        {q}
        <span className="fqi" style={{ transform: o ? "rotate(45deg)" : "" }}>+</span>
      </div>
      <div className={"fqa" + (o ? " op" : "")} style={{ maxHeight: o ? "300px" : "0" }}>{a}</div>
    </div>
  );
}

/* ─── NAV ────────────────────────────────────────────────────────── */
const NI = [
  { l: "首頁",           p: "home" },
  { l: "開始這一步",     p: "start" },
  { l: "陪跑計畫",       p: "deep" },
  { l: "自我覺察",       p: "aware" },
  { l: "關於 Sofia",     p: "about" },
  { l: "文章與個案分享", p: "art" },
];

function Nav({ cur, go }) {
  const [sc, setSc] = useState(false);
  const [mob, setMob] = useState(false);
  useEffect(() => {
    const fn = () => setSc(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const nav = p => { go(p); setMob(false); };
  return (
    <>
      <nav className={[sc || mob ? "sc" : "", !sc && !mob && ["subscribe","subscribeTest","subscribeStart","register","thanks","subscribeThanks","deep","apply","about","short","frequency"].includes(cur) ? "dk" : ""].filter(Boolean).join(" ")}>
        <div className="nl" onClick={() => nav("home")}>
          Sofia
          <span>情緒穩定 × 關係覺察 × 內在主導權</span>
        </div>
        <ul className="nm">
          {NI.map(i => <li key={i.p} className={cur === i.p ? "on" : ""} onClick={() => nav(i.p)}>{i.l}</li>)}
        </ul>
        <button className="nc" onClick={() => nav("apply")}>預約</button>
        <button className={"hb" + (mob ? " op" : "")} onClick={() => setMob(!mob)} aria-label="選單">
          <span /><span /><span />
        </button>
      </nav>
      <div className={"mo" + (mob ? " op" : "")}>
        <ul>
          {NI.map(i => <li key={i.p} onClick={() => nav(i.p)}>{i.l}</li>)}
        </ul>
        <div className="mo-ft">Sofia — 蘇菲療癒轉化</div>
      </div>
    </>
  );
}

/* ─── HOME ───────────────────────────────────────────────────────── */
function Home({ go }) {
  useFade();
  const starts = [
    {
      t: <>我只是想知道，<br/>自己最近怎麼了</>,
      x: <>適合最近一直內耗，<br/>想重新理解自己的人</>,
      btn: "看見現在的自己",
      p: "aware",
    },
    {
      t: <>我想讓生活，<br/>慢慢回到穩定</>,
      x: <>把理解自己，<br/>變成生活的一部分</>,
      btn: "了解每月陪伴",
      p: "subscribe",
    },
    {
      t: <>我準備好，<br/>面對真正重要的自己</>,
      x: <>願意看見核心議題，<br/>希望有人陪自己走一段路</>,
      btn: "了解深度陪伴",
      p: "deep",
    },
  ];
  const testimonials = TESTIMONIALS;

  return (
    <div className="page home-shell">
      <section className="home-quiet-hero">
        <div className="home-hero-copy">
          <div className="home-eyebrow fi">情緒穩定 × 關係覺察 × 內在主導權</div>
          <h1 className="home-hero-title fi">你不是想太多<br/>你只是一直在撐</h1>
          <p className="home-hero-body fi">
            陪你理解那些說不出口的情緒，<br/>
            重新找回自己的力量
          </p>
          <div className="home-hero-actions fi">
            <button className="bp" onClick={() => go("apply")}>預約初談</button>
          </div>
        </div>
        <div className="home-portrait-frame fi">
          <img src={PHOTO} alt="Sofia" />
        </div>
      </section>

      <section className="home-section" style={{background:"var(--cream)"}}>
        <div className="C home-split home-v2-story">
          <div className="home-image-card home-work-image fi">
            <img src={HOME_SOFIA_WORK} alt="Sofia 工作照" />
          </div>
          <div className="home-split-copy">
            <h2 className="home-large-title fi">很多人來找我<br/>不是因為人生出了問題<br/>而是因為，<br/>他們已經很久沒有好好理解自己</h2>
            <div className="home-body-lines fi">
              <p>有人困在關係裡</p>
              <p>有人一直責怪自己</p>
              <p>也有人很努力，<br/>卻不知道自己真正想要什麼</p>
              <p>我做的不是給你答案</p>
              <p>而是陪你重新理解自己</p>
            </div>
          </div>
        </div>
      </section>

      <section className="home-section home-report-panel">
        <div className="C home-split reverse">
          <div className="home-image-card fi">
            <img src={HOME_SOUL_REPORT} alt="靈魂狀態紀錄範例" />
          </div>
          <div className="home-split-copy home-report-copy">
            <div className="home-intro-kicker fi">Soul State Report 個人狀態整理</div>
            <h2 className="home-large-title fi">有些感受，<br/>無法用一句話說清楚<br/><br/>但可以慢慢整理，<br/>看懂自己</h2>
            <div className="home-body-lines fi">
              <p>把那些說不清楚的感受、</p>
              <p>反覆出現的模式，</p>
              <p>整理成一份</p>
              <p>看得懂自己的紀錄</p>
            </div>
            <button className="home-secondary-btn fi" onClick={() => go("subscribe")}>看看這份整理</button>
          </div>
        </div>
      </section>

      <section className="home-section" style={{background:"var(--w)"}}>
        <div className="C">
          <div className="home-intro">
            <div className="home-intro-kicker fi">Begin Here</div>
            <h2 className="home-section-title fi">每個人現在需要的，<br/>都不一樣</h2>
            <p className="home-section-copy fi">不用急著找到答案，<br/>先找到最接近你現在狀態的入口</p>
          </div>
          <div className="home-start-grid">
            {starts.map((item, i) => (
              <article className="home-start-card fi" key={i}>
                <div className="home-start-number">0{i + 1}</div>
                <h3 className="home-start-title">{item.t}</h3>
                <p>{item.x}</p>
                <button className="home-secondary-btn" onClick={() => go(item.p)}>{item.btn}</button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-v2-quote">
        <div className="home-v2-quote-main fi">真正的改變，<br/>不是成為另一個人<br/>而是看見那些一直被忽略的自己</div>
      </section>

      <section className="home-section home-v2-testimonials">
        <div className="C">
          <div className="home-intro">
            <div className="home-intro-kicker fi">Their Words</div>
            <h2 className="home-section-title fi">她們這麼說</h2>
          </div>
          <div className="home-v2-testimonial-grid">
            {testimonials.map((item, i) => (
              <article className="home-v2-testimonial fi" key={i}>
                <p>「{item.text}」</p>
                <div className="home-v2-testimonial-meta">
                  <span className="home-v2-testimonial-name">{item.name}</span>
                  <span className="home-v2-testimonial-tag">{item.tag}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section home-v2-faq">
        <div className="C">
          <div className="home-v2-faq-inner">
            <div className="home-intro">
              <div className="home-intro-kicker fi">Questions</div>
              <h2 className="home-section-title fi">開始以前</h2>
              <p className="home-section-copy fi">每個人的答案都不同<br/><br/>但理解自己，<br/>永遠都是開始</p>
            </div>
            <div className="fi">
              <Faq q="我適合嗎？" a={<>如果你長期情緒內耗、<br/>關係疲憊、<br/>不知道自己怎麼了，<br/><br/>都可以從初談開始</>} />
              <Faq q="一次就有效嗎？" a={<>一次談話可以幫助你看見現在的狀態<br/><br/>真正的改變，<br/>通常需要持續理解與練習</>} />
              <Faq q="我不知道怎麼開始？" a={<>那就先從一次初談開始<br/><br/>不用準備好答案，<br/>只需要帶著現在的自己來</>} />
            </div>
          </div>
        </div>
      </section>

      <section className="home-v2-final">
        <h2 className="fi">你不用急著變得更好</h2>
        <p className="fi">先好好理解自己，<br/>就很好</p>
        <button className="bp fi" onClick={() => go("apply")}>預約初談</button>
      </section>
    </div>
  );
}


function About({ go }) {
  useFade();
  const methods = [
    { t: "情緒穩定", x: "理解自己的情緒，而不是一直壓抑。" },
    { t: "關係覺察", x: "重新找到自己在關係中的位置。" },
    { t: "內在主導權", x: "慢慢做出真正適合自己的選擇。" },
  ];
  const starts = [
    { t: "看見自己的狀態", b: "開始探索 →", p: "aware" },
    { t: "建立每月穩定節奏", b: "了解訂閱 →", p: "subscribe" },
    { t: "深度陪跑", b: "申請陪跑 →", p: "deep" },
  ];
  return (
    <div className="page about-new">
      <div className="about-hero" style={{minHeight:"100vh",position:"relative",overflow:"hidden",display:"flex",flexDirection:"column",alignItems:"stretch"}}>
        <div className="about-hero-photo" style={{position:"absolute",inset:0,zIndex:0}}>
          <img src={PHOTO} alt="Sofia" style={{
            width:"100%", height:"100%",
            objectFit:"cover", objectPosition:"right top",
            transform:"scaleX(-1)",
            display:"block",
          }} />
          <div style={{position:"absolute",inset:0,background:"linear-gradient(to right, rgba(44,40,37,0.82) 0%, rgba(44,40,37,0.6) 35%, rgba(44,40,37,0.15) 65%, transparent 100%)"}}/>
          <div style={{position:"absolute",inset:0,background:"linear-gradient(to top, rgba(44,40,37,0.5) 0%, transparent 40%)"}}/>
        </div>

        <div className="about-text" style={{position:"relative",zIndex:1,maxWidth:"1200px",width:"100%",margin:"0 auto",padding:"160px 60px 120px"}}>
          <div style={{maxWidth:"480px"}}>
            <div style={{fontSize:"12px",letterSpacing:"0.32em",color:"rgba(232,223,208,.5)",marginBottom:"28px",fontFamily:"'Cormorant Garamond',serif",textTransform:"uppercase"}} className="fi">關於 Sofia</div>
            <h1 style={{fontFamily:"'Noto Serif TC',serif",fontSize:"clamp(28px,3.8vw,48px)",fontWeight:300,color:"#FAF7F2",lineHeight:1.35,marginBottom:"32px"}} className="fi">
              我在做的事，<br/>只有一件
            </h1>
            <div style={{width:"32px",height:"1px",background:"rgba(232,223,208,.4)",marginBottom:"32px"}} className="fi"/>
            <p style={{fontSize:"15px",color:"rgba(232,223,208,.78)",lineHeight:2}} className="fi">
              很多人來找我，不是因為他們不知道該怎麼做，而是因為他們已經試過很多方法，卻還是會在某些時候，回到原本的狀態。
            </p>
          </div>
        </div>
      </div>

      <section className="about-new-section">
        <div className="about-new-inner">
          <div className="about-new-story">
            <div className="about-new-kicker fi">Why people come</div>
            <h2 className="fi">很多人來找我，<br/>不是因為人生出了問題<br/><br/>而是因為，<br/>已經撐了很久</h2>
            <div className="about-new-story-copy">
              <p className="fi">外表看起來很好，卻總是在情緒、關係或選擇裡反覆消耗自己。</p>
              <p className="fi">我做的，不是替你做決定。而是陪你重新看懂自己。</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-new-section about-new-methods" id="about-methods">
        <div className="about-new-inner">
          <div className="about-new-section-head">
            <div className="about-new-kicker fi">How I support you</div>
            <h2 className="fi">我如何陪伴你</h2>
          </div>
          <div className="about-new-card-grid">
            {methods.map((item, i) => (
              <article className="about-new-card fi" key={item.t}>
                <div className="about-new-card-num">0{i + 1}</div>
                <h3>{item.t}</h3>
                <p>{item.x}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-new-section">
        <div className="about-new-inner about-new-work">
          <div className="about-new-work-photo fi">
            <img src={HOME_SOFIA_WORK} alt="Sofia 的陪伴工作方式" />
          </div>
          <div className="about-new-work-copy">
            <div className="about-new-kicker fi">My approach</div>
            <h2 className="fi">我的工作方式</h2>
            <p className="fi">我會透過深度對談、狀態整理、以及 TimeWaver 分析支持，陪你理解：</p>
            <div className="about-new-work-list fi">
              <div>現在發生了什麼</div>
              <div>為什麼一直重複</div>
              <div>下一步可以怎麼走</div>
            </div>
            <p className="fi">TimeWaver 是我的工具之一，真正重要的是，陪你一起理解自己。</p>
            <button className="about-new-link fi" onClick={() => go("frequency")}>了解 TimeWaver →</button>
          </div>
        </div>
      </section>

      <section className="about-new-section about-new-start">
        <div className="about-new-inner">
          <div className="about-new-section-head">
            <div className="about-new-kicker fi">Begin here</div>
            <h2 className="fi">你可以從這裡開始</h2>
          </div>
          <div className="about-new-card-grid">
            {starts.map((item, i) => (
              <article className="about-new-start-card fi" key={item.t}>
                <div className="about-new-card-num">0{i + 1}</div>
                <h3>{item.t}</h3>
                <button className={i === 0 ? "bp" : "home-secondary-btn"} onClick={() => go(item.p)}>{item.b}</button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-new-closing fi">
        <p>你不用急著變好<br/>你只需要開始看懂自己</p>
      </section>
    </div>
  );
}

function Frequency({ go }) {
  useFade();
  const [openFaq, setOpenFaq] = useState(null);
  const features = [
    { t:"找出核心議題", x:"透過 TimeWaver 分析目前真正影響你的核心問題，幫助你把改變的力量放在最重要的地方。" },
    { t:"持續頻率調整", x:"依照分析結果，在陪伴期間持續進行頻率調整，提供穩定而持續的支持。" },
    { t:"持續追蹤與優化", x:"根據你的變化，持續調整下一階段最值得優先改善的方向，讓陪伴更貼近你當下真正的需求。" },
    { t:"Sofia 專業陪伴", x:"除了 TimeWaver 的分析與頻率調整，更重要的是 Sofia 會陪伴你理解自己、整理情緒，協助你把改變落實到生活中。" },
  ];
  const applications = [
    { t:"健康身體與生活", img:"health.webp", x:"專注於壓力、慢性疲勞與生活節奏等常見狀態，作為理解身體需求與日常調整方向的輔助參考。" },
    { t:"情緒穩定", img:"emotion.webp", x:"協助你看見持續湧現的情緒，以及情緒背後可能需要被理解與整理的內在訊息。" },
    { t:"改善睡眠", img:"sleep.webp", x:"整理入睡前的壓力、情緒與生活節奏，讓你更清楚哪些因素正在影響休息品質。" },
    { t:"財富與資源感", img:"wealth.webp", x:"看見自己與金錢、資源及安全感之間的慣性模式，作為重新整理選擇與行動方向的起點。" },
    { t:"個人目標設定", img:"goal.webp", x:"釐清長期或短期目標，整理目前的阻力與可行方向，讓力氣更集中在真正重要的位置。" },
    { t:"空間狀態整理", img:"space.webp", x:"從使用者的感受與生活脈絡出發，整理空間帶來的壓力、情緒與習慣連結。" },
    { t:"壓力舒緩", img:"stress.webp", x:"發掘壓力來源與反覆出現的反應方式，協助你用更清楚的節奏面對每天的生活。" },
    { t:"關係改善", img:"relation.webp", x:"從親子、伴侶或職場互動中，看見彼此的界線、期待與反覆發生的關係模式。" },
    { t:"能量與行動補充", img:"energy.webp", x:"透過個人狀態整理，了解目前最需要被支持的面向，找到更貼近自己的行動節奏。" },
  ];
  const faqs = [
    ["什麼是頻率調整？","TimeWaver 會先透過分析，找出目前最值得關注的核心議題與優先方向。接著，依據分析結果建立專屬的頻率調整方案，在陪伴期間持續提供支持。"],
    ["頻率調整需要做什麼嗎？","不需要。完成分析後，系統會依照你的專屬設定，在陪伴期間持續進行頻率調整。你不需要配戴任何設備，也不需要固定在線。Sofia 會依照方案內容持續追蹤你的變化，並適時調整協助方向。"],
    ["我會怎麼知道自己正在改變？","每個人的改變速度都不同。有些人會先感受到情緒變得比較穩定，有些人則是在關係、工作、睡眠、行動力或生活狀態上，慢慢出現新的變化。我們會透過定期分析與追蹤，陪伴你觀察自己的變化。"],
    ["TimeWaver 的角色是什麼？","TimeWaver 是我工作時使用的工具之一。真正重要的不是機器替你下結論，而是透過資料、對談與你的真實生活互相對照，幫助你理解自己。"],
    ["是否有風險？","過程不涉及侵入性操作。不過，它不能取代醫療、心理治療或其他專業診斷；若你正面臨健康或心理上的急迫問題，仍應優先尋求合格專業人員協助。"],
    ["一定要親自到現場嗎？","不一定。多數狀態整理可以在線上進行；如果你希望安排實體對談，也可以另外詢問台北的諮詢空間。"],
    ["我適合從哪裡開始？","如果你還不確定，可以先預約初次穩定體驗，說說最近最在意的狀態。我們會一起判斷 TimeWaver 頻率調整是否適合成為這次陪伴的工具。"],
  ];

  return (
    <div className="page frequency-page">
      <section className="frequency-hero">
        <div className="frequency-hero-bg"/>
        <div className="frequency-hero-overlay"/>
        <div className="frequency-hero-inner">
          <div className="frequency-eyebrow fi">TimeWaver 頻率調整（Frequency）</div>
          <h1 className="frequency-title fi">TimeWaver<br/><em>頻率調整</em></h1>
          <p className="frequency-lead fi">
            透過<strong>狀態分析、持續頻率調整</strong>與<strong>專業陪伴</strong>，<br/>
            看見核心議題，並在日常裡一步一步靠近更穩定的自己。
          </p>
          <div className="frequency-tags fi">
            {["身心狀態","情緒穩定","睡眠節奏","資源感","關係覺察","空間整理"].map(tag => <span className="frequency-tag" key={tag}>{tag}</span>)}
          </div>
        </div>
      </section>

      <section className="frequency-section">
        <div className="frequency-inner">
          <div className="fi">
            <div className="frequency-label">How it works</div>
            <h2 className="frequency-heading">什麼是頻率調整？</h2>
            <div className="frequency-rule"/>
          </div>
          <div className="frequency-principle">
            <div className="frequency-principle-copy fi">
              <p><strong>根據分析結果，持續提供個人化支持與陪伴。</strong></p>
              <p>TimeWaver 會先透過分析，找出目前最值得關注的核心議題與優先方向。</p>
              <p>接著，依據分析結果建立專屬的頻率調整方案，在陪伴期間持續提供支持。</p>
              <p>對許多人而言，這個過程就像持續整理與校準自己的生活節奏，讓情緒、思考、關係、工作與生活，有機會逐步回到更平衡的狀態。</p>
              <p>每個人的狀態、感受與改變速度都不同，因此 Sofia 會結合 TimeWaver 的分析結果與專業陪伴，陪你一步一步調整，而不是只提供一次性的建議。</p>
            </div>
          </div>
        </div>
      </section>

      <section className="frequency-section">
        <div className="frequency-inner">
          <div className="fi">
            <div className="frequency-label">Ongoing support</div>
            <h2 className="frequency-heading">持續的頻率調整，讓改變真正發生</h2>
            <div className="frequency-rule"/>
          </div>
          <div className="frequency-support-grid">
            <div className="frequency-support-card fi">
              <div className="frequency-support-card-mark">Ongoing support</div>
              <h3>分析不是結束，<br/>而是陪伴的開始。</h3>
              <div className="sub">真正的改變，不是發生在諮詢當天，而是在之後持續累積的每一天。</div>
              <p>陪伴期間，Sofia 會依據你的分析結果，持續進行頻率調整，並根據你的變化持續優化協助方向。</p>
              <p>依照不同的陪伴方案，會有不同的調整頻率與追蹤方式，讓支持不只停留在諮詢當天，而是延續到你的日常生活。</p>
            </div>
            <div className="frequency-timeline fi">
              <div className="frequency-timeline-label">一段陪伴的節奏</div>
              <div className="frequency-timeline-step" data-step="01">
                <h3>看見核心議題</h3>
                <p>先透過分析，整理目前最值得被看見的方向。</p>
              </div>
              <div className="frequency-timeline-step" data-step="02">
                <h3>建立頻率調整</h3>
                <p>依照分析結果，設定專屬於你的支持節奏。</p>
              </div>
              <div className="frequency-timeline-step" data-step="03">
                <h3>持續追蹤變化</h3>
                <p>Sofia 會依照你的狀態，調整下一階段陪伴重點。</p>
              </div>
            </div>
          </div>
          <div className="frequency-feature-grid">
            {features.map((item, i) => (
              <article className={`frequency-feature fi ${i === 1 ? "is-accent" : ""}`} key={item.t}>
                <div className="frequency-feature-icon">{String(i + 1).padStart(2, "0")}</div>
                <h3>{item.t}</h3>
                <p>{item.x}</p>
              </article>
            ))}
          </div>
          <div className="frequency-highlight fi">
            <p>分析讓你看見方向，<br/>持續的頻率調整與陪伴，讓改變真正發生。</p>
          </div>
        </div>
      </section>

      <section className="frequency-section frequency-apps">
        <div className="frequency-inner">
          <div className="fi">
            <div className="frequency-label">Applications</div>
            <h2 className="frequency-heading">可以整理的生活面向</h2>
            <div className="frequency-rule"/>
          </div>
          <div className="frequency-app-hint">左右滑動，看更多生活面向 →</div>
          <div className="frequency-app-list">
            {applications.map((item, i) => (
              <article className="frequency-app fi" key={item.t}>
                <div className="frequency-app-image"><img src={`/frequency/${item.img}`} alt={item.t}/></div>
                <div className="frequency-app-copy">
                  <div className="frequency-app-number">{String(i + 1).padStart(2, "0")}</div>
                  <h3 className="frequency-app-title">{item.t}</h3>
                  <div className="frequency-app-rule"/>
                  <p>{item.x}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="frequency-section">
        <div className="frequency-inner">
          <div className="fi">
            <div className="frequency-label">FAQ</div>
            <h2 className="frequency-heading">常見問答</h2>
            <div className="frequency-rule"/>
          </div>
          <div className="frequency-faq fi">
            {faqs.map(([q, a], i) => (
              <div className={`frequency-faq-item${openFaq === i ? " is-open" : ""}`} key={q}>
                <button className="frequency-faq-button" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{q}</span><span className="frequency-faq-icon">+</span>
                </button>
                <div className="frequency-faq-answer">{a}</div>
              </div>
            ))}
            <div className="frequency-note">TimeWaver 與頻率調整屬於自我覺察及生活狀態整理的輔助工具，不取代醫療診斷、心理治療或其他專業服務。</div>
          </div>
        </div>
      </section>

      <section className="frequency-cta">
        <div className="frequency-cta-bg"/>
        <div className="frequency-cta-overlay"/>
        <div className="frequency-cta-inner fi">
          <div className="frequency-label">Begin here</div>
          <h2>先看懂現在的自己，<br/>再決定下一步</h2>
          <p>如果你想知道 TimeWaver 頻率調整是否適合你，可以先告訴我最近最想整理的狀態。</p>
          <button className="bp" onClick={() => go("apply")}>預約初次穩定體驗</button>
        </div>
      </section>
    </div>
  );
}


function Start({ go }) {
  useFade();
  const plans = [
    { t:"60 分鐘", p:"NT$ 3,800", x:"適合第一次想了解自己狀態的人" },
    { t:"90 分鐘", p:"NT$ 5,000", x:"適合想要更完整整理某個主題的人", featured:true },
    { t:"120 分鐘", p:"NT$ 6,000", x:"適合想深入梳理長期模式的人" },
  ];
  return (
    <div className="page">
      <div style={{background:"var(--cream)",padding:"140px 0 80px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 55% 60% at 90% 30%,rgba(212,200,181,.28) 0%,transparent 60%)",pointerEvents:"none"}}/>
        <div className="CN" style={{position:"relative",zIndex:1}}>
          <div className="slb fi">開始這一步</div>
          <h1 className="htit fi" style={{fontSize:"clamp(26px,3.5vw,44px)"}}>初次穩定體驗</h1>
          <p className="hbo fi" style={{maxWidth:"500px"}}>這不是諮詢，也不是分析。這是一個讓你第一次清楚看見——你為什麼會一直卡在同樣地方的空間。</p>
        </div>
      </div>

      {/* 這是什麼 */}
      <section style={{background:"var(--w)"}}>
        <div className="CN">
          <div className="slb fi">這是什麼</div>
          <div className="fi" style={{padding:"44px 52px",background:"var(--cream)",borderLeft:"3px solid var(--forest)",marginBottom:"24px"}}>
            <p style={{fontSize:"15px",lineHeight:2.1,color:"var(--soft)",marginBottom:"16px"}}>很多人在情緒或關係裡卡住，不是因為他們不夠努力，而是因為某個底層的模式一直在運作，卻從來沒有被看清楚過。</p>
            <p style={{fontSize:"15px",lineHeight:2.1,color:"var(--soft)"}}>這次體驗的目的，不是給你答案，而是幫你第一次真正看見——你是怎麼在壓力與關係中做選擇的。</p>
          </div>
        </div>
      </section>

      <section className="tone-panel fi">
        <div className="tone-panel-inner">
          <div className="tone-kicker">First session</div>
          <div className="tone-text">第一次不急著解決，<br/>而是先把自己看清楚。</div>
          <p className="tone-sub">這個空間會讓你把混亂慢慢放下來，看見真正卡住的位置。</p>
        </div>
      </section>

      {/* 適合誰 */}
      <section style={{background:"var(--cream)"}}>
        <div className="CN">
          <div className="slb fi">適合你如果</div>
          {[
            "你常常在關鍵時刻，做出自己事後後悔的選擇",
            "你很努力，但不知道為什麼還是卡在同樣的地方",
            "你在情緒或關係裡很消耗，但說不清楚問題在哪",
            "你已經撐很久，開始覺得需要停下來整理自己",
            "你明明知道不應該，但卻一直重複發生",
          ].map((s,i) => (
            <div key={i} className="fi" style={{display:"flex",gap:"16px",alignItems:"flex-start",padding:"22px 0",borderBottom:"1px solid var(--div)"}}>
              <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"18px",color:"var(--sandm)",flexShrink:0}}>0{i+1}</span>
              <span style={{fontFamily:"'Noto Serif TC',serif",fontSize:"15px",fontWeight:300,color:"var(--text)",lineHeight:1.8}}>{s}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 你會得到什麼 */}
      <section style={{background:"var(--w)"}}>
        <div className="CN">
          <div className="slb fi">你會得到什麼</div>
          {[
            { t:"看見你的模式", x:"第一次清楚理解，你為什麼會一直在某些地方卡住" },
            { t:"理解你的選擇方式", x:"在壓力與關係中，你是怎麼做決定的——以及為什麼" },
            { t:"一個可以開始的方向", x:"不是改變計畫，而是一個真正屬於你的下一步" },
          ].map((s,i) => (
            <div key={i} className="fi" style={{display:"flex",gap:"28px",alignItems:"flex-start",padding:"32px 0",borderBottom:"1px solid var(--div)"}}>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"28px",fontWeight:300,color:"var(--sandm)",flexShrink:0,width:"36px",lineHeight:1}}>0{i+1}</div>
              <div>
                <div style={{fontFamily:"'Noto Serif TC',serif",fontSize:"16px",color:"var(--text)",marginBottom:"8px"}}>{s.t}</div>
                <div style={{fontSize:"13px",color:"var(--soft)",lineHeight:1.9}}>{s.x}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 進行方式 */}
      <section style={{background:"var(--cream)"}}>
        <div className="CN">
          <div className="slb fi">進行方式</div>
          <div className="fi" style={{padding:"44px 52px",background:"var(--w)"}}>
            {[
              "主要透過線上視訊進行，你在任何地方都可以",
              "或是另外預約台北市諮詢空間",
              "不需要事前準備，帶著現在的狀態來就好",
              "過程中我不會給你建議或任務，只是幫你看清楚",
              "結束後你會知道自己接下來想怎麼走",
            ].map((s,i) => (
              <div key={i} style={{display:"flex",gap:"14px",marginBottom:"18px"}}>
                <span style={{color:"var(--forest)",flexShrink:0}}>—</span>
                <span style={{fontSize:"14px",color:"var(--soft)",lineHeight:1.9}}>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 價格 */}
      <section style={{background:"var(--w)"}}>
        <div className="C">
          <div className="slb fi">選擇方案</div>
          <div className="start-pricing-grid" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"2px"}}>
            {plans.map((p,i) => (
              <div key={i} className="start-plan-card fi" style={{
                padding:"44px 36px",
                background: p.featured ? "var(--forest)" : "var(--cream)",
                textAlign:"center",
                position:"relative",
              }}>
                <div className="plan-meta">
                  {p.featured && <div className="plan-badge" style={{position:"absolute",top:"16px",left:"50%",transform:"translateX(-50%)",fontSize:"11px",letterSpacing:"0.2em",color:"rgba(232,223,208,.6)",textTransform:"uppercase"}}>最多人選擇</div>}
                  <div style={{fontFamily:"'Noto Serif TC',serif",fontSize:"17px",fontWeight:300,color:p.featured?"var(--sand)":"var(--text)",marginBottom:"20px",marginTop:p.featured?"16px":"0"}}>{p.t}</div>
                </div>
                <div className="plan-price" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"36px",fontWeight:300,color:p.featured?"var(--sand)":"var(--text)",marginBottom:"16px"}}>{p.p}</div>
                <div className="plan-desc" style={{fontSize:"13px",color:p.featured?"rgba(232,223,208,.65)":"var(--soft)",lineHeight:1.8,marginBottom:"28px"}}>{p.x}</div>
                <button className="plan-button bp" onClick={() => go("apply")} style={{
                  background: p.featured ? "var(--sand)" : "var(--forest)",
                  color: p.featured ? "var(--forest)" : "var(--sand)",
                  width:"100%",
                }}>預約這個方案</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="ctab fi">
        <div className="ctab-e es">Begin Here</div>
        <h2 className="ctab-t">你不需要準備好</h2>
        <p className="ctab-x">帶著現在這個狀態來就好。第一次看清楚，是所有改變的開始。</p>
        <button className="bp" onClick={() => go("apply")}>預約初次穩定體驗</button>
      </div>
    </div>
  );
}

/* ─── AWARE PAGE (自我覺察) ──────────────────────────────────────── */
function Aware({ go }) {
  useFade();
  return (
    <div className="page">
      <div style={{background:"var(--cream)",padding:"140px 0 80px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 55% 60% at 90% 30%,rgba(212,200,181,.28) 0%,transparent 60%)",pointerEvents:"none"}}/>
        <div className="CN" style={{position:"relative",zIndex:1}}>
          <div className="slb fi">自我覺察</div>
          <h1 className="htit fi" style={{fontSize:"clamp(26px,3.5vw,44px)"}}>先看見，才能改變</h1>
          <p className="hbo fi" style={{maxWidth:"500px"}}>這不是要給你答案，而是幫你先看清楚自己現在在哪裡。</p>
        </div>
      </div>

      <section style={{background:"var(--w)"}}>
        <div className="CN">
          <div className="aware-tools-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"2px",marginBottom:"60px"}}>
            {/* 生命數字 */}
            <div className="aware-tool-card fi" style={{padding:"52px 44px",background:"var(--cream)",borderTop:"2px solid var(--sandm)",cursor:"pointer"}} onClick={() => go("num")}>
              <div style={{fontFamily:"'Noto Serif TC',serif",fontSize:"22px",fontWeight:300,color:"var(--text)",marginBottom:"16px"}}>生命數字</div>
              <p style={{fontSize:"14px",color:"var(--soft)",lineHeight:1.9,marginBottom:"28px"}}>從出生日期了解你的主命數、流年數、關係數與挑戰數。看見你這一生最容易反覆面對的主題。</p>
              <div className="aware-tool-link" style={{fontSize:"12px",letterSpacing:"0.15em",color:"var(--forest)",fontFamily:"'Cormorant Garamond',serif"}}>計算我的數字 →</div>
            </div>
            {/* 身心平衡檢測 — 外部連結 */}
            <div className="aware-tool-card fi" style={{padding:"52px 44px",background:"var(--cream)",borderTop:"2px solid var(--sandm)",cursor:"pointer"}} onClick={() => window.open("https://sofiacentering.netlify.app/", "_blank")}>
              <div style={{fontFamily:"'Noto Serif TC',serif",fontSize:"22px",fontWeight:300,color:"var(--text)",marginBottom:"16px"}}>身心平衡檢測</div>
              <p style={{fontSize:"14px",color:"var(--soft)",lineHeight:1.9,marginBottom:"28px"}}>花約 3 分鐘，選擇最接近你近兩週感受的答案，看見自己現在真正的狀態。</p>
              <div className="aware-tool-link" style={{fontSize:"12px",letterSpacing:"0.15em",color:"var(--forest)",fontFamily:"'Cormorant Garamond',serif"}}>開始檢測 →</div>
            </div>
          </div>

          <div className="tone-panel fi" style={{marginBottom:"60px"}}>
            <div className="tone-panel-inner">
              <div className="tone-kicker">Before the next step</div>
              <div className="tone-text">工具不是答案，<br/>它只是讓你先看見自己在哪裡。</div>
              <p className="tone-sub">看見當下的狀態，下一步才會變得比較清楚。</p>
            </div>
          </div>

          <div className="aware-next-step fi" style={{padding:"48px 52px",background:"var(--forest)",textAlign:"center"}}>
            <div className="aware-next-label" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"12px",letterSpacing:"0.28em",color:"rgba(232,223,208,.45)",marginBottom:"20px",textTransform:"uppercase"}}>Next Step</div>
            <p style={{fontFamily:"'Noto Serif TC',serif",fontSize:"18px",fontWeight:300,color:"var(--sand)",lineHeight:1.8,marginBottom:"28px"}}>你現在看到的，只是你狀態的一部分。<br/>如果你想更清楚知道這些模式是怎麼影響你的選擇，可以從這裡開始。</p>
            <button className="bp" onClick={() => go("apply")} style={{background:"var(--sand)",color:"var(--forest)"}}>預約初次穩定體驗</button>
          </div>
        </div>
      </section>
    </div>
  );
}


/* ─── TESTIMONIALS + EMAIL + APPLY + FOOTER ─────────────────────── */
const TESTIMONIALS = [
  {
    stars: 5,
    text: "一路走來的成長，原生家庭與過往的心路歷程，讓我慢慢變成了一個連自己都不太確定的樣子。在這 90 天的陪伴裡，沒有對錯、沒有批判，只有一次次被溫柔地接住。它讓我明白——我本身的存在，就已經很美好。現在的我，做自己的女王，笑起來都很美麗。",
    name: "S.",
    tag: "深度陪跑 90 天"
  },
  {
    stars: 5,
    text: "這13週，我最大的轉變是，我開始看見自己的模式，而不只是反應它。",
    name: "鳳",
    tag: "深度陪跑 90 天",
    full: `以前的我，很習慣把時間排滿，覺得只要夠忙、夠努力，就可以不用面對那些不舒服的感覺。

開始陪跑之後，Sofia 幫我看見——我不是不知道自己想要什麼，我只是一直在用「忙碌」來避開那個需要做選擇的時刻。

這 13 週，我最大的改變不是「學到什麼技巧」，而是我開始可以在情緒來的時候，慢下來一點，問自己：這是我真正想要的嗎？

我還在練習，但我知道我已經不一樣了。`
  },
];

function Testimonials({ go }) {
  return (
    <section style={{background:"var(--cream)"}}>
      <div className="C">
        <div className="slb fi">她們說的</div>
        <h2 style={{fontFamily:"'Noto Serif TC',serif",fontSize:"clamp(20px,2.5vw,28px)",fontWeight:300,color:"var(--text)",marginBottom:"8px"}} className="fi">真實的整理，會留下真實的改變</h2>
        <p style={{fontSize:"13px",color:"var(--wg)",lineHeight:1.9,marginBottom:"0"}} className="fi">以下是學員的回饋，經本人同意後分享。</p>
        <div className="testi-grid">
          {TESTIMONIALS.map((t, i) => (
            <div className="testi-card fi" key={i}>
              <div className="testi-stars">{"★".repeat(t.stars)}</div>
              <div className="testi-text">「{t.text}」</div>
              <div className="testi-name">{t.name}</div>
              <div className="testi-tag">{t.tag}</div>
            </div>
          ))}
        </div>
        <div style={{textAlign:"center",marginTop:"44px"}} className="fi">
          <button className="bp" onClick={() => go("apply")}>我也想開始整理自己</button>
        </div>
      </div>
    </section>
  );
}

function EmailCapture() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const submit = () => {
    if (!email || !email.includes("@")) return;
    setDone(true);
  };
  return (
    <div className="ecap">
      <div className="ecap-e es">Free · 每月一篇</div>
      <h2 className="ecap-t">訂閱觀點信，<br/>從閱讀開始認識自己</h2>
      <p className="ecap-x">每月一篇，寫給那些習慣承擔、卻還沒有機會好好整理自己的女性。</p>
      {done ? (
        <div className="ecap-ok">✦ 已收到，很高興你在這裡。</div>
      ) : (
        <div className="ecap-row">
          <input className="ecap-inp" type="email" placeholder="你的 Email" value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()} />
          <button className="ecap-btn" onClick={submit}>訂閱</button>
        </div>
      )}
    </div>
  );
}

function Apply({ go }) {
  const [form, setForm] = useState({
    name:"", email:"", line:"", time:"", stuck:"", hope:"", source:""
  });
  const [ok, setOk]         = useState(false);
  const [sending, setSending] = useState(false);
  const [err, setErr]       = useState("");
  const h = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submitForm = async () => {
    if (!form.name || !form.email || !form.line) { setErr("請填寫姓名、Email 和 Line ID"); return; }
    setErr("");
    setSending(true);
    try {
      await submitLead({
        type: "預約表單",
        name: form.name,
        email: form.email,
        contact: form.line,
        pain: form.stuck,
        state: form.hope,
        note: `希望預約時間：${form.time || "未填"}\n怎麼知道這裡的：${form.source || "未填"}`,
        raw: {
          希望預約時間: form.time,
          怎麼知道這裡的: form.source,
        },
      });
      setSending(false);
      setOk(true);
      go("thanks");
    } catch(e) {
      console.error(e);
      setSending(false);
      setErr("送出時發生問題，請稍後再試一次");
    }
  };

  const IS = {
    background:"var(--cream)", border:"1px solid var(--div)",
    borderBottom:"2px solid var(--sandm)",
    padding:"13px 15px", fontSize:"15px",
    fontFamily:"'Noto Sans TC',sans-serif",
    color:"var(--text)", outline:"none",
    borderRadius:0, width:"100%", WebkitAppearance:"none",
    transition:"border-color .2s",
  };
  const TA = { ...IS, height:"120px", resize:"vertical" };
  const LS = { fontSize:"12px", letterSpacing:"0.15em", color:"var(--wg)", display:"block", marginBottom:"8px" };
  const FG = { marginBottom:"28px" };

  return (
    <div className="page">
      {/* HERO */}
      <div className="dark-hero" style={{background:"var(--forest)",padding:"140px 0 80px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 50% 60% at 20% 50%,rgba(255,255,255,.04) 0%,transparent 60%)",pointerEvents:"none"}}/>
        <div className="CN" style={{position:"relative",zIndex:1}}>
          <div className="hero-kicker" style={{fontSize:"12px",letterSpacing:"0.32em",color:"rgba(232,223,208,.45)",marginBottom:"24px",textTransform:"uppercase",fontFamily:"'Cormorant Garamond',serif"}}>預約</div>
          <h1 style={{fontFamily:"'Noto Serif TC',serif",fontSize:"clamp(26px,3.5vw,44px)",fontWeight:300,color:"var(--sand)",lineHeight:1.4,marginBottom:"20px"}}>
            先讓自己有一個<br/>可以站穩的位置
          </h1>
          <p style={{fontSize:"15px",color:"rgba(232,223,208,.65)",lineHeight:1.9,maxWidth:"440px"}}>
            你不需要準備好。帶著現在這個狀態來就好。<br/>填完表單後，我會在三個工作天內與你聯繫。
          </p>
        </div>
      </div>

      <section className="tone-panel apply-tone fi">
        <div className="tone-panel-inner">
          <div className="tone-kicker">Before we begin</div>
          <div className="tone-text">你不需要整理好才來，<br/>現在的狀態就已經足夠。</div>
          <p className="tone-sub">表單只是讓我先靠近你正在經歷的地方。</p>
        </div>
      </section>

      {/* FORM */}
      <section className="apply-form-section" style={{background:"var(--w)"}}>
        <div className="CN">
          {ok ? (
            <div style={{padding:"100px 0",textAlign:"center"}}>
              <div style={{fontFamily:"'Noto Serif TC',serif",fontSize:"28px",fontWeight:300,color:"var(--text)",marginBottom:"20px"}}>✦</div>
              <div style={{fontFamily:"'Noto Serif TC',serif",fontSize:"22px",fontWeight:300,color:"var(--text)",marginBottom:"16px"}}>謝謝你的申請。</div>
              <p style={{fontSize:"14px",color:"var(--soft)",lineHeight:2,maxWidth:"360px",margin:"0 auto"}}>我已收到你的訊息，會在三個工作天內透過 Email 或 Line 與你聯繫。</p>
            </div>
          ) : (
            <div style={{maxWidth:"600px"}}>

              {/* 基本資料 */}
              <div style={{marginBottom:"48px"}}>
                <div className="slb" style={{marginBottom:"32px"}}>基本資料</div>

                <div style={FG}>
                  <label style={LS}>姓名 <span style={{color:"#B85A5A"}}>*</span></label>
                  <input style={IS} type="text" name="name" placeholder="你的名字" value={form.name} onChange={h} />
                </div>

                <div style={FG}>
                  <label style={LS}>Email <span style={{color:"#B85A5A"}}>*</span></label>
                  <input style={IS} type="email" name="email" placeholder="your@email.com" value={form.email} onChange={h} />
                </div>

                <div style={FG}>
                  <label style={LS}>Line ID <span style={{color:"#B85A5A"}}>*</span></label>
                  <input style={IS} type="text" name="line" placeholder="@yourlineid" value={form.line} onChange={h} />
                </div>

                <div style={FG}>
                  <label style={LS}>希望預約的時間</label>
                  <input style={IS} type="text" name="time" placeholder="例：平日下午、週末上午，或特定日期" value={form.time} onChange={h} />
                </div>
              </div>

              {/* 三個問題 */}
              <div style={{marginBottom:"48px"}}>
                <div className="slb" style={{marginBottom:"32px"}}>讓我先了解你</div>

                <div style={FG}>
                  <label style={LS}>01 ／ 你目前最卡的狀態是什麼？</label>
                  <div style={{fontSize:"12px",color:"var(--wg)",marginBottom:"10px",lineHeight:1.8}}>
                    可以是情緒、關係、工作，或說不清楚但就是哪裡不對的感覺
                  </div>
                  <textarea style={TA} name="stuck" placeholder="說說看現在的狀態⋯⋯" value={form.stuck} onChange={h} />
                </div>

                <div style={FG}>
                  <label style={LS}>02 ／ 你希望這次幫助你的是什麼？</label>
                  <div style={{fontSize:"12px",color:"var(--wg)",marginBottom:"10px",lineHeight:1.8}}>
                    不用很具體，大概的方向就好
                  </div>
                  <textarea style={TA} name="hope" placeholder="你期待的是什麼樣的改變⋯⋯" value={form.hope} onChange={h} />
                </div>

                <div style={FG}>
                  <label style={LS}>03 ／ 你是怎麼知道這裡的？</label>
                  <textarea style={{...TA, height:"80px"}} name="source" placeholder="例：朋友介紹、Instagram、Facebook⋯⋯" value={form.source} onChange={h} />
                </div>
              </div>

              {err && <div style={{fontSize:"13px",color:"#B85A5A",marginBottom:"18px"}}>⚠ {err}</div>}

              <button
                onClick={submitForm}
                disabled={sending}
                style={{
                  width:"100%", padding:"18px",
                  background:"var(--forest)", color:"var(--sand)",
                  border:"none", fontSize:"14px", letterSpacing:"0.18em",
                  fontFamily:"'Noto Sans TC',sans-serif",
                  cursor: sending ? "not-allowed" : "pointer",
                  opacity: sending ? 0.6 : 1,
                  transition:"all .22s",
                }}
              >
                {sending ? "送出中⋯⋯" : "送出申請"}
              </button>

              <p style={{fontSize:"12px",color:"var(--wg)",textAlign:"center",marginTop:"16px",lineHeight:1.8}}>
                送出後我會在三個工作天內與你聯繫。
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}


function Footer({ go }) {
  const SL = { color:"var(--wg)", textDecoration:"none", fontSize:"13px", display:"block", marginBottom:"10px", cursor:"pointer", transition:"color .2s" };
  return (
    <footer className="site-footer" style={{background:"var(--text)",padding:"80px 0 40px",position:"relative",overflow:"hidden"}}>
      <div className="C">
        <div className="footer-main" style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:"48px",marginBottom:"52px"}}>
          <div>
            <div className="footer-brand" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"24px",color:"var(--sand)",marginBottom:"12px"}}>Sofia</div>
            <div className="footer-tagline" style={{fontSize:"12px",letterSpacing:"0.18em",color:"rgba(232,223,208,.4)",marginBottom:"20px"}}>情緒穩定 × 關係覺察 × 內在主導權</div>
            <p className="footer-copy" style={{fontSize:"13px",color:"rgba(232,223,208,.45)",lineHeight:1.9}}>以陪伴取代建議，<br/>以覺察取代答案</p>
          </div>
          <div>
            <div className="footer-heading" style={{fontSize:"12px",letterSpacing:"0.2em",color:"rgba(232,223,208,.35)",marginBottom:"20px",textTransform:"uppercase"}}>聯繫</div>
            <a href="https://www.instagram.com/sofia202219101/" target="_blank" rel="noopener" style={SL}>Instagram</a>
            <a href="https://line.me/R/ti/p/@567avtfh" target="_blank" rel="noopener" style={SL}>LINE</a>
            <a href="mailto:sophibaby@gmail.com" style={SL}>Email</a>
            <div className="footer-address" style={{fontSize:"11px",color:"rgba(212,200,181,.42)",lineHeight:1.8,marginTop:"22px"}}>
              引力所 Fold Space<br/>台北市中山區復興北路366號7樓
            </div>
          </div>
        </div>
        <div className="footer-bottom" style={{borderTop:"1px solid rgba(232,223,208,.1)",paddingTop:"32px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"12px"}}>
          <div style={{fontSize:"12px",color:"rgba(232,223,208,.25)",letterSpacing:"0.08em"}}>© 2025 Sofia 蘇菲療癒轉化 All rights reserved</div>
          <div style={{fontSize:"12px",color:"rgba(232,223,208,.25)",letterSpacing:"0.08em"}}>以陪伴取代建議，以覺察取代答案</div>
        </div>
      </div>
    </footer>
  );
}


/* ─── DEEP PAGE (陪跑計畫) ──────────────────────────────────────── */
function Deep({ go }) {
  useFade();
  return (
    <div className="page">

      {/* HERO */}
      <div className="dark-hero" style={{background:"var(--forest)",padding:"140px 0 100px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 55% 65% at 15% 50%,rgba(255,255,255,.04) 0%,transparent 60%)",pointerEvents:"none"}}/>
        <div className="CN" style={{position:"relative",zIndex:1}}>
          <div className="hero-kicker" style={{fontSize:"12px",letterSpacing:"0.32em",color:"rgba(232,223,208,.45)",marginBottom:"24px",fontFamily:"'Cormorant Garamond',serif",textTransform:"uppercase"}}>陪跑計畫</div>
          <h1 style={{fontFamily:"'Noto Serif TC',serif",fontSize:"clamp(28px,4vw,50px)",fontWeight:300,color:"var(--sand)",lineHeight:1.35,marginBottom:"28px"}} className="fi">
            你其實已經知道很多
          </h1>
          <p style={{fontSize:"15px",color:"rgba(232,223,208,.7)",lineHeight:2,maxWidth:"500px"}} className="fi">
            你知道自己會在什麼情況下開始撐，你也知道有些關係，讓你越來越不舒服。你不是沒有嘗試過改變，只是每一次到了關鍵時刻，你還是會回到原本的選擇。
          </p>
        </div>
      </div>

      {/* 為什麼需要陪跑 */}
      <section style={{background:"var(--w)"}}>
        <div style={{maxWidth:"620px",margin:"0 auto",padding:"100px 24px"}}>
          <div className="slb fi">為什麼需要陪跑</div>
          <p className="fi" style={{fontFamily:"'Noto Serif TC',serif",fontSize:"clamp(18px,2.2vw,24px)",fontWeight:300,color:"var(--text)",lineHeight:1.8,marginBottom:"32px"}}>
            真正影響你人生的，不是你知道什麼，而是你在壓力裡，還能不能穩住自己。
          </p>
          <p className="fi" style={{fontSize:"15px",color:"var(--soft)",lineHeight:2,marginBottom:"20px"}}>
            很多人會在理解之後，短暫地改變。但當情緒上來，當關係拉扯，當壓力變大，很容易又回到原本的狀態。
          </p>
          <p className="fi" style={{fontSize:"15px",color:"var(--soft)",lineHeight:2}}>
            這不是因為你不夠努力，而是因為——穩定這件事，需要被練習。
          </p>
        </div>
      </section>

      <section className="tone-panel fi">
        <div className="tone-panel-inner">
          <div className="tone-kicker">A steady process</div>
          <div className="tone-text">理解是一個開始，<br/>穩定才是你真正帶回生活的力量。</div>
          <p className="tone-sub">陪跑不是催促你變快，而是陪你在關鍵時刻不再回到舊路。</p>
        </div>
      </section>

      {/* 這個過程在做什麼 */}
      <section style={{background:"var(--cream)"}}>
        <div className="CN">
          <div className="slb fi">這個過程在做什麼</div>
          <div className="fi" style={{padding:"48px 52px",background:"var(--w)",borderLeft:"3px solid var(--forest)",marginBottom:"24px"}}>
            <p style={{fontFamily:"'Noto Serif TC',serif",fontSize:"17px",fontWeight:300,color:"var(--text)",lineHeight:1.9,marginBottom:"24px"}}>
              這不是一個快速改變的計畫。
            </p>
            {[
              "慢慢看見——你是怎麼做選擇的",
              "慢慢調整——你在壓力與關係中的位置",
              "讓你在那些原本會失控的時刻，開始有不一樣的反應",
            ].map((s,i) => (
              <div key={i} style={{display:"flex",gap:"14px",marginBottom:"16px"}}>
                <span style={{color:"var(--forest)",flexShrink:0}}>—</span>
                <span style={{fontSize:"15px",color:"var(--soft)",lineHeight:1.9}}>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 你會開始感覺到的 */}
      <section style={{background:"var(--w)"}}>
        <div style={{maxWidth:"620px",margin:"0 auto",padding:"100px 24px"}}>
          <div className="slb fi">你會開始感覺到的</div>
          {[
            "你不再需要一直撐",
            "你可以在情緒裡，慢一點",
            "你開始看得見——哪些是你在承擔，哪些其實不需要",
            "你在關係中，開始有位置",
            "你會發現自己其實可以過得更自在",
          ].map((s,i) => (
            <div key={i} className="fi" style={{display:"flex",gap:"16px",alignItems:"flex-start",padding:"22px 0",borderBottom:"1px solid var(--div)"}}>
              <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"18px",color:"var(--sandm)",flexShrink:0,lineHeight:1.4}}>0{i+1}</span>
              <span style={{fontFamily:"'Noto Serif TC',serif",fontSize:"17px",fontWeight:300,color:"var(--text)",lineHeight:1.7}}>{s}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 適合誰 */}
      <section style={{background:"var(--cream)"}}>
        <div className="CN">
          <div className="slb fi">這適合你，如果</div>
          <div className="deep-fit-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"2px"}}>
            {[
              "你已經走到一個階段，知道這些事情不是一次理解就會改變",
              "你願意花一段時間，慢慢把這件事情穩下來",
            ].map((s,i) => (
              <div key={i} className="deep-fit-card fi" style={{padding:"44px 40px",background:"var(--w)"}}>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"32px",fontWeight:300,color:"var(--sandm)",marginBottom:"20px",lineHeight:1}}>0{i+1}</div>
                <p style={{fontFamily:"'Noto Serif TC',serif",fontSize:"16px",fontWeight:300,color:"var(--text)",lineHeight:1.9}}>{s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 在開始之前 */}
      <section style={{background:"var(--w)"}}>
        <div className="CN">
          <div className="slb fi">在開始之前</div>
          <div className="fi" style={{padding:"48px 52px",background:"var(--cream)",borderLeft:"3px solid var(--sandm)",marginBottom:"32px"}}>
            <p style={{fontSize:"15px",lineHeight:2,color:"var(--soft)",marginBottom:"16px"}}>
              在進入陪跑計畫之前，我們會先安排一個約 30 分鐘的線上對話。
            </p>
            <p style={{fontSize:"15px",lineHeight:2,color:"var(--soft)",marginBottom:"16px"}}>
              這個過程不是評估或篩選，而是讓我們一起確認：你現在的狀態、你希望改變的方向，以及這樣的陪伴方式，是否真的適合你。
            </p>
            <p style={{fontSize:"15px",lineHeight:2,color:"var(--soft)"}}>
              因為這不是一個標準化的課程，每一段陪跑都會依照你的狀態與節奏調整。如果我們都感覺這樣的方式是適合的，才會一起進入接下來的過程。
            </p>
          </div>
        </div>
      </section>

      {/* 如何進入 */}
      <section className="deep-entry-cta">
        <div style={{maxWidth:"560px",margin:"0 auto",padding:"0 24px",textAlign:"center"}}>
          <div className="deep-entry-kicker">如何進入</div>
          <p className="deep-entry-main fi">
            當你開始更清楚自己的狀態，也確認自己想穩定走一段轉變的過程，我們會一起討論這樣的陪伴方式是否適合你。
          </p>
          <p className="deep-entry-sub fi">
            我會陪伴你一起，慢慢看見自己的模式，再決定下一步要走多深。<br/>如果你還沒有開始，可以先從這裡。
          </p>
          <button className="bp fi" onClick={() => go("apply")} style={{background:"var(--sand)",color:"var(--forest)",fontSize:"14px",padding:"16px 40px"}}>
            預約陪跑前 30 分鐘對談
          </button>
        </div>
      </section>

    </div>
  );
}


/* ─── SUBSCRIBE PAGE (年度調頻訂閱) ─────────────────────────────── */
function Subscribe({ go }) {
  useFade();
  const navigate = useNavigate();
  const openRegister = (plan) => {
    navigate(`/register?plan=${plan}`);
    window.scrollTo({ top: 0, behavior: "instant" });
  };
  const experiences = [
    "情緒很多，\n卻說不清楚原因。",
    "關係裡反覆卡住。",
    "生活看似正常，\n心裡卻一直很累。",
    "想理解自己，\n卻不知道從哪裡開始。",
  ];
  const monthlyItems = [
    ["每月狀態", "整理近期情緒與內在變化。"],
    ["關係模式", "看見重複出現的互動模式。"],
    ["當下提醒", "理解現在最需要照顧的部分。"],
    ["前進方向", "給自己下一步的溫柔提醒。"],
  ];
  const plans = [
    {
      badge: "入門體驗",
      title: "先嘗試兩個月",
      price: "NT$2,999",
      note: "平均每月 NT$1,500",
      description: "適合第一次接觸\nSoul State Report 個人狀態整理的人。\n\n給自己兩個月的時間，\n慢慢看見自己正在經歷什麼。",
      features: ["2份個人狀態整理", "連續2個月陪伴", "建立整理自己的習慣"],
      cta: "選擇兩個月體驗",
      plan: "trial",
    },
    {
      badge: "年度節奏",
      title: "年度訂閱方案",
      price: "NT$12,800",
      note: "一年 12 次整理",
      description: "適合想建立長期節奏的人。\n\n透過一年時間，\n慢慢累積對自己的理解。",
      features: ["12份個人狀態整理", "每月一次整理", "累積年度變化紀錄"],
      cta: "選擇年度訂閱",
      plan: "annual",
    },
  ];
  return (
    <div className="page">
      <div className="dark-hero" style={{background:"var(--forest)",padding:"140px 0 100px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 50% 60% at 15% 50%,rgba(255,255,255,.04) 0%,transparent 60%)",pointerEvents:"none"}}/>
        <div className="CN" style={{position:"relative",zIndex:1}}>
          <div className="hero-kicker" style={{fontSize:"12px",letterSpacing:"0.32em",color:"rgba(232,223,208,.58)",marginBottom:"24px",fontFamily:"'Cormorant Garamond',serif",textTransform:"uppercase"}}>SOUL STATE REPORT</div>
          <h1 className="subscribe-hero-title fi">
            個人狀態整理
          </h1>
          <p className="subscribe-hero-copy fi">
            有些感受，<br/>值得被慢慢理解。<br/><br/>
            這不是一個<br/>讓你變得更好的地方。<br/><br/>
            而是陪你慢慢穩下來，<br/>重新看見自己正在經歷什麼。
          </p>
          <button className="bp fi" onClick={() => document.getElementById("subscribe-plans")?.scrollIntoView({ behavior: "smooth" })} style={{background:"var(--sand)",color:"var(--forest)"}}>選擇適合我的節奏</button>
        </div>
      </div>

      <section className="subscribe-section">
        <div className="subscribe-inner">
          <div className="slb fi">這份整理是什麼？</div>
          <div className="subscribe-copy fi">
            <p>每個月，</p>
            <p>你會收到一份專屬於自己的整理。</p>
            <div className="gap"/>
            <p>陪你回頭看看：</p>
            <p>最近的情緒為什麼反覆出現？</p>
            <p>關係裡為什麼總是卡住？</p>
            <p>疲憊感從哪裡來？</p>
            <p>此刻真正需要被照顧的是什麼？</p>
            <div className="gap"/>
            <p>這不是為了預測未來。</p>
            <p>而是為了更理解現在。</p>
          </div>
        </div>
      </section>

      <section className="subscribe-section alt">
        <div className="subscribe-inner">
          <div className="slb fi">你可能正在經歷</div>
          <div className="subscribe-list two-col fi">
            {experiences.map((item) => (
              <div className="subscribe-list-item" key={item}>{item}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="subscribe-section">
        <div className="subscribe-inner">
          <div className="slb fi">每個月，你會收到什麼？</div>
          <div className="subscribe-preview fi">
            <img src="/monthly-status-preview.png" alt="本月穩定報告預覽" />
            <div className="subscribe-preview-caption">
              這不是分析<br/>是你最近的狀態
            </div>
          </div>
          <div className="subscribe-list fi">
            {monthlyItems.map(([title, body]) => (
              <div className="subscribe-list-item" key={title}>
                <strong>{title}</strong><br/>{body}
              </div>
            ))}
          </div>
          <div className="subscribe-preview is-muted fi">
            <img src="/energy-structure-preview.png" alt="個人能量結構與穩定度分析圖預覽" />
            <div className="subscribe-preview-caption">
              這不是感覺<br/>是有邏輯的
            </div>
          </div>
        </div>
      </section>

      <section className="tone-panel fi">
        <div className="tone-panel-inner">
          <div className="tone-kicker">MONTHLY RHYTHM</div>
          <div className="tone-text">每個月回來一次，<br/>不是為了變好，<br/>是為了看懂自己。</div>
          <p className="tone-sub">
            狀態會變，理解也會慢慢變清楚。<br/>
            給自己一個固定回來整理的節奏，<br/>
            陪伴自己走過每一個階段。
          </p>
        </div>
      </section>

      <section id="subscribe-plans" className="subscribe-test-section alt">
        <div className="subscribe-test-head fi">
          <div className="home-intro-kicker">PLANS</div>
          <h2>選擇適合你的整理節奏</h2>
          <p>
            不用急著找到答案。<br/><br/>
            先選擇最適合現在的方式開始。
          </p>
        </div>
        <div className="subscribe-test-plans">
          {plans.map((plan) => (
            <article className="subscribe-test-card fi" key={plan.plan}>
              <div className="subscribe-test-badge">{plan.badge}</div>
              <h3>{plan.title}</h3>
              <div className="subscribe-test-price">{plan.price}</div>
              <div className="subscribe-test-note">{plan.note}</div>
              <p className="subscribe-test-description">{plan.description}</p>
              <ul className="subscribe-test-features">
                {plan.features.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <button className="bp" onClick={() => openRegister(plan.plan)}>{plan.cta}</button>
            </article>
          ))}
        </div>
      </section>

      <section className="subscribe-section">
        <div className="subscribe-inner">
          <div className="slb fi">你可能想知道</div>
          <div className="faq-list fi">
            <Faq q="我適合哪個方案？" a={<>如果你是第一次接觸，<br/>建議從兩個月體驗開始。<br/><br/>如果已經準備好建立固定節奏，<br/>可以直接選擇年度訂閱。</>} />
            <Faq q="兩個月結束後怎麼辦？" a={<>兩個月體驗結束後，<br/>如果你希望繼續收到每月整理，<br/>可以再選擇年度訂閱方案。</>} />
            <Faq q="這份整理適合什麼樣的人？" a={<>適合想更理解自己、<br/>整理情緒、<br/>看懂關係模式，<br/>或建立固定自我覺察習慣的人。</>} />
          </div>
        </div>
      </section>

      <section className="green-cta">
        <div style={{maxWidth:"720px",margin:"0 auto",padding:"0 24px"}}>
          <p className="green-cta-title fi" style={{marginBottom:"34px"}}>
            真正的改變，<br/>
            不是成為另一個人。<br/>
            而是看見那些一直被忽略的自己。
          </p>
          <div className="fi" style={{width:"64px",height:"1px",background:"rgba(232,223,208,.42)",margin:"0 auto 34px"}}/>
          <p className="green-cta-title fi">
            先不用急著找到答案。<br/><br/>
            給自己一份時間，<br/>慢慢看懂現在的自己。
          </p>
          <div className="green-cta-actions fi">
            <button className="bp" onClick={() => document.getElementById("subscribe-plans")?.scrollIntoView({ behavior: "smooth" })} style={{background:"var(--sand)",color:"var(--forest)"}}>開始我的整理節奏</button>
          </div>
        </div>
      </section>
    </div>
  );
}

function SubscribeTest() {
  useFade();
  const navigate = useNavigate();
  const openRegister = (plan) => {
    navigate(`/register?plan=${plan}`);
    window.scrollTo({ top: 0, behavior: "instant" });
  };
  const plans = [
    {
      badge: "入門體驗",
      title: "先嘗試兩個月",
      price: "NT$2,999",
      note: "平均每月 NT$1,500",
      description: "如果你第一次接觸 Soul State Report 個人狀態整理，可以先給自己兩個月的時間，慢慢看見自己正在經歷什麼。",
      features: [
        "連續 2 個月收到 Soul State Report 個人狀態整理",
        "每月一份關於自己的狀態整理",
        "協助看見情緒、關係與當下狀態",
        "體驗後再決定是否續訂",
      ],
      cta: "選擇兩個月體驗",
      plan: "trial",
    },
    {
      badge: "年度陪伴",
      title: "年度訂閱方案",
      price: "NT$12,800",
      note: "一年 12 份 Soul State Report 個人狀態整理",
      description: "適合想長期整理自己，透過一年時間看見情緒、關係與內在狀態變化的人。",
      features: [
        "一年共 12 份 Soul State Report 個人狀態整理",
        "每月一次狀態整理",
        "協助累積自我覺察紀錄",
        "適合建立長期穩定節奏",
      ],
      cta: "選擇年度訂閱",
      plan: "annual",
    },
  ];

  return (
    <div className="page">
      <section className="subscribe-test-hero">
        <div className="CN" style={{position:"relative",zIndex:1}}>
          <div className="hero-kicker fi" style={{fontSize:"12px",letterSpacing:"0.32em",color:"rgba(232,223,208,.58)",marginBottom:"26px",fontFamily:"'Cormorant Garamond',serif",textTransform:"uppercase"}}>Soul State Report 個人狀態整理</div>
          <h1 className="subscribe-test-title fi">選擇適合你的整理節奏</h1>
          <p className="subscribe-test-copy fi">
            不用急著長期承諾，<br/>
            也不用一次想清楚所有答案。<br/><br/>
            先從最適合現在的方式開始。
          </p>
        </div>
      </section>

      <section className="subscribe-test-section">
        <div className="subscribe-test-head fi">
          <div className="home-intro-kicker">PREVIEW</div>
          <h2>你會收到的整理</h2>
          <p>原本的 Soul State Report 個人狀態整理圖片會保留，作為你理解這份整理樣貌的參考。</p>
        </div>
        <div className="subscribe-test-preview-grid">
          <div className="subscribe-preview fi">
            <img src="/monthly-status-preview.png" alt="本月穩定報告預覽" />
            <div className="subscribe-preview-caption">
              這不是分析<br/>是你最近的狀態
            </div>
          </div>
          <div className="subscribe-preview is-muted fi">
            <img src="/energy-structure-preview.png" alt="個人能量結構與穩定度分析圖預覽" />
            <div className="subscribe-preview-caption">
              這不是感覺<br/>是有邏輯的
            </div>
          </div>
        </div>
      </section>

      <section id="subscribe-test-plans" className="subscribe-test-section alt">
        <div className="subscribe-test-head fi">
          <div className="home-intro-kicker">PLANS</div>
          <h2>選擇適合你的整理節奏</h2>
          <p>
            不用急著長期承諾，<br/>
            也不用一次想清楚所有答案。<br/><br/>
            先從最適合現在的方式開始。
          </p>
        </div>
        <div className="subscribe-test-plans">
          {plans.map((plan) => (
            <article className="subscribe-test-card fi" key={plan.plan}>
              <div className="subscribe-test-badge">{plan.badge}</div>
              <h3>{plan.title}</h3>
              <div className="subscribe-test-price">{plan.price}</div>
              <div className="subscribe-test-note">{plan.note}</div>
              <p className="subscribe-test-description">{plan.description}</p>
              <ul className="subscribe-test-features">
                {plan.features.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <button className="bp" onClick={() => openRegister(plan.plan)}>{plan.cta}</button>
            </article>
          ))}
        </div>
      </section>

      <section className="subscribe-test-final">
        <h2 className="fi">先不用急著找到答案。</h2>
        <p className="fi">
          選一個適合現在的節奏，<br/>
          慢慢看懂自己。
        </p>
        <button className="bp fi" onClick={() => document.getElementById("subscribe-test-plans")?.scrollIntoView({ behavior: "smooth" })} style={{background:"var(--sand)",color:"var(--forest)"}}>
          開始選擇方案
        </button>
      </section>
    </div>
  );
}

function Register({ go }) {
  useFade();
  const location = useLocation();
  const queryPlan = new URLSearchParams(location.search).get("plan");
  const normalizePlan = (value) => value === "annual" ? "annual" : "trial";
  const [form, setForm] = useState({
    plan: normalizePlan(queryPlan),
    name: "",
    email: "",
    line: "",
    pain: "",
    state: "",
    note: "",
  });
  const [sending, setSending] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    setForm((prev) => ({ ...prev, plan: normalizePlan(new URLSearchParams(location.search).get("plan")) }));
  }, [location.search]);

  const planLabels = {
    trial: "先嘗試兩個月｜NT$2,999",
    annual: "年度訂閱方案｜NT$12,800",
  };
  const h = e => setForm({ ...form, [e.target.name]: e.target.value });
  const submitForm = async () => {
    if (!form.plan || !form.name || !form.email || !form.line || !form.pain || !form.state || !form.note) {
      setErr("請填寫方案、姓名、Email、LINE / IG 與三個問題");
      return;
    }
    setErr("");
    setSending(true);
    try {
      await submitLead({
        type: "Soul State Report 個人狀態整理登記",
        plan: planLabels[form.plan],
        name: form.name,
        email: form.email,
        contact: form.line,
        pain: form.pain,
        state: form.state,
        note: form.note,
        raw: {
          方案選擇: planLabels[form.plan],
          最在意的痛點: form.pain,
          想改善的狀態: form.state,
          其他補充: form.note,
        },
      });
      setSending(false);
      go("subscribeThanks");
    } catch(e) {
      console.error(e);
      setSending(false);
      setErr("送出時發生問題，請稍後再試一次");
    }
  };

  const IS = {
    background:"var(--cream)", border:"1px solid var(--div)",
    borderBottom:"2px solid var(--sandm)",
    padding:"13px 15px", fontSize:"15px",
    fontFamily:"'Noto Sans TC',sans-serif",
    color:"var(--text)", outline:"none",
    borderRadius:0, width:"100%", WebkitAppearance:"none",
  };
  const TA = { ...IS, height:"128px", resize:"vertical" };
  const LS = { fontSize:"12px", letterSpacing:"0.15em", color:"var(--wg)", display:"block", marginBottom:"8px" };
  const FG = { marginBottom:"26px" };

  return (
    <div className="page">
      <div className="dark-hero subscribe-start-hero" style={{background:"var(--forest)",padding:"112px 0 66px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 50% 60% at 20% 45%,rgba(255,255,255,.05) 0%,transparent 62%)",pointerEvents:"none"}}/>
        <div className="CN" style={{position:"relative",zIndex:1}}>
          <div className="hero-kicker" style={{fontSize:"12px",letterSpacing:"0.32em",color:"rgba(232,223,208,.5)",marginBottom:"24px",fontFamily:"'Cormorant Garamond',serif",textTransform:"uppercase"}}>Register</div>
          <h1 className="subscribe-start-title fi">
            選擇你的整理節奏
          </h1>
          <p className="subscribe-start-copy fi">
            先留下你的狀態，<br/>我們會依照你選擇的方案與你聯繫。
          </p>
        </div>
      </div>

      <section style={{background:"var(--w)"}}>
        <div className="CN">
          <div style={{maxWidth:"680px"}}>
            <div style={{marginBottom:"46px"}}>
              <div className="slb" style={{marginBottom:"28px"}}>方案選擇</div>
              <label style={LS}>請選擇方案 <span style={{color:"#B85A5A"}}>*</span></label>
              <div className="register-plan-grid">
                {Object.entries(planLabels).map(([value, label]) => (
                  <label className={`register-plan-option ${form.plan === value ? "is-selected" : ""}`} key={value}>
                    <input
                      type="radio"
                      name="plan"
                      value={value}
                      checked={form.plan === value}
                      onChange={h}
                    />
                    <span className="register-plan-title">{value === "trial" ? "先嘗試兩個月" : "年度訂閱方案"}</span>
                    <span className="register-plan-price">{label.split("｜")[1]}</span>
                  </label>
                ))}
              </div>
            </div>

            <div style={{marginBottom:"46px"}}>
              <div className="slb" style={{marginBottom:"28px"}}>讓我先了解你</div>
              <div className="form-question" style={FG}>
                <label style={LS}>01 ／ 最近最在意的痛點 <span style={{color:"#B85A5A"}}>*</span></label>
                <textarea style={TA} name="pain" placeholder="可以很簡單，一兩句就好" value={form.pain} onChange={h} />
              </div>
              <div className="form-question" style={FG}>
                <label style={LS}>02 ／ 想改善的狀態 <span style={{color:"#B85A5A"}}>*</span></label>
                <textarea style={TA} name="state" placeholder="例如情緒、關係、工作、生活節奏⋯⋯" value={form.state} onChange={h} />
              </div>
              <div className="form-question" style={FG}>
                <label style={LS}>03 ／ 其他補充 <span style={{color:"#B85A5A"}}>*</span></label>
                <textarea style={TA} name="note" placeholder="你希望我先知道的事" value={form.note} onChange={h} />
              </div>
            </div>

            <div style={{marginBottom:"46px"}}>
              <div className="slb" style={{marginBottom:"28px"}}>基本資料</div>
              <div style={FG}>
                <label style={LS}>姓名 <span style={{color:"#B85A5A"}}>*</span></label>
                <input style={IS} type="text" name="name" placeholder="你的名字" value={form.name} onChange={h} />
              </div>
              <div style={FG}>
                <label style={LS}>Email <span style={{color:"#B85A5A"}}>*</span></label>
                <input style={IS} type="email" name="email" placeholder="your@email.com" value={form.email} onChange={h} />
              </div>
              <div style={FG}>
                <label style={LS}>LINE / IG <span style={{color:"#B85A5A"}}>*</span></label>
                <input style={IS} type="text" name="line" placeholder="方便聯繫你的帳號" value={form.line} onChange={h} />
              </div>
            </div>

            {err && <div style={{fontSize:"13px",color:"#B85A5A",marginBottom:"18px"}}>{err}</div>}
            <button
              onClick={submitForm}
              disabled={sending}
              style={{
                width:"100%", padding:"18px",
                background:"var(--forest)", color:"var(--sand)",
                border:"none", fontSize:"14px", letterSpacing:"0.18em",
                fontFamily:"'Noto Sans TC',sans-serif",
                cursor: sending ? "not-allowed" : "pointer",
                opacity: sending ? 0.6 : 1,
              }}
            >
              {sending ? "送出中⋯⋯" : "送出登記"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function SubscribeStart({ go }) {
  useFade();
  const [form, setForm] = useState({
    name:"", email:"", line:"", pain:"", stuck:"", need:""
  });
  const [ok, setOk] = useState(false);
  const [sending, setSending] = useState(false);
  const [err, setErr] = useState("");
  const h = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submitForm = async () => {
    if (!form.need || !form.name || !form.email || !form.line) {
      setErr("請填寫第 3 題、姓名、Email 和 LINE / IG");
      return;
    }
    setErr("");
    setSending(true);
    try {
      await submitLead({
        type: "每月狀態訂閱前理解",
        name: form.name,
        email: form.email,
        contact: form.line,
        pain: form.pain,
        state: form.stuck,
        note: form.need,
        raw: {
          現在最需要的是什麼: form.need,
        },
      });
      setSending(false);
      setOk(true);
      go("subscribeThanks");
    } catch(e) {
      console.error(e);
      setSending(false);
      setErr("送出時發生問題，請稍後再試一次");
    }
  };

  const IS = {
    background:"var(--cream)", border:"1px solid var(--div)",
    borderBottom:"2px solid var(--sandm)",
    padding:"13px 15px", fontSize:"15px",
    fontFamily:"'Noto Sans TC',sans-serif",
    color:"var(--text)", outline:"none",
    borderRadius:0, width:"100%", WebkitAppearance:"none",
    transition:"border-color .2s",
  };
  const TA = { ...IS, height:"140px", resize:"vertical" };
  const LS = { fontSize:"12px", letterSpacing:"0.15em", color:"var(--wg)", display:"block", marginBottom:"8px" };
  const FG = { marginBottom:"28px" };

  return (
    <div className="page">
      <div className="dark-hero subscribe-start-hero" style={{background:"var(--forest)",padding:"112px 0 66px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 50% 60% at 20% 45%,rgba(255,255,255,.05) 0%,transparent 62%)",pointerEvents:"none"}}/>
        <div className="CN" style={{position:"relative",zIndex:1}}>
          <div className="hero-kicker" style={{fontSize:"12px",letterSpacing:"0.32em",color:"rgba(232,223,208,.5)",marginBottom:"24px",fontFamily:"'Cormorant Garamond',serif",textTransform:"uppercase"}}>Before we begin</div>
          <h1 className="subscribe-start-title fi">
            在開始之前<br/>我想先理解你現在的狀態
          </h1>
          <p className="subscribe-start-copy fi">
            這不是一份正式填寫<br/>只是讓我知道<br/>你現在在哪裡
          </p>
        </div>
      </div>

      <section className="tone-panel subscribe-start-tone fi">
        <div className="tone-panel-inner">
          <div className="tone-kicker">Gently</div>
          <div className="tone-text">你不需要寫很多，<br/>只要寫你此刻最真實的感覺就好。</div>
        </div>
      </section>

      <section style={{background:"var(--w)"}}>
        <div className="CN">
          {ok ? (
            <div style={{padding:"100px 0",textAlign:"center"}}>
              <div style={{fontFamily:"'Noto Serif TC',serif",fontSize:"28px",fontWeight:300,color:"var(--text)",marginBottom:"20px"}}>✦</div>
              <div style={{fontFamily:"'Noto Serif TC',serif",fontSize:"22px",fontWeight:300,color:"var(--text)",marginBottom:"16px"}}>我收到你的狀態了。</div>
              <p style={{fontSize:"14px",color:"var(--soft)",lineHeight:2,maxWidth:"380px",margin:"0 auto"}}>我會先看過你寫下的內容，再透過 Email 或 Line / IG 跟你聯繫。</p>
            </div>
          ) : (
            <div style={{maxWidth:"640px"}}>
              <div style={{marginBottom:"48px"}}>
                <div className="slb" style={{marginBottom:"32px"}}>讓我先了解你</div>

                <div className="form-question" style={FG}>
                  <label style={LS}>01 ／ 最近有沒有一件事，你其實一直在想，但沒有真的說出來？</label>
                  <div className="form-question-note">可以很簡單，一兩句就好</div>
                  <textarea style={TA} name="pain" placeholder="寫下最近一直在心裡的那件事⋯⋯" value={form.pain} onChange={h} />
                </div>

                <div className="form-question" style={FG}>
                  <label style={LS}>02 ／ 在生活或關係裡，你有沒有一種「一直在用同一種方式撐」的感覺？</label>
                  <div className="form-question-note">如果有，那通常會出現在什麼時候？</div>
                  <textarea style={TA} name="stuck" placeholder="例如關係、工作、家庭，或某個反覆出現的狀態⋯⋯" value={form.stuck} onChange={h} />
                </div>

                <div className="form-question" style={FG}>
                  <label style={LS}>03 ／ 你現在最需要的是什麼？ <span style={{color:"#B85A5A"}}>*</span></label>
                  <textarea required style={TA} name="need" placeholder="可以很簡單，寫下你現在最需要的支持或感覺⋯⋯" value={form.need} onChange={h} />
                </div>
              </div>

              <div style={{marginBottom:"48px"}}>
                <div className="slb" style={{marginBottom:"32px"}}>基本資料</div>
                <div style={FG}>
                  <label style={LS}>姓名 <span style={{color:"#B85A5A"}}>*</span></label>
                  <input style={IS} type="text" name="name" placeholder="你的名字" value={form.name} onChange={h} />
                </div>
                <div style={FG}>
                  <label style={LS}>Email <span style={{color:"#B85A5A"}}>*</span></label>
                  <input style={IS} type="email" name="email" placeholder="your@email.com" value={form.email} onChange={h} />
                </div>
                <div style={FG}>
                  <label style={LS}>LINE / IG <span style={{color:"#B85A5A"}}>*</span></label>
                  <input required style={IS} type="text" name="line" placeholder="方便聯繫你的帳號" value={form.line} onChange={h} />
                </div>
              </div>

              <p style={{fontFamily:"'Noto Serif TC',serif",fontSize:"18px",fontWeight:300,color:"var(--text)",lineHeight:1.9,marginBottom:"28px"}}>
                這不是要你準備好<br/>只是讓你開始看見自己
              </p>

              {err && <div style={{fontSize:"13px",color:"#B85A5A",marginBottom:"18px"}}>⚠ {err}</div>}

              <button
                onClick={submitForm}
                disabled={sending}
                style={{
                  width:"100%", padding:"18px",
                  background:"var(--forest)", color:"var(--sand)",
                  border:"none", fontSize:"14px", letterSpacing:"0.18em",
                  fontFamily:"'Noto Sans TC',sans-serif",
                  cursor: sending ? "not-allowed" : "pointer",
                  opacity: sending ? 0.6 : 1,
                  transition:"all .22s",
                }}
              >
                {sending ? "送出中⋯⋯" : "送出"}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function Thanks({ go, subscribe = false }) {
  useFade();
  const lineUrl = "https://line.me/R/ti/p/@567avtfh";
  const title = subscribe ? "我們已經收到你的訂閱了" : "我們已經收到你的預約了";
  const paragraphs = subscribe ? [
    "剛剛那個決定\n其實不太小",
    "你沒有急著解決什麼\n只是想把現在的狀態看清楚一點",
    "我們會從這裡開始",
    "第一個月的整理\n已經在幫你進行了",
    "接下來\n我們會用每個月的方式\n慢慢陪你把狀態看清楚",
    "有些變化\n不會一下子很明顯",
    "可能只是某一天\n你比較早發現自己有點累",
    "或是\n沒有那麼快被情緒帶走\n這些都會慢慢出現",
    "現在\n你不需要多做什麼\n先讓這段過程開始就好",
  ] : [
    "剛剛在填的時候\n你其實已經慢慢把一些狀態說出來了",
    "有些地方\n你可能平常沒有時間去想\n但它一直都在",
    "像是\n一邊把事情做好\n一邊其實有點累",
    "接下來\n我們會先整理你的資料\n再用另一個角度幫你看一次現在的狀態",
    "你不需要先準備什麼\n這幾天\n只要留意一個很小的瞬間就好",
    "有沒有哪一刻\n你其實想停一下\n但還是讓自己繼續往前",
    "先看到這個就夠了\n我們之後會一起看得更清楚",
  ];

  return (
    <div className="page">
      <div className="dark-hero" style={{background:"linear-gradient(145deg,#385B4C 0%,#315143 45%,#24211E 100%)",padding:"118px 0 84px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 55% 65% at 18% 48%,rgba(232,223,208,.08) 0%,transparent 64%)",pointerEvents:"none"}}/>
        <div className="CN" style={{position:"relative",zIndex:1}}>
          <div className="hero-kicker" style={{fontSize:"12px",letterSpacing:"0.32em",color:"rgba(232,223,208,.58)",marginBottom:"28px",fontFamily:"'Cormorant Garamond',serif",textTransform:"uppercase"}}>Received</div>
          <h1 className="subscribe-start-title thanks-title fi">
            {title}
          </h1>
          <div className="subscribe-start-copy thanks-copy fi" style={{display:"grid",gap:"22px",marginBottom:"40px"}}>
            {paragraphs.map((p, i) => <p key={i} style={{margin:0,whiteSpace:"pre-line"}}>{p}</p>)}
          </div>

          {!subscribe && (
            <div className="fi" style={{marginTop:"18px",padding:"30px 0 0",borderTop:"1px solid rgba(232,223,208,.22)"}}>
              <p className="subscribe-start-copy thanks-line-copy" style={{fontSize:"18px",margin:"0 0 24px",color:"rgba(250,247,242,.82)"}}>
                如果你希望後續安排時間更順一點<br/>
                可以先加入我們的 LINE<br/>
                跟我說一聲你的名字<br/>
                我們會一起找一個適合你的時間
              </p>
              <a className="bp" href={lineUrl} target="_blank" rel="noopener" style={{display:"inline-block",background:"var(--sand)",color:"var(--forest)",textDecoration:"none"}}>
                加入 LINE 官方帳號
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ShortAdjust({ go }) {
  useFade();
  const stats = [
    ["情緒狀態｜77%", "最近比較容易把感受留在心裡。"],
    ["人際關係｜72%", "有些外在反應會停留比較久。"],
    ["內在壓力｜81%", "很多事情同時在跑，裡面有點停不下來。"],
  ];
  const includes = [
    "TimeWaver 狀態整理",
    "每月生活化報告",
    "六大面向儀表板",
    "狀態重點回饋",
  ];

  return (
    <div className="page">
      <section className="short-hero">
        <div className="CN" style={{position:"relative",zIndex:1}}>
          <div className="hero-kicker fi" style={{fontSize:"12px",letterSpacing:"0.3em",color:"rgba(232,223,208,.62)",marginBottom:"28px",fontFamily:"'Cormorant Garamond',serif",textTransform:"uppercase"}}>TimeWaver</div>
          <h1 className="short-title fi">短期調整｜TimeWaver</h1>
          <div className="short-copy fi" style={{maxWidth:"620px",marginBottom:"34px"}}>
            <p>如果最近的你<br/>有點亂了節奏。</p>
            <p>很多事情都還在進行。<br/>但心裡好像一直沒有真的安靜下來。</p>
            <p>你不一定需要立刻改變什麼。</p>
            <p>也許只是需要先把最近的狀態整理一下。</p>
          </div>
          <button className="bp fi" onClick={() => go("apply")} style={{background:"var(--sand)",color:"var(--forest)"}}>開始短期調整</button>
        </div>
      </section>

      <section className="short-section">
        <div className="short-inner">
          <div className="short-body fi">
            <p>這是一個 2 個月的短期調整方案。</p>
            <p>透過 TimeWaver 的狀態整理與每月回饋，慢慢把最近混在一起的感受、節奏與拉扯感，重新看清楚。</p>
            <p>不是療癒。<br/>不是命定。<br/>也不是要你變成另一個人。</p>
            <p>而是先幫你回到自己的節奏。</p>
          </div>
        </div>
      </section>

      <section className="short-section alt">
        <div className="short-inner">
          <div className="short-kicker fi">這段時間的你，可能是這樣</div>
          <div className="short-body fi">
            <p>有些事情沒有真的出錯。</p>
            <p>只是最近的你，好像一直在回應外面的事情。</p>
            <p>訊息、工作、關係、情緒、安排。</p>
            <p>一天很快就過去了。</p>
            <p>但安靜下來的時候，腦袋還是在轉。</p>
            <p>有些感受不是很大，只是一直放在後面。</p>
          </div>
        </div>
      </section>

      <section className="short-section">
        <div className="short-inner">
          <div className="short-kicker fi">我們會怎麼幫你整理</div>
          <div className="short-dashboard fi">
            <div className="short-dashboard-title">六大面向儀表板</div>
            <div className="short-dashboard-visual">
              <div className="short-radar" aria-label="TimeWaver 六大面向儀表板">
                <svg viewBox="0 0 420 360" role="img">
                  <polygon points="210,54 320,118 320,246 210,310 100,246 100,118" fill="none" stroke="#D4C8B5" strokeWidth="1.5"/>
                  <polygon points="210,94 285,137 285,227 210,270 135,227 135,137" fill="none" stroke="#DDD5C8" strokeWidth="1.2"/>
                  <polygon points="210,134 250,158 250,206 210,230 170,206 170,158" fill="none" stroke="#DDD5C8" strokeWidth="1.2"/>
                  <line x1="210" y1="54" x2="210" y2="310" stroke="#DDD5C8" strokeWidth="1"/>
                  <line x1="100" y1="118" x2="320" y2="246" stroke="#DDD5C8" strokeWidth="1"/>
                  <line x1="320" y1="118" x2="100" y2="246" stroke="#DDD5C8" strokeWidth="1"/>
                  <polygon points="210,94 284,140 298,228 210,254 136,226 130,136" fill="rgba(72,132,184,.18)" stroke="#4E83B5" strokeWidth="5" strokeLinejoin="round"/>
                  <circle cx="210" cy="94" r="7" fill="#4E83B5"/>
                  <circle cx="284" cy="140" r="7" fill="#4E83B5"/>
                  <circle cx="298" cy="228" r="7" fill="#4E83B5"/>
                  <circle cx="210" cy="254" r="7" fill="#4E83B5"/>
                  <circle cx="136" cy="226" r="7" fill="#4E83B5"/>
                  <circle cx="130" cy="136" r="7" fill="#4E83B5"/>
                  <text className="short-radar-label" x="210" y="22" textAnchor="middle">情緒狀態</text>
                  <text className="short-radar-value" x="210" y="50" textAnchor="middle">77%</text>
                  <text className="short-radar-label" x="345" y="116" textAnchor="start">人際關係</text>
                  <text className="short-radar-value" x="345" y="145" textAnchor="start">72%</text>
                  <text className="short-radar-label" x="345" y="238" textAnchor="start">內在壓力</text>
                  <text className="short-radar-value" x="345" y="267" textAnchor="start">81%</text>
                  <text className="short-radar-label" x="210" y="334" textAnchor="middle">行動與節奏</text>
                  <text className="short-radar-value" x="210" y="360" textAnchor="middle">76%</text>
                  <text className="short-radar-label" x="75" y="238" textAnchor="end">身體感受</text>
                  <text className="short-radar-value" x="75" y="267" textAnchor="end">73%</text>
                  <text className="short-radar-label" x="75" y="116" textAnchor="end">自我狀態</text>
                  <text className="short-radar-value" x="75" y="145" textAnchor="end">70%</text>
                </svg>
              </div>
            </div>
          </div>
          <div className="short-stats fi">
            {stats.map(([title, copy]) => (
              <div className="short-stat" key={title}>
                <strong>{title}</strong>
                <p>{copy}</p>
              </div>
            ))}
          </div>
          <div className="short-body fi">
            <p>最近的狀態，其實不一定會立刻說出口。</p>
            <p>有些節奏、情緒與關係感，會慢慢累積在生活裡。</p>
            <p>我們會先幫你整理出：</p>
          </div>
          <div className="short-checks fi">
            <div className="short-check">最近整體的狀態輪廓</div>
            <div className="short-check">哪些地方正在互相影響</div>
            <div className="short-check">哪兩個部分最需要被看見</div>
          </div>
          <div className="short-body fi" style={{marginTop:"30px"}}>
            <p>讓你不用一直猜自己怎麼了。</p>
          </div>
        </div>
      </section>

      <section className="short-section alt">
        <div className="short-inner">
          <div className="short-kicker fi">你會收到什麼</div>
          <div className="short-cards fi">
            <div className="short-card">
              <h3>第 1 個月</h3>
              <p className="short-body" style={{fontSize:"18px"}}>先整理最近混在一起的狀態。看見最近最明顯的節奏、拉扯感與影響來源。</p>
            </div>
            <div className="short-card">
              <h3>第 2 個月</h3>
              <p className="short-body" style={{fontSize:"18px"}}>開始看見狀態的變化。有些地方會慢慢鬆開，有些地方，也會比較容易回到自己。</p>
            </div>
          </div>
          <div className="short-checks fi">
            {["六大面向狀態整理", "最近最需要被看見的部分", "生活化回饋報告", "一個很小的提醒"].map(x => (
              <div className="short-check" key={x}>✔ {x}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="short-section">
        <div className="short-inner">
          <div className="short-kicker fi">這不是什麼</div>
          <div className="short-checks fi">
            {["心理諮商", "命理分析", "心靈雞湯", "要你正向思考"].map(x => (
              <div className="short-check" key={x}>✘ {x}</div>
            ))}
          </div>
          <div className="short-body fi" style={{marginTop:"34px"}}>
            <p>我們不會告訴你：「你應該變得更好」</p>
            <p>而是陪你慢慢看懂：最近的自己，到底正在經歷什麼。</p>
          </div>
        </div>
      </section>

      <section className="short-section alt">
        <div className="short-inner">
          <div className="short-kicker fi">為什麼建議先做兩個月</div>
          <div className="short-body fi">
            <p>很多狀態，不是一天形成的。</p>
            <p>有些節奏、關係感與內在反應，會慢慢累積在生活裡。</p>
            <p>所以我們不想只看一次。</p>
          </div>
          <div className="short-checks fi">
            <div className="short-check">最近真正影響你的節奏</div>
            <div className="short-check">哪些地方開始改變了</div>
            <div className="short-check">你怎麼慢慢回到自己的步調</div>
          </div>
          <div className="short-body fi" style={{marginTop:"30px"}}>
            <p>兩個月，比較能真正感受到差異。</p>
          </div>
        </div>
      </section>

      <section className="short-price">
        <div style={{maxWidth:"680px",margin:"0 auto"}}>
          <div className="short-kicker fi" style={{justifyContent:"center",color:"rgba(232,223,208,.62)"}}>方案資訊</div>
          <h2 className="fi">短期調整｜2 個月體驗</h2>
          <div className="short-checks fi" style={{maxWidth:"520px",margin:"0 auto 36px",textAlign:"left"}}>
            {includes.map(x => <div className="short-check" key={x} style={{background:"rgba(250,247,242,.08)",color:"rgba(250,247,242,.86)",borderColor:"var(--sand)"}}>{x}</div>)}
          </div>
          <div className="amount fi">NT$2,999</div>
          <button className="bp fi" onClick={() => go("apply")} style={{background:"var(--sand)",color:"var(--forest)",marginTop:"28px"}}>開始短期調整</button>
        </div>
      </section>

      <section className="short-section">
        <div className="short-inner">
          <div className="short-body fi" style={{textAlign:"center"}}>
            <p>有些事情，最近一直放在心裡。</p>
            <p>你不一定要立刻解決它。</p>
            <p>但也許可以先開始看見它。</p>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── ONGOING PAGE (持續中的你) ─────────────────────────────────── */
function Ongoing({ go }) {
  useFade();
  const states = [
    {
      icon:"◎", t:"我現在還算穩，但不想掉回去",
      x:"你已經走過一段，也知道穩定有多重要。這個階段需要的，不是更多努力，而是讓這個狀態可以持續。",
      cta:"了解長期維持的方式", action:"subscribe", label:"年度調頻訂閱"
    },
    {
      icon:"◎", t:"我最近開始有點亂",
      x:"有些情緒開始出現，有些狀態變得不太一樣，但還沒有完全失控。這時候，只需要讓自己先穩下來。",
      cta:"預約短期調整", action:"short", label:"預約"
    },
    {
      icon:"◎", t:"我好像又回到原本的狀態",
      x:"如果你發現一些模式又開始重複，那代表現在的你，需要重新看一次你現在站在哪裡。",
      cta:"回來聊聊你現在的狀態", action:"deep", label:"陪跑計畫"
    },
  ];

  const ways = [
    {
      n:"01", t:"長期維持", sub:"年度調頻訂閱",
      x:"如果你希望讓現在的狀態可以持續，有一個比較穩定的節奏，讓你在生活裡慢慢建立穩定。",
      note:"適合已經有一定基礎的你",
      cta:"了解這個方式", action:"subscribe",
    },
    {
      n:"02", t:"短期調整", sub:"TimeWaver",
      x:"如果你最近有些波動，想先讓自己穩一下，不需要進入長期，可以用比較輕的方式，讓狀態回來。",
      note:"",
      cta:"預約短期調整", action:"short",
    },
    {
      n:"03", t:"重新深入", sub:"陪跑計畫",
      x:"如果你感覺有些狀態又開始重複，或你想更完整地整理現在的位置，也可以再走一段更深的過程。",
      note:"這個方式會依你的狀態討論是否適合",
      cta:"回來聊聊你現在的狀態", action:"deep",
    },
  ];

  return (
    <div className="page">
      <div style={{background:"var(--cream)",padding:"140px 0 80px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 55% 60% at 90% 30%,rgba(212,200,181,.28) 0%,transparent 60%)",pointerEvents:"none"}}/>
        <div className="CN" style={{position:"relative",zIndex:1}}>
          <div className="slb fi">持續中的你</div>
          <h1 className="htit fi" style={{fontSize:"clamp(26px,3.5vw,44px)"}}>你不需要一次做對所有事</h1>
          <p className="hbo fi" style={{maxWidth:"520px"}}>如果你曾經在這裡停下來過，你應該已經開始看見——有些改變，不是一次完成的，而是在不同階段，會有不同的狀態。</p>
        </div>
      </div>

      <section style={{background:"var(--w)"}}>
        <div style={{maxWidth:"620px",margin:"0 auto",padding:"80px 24px"}}>
          {["有時候你很穩","有時候開始撐","有時候你以為自己已經走出來了，但在某些時刻，又回到熟悉的模式"].map((s,i) => (
            <div key={i} className="fi" style={{padding:"18px 0",borderBottom:"1px solid var(--div)"}}>
              <p style={{fontFamily:"'Noto Serif TC',serif",fontSize:"17px",fontWeight:300,color:"var(--text)",lineHeight:1.7}}>{s}</p>
            </div>
          ))}
          <p className="fi" style={{fontSize:"15px",color:"var(--forest)",lineHeight:2,marginTop:"32px",fontFamily:"'Noto Serif TC',serif"}}>
            這些都很正常。你只需要在你現在的位置，選擇一個讓自己不要再回去的方式。
          </p>
        </div>
      </section>

      <section className="tone-panel fi">
        <div className="tone-panel-inner">
          <div className="tone-kicker">Return gently</div>
          <div className="tone-text">回來不是退步，<br/>是你開始知道自己需要什麼。</div>
          <p className="tone-sub">不同階段會需要不同的支持，你可以慢慢選。</p>
        </div>
      </section>

      <section style={{background:"var(--cream)"}}>
        <div className="CN">
          <div className="slb fi">你現在比較接近哪一種狀態？</div>
          <div style={{display:"flex",flexDirection:"column",gap:"2px"}}>
            {states.map((s,i) => (
              <div key={i} className="fi" style={{padding:"44px 48px",background:"var(--w)",display:"flex",gap:"32px",alignItems:"flex-start"}}>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"28px",color:"var(--sandm)",flexShrink:0,lineHeight:1,marginTop:"4px"}}>{s.icon}</div>
                <div style={{flex:1}}>
                  <div style={{fontFamily:"'Noto Serif TC',serif",fontSize:"17px",fontWeight:300,color:"var(--text)",marginBottom:"12px"}}>{s.t}</div>
                  <p style={{fontSize:"14px",color:"var(--soft)",lineHeight:1.9,marginBottom:"20px"}}>{s.x}</p>
                  <button className="bp" onClick={() => go(s.action)} style={{fontSize:"12px",padding:"10px 20px",letterSpacing:"0.12em"}}>{s.cta} →</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{background:"var(--w)"}}>
        <div className="CN">
          <div className="slb fi">你可以用的三種方式</div>
          <div className="ongoing-ways-grid" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"2px"}}>
            {ways.map((w,i) => (
              <div key={i} className="ongoing-way-card fi" style={{padding:"44px 36px",background:"var(--cream)"}}>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"28px",color:"var(--sandm)",marginBottom:"16px",lineHeight:1}}>{w.n}</div>
                <div style={{fontFamily:"'Noto Serif TC',serif",fontSize:"17px",color:"var(--text)",marginBottom:"4px"}}>{w.t}</div>
                <div style={{fontSize:"11px",letterSpacing:"0.15em",color:"var(--forest)",marginBottom:"16px"}}>{w.sub}</div>
                <p style={{fontSize:"13px",color:"var(--soft)",lineHeight:1.9,marginBottom:"16px"}}>{w.x}</p>
                {w.note && <div style={{fontSize:"12px",color:"var(--wg)",marginBottom:"20px",fontStyle:"italic"}}>({w.note})</div>}
                <button className="bp" onClick={() => go(w.action)} style={{fontSize:"12px",padding:"10px 20px",width:"100%"}}>{w.cta}</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="green-cta">
        <div style={{maxWidth:"480px",margin:"0 auto",padding:"0 24px"}}>
          <p className="green-cta-title fi">
            你不需要等到很嚴重，才回來。
          </p>
          <p className="green-cta-text fi">
            很多時候，只是提早一點調整，就會差很多。
          </p>
          <button className="bp fi" onClick={() => go("apply")} style={{background:"var(--sand)",color:"var(--forest)"}}>跟我說說你現在的狀態</button>
        </div>
      </section>
    </div>
  );
}


/* ─── ART PAGE (文章與個案分享) ─────────────────────────────────── */
function Art({ go }) {
  useFade();
  const CSV_URL = "https://docs.google.com/spreadsheets/d/1aQzKf9Pe1lvD4U3UQs5qUuzCgCAObETrZCEeNq5CwE8/export?format=csv&sheet=Sheet1";

  const [arts, setArts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [artExpanded, setArtExpanded] = useState({});
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    fetch(CSV_URL)
      .then(r => r.text())
      .then(text => {
        const rows = [];
        let field = '', row = [], inQ = false;
        for (let i = 0; i < text.length; i++) {
          const c = text[i];
          if (inQ) {
            if (c === '"' && text[i+1] === '"') { field += '"'; i++; }
            else if (c === '"') { inQ = false; }
            else { field += c; }
          } else {
            if (c === '"') { inQ = true; }
            else if (c === ',') { row.push(field); field = ''; }
            else if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
            else if (c !== '\r') { field += c; }
          }
        }
        if (row.length > 0 || field) { row.push(field); rows.push(row); }
        const parsed = rows.slice(1).filter(r => r[0] && r[1])
          .map(r => ({ d:r[0]||'', t:r[1]||'', x:r[2]||'', tg:r[3]||'', url:r[4]||'' }));
        setArts(parsed);
        setLoading(false);
      })
      .catch(() => { setErr(true); setLoading(false); });
  }, []);

  return (
    <div className="page">
      <div style={{background:"var(--cream)",padding:"140px 0 80px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 55% 60% at 90% 30%,rgba(212,200,181,.28) 0%,transparent 60%)",pointerEvents:"none"}}/>
        <div className="CN" style={{position:"relative",zIndex:1}}>
          <div className="slb fi">文章與個案分享</div>
          <h1 className="htit fi" style={{fontSize:"clamp(26px,3.5vw,44px)"}}>如果你還在認識這裡，<br/>從這裡開始最沒有壓力</h1>
          <p className="hbo fi" style={{maxWidth:"500px"}}>透過文字先感受這裡的觀點，慢慢看見自己是否和這裡有關。</p>
        </div>
      </div>

      <section className="tone-panel fi">
        <div className="tone-panel-inner">
          <div className="tone-kicker">Read slowly</div>
          <div className="tone-text">有些句子不是要說服你，<br/>而是讓你在某一刻認出自己。</div>
          <p className="tone-sub">你可以慢慢讀，不急著立刻知道答案。</p>
        </div>
      </section>

      {/* 文章區 — 綠底白字 */}
      <section style={{background:"var(--forest)",padding:"80px 0"}}>
        <div className="CN">
          {loading && (
            <div style={{padding:"60px 0",textAlign:"center",color:"rgba(232,223,208,.5)",fontSize:"14px",letterSpacing:"0.1em"}}>載入中⋯⋯</div>
          )}
          {err && (
            <div style={{padding:"60px 0",textAlign:"center"}}>
              <p style={{fontSize:"14px",color:"rgba(232,223,208,.6)",lineHeight:2}}>文章暫時無法載入，請稍後再試。</p>
            </div>
          )}
          {!loading && !err && arts.length === 0 && (
            <div style={{padding:"60px 0",textAlign:"center"}}>
              <p style={{fontSize:"14px",color:"rgba(232,223,208,.6)",lineHeight:2}}>文章即將發布，敬請期待。</p>
            </div>
          )}
          {!loading && arts.map((a, i) => {
            const isOpen = !!artExpanded[i];
            const shouldClamp = (a.x || "").length > 120 || (a.x || "").includes("\n");
            return (
            <div key={i} style={{
              display:"flex", alignItems:"flex-start", gap:"32px",
              padding:"36px 0", borderBottom:"1px solid rgba(255,255,255,.1)",
              cursor: a.url ? "pointer" : "default",
            }}
            onClick={() => a.url && window.open(a.url, '_blank')}>
              <div style={{flexShrink:0,width:"72px"}}>
                <div style={{fontSize:"11px",letterSpacing:"0.12em",color:"rgba(232,223,208,.5)",lineHeight:1.6}}>{a.d}</div>
                {a.tg && <div style={{fontSize:"11px",letterSpacing:"0.1em",color:"rgba(232,223,208,.6)",marginTop:"6px"}}>{"#"+a.tg}</div>}
              </div>
              <div style={{flex:1}}>
                <div style={{fontFamily:"'Noto Serif TC',serif",fontSize:"17px",fontWeight:300,color:"#fff",marginBottom:"10px",lineHeight:1.6}}>{a.t}</div>
                {a.x && <div style={{
                  fontSize:"13px",color:"rgba(255,255,255,.75)",lineHeight:1.9,whiteSpace:"pre-line",
                  ...(shouldClamp && !isOpen ? {display:"-webkit-box",WebkitLineClamp:6,WebkitBoxOrient:"vertical",overflow:"hidden"} : {})
                }}>{a.x}</div>}
                {shouldClamp && (
                  <button onClick={e => { e.stopPropagation(); setArtExpanded(ex => ({...ex,[i]:!isOpen})); }} style={{
                    background:"transparent",border:"none",padding:0,cursor:"pointer",
                    marginTop:"12px",fontSize:"12px",letterSpacing:"0.15em",
                    color:"rgba(232,223,208,.78)",fontFamily:"'Cormorant Garamond',serif"
                  }}>{isOpen ? "收起 ↑" : "展開更多 ↓"}</button>
                )}
                {a.url && <div style={{marginTop:"12px",fontSize:"12px",letterSpacing:"0.12em",color:"rgba(232,223,208,.7)",fontFamily:"'Cormorant Garamond',serif"}}>閱讀全文 →</div>}
              </div>
            </div>
          )})}
        </div>
      </section>

      {/* 見證區 */}
      <section style={{background:"var(--cream)"}}>
        <div className="CN">
          <div className="slb fi">學員見證</div>
          <h2 style={{fontFamily:"'Noto Serif TC',serif",fontSize:"clamp(18px,2.2vw,26px)",fontWeight:300,color:"var(--text)",marginBottom:"8px"}} className="fi">真實的整理，會留下真實的改變</h2>
          <p style={{fontSize:"13px",color:"var(--wg)",lineHeight:1.9,marginBottom:"48px"}} className="fi">以下是學員的回饋，經本人同意後分享。</p>
          {TESTIMONIALS.map((t, i) => {
            const isExp = expanded[i];
            const content = t.full || t.text;
            const showToggle = !!t.full;
            return (
              <div key={i} style={{padding:"36px 0",borderBottom:"1px solid var(--div)"}}>
                <div style={{fontSize:"13px",color:"var(--gold)",letterSpacing:"3px",marginBottom:"14px"}}>{"★".repeat(t.stars)}</div>
                <div style={{
                  fontFamily:"'Noto Serif TC',serif",fontSize:"15px",fontWeight:300,
                  color:"var(--text)",lineHeight:2,marginBottom:"16px",
                  ...(showToggle && !isExp ? {display:"-webkit-box",WebkitLineClamp:3,WebkitBoxOrient:"vertical",overflow:"hidden"} : {})
                }}>「{showToggle ? content : t.text}」</div>
                {showToggle && (
                  <button onClick={e => { e.stopPropagation(); setExpanded(ex => ({...ex,[i]:!isExp})); }} style={{
                    background:"transparent",border:"none",padding:0,cursor:"pointer",
                    fontSize:"12px",letterSpacing:"0.15em",color:"var(--forest)",
                    fontFamily:"'Cormorant Garamond',serif",marginBottom:"12px"
                  }}>{isExp ? "收起 ↑" : "看更多 ↓"}</button>
                )}
                <div style={{fontSize:"13px",color:"var(--soft)",letterSpacing:".1em",marginBottom:"4px"}}>{t.name}</div>
                <div style={{fontSize:"11px",letterSpacing:"0.2em",color:"var(--forest)",border:"1px solid var(--forest)",display:"inline-block",padding:"3px 12px"}}>{t.tag}</div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="ctab fi">
        <div className="ctab-e es">Next Step</div>
        <h2 className="ctab-t">如果你想更進一步</h2>
        <p className="ctab-x">從文字認識這裡之後，如果你想知道自己現在的狀態，可以從初次體驗開始。</p>
        <button className="bp" onClick={()=>go("apply")}>預約初次穩定體驗</button>
      </div>
    </div>
  );
}


/* ─── APP ────────────────────────────────────────────────────────── */
/* ─── LIFE NUMBER CALCULATOR ─────────────────────────────────────── */

const CNY=[0,384,738,1093,1476,1830,2185,2569,2923,3278,3662,4016,4400,4754,5108,5492,5846,6201,6585,6940,7324,7678,8032,8416,8770,9124,9509,9863,10218,10602,10956,11339,11693,12048,12432,12787,13141,13525,13879,14263,14617,14971,15355,15710,16064,16449,16803,17157,17541,17895,18279,18633,18988,19372,19726,20081,20465,20819,21202,21557,21911,22295,22650,23004,23388,23743,24096,24480,24835,25219,25573,25928,26312,26666,27020,27404,27758,28142,28496,28851,29235,29590,29944,30328,30682,31066,31420,31774,32158,32513,32868,33252,33606,33960,34343,34698,35082,35436,35791,36175,36529,36883,37267,37621,37976,38360,38714,39099,39453,39807,40191,40545,40899,41283,41638,42022,42376,42731,43115,43469,43823,44207,44561,44916,45300,45654,46038,46392,46746,47130,47485,47839,48223,48578,48962,49316,49670,50054,50408,50762,51146,51501,51856,52240,52594,52978,53332,53686,54070,54424,54779];
const LMO=[[0,29,59,88,117,147,176,206,236,265,295,325,354],[0,29,59,88,117,147,176,206,235,265,295,325],[0,30,59,89,118,147,177,206,236,265,295,325],[0,29,59,88,118,147,176,206,235,264,294,324,353],[0,30,60,89,119,148,177,207,236,265,295,325],[0,30,60,89,119,149,178,207,237,266,296,325],[0,29,59,89,118,148,177,207,236,266,295,325,354],[0,29,59,88,118,147,177,207,236,266,295,325],[0,30,59,88,118,148,177,207,236,266,296,325],[0,29,59,88,117,147,176,206,235,265,295,325,354],[0,29,59,88,117,147,176,206,235,265,295,325],[0,30,59,89,118,147,177,206,235,265,295,324,354],[0,30,59,89,118,147,177,206,235,265,295,324],[0,30,60,89,119,148,177,207,236,265,295,324],[0,30,60,89,119,148,178,207,237,266,295,325,354],[0,30,59,89,119,148,178,207,237,266,296,325],[0,30,60,89,119,148,178,208,237,267,296,326],[0,30,59,88,118,147,177,207,236,266,296,325,355],[0,30,59,88,118,147,177,206,236,266,295,325],[0,29,59,88,117,147,176,205,235,265,294,324,354],[0,29,59,88,117,147,176,205,235,264,294,324],[0,30,59,89,118,147,177,206,235,265,294,324],[0,30,59,89,119,148,177,207,236,265,295,324,354],[0,29,59,89,118,148,177,207,236,265,295,324],[0,29,59,89,118,148,178,207,237,266,296,325],[0,30,59,89,118,148,178,207,237,267,296,326,355],[0,29,58,88,117,147,176,206,236,265,295,325],[0,30,59,88,118,147,177,206,236,265,295,325],[0,29,59,88,117,147,176,205,235,264,294,324,354],[0,29,59,88,117,147,176,205,235,264,294,324],[0,29,59,89,118,147,177,206,235,265,294,324,354],[0,30,60,89,119,148,178,207,236,266,295,325],[0,30,60,90,119,149,178,208,237,266,296,325],[0,29,59,89,118,148,177,207,237,266,296,325,354],[0,29,59,88,118,148,177,207,236,266,296,325],[0,29,58,88,117,147,176,206,236,265,295,325],[0,30,59,88,118,147,176,206,236,265,295,325,355],[0,30,59,88,118,147,176,206,235,265,295,325],[0,30,60,89,118,148,177,206,236,265,295,325,354],[0,30,60,89,118,148,177,206,236,265,295,324],[0,30,60,89,119,148,178,207,236,266,295,325],[0,30,60,89,119,149,178,208,237,266,296,325,355],[0,30,59,89,119,148,178,207,237,266,296,325],[0,29,59,88,118,147,177,207,236,266,295,325],[0,30,59,89,118,148,177,207,236,266,296,325,355],[0,29,58,88,117,146,176,205,235,265,295,324],[0,30,59,88,118,147,176,206,235,265,295,324],[0,30,60,89,118,148,177,206,236,265,295,324,354],[0,30,59,89,118,148,177,206,236,265,295,324],[0,30,59,89,119,148,178,207,236,266,295,325,354],[0,29,59,89,118,148,178,207,236,266,295,325],[0,30,59,89,119,148,178,207,237,266,296,325],[0,29,59,88,118,147,177,206,236,266,295,325,354],[0,29,59,88,117,147,177,206,236,266,295,325],[0,30,59,89,118,147,177,206,236,266,296,325],[0,29,59,88,118,147,176,206,235,265,294,324,354],[0,29,59,88,118,147,176,206,235,265,294,324],[0,30,59,89,118,148,177,206,236,265,295,324,354],[0,30,60,90,119,149,178,207,237,266,296,325],[0,29,59,89,118,148,177,207,236,266,295,325],[0,30,59,89,118,148,178,207,237,266,296,325,355],[0,30,59,89,118,148,177,207,237,266,296,325],[0,29,59,88,117,147,176,206,236,265,295,325],[0,30,59,89,118,147,177,206,236,265,295,325,355],[0,30,59,89,118,147,177,206,236,265,295,325],[0,29,59,88,118,147,176,206,235,264,294,324],[0,30,60,90,119,149,178,207,237,266,295,325,355],[0,30,60,89,119,149,178,207,237,266,296,325],[0,29,59,88,118,148,177,207,236,266,295,325,354],[0,29,59,88,118,147,177,207,236,266,295,325],[0,30,59,88,118,147,177,207,236,266,296,325],[0,29,59,88,117,147,176,206,235,265,295,325,354],[0,29,59,88,117,147,176,206,235,265,295,324],[0,30,59,89,118,147,177,206,235,265,295,324],[0,30,60,89,119,148,177,207,236,265,295,325,354],[0,30,60,89,119,148,177,207,236,265,295,324],[0,30,60,89,119,148,178,207,237,266,295,325,354],[0,30,59,89,119,148,178,207,237,266,296,325],[0,30,59,89,119,148,178,207,237,267,296,326],[0,30,59,88,118,147,177,207,236,266,296,325,355],[0,30,59,88,118,147,177,206,236,266,295,325],[0,29,59,88,117,147,176,205,235,265,294,324],[0,30,59,89,118,147,177,206,235,265,294,324,354],[0,30,59,89,118,147,177,206,235,265,294,324],[0,30,59,89,119,148,177,207,236,265,295,324,354],[0,29,59,89,118,148,177,207,236,265,295,324],[0,29,59,89,118,148,178,207,237,266,296,325],[0,30,59,89,118,148,178,207,237,267,296,326,355],[0,30,59,89,118,148,177,207,237,266,296,326],[0,30,59,88,118,147,177,206,236,265,295,325],[0,29,59,88,117,147,176,205,235,264,294,324,354],[0,29,59,88,117,147,176,205,235,264,294,324],[0,29,59,89,118,147,177,206,235,265,294,324],[0,29,59,89,118,148,177,207,236,265,295,324,354],[0,30,60,90,119,149,178,208,237,266,296,325],[0,29,59,89,118,148,177,207,237,266,295,325,354],[0,29,59,88,118,148,177,207,236,266,296,325],[0,30,59,89,118,148,177,207,237,266,296,326],[0,30,59,88,118,147,176,206,236,265,295,325,354],[0,30,59,88,118,147,176,206,235,265,295,325],[0,30,60,89,118,148,177,206,236,265,295,325],[0,30,60,89,119,148,178,207,236,266,295,325,354],[0,30,60,89,119,148,178,207,236,266,295,325],[0,30,60,89,119,149,178,208,237,266,296,325],[0,29,59,88,118,148,177,207,236,266,295,325,354],[0,29,59,88,118,147,177,207,236,266,295,325],[0,30,59,89,118,148,177,207,236,266,296,325,355],[0,29,58,88,117,146,176,205,235,265,295,324],[0,30,59,88,118,147,176,206,235,265,295,324],[0,30,60,89,118,148,177,206,236,265,295,324,354],[0,30,59,89,118,148,177,206,236,265,295,324],[0,30,59,89,119,148,178,207,236,266,295,325],[0,30,59,89,119,148,178,207,237,266,296,325,355],[0,30,59,89,118,148,178,207,237,266,296,325],[0,29,59,88,118,147,177,206,236,266,295,325,354],[0,29,59,88,117,147,176,206,236,266,295,325],[0,30,59,89,118,147,177,206,236,266,295,325],[0,29,59,88,118,147,176,206,235,265,294,324,354],[0,29,59,88,118,147,176,206,235,265,294,324],[0,30,59,89,118,148,177,206,236,265,294,324],[0,29,59,89,119,148,178,207,236,266,295,325,354],[0,29,59,89,118,148,177,207,236,266,295,325],[0,30,59,89,118,148,178,207,237,266,296,325],[0,29,59,88,117,147,177,206,236,266,295,325,354],[0,29,59,88,117,147,176,206,236,265,295,325],[0,30,59,89,118,147,177,206,236,265,295,325,355],[0,30,59,89,118,147,177,206,235,265,295,325],[0,30,60,89,119,148,177,207,236,265,295,325],[0,30,60,90,119,149,178,207,237,266,295,325,355],[0,30,60,89,119,148,178,207,237,266,295,325],[0,29,59,88,118,148,177,207,236,266,295,325],[0,29,59,89,118,148,177,207,237,266,296,325,355],[0,30,59,88,118,147,177,207,236,266,296,325],[0,29,59,88,117,147,176,206,235,265,295,325,354],[0,29,59,88,117,147,176,206,235,265,295,324],[0,30,59,89,118,147,177,206,235,265,295,324],[0,30,60,89,119,148,177,207,236,265,295,324,354],[0,30,60,89,119,148,177,207,236,265,295,324],[0,30,60,89,119,148,178,207,237,266,295,325],[0,30,60,89,119,149,178,208,237,267,296,326,355],[0,30,59,89,119,148,178,207,237,267,296,326],[0,29,59,88,118,147,177,207,236,266,296,325],[0,29,59,88,117,147,176,206,235,265,295,324,354],[0,29,59,88,117,147,176,205,235,265,294,324],[0,30,59,89,118,147,177,206,235,265,294,324,354],[0,30,59,89,118,147,177,206,235,265,294,324],[0,30,59,89,118,148,177,207,236,265,295,324],[0,30,59,89,119,148,178,207,237,266,295,325,354],[0,29,59,89,118,148,178,207,237,266,295,325],[0,30,59,89,118,148,178,207,237,267,296,326],[0,29,59,88,118,147,177,206,236,266,295,325,355]];

function solarToLunar(sy, sm, sd) {
  const LBASE = 1900;
  const BASE = new Date(1900, 0, 31);
  const target = new Date(sy, sm-1, sd);
  const targetOff = Math.round((target - BASE) / 86400000);
  
  for (let i = 0; i < CNY.length - 1; i++) {
    const thisStart = CNY[i];
    const nextStart = CNY[i+1];
    if (targetOff >= thisStart && targetOff < nextStart) {
      const offset = targetOff - thisStart;
      const months = LMO[i];
      for (let m = 0; m < months.length; m++) {
        const nextOff = (m+1 < months.length) ? months[m+1] : (nextStart - thisStart);
        if (offset >= months[m] && offset < nextOff) {
          return { y: LBASE + i, m: m+1, d: offset - months[m] + 1 };
        }
      }
    }
  }
  return null;
}


const NUM_DESC = {
  1: { color:"#C4875A", bg:"#FDF5EF", title:"1 — 開創者", sub:"獨立、自信、領導力",
       x:"數字 1 是宇宙給你的第一道光，象徵開始、方向，以及主導權。你本質上就帶著很強的創造力與推進力，你來到這裡，不是為了複製別人的人生，而是為了走出一條屬於你自己的路。很多時候，你的卡住並不是因為能力不夠，而是因為太想做好、太怕走錯，反而讓自己停在原地。真正屬於你的力量，是回到選擇，而不是證明。",
       note:"試著慢慢放下對他人的依賴，你的直覺其實一直都很準。先走一步，再調整方向，這就是屬於你的節奏。",
       oil:"乳香（Frankincense）幫助你連結內在的智慧與神性，穩定信念。檸檬（Lemon）帶來思緒清晰與開創的行動力。",
       yr:"今年的能量方向是重新確立自己的方向與目標。這一年特別適合做出屬於自己的選擇，而不是順著慣性走。" },
  2: { color:"#7A9EBD", bg:"#EFF5FA", title:"2 — 協調者", sub:"合作、耐心、平衡",
       x:"數字 2 是一種很細膩的存在。你能感受到別人感受不到的情緒與氛圍，也能在關係裡創造溫柔的流動，這不是脆弱，這是你的天賦。但你也很容易在關係中忘記自己。你不是來承擔所有人的情緒，你是來學會「在連結中，也能保有自己」。",
       note:"當情緒來的時候，先不要急著處理關係，先回來讓自己穩下來。練習說出「我需要什麼」，而不是只顧著別人需要什麼。",
       oil:"薰衣草（Lavender）幫助神經系統放鬆，安定情緒。依蘭依蘭（Ylang Ylang）釋放壓力，讓關係回到柔和與信任。",
       yr:"今年特別容易感受到關係中的張力與失衡。這是一個讓你重新看見自己在關係中位置的時機，要學會保有關係當中的界線。" },
  3: { color:"#9B7ABD", bg:"#F5F0FA", title:"3 — 表達者", sub:"喜悅、溝通、社交",
       x:"數字 3 帶著一種很輕盈的光。你的存在本身就具有感染力，你的表達、你的笑容、你的想法都能讓世界多一點亮度。你適合分享、創作、說話、表達，因為當你開口，世界就會開始回應你。你的課題不是「再更努力」，而是讓你的能量有一個出口。",
       note:"不要等到完美才開始，也不需要讓每個人都喜歡你。當你願意表達，你的價值才會被看見。",
       oil:"甜橙（Sweet Orange）喚醒喜悅與創造能量。佛手柑（Bergamot）提升自信，幫助你更自然地表達自己。",
       yr:"今年的能量方向是表達與溝通。這一年你說出口的話，比你想像的更有重量，要讓自己的能量保持流動與彈性。" },
  4: { color:"#6B8C6B", bg:"#EFF5EF", title:"4 — 建構者", sub:"秩序、務實、安全感",
       x:"數字 4 是讓一切落地的力量。你有能力把抽象的想法一步一步變成真實，你擅長規劃、執行、建立結構，是那種可以把事情撐起來的人。但同時你也很容易把責任扛太多。真正的安全感不是來自外在的掌控，而是你內在的穩定。",
       note:"允許自己有彈性，允許自己休息。你不需要一直撐著才是有價值的。",
       oil:"雪松（Cedarwood）帶來穩定與支持。岩蘭草（Vetiver）幫助接地，讓心安定下來。",
       yr:"今年的能量方向是穩固與建立，也會有機會很多的開花結果。特別適合整理生活中的基礎，重新整理建構自己的想法與行為。" },
  5: { color:"#BD9A5A", bg:"#FBF6EE", title:"5 — 探索者", sub:"變化、冒險、多樣性",
       x:"數字 5 帶著風的氣息。你渴望自由、變化與體驗，不喜歡被限制，也不適合過於單一的生活。你適應力很強，也能從不同經驗中快速學習。但當你一直在追求新鮮感，你的能量就會開始分散。你不是不能自由，而是需要一個方向。",
       note:"當你覺得躁動的時候，先停一下。問問自己，現在這個選擇是逃離，還是成長？",
       oil:"薄荷（Peppermint）帶來清晰與專注。薑（Ginger）幫助行動與決策。",
       yr:"今年充滿變動的能量，容易遇到改變或轉折。這不一定是不穩定，而是一個重新選擇的機會，如果心煩或是累了，特別適合去大自然充電。" },
  6: { color:"#BD7A7A", bg:"#FAF0F0", title:"6 — 照顧者", sub:"責任、家庭、奉獻",
       x:"數字 6 帶著溫柔而穩定的愛。你很自然地會去照顧別人，在關係裡給出支持與安全感。但當你一直在付出，卻沒有好好照顧自己，你的愛就會變成消耗。你不是要成為所有人的支撐，你是要學會讓愛流動。",
       note:"學會說不，學會保護自己的界線。當你先照顧好自己，你給出去的愛才會是自由的。",
       oil:"玫瑰（Rose）幫助打開心與愛的流動。天竺葵（Geranium）平衡情緒與關係能量。",
       yr:"今年的主題圍繞著責任與關係。特別適合重新整理：你在哪些地方承擔了太多，因為你總是習慣性的付出與給予，忽略了自己的狀態，這一年多給自己一些療癒休息的機會。" },
  7: { color:"#7A8EBD", bg:"#EFF2FA", title:"7 — 探究者", sub:"內觀、智慧、獨處",
       x:"數字 7 帶著一種安靜而深層的力量。你喜歡思考，喜歡理解事情的本質，你需要獨處，也需要空間去整理自己的內在。你的直覺很強，只是你有時候會懷疑它。你不是要遠離世界，而是要找到一種既能獨處，也能連結的方式。",
       note:"不要只停在思考，去體驗，去感受。當知識遇上經驗，才會變成真正的智慧。",
       oil:"檀香（Sandalwood）幫助冥想與沉澱。乳香（Frankincense）穩定思緒，深化覺察。",
       yr:"今年是一個向內深探的年份。適合停下來，透過進修學習、吃喝玩樂，在心情穩定的狀態下好好整理自己真正相信什麼、真正需要什麼。" },
  8: { color:"#8A8A8A", bg:"#F5F5F5", title:"8 — 承接者", sub:"權力、財富、影響力",
       x:"數字 8 是一種很強的實現能量。你有能力把想法變成結果，也有能力去承接金錢與資源，你對世界有影響力。但當你過度追求成果，或是想掌控一切，壓力就會開始堆積。真正的豐盛不是抓住，而是讓能量流動。",
       note:"當你願意分享，當你讓資源流動，你會發現豐盛會回到你身上。",
       oil:"廣藿香（Patchouli）連結物質與穩定。薑（Ginger）強化行動與決策力。",
       yr:"今年是心想事成的一年，能量方向是承接與資源。你在物質與責任層面的議題會特別明顯，所以正心正念，正向思考是你這一年的最大原則。" },
  9: { color:"#BD7AAD", bg:"#FAF0F8", title:"9 — 完成者", sub:"放下、大愛、轉化",
       x:"數字 9 帶著一種完成與釋放的力量。你的人生會經歷很多結束與轉換，也很容易對他人產生深層的理解與同理。你有一種很大的愛，但也容易把自己放在最後。你來這裡的課題是學會放下。",
       note:"結束不是失去，是讓新的東西進來。當你願意放手，你會發現你其實變得更自由。",
       oil:"絲柏（Cypress）幫助釋放與流動。沒藥（Myrrh）在轉化中帶來穩定與保護。",
       yr:"今年最大課題就是斷捨離，是一個完成與放下的年份。給自己多點時間好好獨處與思考，有些事情到了該結束的時候，放下也是一種主導。" },
};

const NUM_REL = {
  2:  { title:"青澀靠近的關係", x:"這段關係很像「有點陌生，但又慢慢靠近」。彼此之間帶著禮貌與距離，有一種剛剛好的尊重感。", note:"如果開始過度小心，這段關係就會停在表面。", lesson:"在保有距離的同時，也允許真實靠近。", oil:"玫瑰（Rose）幫助敞開心，讓靠近變得安全。薰衣草（Lavender）安定緊張，讓關係慢慢流動。" },
  3:  { title:"兩小無猜的關係", x:"這段關係的氛圍是輕鬆的，很像朋友，很會聊天，也很會鬥嘴，笑著笑著就熟了。", note:"當鬥嘴開始變成情緒，玩笑變成刺，關係就會開始消耗。", lesson:"讓表達是連結，而不是傷人。", oil:"甜橙（Sweet Orange）帶來輕盈與歡樂，讓互動更自然。佛手柑（Bergamot）緩和評價焦慮，讓表達更自由。" },
  4:  { title:"緊密但容易忽略尊重的關係", x:"這段關係是「很靠近的」，會很自然地走進彼此生活，但也正因為太熟、太近，有時候反而會忘記「尊重」。", note:"當你開始覺得被忽略，其實界線已經模糊了。", lesson:"越親近，越要記得尊重。", oil:"雪松（Cedarwood）穩定關係的結構與安全感。廣藿香（Patchouli）幫助雙方在親密中保有各自的根。" },
  5:  { title:"瞬間點燃的關係", x:"這段關係很快，當感覺對了，很多事情就是一瞬間發生，靠近很快、決定很快、變化也很快。", note:"當你還沒看清楚就已經走很深，後面容易跟不上。", lesson:"在速度裡，保留覺察。", oil:"薄荷（Peppermint）帶來清醒的覺察，讓速度裡有方向。薑（Ginger）幫助衝動轉化為行動力。" },
  6:  { title:"療癒與照顧的關係", x:"這段關係很容易從關心開始，彼此照顧、陪伴、療癒，有溫度，也有依賴。", note:"當照顧變成責任，或不知不覺開始委屈，愛就會變重。", lesson:"照顧彼此，但不要忘記自己。", oil:"天竺葵（Geranium）平衡付出與接收的能量。玫瑰（Rose）讓愛流動，而不是變成負擔。" },
  7:  { title:"享受與探索的關係", x:"這段關係有一種「一起體驗人生」的感覺，一起吃、一起玩、一起享受，同時也在探尋更深的意義。", note:"如果只剩外在享受，卻沒有內在連結，會開始空。", lesson:"在享受之中，也要有靈魂的交流。", oil:"檀香（Sandalwood）深化靈魂的連結與共鳴。乳香（Frankincense）在享受中帶來更深的意義感。" },
  8:  { title:"共創與合作的關係", x:"這段關係很適合一起做事，彼此像夥伴，特別容易出現「一起創造什麼」的感覺。", note:"當開始計較付出，關係就會變成角力。", lesson:"合作，不是競爭。", oil:"薑（Ginger）強化共同推進的行動力。黑胡椒（Black Pepper）激發合作的熱情與動力。" },
  9:  { title:"課題與化解的關係", x:"這段關係很深，常常帶著「好像不是第一次遇見」的感覺，很多情緒、很多糾結。", note:"當你一直放不下，卻又很累，其實這段關係在做一件事。", lesson:"化解課題，而不是再延續。", oil:"絲柏（Cypress）幫助釋放舊有的情緒與糾結。沒藥（Myrrh）在深層的連結中帶來穩定與保護。" },
  10: { title:"像朋友的同步關係", x:"這段關係很像同儕，沒有太多壓力，一個人有想法，另一個人很容易就會跟上，節奏是同步的。", note:"當彼此沒有主見，只是跟著走，關係會失去方向。", lesson:"同步，但不失去自己。", oil:"佛手柑（Bergamot）維持輕盈的同步感。尤加利（Eucalyptus）幫助保持清晰的自我方向。" },
  11: { title:"獨立又連結的關係", x:"這段關係很特別，大部分時間各自獨立，但某些時刻又會突然很有共識、一起往前。", note:"當意見不合，很容易變成冷戰，但其實不是不在意，是太在意。", lesson:"學會表達，而不是用沉默對抗。", oil:"薰衣草（Lavender）緩和冷戰時的緊繃情緒。羅馬洋甘菊（Roman Chamomile）幫助溫柔地說出內心的話。" },
  12: { title:"有趣但帶委屈的關係", x:"這段關係是輕鬆、有趣的，相處起來不無聊，但有時候會藏著一種沒有被說出來的委屈。", note:"當雙方狀態都不好，很容易因為小事起口角，其實不是那件事的問題。", lesson:"把感受說出來，而不是累積。", oil:"玫瑰草（Palmarosa）讓委屈浮出，讓感受被看見。橙花（Neroli）化解累積的小情緒，回到輕盈的互動。" },
};

const NUM_CHALLENGE = {
  0: { title:"0 — 放大狀態",
       x:"這個數字不是沒有，而是「全部同時存在」。你像一個放大器，情緒、狀態、好與不好，都會被擴大呈現。有時候你會非常清晰、有力量，但也可能在沒有預警的情況下突然掉下來。",
       note:"當你開始懷疑自己「怎麼又變了」，或覺得自己很極端，其實不是你不穩，是你的感受本來就比較強。",
       lesson:"學會穩住自己的節奏，而不是想讓自己「一直一樣」。",
       oil:"岩蘭草（Vetiver）讓浮動的能量落地，穩住過強的感受。乳香（Frankincense）拉回內在中心，讓混亂重新歸位。" },
  1: { title:"1 — 用力過頭",
       x:"你天生就有推進力，也習慣靠自己撐起很多事情。但久了，會變成「不相信別人做得到」，甚至連放鬆都會有罪惡感。",
       note:"當你已經很累，但還是覺得不能停，或開始對他人標準越來越高。",
       lesson:"真正的力量，不是一直撐，而是知道什麼時候可以放手。",
       oil:"黑胡椒（Black Pepper）釋放過度緊繃的推進力，讓行動回到剛剛好。佛手柑（Bergamot）鬆開對完美的執著，讓努力可以被溫柔承接。" },
  2: { title:"2 — 太容易受影響",
       x:"你很敏感，也很能感受他人，這讓你在人際關係中很有連結力，但同時，也容易失去自己的位置。",
       note:"當你開始因為別人的情緒，而影響自己的一整天，甚至懷疑是不是自己的問題。",
       lesson:"你可以感受別人，但不用成為別人。",
       oil:"天竺葵（Geranium）平衡情緒的起伏，讓你回到自己的節奏。依蘭依蘭（Ylang Ylang）安撫過度外放的感受，讓心重新安住在自己身上。" },
  3: { title:"3 — 說不出來",
       x:"你內在其實很有感受，也有很多想法，但不一定習慣表達，常常會忍到一個點，才一次爆發。",
       note:"當你開始覺得委屈、卡住，或心裡很多話，但就是說不出口。",
       lesson:"表達不是為了被理解，而是讓你不再壓抑。",
       oil:"羅勒（Basil）打開表達的通道，讓卡住的話有出口。檸檬（Lemon）清理壓抑的情緒，讓思緒變得清晰而輕盈。" },
  4: { title:"4 — 責任太重",
       x:"你很可靠，也很願意承擔，但有時候，會默默把不屬於你的責任也背起來。",
       note:"當你開始覺得壓力很大，卻又覺得「好像只有我能做」。",
       lesson:"負責任很珍貴，但不代表什麼都要你負責。",
       oil:"雪松（Cedarwood）穩住過度承擔的壓力，讓你重新站回自己的位置。廣藿香（Patchouli）拉回分散的能量，讓責任回到該在的地方。" },
  5: { title:"5 — 不安與變動",
       x:"你對變化很敏感，也很需要自由，但當內在沒有穩住時，外在的變動，會讓你更不安。",
       note:"當你開始覺得什麼都不對，一直想換環境、換關係、換方向。",
       lesson:"穩定不是不變，而是你在哪裡都不會失去自己。",
       oil:"甜橙（Sweet Orange）安撫內在的不安，讓情緒慢慢沉穩下來。檀香（Sandalwood）穩定漂浮的心，讓你在變動中依然安定。" },
  6: { title:"6 — 付出過多",
       x:"你很會愛人，也很願意多做一點，但容易在關係裡忽略自己，久了會變成「我做這麼多，為什麼沒人看見」。",
       note:"當你開始覺得委屈、不被珍惜，甚至開始計較付出。",
       lesson:"愛不是犧牲，而是雙向流動。",
       oil:"玫瑰（Rose）喚醒自我價值，讓愛不再只向外流動。橙花（Neroli）化解累積的委屈，讓關係回到溫柔的平衡。" },
  7: { title:"7 — 退開與孤單",
       x:"你需要空間，也習慣自己消化，這讓你很有深度，但有時候，也會不自覺把人隔在外面。",
       note:"當你開始什麼都不想說，或覺得「反正說了也沒人懂」。",
       lesson:"你可以慢慢來，但不需要一個人撐全部。",
       oil:"乳香（Frankincense）打開內在連結，讓孤單有被理解的空間。杜松（Juniper）釋放封閉與防備，讓你慢慢願意靠近世界。" },
  8: { title:"8 — 控制與比較",
       x:"你很在意成果，也有很強的目標感，但當安全感不夠時，容易透過控制或比較來確認自己的位置。",
       note:"當你開始覺得不公平，或忍不住拿自己跟別人比較。",
       lesson:"真正的力量，是你不需要透過外在來證明自己。",
       oil:"檸檬（Lemon）清理混亂與比較的思緒，讓你看見真正的方向。黑胡椒（Black Pepper）把注意力拉回行動，讓力量回到自己身上。" },
};

function calcChallenge(sy, sm, sd) {
  const rd = n => { while (n > 9) n = String(n).split("").reduce((a,x)=>a+parseInt(x),0); return n; };
  const sdg = s => String(s).split("").reduce((a,x)=>a+(parseInt(x)||0),0);
  const m = rd(sdg(sm)); const d = rd(sdg(sd)); const y = rd(sdg(sy));
  const c1 = Math.abs(d - m); const c2 = Math.abs(y - d);
  return Math.abs(c2 - c1);
}

function calcPath(total) {
  const raw = total;
  if (raw <= 9) return { raw, display:String(raw), final:raw };
  const s1 = String(raw).split("").reduce((a,x)=>a+parseInt(x),0);
  if (s1 <= 9) return { raw, step1:s1, display:raw+"/"+s1, final:s1 };
  const s2 = String(s1).split("").reduce((a,x)=>a+parseInt(x),0);
  return { raw, step1:s1, step2:s2, display:raw+"/"+s1+"/"+s2, final:s2 };
}

function sumD(s) { return String(s).split("").reduce((a,x)=>a+(parseInt(x)||0),0); }

function NumCard({ label, lifePath, yrPath, thisYear }) {
  const d = NUM_DESC[lifePath.final];
  if (!d) return null;
  const yn = yrPath ? yrPath.final : null;
  return (
    <div style={{padding:"44px 48px",background:d.bg,borderLeft:"3px solid "+d.color,marginBottom:"24px"}}>
      <div style={{fontSize:"11px",letterSpacing:"0.28em",color:d.color,marginBottom:"14px",fontFamily:"'Cormorant Garamond',serif",textTransform:"uppercase"}}>{label}</div>
      <div style={{display:"flex",alignItems:"baseline",gap:"14px",marginBottom:"6px",flexWrap:"wrap"}}>
        <div style={{fontFamily:"'Noto Serif TC',serif",fontSize:"clamp(20px,2.8vw,28px)",fontWeight:300,color:"var(--text)"}}>{d.title}</div>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"22px",color:d.color,letterSpacing:"0.06em"}}>{lifePath.display}</div>
      </div>
      {d.sub && <div style={{fontSize:"12px",letterSpacing:"0.15em",color:d.color,marginBottom:"16px",fontFamily:"'Cormorant Garamond',serif"}}>{d.sub}</div>}
      <p style={{fontSize:"14px",lineHeight:2,color:"var(--soft)"}}>{d.x}</p>
      {d.note && <div style={{marginTop:"20px",paddingTop:"20px",borderTop:"1px solid rgba(0,0,0,0.07)"}}><div className="num-mini-label">靈魂小叮嚀</div><p style={{fontSize:"14px",lineHeight:2,color:"var(--soft)"}}>{d.note}</p></div>}
      {yn && NUM_DESC[yn] && <div style={{marginTop:"20px",paddingTop:"20px",borderTop:"1px solid rgba(0,0,0,0.07)"}}><div style={{fontSize:"11px",letterSpacing:"0.25em",color:"var(--forest)",marginBottom:"10px",fontFamily:"'Cormorant Garamond',serif",textTransform:"uppercase"}}>流年數 · {thisYear}</div><div style={{display:"flex",alignItems:"baseline",gap:"12px",marginBottom:"12px",flexWrap:"wrap"}}><div style={{fontFamily:"'Noto Serif TC',serif",fontSize:"18px",fontWeight:300,color:"var(--text)"}}>{NUM_DESC[yn].title}</div><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"18px",color:"var(--forest)",letterSpacing:"0.06em"}}>{yrPath.display}</div></div><p style={{fontSize:"14px",lineHeight:2,color:"var(--soft)"}}>{NUM_DESC[yn].yr}</p></div>}
      {d.oil && <div style={{marginTop:"20px",paddingTop:"20px",borderTop:"1px solid rgba(0,0,0,0.07)"}}><div className="num-mini-label">精油建議</div><p style={{fontSize:"13px",lineHeight:1.9,color:"var(--wg)"}}>{d.oil}</p></div>}
    </div>
  );
}

function RelCard({ relPath }) {
  const n = relPath.final;
  const d = NUM_REL[n];
  if (!d) return null;
  return (
    <div style={{padding:"44px 48px",background:"var(--w)",borderLeft:"3px solid var(--sandm)",marginBottom:"24px"}}>
      <div style={{fontSize:"11px",letterSpacing:"0.28em",color:"var(--sandm)",marginBottom:"14px",fontFamily:"'Cormorant Garamond',serif",textTransform:"uppercase"}}>關係數</div>
      <div style={{display:"flex",alignItems:"baseline",gap:"14px",marginBottom:"6px",flexWrap:"wrap"}}>
        <div style={{fontFamily:"'Noto Serif TC',serif",fontSize:"clamp(20px,2.8vw,28px)",fontWeight:300,color:"var(--text)"}}>{d.title}</div>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"22px",color:"var(--sandm)",letterSpacing:"0.06em"}}>{n}</div>
      </div>
      <p style={{fontSize:"14px",lineHeight:2,color:"var(--soft)",marginBottom:"16px"}}>{d.x}</p>
      {d.note && <div style={{padding:"16px 20px",background:"rgba(212,200,181,.12)",borderLeft:"2px solid var(--sandm)",marginBottom:"16px"}}><div className="num-mini-label">狀態留意</div><p style={{fontSize:"13px",lineHeight:1.9,color:"var(--soft)",margin:0}}>{d.note}</p></div>}
      {d.lesson && <div style={{fontSize:"13px",color:"var(--forest)",lineHeight:1.9}}><span style={{letterSpacing:"0.1em",fontFamily:"'Cormorant Garamond',serif"}}>核心功課 → </span>{d.lesson}</div>}
      {d.oil && <div style={{marginTop:"16px",paddingTop:"16px",borderTop:"1px solid rgba(0,0,0,0.06)"}}><div className="num-mini-label">精油建議</div>{d.oil.split("。").filter(s=>s.trim()).map((line,i)=><p key={i} style={{fontSize:"13px",lineHeight:1.9,color:"var(--wg)",marginBottom:"4px"}}>{line.trim()}。</p>)}</div>}
    </div>
  );
}

function ChallengeCard({ sy, sm, sd }) {
  const n = (sy && sm && sd) ? calcChallenge(sy, sm, sd) : null;
  if (n === null) return null;
  const d = NUM_CHALLENGE[n];
  if (!d) return null;
  return (
    <div style={{padding:"44px 48px",background:"var(--cream)",borderLeft:"3px solid var(--sandm)",marginBottom:"24px"}}>
      <div style={{fontSize:"11px",letterSpacing:"0.28em",color:"var(--sandm)",marginBottom:"14px",fontFamily:"'Cormorant Garamond',serif",textTransform:"uppercase"}}>挑戰數</div>
      <div style={{display:"flex",alignItems:"baseline",gap:"14px",marginBottom:"20px",flexWrap:"wrap"}}>
        <div style={{fontFamily:"'Noto Serif TC',serif",fontSize:"clamp(20px,2.8vw,28px)",fontWeight:300,color:"var(--text)"}}>{d.title}</div>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"22px",color:"var(--sandm)",letterSpacing:"0.06em"}}>{n}</div>
      </div>
      <p style={{fontSize:"14px",lineHeight:2,color:"var(--soft)",marginBottom:"20px"}}>{d.x}</p>
      <div style={{padding:"20px 24px",background:"rgba(212,200,181,.15)",borderLeft:"2px solid var(--sandm)",marginBottom:"16px"}}><div className="num-mini-label">狀態留意</div><p style={{fontSize:"13px",lineHeight:1.9,color:"var(--soft)",margin:0}}>{d.note}</p></div>
      <div style={{fontSize:"13px",color:"var(--forest)",lineHeight:1.9}}><span style={{letterSpacing:"0.1em",fontFamily:"'Cormorant Garamond',serif"}}>核心功課 → </span>{d.lesson}</div>
      {d.oil && <div style={{marginTop:"16px",paddingTop:"16px",borderTop:"1px solid rgba(0,0,0,0.06)"}}><div className="num-mini-label">精油建議</div>{d.oil.split("。").filter(s=>s.trim()).map((line,i)=><p key={i} style={{fontSize:"13px",lineHeight:1.9,color:"var(--wg)",marginBottom:"4px"}}>{line.trim()}。</p>)}</div>}
    </div>
  );
}

function NumCalc({ go }) {
  const [sy, setSy] = useState(""); const [sm, setSm] = useState(""); const [sdy, setSdy] = useState("");
  const [sy2, setSy2] = useState(""); const [sm2, setSm2] = useState(""); const [sd2, setSd2] = useState("");
  const [result, setResult] = useState(null); const [err, setErr] = useState("");
  const thisYear = new Date().getFullYear();

  const calc = () => {
    setErr(""); setResult(null);
    if (!sy||!sm||!sdy||String(sy).length<4) { setErr("請輸入完整的出生年月日"); return; }
    if (parseInt(sm)<1||parseInt(sm)>12||parseInt(sdy)<1||parseInt(sdy)>31) { setErr("日期格式不正確"); return; }
    const solarLife = calcPath(sumD(sy)+sumD(sm)+sumD(sdy));
    const solarYr   = calcPath(sumD(String(thisYear))+sumD(sm)+sumD(sdy));
    // 農曆主命數
    let lunarLife = null;
    let lunarYr = null;
    let lunarDate = null;
    try {
      const lDate = solarToLunar(parseInt(sy), parseInt(sm), parseInt(sdy));
      lunarDate = lDate;
      lunarLife = calcPath(sumD(String(lDate.y))+sumD(String(lDate.m))+sumD(String(lDate.d)));
      lunarYr = calcPath(sumD(String(thisYear))+sumD(String(lDate.m))+sumD(String(lDate.d)));
    } catch(e) {}
    let relPath = null;
    if (sy2&&sm2&&sd2) {
      // 關係數用兩人農曆主命數相加
      const myLunar = lunarLife || solarLife;
      let l2Solar = calcPath(sumD(sy2)+sumD(sm2)+sumD(sd2)).final;
      let l2Lunar = l2Solar;
      try {
        const lDate2 = solarToLunar(parseInt(sy2), parseInt(sm2), parseInt(sd2));
        l2Lunar = calcPath(sumD(String(lDate2.y))+sumD(String(lDate2.m))+sumD(String(lDate2.d))).final;
      } catch(e) {}
      let rn = myLunar.final + l2Lunar;
      while (rn > 12) rn = String(rn).split("").reduce((a,x)=>a+parseInt(x),0);
      if (rn < 2) rn = 2;
      relPath = { final: rn };
    }
    setResult({
      solarLife,
      solarYr,
      lunarLife,
      lunarYr,
      relPath,
      solarDate:{ y:parseInt(sy), m:parseInt(sm), d:parseInt(sdy) },
      lunarDate
    });
  };

  const IS = { background:"var(--cream)", border:"1px solid var(--div)", borderBottom:"2px solid var(--sandm)", padding:"13px 15px", fontSize:"15px", fontFamily:"'Noto Sans TC',sans-serif", color:"var(--text)", outline:"none", borderRadius:0, width:"100%", WebkitAppearance:"none" };
  const LS = { fontSize:"12px", letterSpacing:"0.15em", color:"var(--wg)", display:"block", marginBottom:"7px" };

  return (
    <div className="page">
      <div style={{background:"var(--cream)",padding:"140px 0 80px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 55% 60% at 90% 30%,rgba(212,200,181,.26) 0%,transparent 65%)",pointerEvents:"none"}}/>
        <div className="CN" style={{position:"relative",zIndex:1}}>
          <div className="slb">生命數字 · Numerology</div>
          <h1 className="htit" style={{fontSize:"clamp(28px,3.8vw,44px)"}}>認識你的生命數字</h1>
          <p className="hbo" style={{maxWidth:"540px"}}>數字不是命運，而是一個看見自己的角度。輸入你的出生日期，了解你的主命數、流年數與挑戰數。</p>
        </div>
      </div>
      <section style={{background:"var(--w)"}}>
        <div className="CN">
          <div className="slb">你的出生日期</div>
          <div className="num-date-grid" style={{marginBottom:"36px"}}>
            <div><label style={LS}>年份（西元）</label><input style={IS} type="number" placeholder="例：1990" value={sy} onChange={e=>setSy(e.target.value)} /></div>
            <div><label style={LS}>月份</label><input style={IS} type="number" placeholder="8" value={sm} min={1} max={12} onChange={e=>setSm(e.target.value)} /></div>
            <div><label style={LS}>日期</label><input style={IS} type="number" placeholder="15" value={sdy} min={1} max={31} onChange={e=>setSdy(e.target.value)} /></div>
          </div>
          <div className="num-rel-panel">
            <div style={{fontFamily:"'Noto Serif TC',serif",fontSize:"14px",color:"var(--text)",marginBottom:"6px"}}>選填 — 計算關係數</div>
            <div style={{fontSize:"13px",color:"var(--wg)",lineHeight:1.9,marginBottom:"20px"}}>輸入對方的出生日期，計算你們之間的關係數。</div>
            <div className="num-date-grid">
              <div><label style={LS}>對方年份（西元）</label><input style={IS} type="number" placeholder="例：1988" value={sy2} onChange={e=>setSy2(e.target.value)} /></div>
              <div><label style={LS}>月份</label><input style={IS} type="number" placeholder="3" value={sm2} min={1} max={12} onChange={e=>setSm2(e.target.value)} /></div>
              <div><label style={LS}>日期</label><input style={IS} type="number" placeholder="22" value={sd2} min={1} max={31} onChange={e=>setSd2(e.target.value)} /></div>
            </div>
          </div>
          {err && <div style={{fontSize:"13px",color:"#B85A5A",marginBottom:"18px"}}>⚠ {err}</div>}
          <button className="bp" onClick={calc}>計算我的數字</button>
        </div>
      </section>
      {result && (
        <section style={{background:"var(--cream)"}}>
          <div className="CN">
            <div className="num-birthday-panel">
              <div className="num-birthday-card">
                <div className="num-birthday-label">Solar Birthday</div>
                <div className="num-birthday-date">
                  國曆 {result.solarDate.y} 年 {result.solarDate.m} 月 {result.solarDate.d} 日
                </div>
              </div>
              {result.lunarDate && (
                <div className="num-birthday-card">
                  <div className="num-birthday-label">Lunar Birthday</div>
                  <div className="num-birthday-date">
                    農曆 {result.lunarDate.y} 年 {result.lunarDate.m} 月 {result.lunarDate.d} 日
                  </div>
                </div>
              )}
            </div>

            {/* 說明區塊 */}
            <div className="num-guide-panel" style={{marginBottom:"40px",padding:"36px 44px",background:"var(--w)",borderLeft:"3px solid var(--sandm)"}}>
              <div style={{fontFamily:"'Noto Serif TC',serif",fontSize:"16px",color:"var(--text)",marginBottom:"20px"}}>數字怎麼看</div>
              <div className="num-guide-grid">
                <div>
                  <div style={{fontSize:"11px",letterSpacing:"0.22em",color:"var(--forest)",marginBottom:"10px",fontFamily:"'Cormorant Garamond',serif",textTransform:"uppercase"}}>主命數</div>
                  <p style={{fontSize:"13px",color:"var(--soft)",lineHeight:1.9}}>你這一生的主要能量方向，像是你天生的底色。來自你的出生日期，代表你在人生裡最核心的課題、天賦與模式。不會改變。</p>
                </div>
                <div>
                  <div style={{fontSize:"11px",letterSpacing:"0.22em",color:"var(--forest)",marginBottom:"10px",fontFamily:"'Cormorant Garamond',serif",textTransform:"uppercase"}}>流年數</div>
                  <p style={{fontSize:"13px",color:"var(--soft)",lineHeight:1.9}}>你今年特別需要面對的能量主題。每一年都不同，是你當下所處的周期位置，幫助你理解今年為什麼會對某些事特別有感。</p>
                </div>
              </div>
              <div style={{borderTop:"1px solid var(--div)",paddingTop:"20px"}}>
                <div style={{fontSize:"11px",letterSpacing:"0.22em",color:"var(--sandm)",marginBottom:"12px",fontFamily:"'Cormorant Garamond',serif",textTransform:"uppercase"}}>陽曆 vs 農曆</div>
                <p style={{fontSize:"13px",color:"var(--soft)",lineHeight:1.9,marginBottom:"16px"}}>兩個系統反映的是不同層次的自己，都看才能有更完整的理解。有些人陽曆和農曆的數字相同，有些人不同——不同的人往往會覺得其中一個特別「準」。</p>
                <div className="num-lunar-grid">
                  <div style={{padding:"14px 18px",background:"var(--cream)",borderLeft:"2px solid var(--sandm)"}}>
                    <div style={{fontSize:"11px",letterSpacing:"0.18em",color:"var(--sandm)",marginBottom:"6px",fontFamily:"'Cormorant Garamond',serif"}}>陽曆</div>
                    <p style={{fontSize:"12px",color:"var(--soft)",lineHeight:1.8}}>工作狀態、初次認識、起心動念——你在外部世界裡行走的節奏與樣貌。</p>
                  </div>
                  <div style={{padding:"14px 18px",background:"var(--cream)",borderLeft:"2px solid var(--forest)"}}>
                    <div style={{fontSize:"11px",letterSpacing:"0.18em",color:"var(--forest)",marginBottom:"6px",fontFamily:"'Cormorant Garamond',serif"}}>農曆</div>
                    <p style={{fontSize:"12px",color:"var(--soft)",lineHeight:1.8}}>私底下的狀態、關係熟悉後、事情的結果與落實——你內在的時間感與自然韻律。</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 陽曆主命數 + 流年數 */}
            <div style={{marginBottom:"32px"}}>
              <div className="num-section-title">陽曆 <span>Solar</span></div>
              <NumCard label="主命數 · 流年數" lifePath={result.solarLife} yrPath={result.solarYr} thisYear={thisYear} />
            </div>

            {/* 農曆主命數 + 流年數 */}
            {result.lunarLife && (
              <div style={{marginBottom:"48px"}}>
                <div className="num-section-title">農曆 <span>Lunar</span></div>
                <NumCard label="主命數 · 流年數" lifePath={result.lunarLife} yrPath={result.lunarYr} thisYear={thisYear} />
              </div>
            )}

            {/* 關係數 */}
            {result.relPath && (
              <div style={{marginBottom:"48px"}}>
                <div className="num-section-title">關係數 <span>Relation</span></div>
                <RelCard relPath={result.relPath} />
              </div>
            )}

            {/* 挑戰數 */}
            <div style={{marginBottom:"48px"}}>
              <div className="num-section-title">挑戰數 <span>Challenge</span></div>
              <div style={{fontSize:"13px",color:"var(--wg)",lineHeight:1.9,marginBottom:"20px",padding:"16px 20px",background:"var(--w)",borderLeft:"2px solid var(--sandm)"}}>挑戰數代表你在人生中最容易反覆卡住的內在模式，它不是你的缺點，而是你最容易過度或失衡的那個點。當你開始看懂它，這個挑戰反而會變成你的穩定力。</div>
              <ChallengeCard sy={sy} sm={sm} sd={sdy} />
              <div className="num-insight-panel">
                <div className="num-insight-card">
                  <div className="num-insight-mark">01</div>
                  <p>挑戰數不是你哪裡不好，而是你這一生會反覆遇到、也有機會轉化成力量的地方。</p>
                </div>
                <div className="num-insight-card">
                  <div className="num-insight-mark">02</div>
                  <p>當你看懂自己的挑戰，你就不會再用錯方式對待自己。</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="num-result-cta">
              <div className="num-cta-kicker">Next Step</div>
              <p className="num-cta-text">數字是一個起點，<br/>真正的整理需要更深一層的陪伴。</p>
              <div className="num-cta-actions">
                <button className="bp" onClick={()=>go("apply")} style={{background:"var(--sand)",color:"var(--forest)"}}>預約初次穩定體驗</button>
                <button className="bp num-cta-secondary" onClick={()=>go("aware")}>回到自我覺察</button>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}


function AppInner() {
  const navigate = useNavigate();
  const location = useLocation();
  const go = p => {
    const paths = { home:"/", start:"/start", aware:"/aware", num:"/num", deep:"/deep", about:"/about", art:"/art", apply:"/apply", ongoing:"/ongoing", short:"/short", frequency:"/frequency", subscribe:"/subscribe", subscribeTest:"/subscribe-test", subscribeStart:"/subscribe-start", register:"/register", thanks:"/thanks", subscribeThanks:"/subscribe-thanks" };
    navigate(paths[p] || "/");
    window.scrollTo({ top: 0, behavior: "instant" });
  };
  const cur = {
    "/":"home", "/start":"start", "/aware":"aware", "/num":"num", "/deep":"deep",
    "/about":"about", "/art":"art", "/apply":"apply",
    "/ongoing":"ongoing", "/short":"short", "/frequency":"frequency", "/subscribe":"subscribe", "/subscribe-test":"subscribeTest", "/subscribe-start":"subscribeStart", "/register":"register",
    "/thanks":"thanks", "/subscribe-thanks":"subscribeThanks"
  }[location.pathname] || "home";

  return (
    <>
      <Styles />
      <Nav cur={cur} go={go} />
      <main>
        <Routes>
          <Route path="/" element={<Home go={go} />} />
          <Route path="/start" element={<Start go={go} />} />
          <Route path="/aware" element={<Aware go={go} />} />
          <Route path="/num" element={<NumCalc go={go} />} />
          <Route path="/deep" element={<Deep go={go} />} />
          <Route path="/about" element={<About go={go} />} />
          <Route path="/art" element={<Art go={go} />} />
          <Route path="/apply" element={<Apply go={go} />} />
          <Route path="/ongoing" element={<Ongoing go={go} />} />
          <Route path="/short" element={<ShortAdjust go={go} />} />
          <Route path="/frequency" element={<Frequency go={go} />} />
          <Route path="/subscribe" element={<Subscribe go={go} />} />
          <Route path="/subscribe-test" element={<SubscribeTest />} />
          <Route path="/subscribe-start" element={<SubscribeStart go={go} />} />
          <Route path="/register" element={<Register go={go} />} />
          <Route path="/thanks" element={<Thanks go={go} />} />
          <Route path="/subscribe-thanks" element={<Thanks go={go} subscribe />} />
          <Route path="*" element={<Home go={go} />} />
        </Routes>
      </main>
      <Footer go={go} />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}
