import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";

const PHOTO = "https://raw.githubusercontent.com/sophibaby-ui/sofia-website4/main/public/sofia.png";

/* ─── STYLES ─────────────────────────────────────────────────── */
const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Noto+Serif+TC:wght@300;400;500&family=Noto+Sans+TC:wght@300;400&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    :root{
      --w:#FAF7F2; --cream:#F5F0E8; --sand:#E8DFD0; --sandm:#D4C8B5;
      --wg:#9E9087; --text:#2C2825; --soft:#6B6259; --div:#DDD5C8;
      --forest:#3D5A4C; --flt:#5A7A68; --gold:#B8A882; --nav:72px;
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
      .page>section .slb{font-size:15px !important;letter-spacing:.18em !important;color:#4A433D !important;margin-bottom:34px !important}
      .page>section .slb::before{width:46px !important;background:#B8A882 !important}
      p,.cx,.ptx,.tier-tx,.art-x,.fsx,.fqa,.chkt,.testi-text{font-size:16px !important;color:#4E4741 !important;line-height:2 !important}
      .tier-tit,.art-t,.fst,.ct,.dt{color:#2C2825 !important}
      .px,.bx,.fd,.ful2 li,.fc{color:rgba(250,247,242,.72) !important}
      .home-compare-label{font-size:16px !important;letter-spacing:.16em !important}
      .home-cta-text{color:#FFFFFF !important;font-size:24px !important;line-height:1.8 !important}
      .home-tool-link{font-size:16px !important;letter-spacing:.08em !important;color:var(--forest) !important}

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
      .home-results{grid-template-columns:repeat(3,1fr) !important;gap:1px !important;background:rgba(250,247,242,.18) !important}
      .home-results>div{padding:30px 10px !important;background:var(--forest) !important;min-height:210px !important;display:flex !important;flex-direction:column !important;align-items:center !important;justify-content:center !important}
      .home-results>div>div:nth-child(1){font-size:28px !important;color:rgba(250,247,242,.9) !important;margin-bottom:14px !important}
      .home-results>div>div:nth-child(2){font-size:20px !important;color:#FFFFFF !important;margin-bottom:10px !important}
      .home-results>div>div:nth-child(3){font-size:14px !important;color:rgba(250,247,242,.82) !important;line-height:1.8 !important}
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
      .page section [style*="font-size: 16px"]{font-size:18px !important}
      .page section [style*="font-size: 17px"]{font-size:19px !important}
      .page section .slb,
      .page section .slb2,
      .page section [style*="letter-spacing: 0.25em"]{font-size:16px !important;line-height:1.7 !important}
      .page section .bp,
      .page section .bg,
      .page section .fsb,
      .page section .pb{font-size:16px !important;line-height:1.5 !important}
    }
    @media(max-width:390px){
      .htit{font-size:28px}.mh-t{font-size:26px}.ctab-t{font-size:24px}.apl-t{font-size:24px}
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
      <nav className={[sc || mob ? "sc" : "", !sc && !mob && ["subscribe","deep","apply","about"].includes(cur) ? "dk" : ""].filter(Boolean).join(" ")}>
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
  return (
    <div className="page">

      {/* ── HERO ── */}
      <div className="home-hero" style={{minHeight:"100vh",display:"flex",alignItems:"center",background:"var(--cream)",position:"relative",overflow:"hidden"}}>
        {/* 背景光暈流動感 */}
        <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 60% 80% at 75% 40%,rgba(232,215,200,.35) 0%,transparent 65%)",pointerEvents:"none",zIndex:0}}/>
        <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 40% 50% at 85% 70%,rgba(212,190,175,.2) 0%,transparent 60%)",pointerEvents:"none",zIndex:0}}/>

        {/* 右側照片 */}
        <div className="home-photo" style={{position:"absolute",right:0,top:0,height:"100%",width:"52%",zIndex:1}}>
          <img src={PHOTO} alt="Sofia" style={{
            height:"100%", width:"100%",
            objectFit:"cover", objectPosition:"left top",
            display:"block",
          }} />
          {/* 模糊邊界 — 左側 */}
          <div style={{position:"absolute",inset:0,background:"linear-gradient(to right, var(--cream) 0%, rgba(245,240,232,0.6) 15%, rgba(245,240,232,0.1) 35%, transparent 55%)"}}/>
          {/* 模糊邊界 — 底部 */}
          <div style={{position:"absolute",inset:0,background:"linear-gradient(to top, var(--cream) 0%, rgba(245,240,232,0.5) 12%, transparent 30%)"}}/>
          {/* 模糊邊界 — 頂部 */}
          <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom, var(--cream) 0%, rgba(245,240,232,0.3) 8%, transparent 22%)"}}/>
        </div>

        {/* 文字區 */}
        <div className="home-text" style={{position:"relative",zIndex:2,maxWidth:"1200px",width:"100%",margin:"0 auto",padding:"140px 60px 100px"}}>
          <div style={{maxWidth:"480px"}}>
            <div className="slb fi">Sofia · 蘇菲療癒轉化</div>
            <h1 className="fi" style={{fontFamily:"'Noto Serif TC',serif",fontSize:"clamp(30px,4vw,54px)",fontWeight:300,color:"var(--text)",lineHeight:1.3,marginBottom:"28px"}}>
              你不是不會，<br/>你只是一直在用<br/>同一種方式撐。
            </h1>
            <p className="fi" style={{fontSize:"clamp(14px,1.4vw,16px)",color:"var(--soft)",lineHeight:2,marginBottom:"44px"}}>
              我幫助你在情緒與關係中穩住自己，<br/>讓你在關鍵時刻，不再被情緒拉走。
            </p>
            <button className="bp fi" onClick={() => go("apply")} style={{fontSize:"14px",padding:"16px 40px"}}>預約初次穩定體驗</button>
          </div>
        </div>
      </div>

      {/* ── 痛點區 ── */}
      <section style={{background:"var(--w)"}}>
        <div style={{maxWidth:"560px",margin:"0 auto",padding:"100px 24px"}}>
          <div className="slb fi">你可能正在這裡</div>
          {[
            "你很努力，但還是常常卡住。",
            "你可以撐很多事，但其實很累。",
            "你在關係裡習慣讓，卻開始覺得不對。",
            "你不是不知道怎麼做，只是每次做決定時，又回到原本的方式。",
          ].map((s,i) => (
            <div key={i} className="fi" style={{padding:"20px 0",borderBottom:"1px solid var(--div)"}}>
              <p style={{fontFamily:"'Noto Serif TC',serif",fontSize:"clamp(16px,1.8vw,20px)",fontWeight:300,color:"var(--text)",lineHeight:1.7}}>{s}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 我在做的事 ── */}
      <section style={{background:"var(--cream)"}}>
        <div style={{maxWidth:"640px",margin:"0 auto",padding:"100px 24px",textAlign:"center"}}>
          <div className="slb fi">我在做的事</div>
          <p className="fi" style={{fontFamily:"'Noto Serif TC',serif",fontSize:"clamp(18px,2.2vw,24px)",fontWeight:300,color:"var(--text)",lineHeight:1.7,marginBottom:"32px"}}>
            我不給答案，也不幫你做選擇。
          </p>
          <p className="fi" style={{fontSize:"15px",color:"var(--soft)",lineHeight:2,marginBottom:"12px"}}>
            我幫你看見你為什麼會一直卡在同樣的地方，以及你在壓力與關係中，是怎麼做決定的。
          </p>
          <p className="fi" style={{fontSize:"15px",color:"var(--soft)",lineHeight:2}}>
            讓你慢慢做到：不被情緒拉走、不再過度承擔、做出更清晰的選擇。
          </p>
        </div>
      </section>

      {/* ── 差異對比 ── */}
      <section style={{background:"var(--w)"}}>
        <div className="C">
          <div className="slb fi">這不是療癒</div>
          <div className="home-compare" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"2px"}}>
            <div className="fi" style={{padding:"48px 44px",background:"var(--cream)"}}>
              <div className="home-compare-label" style={{fontSize:"12px",letterSpacing:"0.25em",color:"var(--text)",marginBottom:"28px",textTransform:"uppercase"}}>一般的方式</div>
              {["給你方法和建議","告訴你應該怎麼做","幫你在當下好過一點","讓你更努力撐下去"].map((s,i) => (
                <div key={i} style={{display:"flex",gap:"12px",marginBottom:"14px"}}>
                  <span style={{color:"var(--wg)",flexShrink:0}}>–</span>
                  <span style={{fontSize:"16px",color:"var(--text)",lineHeight:1.8}}>{s}</span>
                </div>
              ))}
            </div>
            <div className="fi" style={{padding:"48px 44px",background:"var(--forest)"}}>
              <div className="home-compare-label" style={{fontSize:"12px",letterSpacing:"0.25em",color:"rgba(250,247,242,.82)",marginBottom:"28px",textTransform:"uppercase"}}>我在做的</div>
              {["幫你看見你的模式","讓你理解自己為什麼卡住","建立你的內在穩定能力","讓你在關鍵時刻做出不同的選擇"].map((s,i) => (
                <div key={i} style={{display:"flex",gap:"12px",marginBottom:"14px"}}>
                  <span style={{color:"rgba(250,247,242,.9)",flexShrink:0}}>—</span>
                  <span style={{fontSize:"16px",color:"#FFFFFF",lineHeight:1.8}}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 改變結果 ── */}
      <section style={{background:"var(--cream)"}}>
        <div className="C">
          <div className="slb fi">當你開始穩下來</div>
          <div className="home-results" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"2px"}}>
            {[
              { icon:"◎", t:"關係", x:"不再習慣性退讓，開始清楚自己的位置" },
              { icon:"◎", t:"工作", x:"在壓力下依然能做出清晰的選擇" },
              { icon:"◎", t:"內在", x:"情緒來了，可以不被拉走" },
            ].map((s,i) => (
              <div key={i} className="fi" style={{padding:"44px 36px",background:"var(--w)",textAlign:"center"}}>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"28px",color:"var(--forest)",marginBottom:"20px"}}>{s.icon}</div>
                <div style={{fontFamily:"'Noto Serif TC',serif",fontSize:"18px",fontWeight:300,color:"var(--text)",marginBottom:"12px"}}>{s.t}</div>
                <div style={{fontSize:"13px",color:"var(--soft)",lineHeight:1.9}}>{s.x}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 適合誰 ── */}
      <section style={{background:"var(--w)"}}>
        <div style={{maxWidth:"560px",margin:"0 auto",padding:"100px 24px"}}>
          <div className="slb fi">適合你如果</div>
          {[
            "你已經撐很久，開始覺得這樣下去不行",
            "你試過很多方法，但還是在關鍵時刻回到原本的反應",
            "你願意面對自己，而不是只想找答案",
          ].map((s,i) => (
            <div key={i} className="fi" style={{display:"flex",gap:"16px",alignItems:"flex-start",padding:"22px 0",borderBottom:"1px solid var(--div)"}}>
              <span style={{color:"var(--forest)",flexShrink:0,fontSize:"18px",lineHeight:1.4,fontFamily:"'Cormorant Garamond',serif"}}>0{i+1}</span>
              <span style={{fontFamily:"'Noto Serif TC',serif",fontSize:"16px",fontWeight:300,color:"var(--text)",lineHeight:1.8}}>{s}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── 中段 CTA ── */}
      <section style={{background:"var(--forest)",padding:"80px 24px",textAlign:"center"}}>
        <p className="home-cta-text fi" style={{fontFamily:"'Noto Serif TC',serif",fontSize:"clamp(18px,2.5vw,26px)",fontWeight:300,color:"var(--sand)",lineHeight:1.7,marginBottom:"36px"}}>
          你不需要一次改變很多。<br/>你只需要先看清楚。
        </p>
        <button className="bp fi" onClick={() => go("apply")} style={{background:"var(--sand)",color:"var(--forest)",fontSize:"14px",padding:"16px 40px"}}>預約初次穩定體驗</button>
      </section>

      {/* ── 工具入口 ── */}
      <section style={{background:"var(--cream)"}}>
        <div className="C">
          <div className="slb fi">自我覺察工具</div>
          <p className="fi" style={{fontSize:"14px",color:"var(--wg)",marginBottom:"32px",lineHeight:1.9}}>不確定從哪裡開始？這兩個工具可以幫你先了解自己現在的狀態。</p>
          <div className="home-tools" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"}}>
            {[
              { t:"生命數字", x:"從出生日期了解你的主命數、流年數與挑戰數", p:"aware", btn:"計算我的數字" },
              { t:"身心平衡檢測", x:"花 3 分鐘，看見自己現在真正的狀態", p:"aware", btn:"開始檢測" },
            ].map((s,i) => (
              <div key={i} className="fi" style={{padding:"36px 32px",background:"var(--w)",borderTop:"2px solid var(--sandm)",cursor:"pointer"}} onClick={() => go(s.p)}>
                <div style={{fontFamily:"'Noto Serif TC',serif",fontSize:"17px",fontWeight:300,color:"var(--text)",marginBottom:"10px"}}>{s.t}</div>
                <div style={{fontSize:"13px",color:"var(--soft)",lineHeight:1.9,marginBottom:"20px"}}>{s.x}</div>
                <div className="home-tool-link" style={{fontSize:"12px",letterSpacing:"0.15em",color:"var(--forest)",fontFamily:"'Cormorant Garamond',serif"}}>{s.btn} →</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 見證 ── */}
      <Testimonials go={go} />

      {/* ── 最終 CTA ── */}
      <div className="ctab fi">
        <div className="ctab-e es">Begin Here</div>
        <h2 className="ctab-t">把穩定，慢慢練回來。</h2>
        <p className="ctab-x">如果你已經走到一個開始覺得「用原本的方式走不下去」的地方，這裡會是一個適合你停下來的地方。</p>
        <button className="bp" onClick={() => go("start")}>了解初次穩定體驗</button>
      </div>

      {/* 舊客入口 — 隱藏式 */}
      <div style={{background:"var(--cream)",padding:"40px 0",textAlign:"center",borderTop:"1px solid var(--div)"}}>
        <p style={{fontSize:"13px",color:"var(--wg)",lineHeight:1.9}}>如果你已經走過一段，也可以從這裡繼續。</p>
        <button onClick={() => go("ongoing")} style={{
          background:"transparent", border:"none",
          fontSize:"13px", color:"var(--forest)",
          letterSpacing:"0.1em", cursor:"pointer",
          marginTop:"8px", fontFamily:"'Cormorant Garamond',serif",
          textDecoration:"underline", textUnderlineOffset:"4px",
        }}>持續中的你 →</button>
      </div>
    </div>
  );
}


function About({ go }) {
  useFade();
  return (
    <div className="page">

      {/* HERO — 圖片全版，文字壓在左側 */}
      <div className="about-hero" style={{minHeight:"100vh",position:"relative",overflow:"hidden",display:"flex",flexDirection:"column",alignItems:"stretch"}}>
        {/* 圖片水平翻轉，人像在右 */}
        <div className="about-hero-photo" style={{position:"absolute",inset:0,zIndex:0}}>
          <img src={PHOTO} alt="Sofia" style={{
            width:"100%", height:"100%",
            objectFit:"cover", objectPosition:"right top",
            transform:"scaleX(-1)",
            display:"block",
          }} />
          {/* 左側深色漸層讓文字可讀 */}
          <div style={{position:"absolute",inset:0,background:"linear-gradient(to right, rgba(44,40,37,0.82) 0%, rgba(44,40,37,0.6) 35%, rgba(44,40,37,0.15) 65%, transparent 100%)"}}/>
          {/* 底部漸層 */}
          <div style={{position:"absolute",inset:0,background:"linear-gradient(to top, rgba(44,40,37,0.5) 0%, transparent 40%)"}}/>
        </div>

        {/* 文字壓在圖片左側 */}
        <div className="about-text" style={{position:"relative",zIndex:1,maxWidth:"1200px",width:"100%",margin:"0 auto",padding:"160px 60px 120px"}}>
          <div style={{maxWidth:"480px"}}>
            <div style={{fontSize:"12px",letterSpacing:"0.32em",color:"rgba(232,223,208,.5)",marginBottom:"28px",fontFamily:"'Cormorant Garamond',serif",textTransform:"uppercase"}} className="fi">關於 Sofia</div>
            <h1 style={{fontFamily:"'Noto Serif TC',serif",fontSize:"clamp(28px,3.8vw,48px)",fontWeight:300,color:"#FAF7F2",lineHeight:1.35,marginBottom:"32px"}} className="fi">
              我在做的事，<br/>只有一件。
            </h1>
            <div style={{width:"32px",height:"1px",background:"rgba(232,223,208,.4)",marginBottom:"32px"}} className="fi"/>
            <p style={{fontSize:"15px",color:"rgba(232,223,208,.78)",lineHeight:2}} className="fi">
              很多人來找我，不是因為他們不知道該怎麼做，而是因為他們已經試過很多方法，卻還是會在某些時候，回到原本的狀態。
            </p>
          </div>
        </div>
      </div>

      {/* 主文 */}
      <section style={{background:"var(--w)"}}>
        <div style={{maxWidth:"620px",margin:"0 auto",padding:"100px 24px"}}>
          {[
            "我做的事情很單純：我幫助你看見，你在情緒與關係中，是怎麼做選擇的。以及，為什麼你會一直卡在同一個地方。",
            "我不給答案，也不會告訴你應該怎麼做。因為真正影響你人生的，從來不是方法，而是你在什麼狀態下做選擇。",
            "當這個模式沒有被看見，你再怎麼努力，都會在關鍵時刻，回到原本的選擇。",
          ].map((s,i) => (
            <p key={i} className="fi" style={{fontSize:"15px",lineHeight:2.1,color:"var(--soft)",marginBottom:"28px"}}>{s}</p>
          ))}
        </div>
      </section>

      {/* 我在建立的能力 */}
      <section style={{background:"var(--cream)"}}>
        <div className="CN">
          <div className="fi" style={{padding:"52px 56px",background:"var(--forest)"}}>
            <p style={{fontFamily:"'Noto Serif TC',serif",fontSize:"clamp(18px,2.2vw,24px)",fontWeight:300,color:"var(--sand)",lineHeight:1.8,marginBottom:"32px"}}>
              不是讓你變得更好，<br/>而是幫你慢慢建立一種能力。
            </p>
            {["你可以在壓力裡，依然穩住自己","你可以在情緒裡，不被拉走","你可以開始做出，不一樣的決定"].map((s,i) => (
              <div key={i} style={{display:"flex",gap:"14px",marginBottom:"16px"}}>
                <span style={{color:"rgba(232,223,208,.5)",flexShrink:0}}>—</span>
                <span style={{fontSize:"15px",color:"rgba(232,223,208,.85)",lineHeight:1.9}}>{s}</span>
              </div>
            ))}
          </div>

          <div className="fi" style={{padding:"40px 56px",background:"var(--w)",borderLeft:"3px solid var(--sandm)",marginTop:"24px"}}>
            <p style={{fontFamily:"'Noto Serif TC',serif",fontSize:"16px",fontWeight:300,color:"var(--text)",lineHeight:1.9}}>
              如果你已經走到一個階段，開始覺得用原本的方式走不下去，那這裡會是一個適合你停下來的地方。
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="ctab fi">
        <div className="ctab-e es">Begin Here</div>
        <h2 className="ctab-t">準備好了，可以從這裡開始。</h2>
        <p className="ctab-x">你不需要準備好。帶著現在這個狀態來就好。</p>
        <button className="bp" onClick={() => go("apply")}>預約初次穩定體驗</button>
      </div>
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

      {/* 適合誰 */}
      <section style={{background:"var(--cream)"}}>
        <div className="CN">
          <div className="slb fi">適合你如果</div>
          {[
            "你常常在關鍵時刻，做出自己事後後悔的選擇",
            "你很努力，但不知道為什麼還是卡在同樣的地方",
            "你在情緒或關係裡很消耗，但說不清楚問題在哪",
            "你已經撐很久，開始覺得需要停下來整理自己",
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
              "透過線上視訊進行，你在任何地方都可以",
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
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"2px"}}>
            {plans.map((p,i) => (
              <div key={i} className="fi" style={{
                padding:"44px 36px",
                background: p.featured ? "var(--forest)" : "var(--cream)",
                textAlign:"center",
                position:"relative",
              }}>
                {p.featured && <div style={{position:"absolute",top:"16px",left:"50%",transform:"translateX(-50%)",fontSize:"11px",letterSpacing:"0.2em",color:"rgba(232,223,208,.6)",textTransform:"uppercase"}}>最多人選擇</div>}
                <div style={{fontFamily:"'Noto Serif TC',serif",fontSize:"17px",fontWeight:300,color:p.featured?"var(--sand)":"var(--text)",marginBottom:"20px",marginTop:p.featured?"16px":"0"}}>{p.t}</div>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"36px",fontWeight:300,color:p.featured?"var(--sand)":"var(--text)",marginBottom:"16px"}}>{p.p}</div>
                <div style={{fontSize:"13px",color:p.featured?"rgba(232,223,208,.65)":"var(--soft)",lineHeight:1.8,marginBottom:"28px"}}>{p.x}</div>
                <button className="bp" onClick={() => go("apply")} style={{
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
        <h2 className="ctab-t">你不需要準備好。</h2>
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
          <h1 className="htit fi" style={{fontSize:"clamp(26px,3.5vw,44px)"}}>先看見，才能改變。</h1>
          <p className="hbo fi" style={{maxWidth:"500px"}}>這不是要給你答案，而是幫你先看清楚自己現在在哪裡。</p>
        </div>
      </div>

      <section style={{background:"var(--w)"}}>
        <div className="CN">
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"2px",marginBottom:"60px"}}>
            {/* 生命數字 */}
            <div className="fi" style={{padding:"52px 44px",background:"var(--cream)",borderTop:"2px solid var(--sandm)",cursor:"pointer"}} onClick={() => go("num")}>
              <div style={{fontFamily:"'Noto Serif TC',serif",fontSize:"22px",fontWeight:300,color:"var(--text)",marginBottom:"16px"}}>生命數字</div>
              <p style={{fontSize:"14px",color:"var(--soft)",lineHeight:1.9,marginBottom:"28px"}}>從出生日期了解你的主命數、流年數、關係數與挑戰數。看見你這一生最容易反覆面對的主題。</p>
              <div style={{fontSize:"12px",letterSpacing:"0.15em",color:"var(--forest)",fontFamily:"'Cormorant Garamond',serif"}}>計算我的數字 →</div>
            </div>
            {/* 身心平衡檢測 — 外部連結 */}
            <div className="fi" style={{padding:"52px 44px",background:"var(--cream)",borderTop:"2px solid var(--sandm)",cursor:"pointer"}} onClick={() => window.open("https://sofiacentering.netlify.app/", "_blank")}>
              <div style={{fontFamily:"'Noto Serif TC',serif",fontSize:"22px",fontWeight:300,color:"var(--text)",marginBottom:"16px"}}>身心平衡檢測</div>
              <p style={{fontSize:"14px",color:"var(--soft)",lineHeight:1.9,marginBottom:"28px"}}>花約 3 分鐘，選擇最接近你近兩週感受的答案，看見自己現在真正的狀態。</p>
              <div style={{fontSize:"12px",letterSpacing:"0.15em",color:"var(--forest)",fontFamily:"'Cormorant Garamond',serif"}}>開始檢測 →</div>
            </div>
          </div>

          <div className="fi" style={{padding:"48px 52px",background:"var(--forest)",textAlign:"center"}}>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"12px",letterSpacing:"0.28em",color:"rgba(232,223,208,.45)",marginBottom:"20px",textTransform:"uppercase"}}>Next Step</div>
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
        <h2 style={{fontFamily:"'Noto Serif TC',serif",fontSize:"clamp(20px,2.5vw,28px)",fontWeight:300,color:"var(--text)",marginBottom:"8px"}} className="fi">真實的整理，會留下真實的改變。</h2>
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
      <h2 className="ecap-t">訂閱觀點信，<br/>從閱讀開始認識自己。</h2>
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

function Apply() {
  const [form, setForm] = useState({
    name:"", email:"", line:"", time:"", stuck:"", hope:"", source:""
  });
  const [ok, setOk]         = useState(false);
  const [sending, setSending] = useState(false);
  const [err, setErr]       = useState("");
  const h = e => setForm({ ...form, [e.target.name]: e.target.value });

  const FORM_ENDPOINT = "https://formspree.io/f/mrernlwv";

  const submitForm = async () => {
    if (!form.name || !form.email || !form.line) { setErr("請填寫姓名、Email 和 Line ID"); return; }
    setErr("");
    if (FORM_ENDPOINT) {
      setSending(true);
      try {
        await fetch(FORM_ENDPOINT, {
          method:"POST",
          headers:{"Content-Type":"application/json","Accept":"application/json"},
          body:JSON.stringify({
            姓名: form.name,
            Email: form.email,
            LineID: form.line,
            希望預約時間: form.time,
            目前最卡的狀態: form.stuck,
            希望這次幫助的: form.hope,
            怎麼知道這裡的: form.source,
          })
        });
      } catch(e) { console.error(e); }
      setSending(false);
    }
    setOk(true);
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
      <div style={{background:"var(--forest)",padding:"140px 0 80px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 50% 60% at 20% 50%,rgba(255,255,255,.04) 0%,transparent 60%)",pointerEvents:"none"}}/>
        <div className="CN" style={{position:"relative",zIndex:1}}>
          <div style={{fontSize:"12px",letterSpacing:"0.32em",color:"rgba(232,223,208,.45)",marginBottom:"24px",textTransform:"uppercase",fontFamily:"'Cormorant Garamond',serif"}}>預約</div>
          <h1 style={{fontFamily:"'Noto Serif TC',serif",fontSize:"clamp(26px,3.5vw,44px)",fontWeight:300,color:"var(--sand)",lineHeight:1.4,marginBottom:"20px"}}>
            先讓自己有一個<br/>可以站穩的位置。
          </h1>
          <p style={{fontSize:"15px",color:"rgba(232,223,208,.65)",lineHeight:1.9,maxWidth:"440px"}}>
            你不需要準備好。帶著現在這個狀態來就好。<br/>填完表單後，我會在三個工作天內與你聯繫。
          </p>
        </div>
      </div>

      {/* FORM */}
      <section style={{background:"var(--w)"}}>
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
    <footer style={{background:"var(--text)",padding:"80px 0 40px"}}>
      <div className="C">
        <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr",gap:"48px",marginBottom:"60px"}}>
          <div>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"24px",color:"var(--sand)",marginBottom:"12px"}}>Sofia</div>
            <div style={{fontSize:"12px",letterSpacing:"0.18em",color:"rgba(232,223,208,.4)",marginBottom:"20px"}}>情緒穩定 × 關係覺察 × 內在主導權</div>
            <p style={{fontSize:"13px",color:"rgba(232,223,208,.45)",lineHeight:1.9}}>以陪伴取代建議，以覺察取代答案。</p>
          </div>
          <div>
            <div style={{fontSize:"12px",letterSpacing:"0.2em",color:"rgba(232,223,208,.35)",marginBottom:"20px",textTransform:"uppercase"}}>頁面</div>
            {[{l:"首頁",p:"home"},{l:"開始這一步",p:"start"},{l:"陪跑計畫",p:"deep"},{l:"自我覺察",p:"aware"},{l:"關於 Sofia",p:"about"},{l:"預約",p:"apply"}].map(i => (
              <a key={i.p} style={SL} onClick={() => go(i.p)}>{i.l}</a>
            ))}
          </div>
          <div>
            <div style={{fontSize:"12px",letterSpacing:"0.2em",color:"rgba(232,223,208,.35)",marginBottom:"20px",textTransform:"uppercase"}}>聯繫</div>
            <a href="mailto:sophibaby@gmail.com" style={SL}>sophibaby@gmail.com</a>
            <a href="https://www.instagram.com/sofia202219101/" target="_blank" rel="noopener" style={SL}>Instagram</a>
            <a href="https://line.me/R/ti/p/@567avtfh" target="_blank" rel="noopener" style={SL}>Line 官方帳號</a>
            <a href="https://www.facebook.com/BelovedSofia" target="_blank" rel="noopener" style={SL}>Facebook</a>
          </div>
        </div>
        <div style={{borderTop:"1px solid rgba(232,223,208,.1)",paddingTop:"32px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"12px"}}>
          <div style={{fontSize:"12px",color:"rgba(232,223,208,.25)",letterSpacing:"0.08em"}}>© 2025 Sofia 蘇菲療癒轉化. All rights reserved.</div>
          <div style={{fontSize:"12px",color:"rgba(232,223,208,.25)",letterSpacing:"0.08em"}}>以陪伴取代建議，以覺察取代答案。</div>
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
      <div style={{background:"var(--forest)",padding:"140px 0 100px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 55% 65% at 15% 50%,rgba(255,255,255,.04) 0%,transparent 60%)",pointerEvents:"none"}}/>
        <div className="CN" style={{position:"relative",zIndex:1}}>
          <div style={{fontSize:"12px",letterSpacing:"0.32em",color:"rgba(232,223,208,.45)",marginBottom:"24px",fontFamily:"'Cormorant Garamond',serif",textTransform:"uppercase"}}>陪跑計畫</div>
          <h1 style={{fontFamily:"'Noto Serif TC',serif",fontSize:"clamp(28px,4vw,50px)",fontWeight:300,color:"var(--sand)",lineHeight:1.35,marginBottom:"28px"}} className="fi">
            你其實已經知道很多。
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
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"2px"}}>
            {[
              "你已經走到一個階段，知道這些事情不是一次理解就會改變",
              "你願意花一段時間，慢慢把這件事情穩下來",
            ].map((s,i) => (
              <div key={i} className="fi" style={{padding:"44px 40px",background:"var(--w)"}}>
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
      <section style={{background:"var(--forest)",padding:"100px 0"}}>
        <div style={{maxWidth:"560px",margin:"0 auto",padding:"0 24px",textAlign:"center"}}>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"12px",letterSpacing:"0.32em",color:"rgba(232,223,208,.4)",marginBottom:"24px",textTransform:"uppercase"}}>如何進入</div>
          <p className="fi" style={{fontFamily:"'Noto Serif TC',serif",fontSize:"clamp(17px,2vw,22px)",fontWeight:300,color:"var(--sand)",lineHeight:1.9,marginBottom:"20px"}}>
            當你開始更清楚自己的狀態，也確認自己想穩定走一段轉變的過程，我們會一起討論這樣的陪伴方式是否適合你。
          </p>
          <p className="fi" style={{fontSize:"14px",color:"rgba(232,223,208,.65)",lineHeight:2,marginBottom:"40px"}}>
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
  return (
    <div className="page">
      <div style={{background:"var(--forest)",padding:"140px 0 100px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 50% 60% at 15% 50%,rgba(255,255,255,.04) 0%,transparent 60%)",pointerEvents:"none"}}/>
        <div className="CN" style={{position:"relative",zIndex:1}}>
          <div style={{fontSize:"12px",letterSpacing:"0.32em",color:"rgba(232,223,208,.45)",marginBottom:"24px",fontFamily:"'Cormorant Garamond',serif",textTransform:"uppercase"}}>年度調頻訂閱</div>
          <h1 style={{fontFamily:"'Noto Serif TC',serif",fontSize:"clamp(26px,3.8vw,46px)",fontWeight:300,color:"var(--sand)",lineHeight:1.4,marginBottom:"24px"}} className="fi">
            讓穩定可以持續的方式。
          </h1>
          <p style={{fontSize:"15px",color:"rgba(232,223,208,.65)",lineHeight:1.9,maxWidth:"480px"}} className="fi">
            這個方式不是讓你變更好，而是讓你不要再回到原本那樣。
          </p>
        </div>
      </div>

      <section style={{background:"var(--w)"}}>
        <div style={{maxWidth:"620px",margin:"0 auto",padding:"100px 24px"}}>
          <div className="slb fi">為什麼需要長期</div>
          <p className="fi" style={{fontFamily:"'Noto Serif TC',serif",fontSize:"clamp(17px,2vw,22px)",fontWeight:300,color:"var(--text)",lineHeight:1.8,marginBottom:"28px"}}>
            當你開始看見自己的模式，也慢慢能在一些時刻不再被情緒拉走，接下來更重要的，不是再做更多，而是讓這個狀態可以留在你的生活裡。
          </p>
          <p className="fi" style={{fontSize:"15px",color:"var(--soft)",lineHeight:2,marginBottom:"16px"}}>
            很多人會在一段時間之後開始變得比較穩，也以為自己已經走出來了。但在忙碌、壓力、關係拉扯之中，很容易又慢慢回到原本的方式。
          </p>
          <p className="fi" style={{fontSize:"15px",color:"var(--soft)",lineHeight:2}}>
            不是因為你不夠努力，而是因為——穩定這件事，需要一個可以持續的節奏。
          </p>
        </div>
      </section>

      <section style={{background:"var(--cream)"}}>
        <div className="CN">
          <div className="slb fi">這不是一個課程</div>
          <div className="fi" style={{padding:"44px 52px",background:"var(--w)",borderLeft:"3px solid var(--forest)",marginBottom:"24px"}}>
            <p style={{fontSize:"15px",lineHeight:2,color:"var(--soft)",marginBottom:"16px"}}>這裡沒有要你學更多，也不會給你很多需要完成的事情。</p>
            <p style={{fontSize:"15px",lineHeight:2,color:"var(--soft)"}}>我們做的，是用一個很穩定的頻率，讓你在生活裡，慢慢維持住現在的狀態。</p>
          </div>

          <div className="slb fi" style={{marginTop:"48px"}}>你會感覺到的</div>
          {["你比較不容易被情緒拉走","你在壓力來的時候，有空間","你開始可以在生活裡，慢慢穩住自己，而不是每次都回到原本的方式"].map((s,i) => (
            <div key={i} className="fi" style={{display:"flex",gap:"16px",alignItems:"flex-start",padding:"20px 0",borderBottom:"1px solid var(--div)"}}>
              <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"18px",color:"var(--sandm)",flexShrink:0}}>0{i+1}</span>
              <span style={{fontFamily:"'Noto Serif TC',serif",fontSize:"16px",fontWeight:300,color:"var(--text)",lineHeight:1.8}}>{s}</span>
            </div>
          ))}
        </div>
      </section>

      <section style={{background:"var(--w)"}}>
        <div style={{maxWidth:"620px",margin:"0 auto",padding:"80px 24px"}}>
          <div className="slb fi">這適合你，如果</div>
          {[
            "你已經走過一段，開始知道穩定不是一次做到的，而是需要被維持的",
            "你不想再回到原本那種，一直撐的狀態",
          ].map((s,i) => (
            <div key={i} className="fi" style={{display:"flex",gap:"16px",padding:"20px 0",borderBottom:"1px solid var(--div)"}}>
              <span style={{color:"var(--forest)",flexShrink:0}}>—</span>
              <span style={{fontSize:"15px",color:"var(--soft)",lineHeight:1.9}}>{s}</span>
            </div>
          ))}
        </div>
      </section>

      <section style={{background:"var(--cream)"}}>
        <div className="CN">
          <div className="slb fi">這個方式</div>
          <div className="fi" style={{padding:"44px 52px",background:"var(--w)"}}>
            <p style={{fontSize:"15px",lineHeight:2,color:"var(--soft)",marginBottom:"12px"}}>每個月會有一次頻率調整，以及一份簡單的回饋，幫助你在生活中慢慢建立屬於自己的節奏。</p>
            <p style={{fontSize:"15px",lineHeight:2,color:"var(--soft)"}}>這不是強度很高的過程，而是一個可以長期存在的支持。</p>
          </div>
        </div>
      </section>

      <section style={{background:"var(--forest)",padding:"80px 0",textAlign:"center"}}>
        <div style={{maxWidth:"480px",margin:"0 auto",padding:"0 24px"}}>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"12px",letterSpacing:"0.28em",color:"rgba(232,223,208,.4)",marginBottom:"20px",textTransform:"uppercase"}}>費用</div>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"52px",fontWeight:300,color:"var(--sand)",marginBottom:"8px"}} className="fi">NT$ 12,800</div>
          <div style={{fontSize:"13px",color:"rgba(232,223,208,.5)",marginBottom:"40px",letterSpacing:"0.08em"}}>/ 年　（平均每月約 NT$ 1,066）</div>
          <p className="fi" style={{fontSize:"14px",color:"rgba(232,223,208,.65)",lineHeight:2,marginBottom:"36px"}}>
            這個方式通常會在你已經有一定基礎之後才會比較適合。如果你不確定現在是否適合，可以先跟我說說你目前的狀態，我們一起看一下。
          </p>
          <div style={{display:"flex",gap:"12px",justifyContent:"center",flexWrap:"wrap"}} className="fi">
            <button className="bp" onClick={() => go("apply")} style={{background:"var(--sand)",color:"var(--forest)"}}>了解這個方式</button>
            <button className="bp" onClick={() => go("apply")} style={{background:"transparent",border:"1px solid rgba(232,223,208,.4)",color:"var(--sand)"}}>跟我說我適不適合</button>
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
      cta:"預約短期調整", action:"apply", label:"預約"
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
      cta:"預約短期調整", action:"apply",
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
          <h1 className="htit fi" style={{fontSize:"clamp(26px,3.5vw,44px)"}}>你不需要一次做對所有事。</h1>
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
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"2px"}}>
            {ways.map((w,i) => (
              <div key={i} className="fi" style={{padding:"44px 36px",background:"var(--cream)"}}>
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

      <section style={{background:"var(--forest)",padding:"80px 0",textAlign:"center"}}>
        <div style={{maxWidth:"480px",margin:"0 auto",padding:"0 24px"}}>
          <p className="fi" style={{fontFamily:"'Noto Serif TC',serif",fontSize:"clamp(17px,2vw,22px)",fontWeight:300,color:"var(--sand)",lineHeight:1.9,marginBottom:"16px"}}>
            你不需要等到很嚴重，才回來。
          </p>
          <p className="fi" style={{fontSize:"14px",color:"rgba(232,223,208,.65)",lineHeight:2,marginBottom:"36px"}}>
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
          <h1 className="htit fi" style={{fontSize:"clamp(26px,3.5vw,44px)"}}>如果你還在認識這裡，<br/>從這裡開始最沒有壓力。</h1>
          <p className="hbo fi" style={{maxWidth:"500px"}}>透過文字先感受這裡的觀點，慢慢看見自己是否和這裡有關。</p>
        </div>
      </div>

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
          {!loading && arts.map((a, i) => (
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
                {a.x && <div style={{fontSize:"13px",color:"rgba(255,255,255,.75)",lineHeight:1.9,whiteSpace:"pre-line"}}>{a.x}</div>}
                {a.url && <div style={{marginTop:"12px",fontSize:"12px",letterSpacing:"0.12em",color:"rgba(232,223,208,.7)",fontFamily:"'Cormorant Garamond',serif"}}>閱讀全文 →</div>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 見證區 */}
      <section style={{background:"var(--cream)"}}>
        <div className="CN">
          <div className="slb fi">學員見證</div>
          <h2 style={{fontFamily:"'Noto Serif TC',serif",fontSize:"clamp(18px,2.2vw,26px)",fontWeight:300,color:"var(--text)",marginBottom:"8px"}} className="fi">真實的整理，會留下真實的改變。</h2>
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
      {d.note && <div style={{marginTop:"20px",paddingTop:"20px",borderTop:"1px solid rgba(0,0,0,0.07)"}}><div style={{fontSize:"11px",letterSpacing:"0.22em",color:d.color,marginBottom:"10px",fontFamily:"'Cormorant Garamond',serif"}}>🌿 靈魂小叮嚀</div><p style={{fontSize:"14px",lineHeight:2,color:"var(--soft)"}}>{d.note}</p></div>}
      {yn && NUM_DESC[yn] && <div style={{marginTop:"20px",paddingTop:"20px",borderTop:"1px solid rgba(0,0,0,0.07)"}}><div style={{fontSize:"11px",letterSpacing:"0.25em",color:"var(--forest)",marginBottom:"10px",fontFamily:"'Cormorant Garamond',serif",textTransform:"uppercase"}}>流年數 · {thisYear}</div><div style={{display:"flex",alignItems:"baseline",gap:"12px",marginBottom:"12px",flexWrap:"wrap"}}><div style={{fontFamily:"'Noto Serif TC',serif",fontSize:"18px",fontWeight:300,color:"var(--text)"}}>{NUM_DESC[yn].title}</div><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"18px",color:"var(--forest)",letterSpacing:"0.06em"}}>{yrPath.display}</div></div><p style={{fontSize:"14px",lineHeight:2,color:"var(--soft)"}}>{NUM_DESC[yn].yr}</p></div>}
      {d.oil && <div style={{marginTop:"20px",paddingTop:"20px",borderTop:"1px solid rgba(0,0,0,0.07)"}}><div style={{fontSize:"11px",letterSpacing:"0.22em",color:d.color,marginBottom:"10px",fontFamily:"'Cormorant Garamond',serif"}}>🌿 精油建議</div><p style={{fontSize:"13px",lineHeight:1.9,color:"var(--wg)"}}>{d.oil}</p></div>}
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
      {d.note && <div style={{padding:"16px 20px",background:"rgba(212,200,181,.12)",borderLeft:"2px solid var(--sandm)",marginBottom:"16px"}}><div style={{fontSize:"11px",letterSpacing:"0.2em",color:"var(--sandm)",marginBottom:"6px",fontFamily:"'Cormorant Garamond',serif"}}>🌿 狀態留意</div><p style={{fontSize:"13px",lineHeight:1.9,color:"var(--soft)",margin:0}}>{d.note}</p></div>}
      {d.lesson && <div style={{fontSize:"13px",color:"var(--forest)",lineHeight:1.9}}><span style={{letterSpacing:"0.1em",fontFamily:"'Cormorant Garamond',serif"}}>核心功課 → </span>{d.lesson}</div>}
      {d.oil && <div style={{marginTop:"16px",paddingTop:"16px",borderTop:"1px solid rgba(0,0,0,0.06)"}}><div style={{fontSize:"11px",letterSpacing:"0.22em",color:"var(--sandm)",marginBottom:"8px",fontFamily:"'Cormorant Garamond',serif"}}>🌿 精油建議</div>{d.oil.split("。").filter(s=>s.trim()).map((line,i)=><p key={i} style={{fontSize:"13px",lineHeight:1.9,color:"var(--wg)",marginBottom:"4px"}}>{line.trim()}。</p>)}</div>}
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
      <div style={{padding:"20px 24px",background:"rgba(212,200,181,.15)",borderLeft:"2px solid var(--sandm)",marginBottom:"16px"}}><div style={{fontSize:"11px",letterSpacing:"0.2em",color:"var(--sandm)",marginBottom:"8px",fontFamily:"'Cormorant Garamond',serif"}}>🌿 狀態留意</div><p style={{fontSize:"13px",lineHeight:1.9,color:"var(--soft)",margin:0}}>{d.note}</p></div>
      <div style={{fontSize:"13px",color:"var(--forest)",lineHeight:1.9}}><span style={{letterSpacing:"0.1em",fontFamily:"'Cormorant Garamond',serif"}}>核心功課 → </span>{d.lesson}</div>
      {d.oil && <div style={{marginTop:"16px",paddingTop:"16px",borderTop:"1px solid rgba(0,0,0,0.06)"}}><div style={{fontSize:"11px",letterSpacing:"0.22em",color:"var(--sandm)",marginBottom:"8px",fontFamily:"'Cormorant Garamond',serif"}}>🌿 精油建議</div>{d.oil.split("。").filter(s=>s.trim()).map((line,i)=><p key={i} style={{fontSize:"13px",lineHeight:1.9,color:"var(--wg)",marginBottom:"4px"}}>{line.trim()}。</p>)}</div>}
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
    try {
      const lDate = solarToLunar(parseInt(sy), parseInt(sm), parseInt(sdy));
      lunarLife = calcPath(sumD(String(lDate.y))+sumD(String(lDate.m))+sumD(String(lDate.d)));
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
    setResult({ solarLife, solarYr, lunarLife, relPath });
  };

  const IS = { background:"var(--cream)", border:"1px solid var(--div)", borderBottom:"2px solid var(--sandm)", padding:"13px 15px", fontSize:"15px", fontFamily:"'Noto Sans TC',sans-serif", color:"var(--text)", outline:"none", borderRadius:0, width:"100%", WebkitAppearance:"none" };
  const LS = { fontSize:"12px", letterSpacing:"0.15em", color:"var(--wg)", display:"block", marginBottom:"7px" };

  return (
    <div className="page">
      <div style={{background:"var(--cream)",padding:"140px 0 80px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 55% 60% at 90% 30%,rgba(212,200,181,.26) 0%,transparent 65%)",pointerEvents:"none"}}/>
        <div className="CN" style={{position:"relative",zIndex:1}}>
          <div className="slb">生命數字 · Numerology</div>
          <h1 className="htit" style={{fontSize:"clamp(28px,3.8vw,44px)"}}>認識你的生命數字。</h1>
          <p className="hbo" style={{maxWidth:"540px"}}>數字不是命運，而是一個看見自己的角度。輸入你的出生日期，了解你的主命數、流年數與挑戰數。</p>
        </div>
      </div>
      <section style={{background:"var(--w)"}}>
        <div className="CN">
          <div className="slb">你的出生日期</div>
          <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr",gap:"14px",marginBottom:"36px"}}>
            <div><label style={LS}>年份（西元）</label><input style={IS} type="number" placeholder="例：1990" value={sy} onChange={e=>setSy(e.target.value)} /></div>
            <div><label style={LS}>月份</label><input style={IS} type="number" placeholder="8" value={sm} min={1} max={12} onChange={e=>setSm(e.target.value)} /></div>
            <div><label style={LS}>日期</label><input style={IS} type="number" placeholder="15" value={sdy} min={1} max={31} onChange={e=>setSdy(e.target.value)} /></div>
          </div>
          <div style={{padding:"32px 36px",background:"var(--cream)",marginBottom:"32px",borderLeft:"2px solid var(--sandm)"}}>
            <div style={{fontFamily:"'Noto Serif TC',serif",fontSize:"14px",color:"var(--text)",marginBottom:"6px"}}>選填 — 計算關係數</div>
            <div style={{fontSize:"13px",color:"var(--wg)",lineHeight:1.9,marginBottom:"20px"}}>輸入對方的出生日期，計算你們之間的關係數。</div>
            <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr",gap:"14px"}}>
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

            {/* 說明區塊 */}
            <div style={{marginBottom:"40px",padding:"36px 44px",background:"var(--w)",borderLeft:"3px solid var(--sandm)"}}>
              <div style={{fontFamily:"'Noto Serif TC',serif",fontSize:"16px",color:"var(--text)",marginBottom:"20px"}}>數字怎麼看</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"32px",marginBottom:"24px"}}>
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
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"}}>
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
              <div className="slb" style={{marginBottom:"8px",letterSpacing:"0.2em",color:"var(--sandm)"}}>陽曆</div>
              <NumCard label="主命數 · 流年數" lifePath={result.solarLife} yrPath={result.solarYr} thisYear={thisYear} />
            </div>

            {/* 農曆主命數 + 流年數 */}
            {result.lunarLife && (
              <div style={{marginBottom:"48px"}}>
                <div className="slb" style={{marginBottom:"8px",letterSpacing:"0.2em",color:"var(--forest)"}}>農曆</div>
                <NumCard label="主命數 · 流年數" lifePath={result.lunarLife} yrPath={result.solarYr} thisYear={thisYear} />
              </div>
            )}

            {/* 關係數 */}
            {result.relPath && (
              <div style={{marginBottom:"48px"}}>
                <div className="slb" style={{marginBottom:"8px"}}>關係數</div>
                <RelCard relPath={result.relPath} />
              </div>
            )}

            {/* 挑戰數 */}
            <div style={{marginBottom:"48px"}}>
              <div className="slb" style={{marginBottom:"8px"}}>挑戰數</div>
              <div style={{fontSize:"13px",color:"var(--wg)",lineHeight:1.9,marginBottom:"20px",padding:"16px 20px",background:"var(--w)",borderLeft:"2px solid var(--sandm)"}}>挑戰數代表你在人生中最容易反覆卡住的內在模式，它不是你的缺點，而是你最容易過度或失衡的那個點。當你開始看懂它，這個挑戰反而會變成你的穩定力。</div>
              <ChallengeCard sy={sy} sm={sm} sd={sdy} />
              <div style={{marginTop:"20px",padding:"24px 28px",background:"var(--forest)"}}>
                <p style={{fontSize:"13px",color:"rgba(232,223,208,.8)",lineHeight:2,marginBottom:"10px"}}>✦ 挑戰數不是你哪裡不好，而是你這一生會反覆遇到、也有機會轉化成力量的地方。</p>
                <p style={{fontSize:"13px",color:"rgba(232,223,208,.8)",lineHeight:2}}>✦ 當你看懂自己的挑戰，你就不會再用錯方式對待自己。</p>
              </div>
            </div>

            {/* CTA */}
            <div style={{padding:"48px 52px",background:"var(--forest)",textAlign:"center"}}>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"13px",letterSpacing:"0.3em",color:"rgba(232,223,208,.48)",marginBottom:"18px"}}>Next Step</div>
              <p style={{fontFamily:"'Noto Serif TC',serif",fontSize:"18px",fontWeight:300,color:"var(--sand)",lineHeight:1.9,marginBottom:"32px"}}>數字是一個起點，真正的整理需要更深一層的陪伴。</p>
              <div style={{display:"flex",gap:"14px",justifyContent:"center",flexWrap:"wrap"}}>
                <button className="bp" onClick={()=>go("apply")} style={{background:"var(--sand)",color:"var(--forest)"}}>預約初次穩定體驗</button>
                <button className="bp" onClick={()=>go("aware")} style={{background:"transparent",border:"1px solid rgba(232,223,208,.6)",color:"var(--sand)"}}>回到自我覺察</button>
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
    const paths = { home:"/", start:"/start", aware:"/aware", num:"/num", deep:"/deep", about:"/about", art:"/art", apply:"/apply", ongoing:"/ongoing", subscribe:"/subscribe" };
    navigate(paths[p] || "/");
    window.scrollTo({ top: 0, behavior: "instant" });
  };
  const cur = {
    "/":"home", "/start":"start", "/aware":"aware", "/num":"num", "/deep":"deep",
    "/about":"about", "/art":"art", "/apply":"apply",
    "/ongoing":"ongoing", "/subscribe":"subscribe"
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
          <Route path="/apply" element={<Apply />} />
          <Route path="/ongoing" element={<Ongoing go={go} />} />
          <Route path="/subscribe" element={<Subscribe go={go} />} />
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
