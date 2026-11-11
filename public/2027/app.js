(() => {
  'use strict';
  const cfg = window.SOFIA_CONFIG;
  const themes = [
    ['財富豐盛','✺'], ['健康平衡','❋'], ['桃花良緣','♡'], ['事業順遂','↗'],
    ['貴人善緣','✧'], ['家庭和諧','⌂'], ['情緒安定','☾'], ['人生新局','☼']
  ];
  const money = n => 'NT$' + Number(n).toLocaleString('en-US');
  let currentPlan = cfg.plans.find(p => p.featured) || cfg.plans[0];
  let chosen = [];
  const $ = id => document.getElementById(id);
  const track = (name, params) => { try { if (window.gtag) window.gtag('event', name, params || {}); } catch (_) {} };
  if (cfg.preview) $('previewBar').hidden = false;
  const esc = str => String(str).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  $('plansGrid').innerHTML = cfg.plans.map(p => `
    <article class="plan-card ${p.featured?'featured':''}">
      ${p.featured?'<div class="featured-ribbon">熱門選擇</div>':''}
      <span class="plan-overline">${p.id === 'focus' ? 'PLAN 01' : p.id === 'abundance' ? 'PLAN 02' : 'PLAN 03'}</span>
      <h3>${esc(p.name)}</h3><span class="plan-count">自由選擇 ${p.count} 個年度主題</span>
      <div class="plan-price"><small>NT$</small>${Number(p.price).toLocaleString('en-US')}</div>
      <p class="plan-subtitle">${esc(p.description)}</p>
      <ul class="plan-list"><li>${p.count} 項年度主題設定</li><li>2027 全年度約定服務</li><li>2027 年 1 月專屬年度頻率藍圖</li></ul>
      <a class="plan-link" href="#choose" data-choose-plan="${p.id}" aria-label="挑選${esc(p.name)}（${p.count} 個主題）方案">挑選這個方案 ↗</a>
    </article>`).join('');
  $('selectorPlans').innerHTML = cfg.plans.map(p => `
    <button type="button" class="selector-plan" role="radio" aria-checked="${p.id === currentPlan.id}" data-plan="${p.id}">
      <strong>${p.count} 個主題</strong><small>${money(p.price)}</small>
    </button>`).join('');
  $('selectorThemes').innerHTML = themes.map(([label,icon],i) => `
    <label class="theme-option"><input type="checkbox" value="${esc(label)}" id="t${i}"><i aria-hidden="true">${icon}</i><span>${label}</span></label>`).join('');
  function setPlan(id) {
    const plan = cfg.plans.find(p => p.id === id);
    if (!plan) return;
    if (plan.id !== currentPlan.id) track('f2027_plan', { plan: plan.id });
    currentPlan = plan;
    chosen = chosen.slice(0, plan.count);
    $('selectorPlans').querySelectorAll('[data-plan]').forEach(el => el.setAttribute('aria-checked',String(el.dataset.plan === id)));
    $('selectorThemes').querySelectorAll('input').forEach(el => { el.checked = chosen.includes(el.value); });
    $('resultPanel').hidden = true;
    update();
  }
  function update() {
    $('requiredCount').textContent = currentPlan.count;
    $('summaryPlan').textContent = `${currentPlan.name} · ${currentPlan.count} 項主題`;
    $('summaryPrice').textContent = money(currentPlan.price);
    const remaining = currentPlan.count - chosen.length;
    $('remainingText').textContent = remaining ? `還可以選擇 ${remaining} 項` : '已完成選擇 ✓';
    $('selectedTags').innerHTML = chosen.length ? chosen.map(s => `<span>${esc(s)}</span>`).join('') : '<span class="empty-tag">尚未選擇主題</span>';
    $('selectorThemes').querySelectorAll('input').forEach(el => { el.disabled = remaining === 0 && !el.checked; });
    $('submitButton').disabled = remaining !== 0;
    $('submitButton').textContent = remaining ? `請先選滿 ${currentPlan.count} 個主題` : '整理我的 LINE 詢問內容 ↗';
  }
  $('selectorPlans').addEventListener('click', e => { const btn = e.target.closest('[data-plan]'); if(btn) setPlan(btn.dataset.plan); });
  $('selectorThemes').addEventListener('change', e => {
    const target = e.target;
    if (!target.matches('input[type=checkbox]')) return;
    if (target.checked && !chosen.includes(target.value) && chosen.length < currentPlan.count) chosen.push(target.value);
    else if (!target.checked) chosen = chosen.filter(x => x !== target.value);
    $('resultPanel').hidden = true;
    update();
  });
  document.querySelectorAll('[data-choose-plan]').forEach(el => el.addEventListener('click', () => setPlan(el.dataset.choosePlan)));
  function message() {return `Sofia 你好，我想了解《2027 年度好運頻率計畫》。\n\n我選擇：${currentPlan.name}（${currentPlan.count} 項）\n參考方案價格：${money(currentPlan.price)}\n年度主題：${chosen.join('、')}\n\n想請你提供正式服務規格、付款方式與報名資訊，謝謝！`}
  $('submitButton').addEventListener('click', () => {
    if (chosen.length !== currentPlan.count) return;
    $('resultText').value = message();
    $('resultPanel').hidden = false;
        const link = $('openLineButton');
    if (cfg.lineId) { link.href = 'https://line.me/R/oaMessage/' + encodeURIComponent(cfg.lineId) + '/?' + encodeURIComponent(message()); link.hidden = false; }
    else if (cfg.lineUrl) { link.href = cfg.lineUrl; link.hidden = false; }
    else link.hidden = true;
    $('copyStatus').textContent = cfg.lineId ? '手機可直接按「開啟 LINE」，訊息會自動帶入；電腦版請先複製再貼到 LINE。' : '請先複製訊息，再到 Sofia 的官方 LINE 貼上詢問。';
    track('f2027_compose', { plan: currentPlan.id, themes: chosen.join('|') });
    $('resultPanel').scrollIntoView({behavior:'smooth',block:'nearest'});
  });
  $('copyButton').addEventListener('click', async () => {
    const text = $('resultText').value;
    let copied = false;
    try { if(navigator.clipboard && window.isSecureContext) {await navigator.clipboard.writeText(text); copied = true;} } catch(_) {copied = false;}
    if (!copied) { $('resultText').focus(); $('resultText').select(); try {copied = document.execCommand('copy');} catch(_) {copied = false;} }
    track('f2027_copy', { ok: copied });
    $('copyStatus').textContent = copied ? '已複製！請開啟 LINE，貼上並發送給 Sofia。' : '自動複製未成功，請長按文字並選擇「複製」。';
  });
  const menuBtn = $('menuBtn'), mobileNav = $('mobileNav');
  menuBtn.addEventListener('click',()=> {const expanded = menuBtn.getAttribute('aria-expanded') === 'true'; menuBtn.setAttribute('aria-expanded',String(!expanded)); mobileNav.hidden = expanded;});
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click',()=> { mobileNav.hidden=true;menuBtn.setAttribute('aria-expanded','false'); }));
  $('openLineButton').addEventListener('click', () => track('f2027_line', { plan: currentPlan.id }));
  $('year').textContent = new Date().getFullYear();
  update();
})();
