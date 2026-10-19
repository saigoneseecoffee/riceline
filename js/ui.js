/* Riceline — UI: menu, filters, item sheet, bag & checkout */
(() => {
  'use strict';
  const RL = window.__RL; if (!RL) return;
  const { CFG, M, C, A, BOWL, COMBO, DRINK, SIDE, PLATE, sidesNeeded, sidesChosen, SAUCES, DIET_KEYS, DIET_LABEL, $, $$, esc, money, kcal, grams, IMG, icon, uid, store, clone,
    byStep, defaultBuild, calcBowl, totalsFor, doublePrice, storeStatus, pickupSlots, rangesFor, fmtTime, nowInStore, DAYS, DAY_NAMES, state, saveBag } = RL;

  /* ======================= small UI helpers ======================= */
  const tagClass = (t) => (/new|plant/i.test(t) ? 'tag new' : /express/i.test(t) ? 'tag express' : 'tag');
  function dietBadges(t, compact = false) {
    const out = [];
    if (t.diet.vegan) out.push(`<span class="badge vg" title="Vegan">${icon('leaf')}${compact ? 'VG' : 'Vegan'}</span>`);
    else if (t.diet.veg) out.push(`<span class="badge vg" title="Vegetarian">${icon('leaf')}${compact ? 'V' : 'Vegetarian'}</span>`);
    if (t.diet.gf) out.push(`<span class="badge gf" title="Gluten-free">${compact ? 'GF' : 'Gluten-free'}</span>`);
    if (!compact && t.diet.df) out.push(`<span class="badge" title="Dairy-free">Dairy-free</span>`);
    if (t.spicy) out.push(`<span class="badge spicy" title="${t.spicy > 1 ? 'Spicy' : 'Mild heat'}">${icon('chili')}${t.spicy > 1 ? 'Spicy' : 'Mild'}</span>`);
    return out.join('');
  }
  const allergenText = (t) => {
    const a = [...t.allergens].sort();
    let s = a.length ? a.join(', ') : 'None of the 9 major allergens';
    if (t.may.size) s += ` · may contain ${[...t.may].join(', ').toLowerCase()}`;
    return s;
  };
  const metaLine = (price, t, extra = '') => `<span class="price">${price}${extra}</span><span class="cal">${kcal(t.cal)} cal</span>${t.p >= 1 ? `<span class="cal">${grams(t.p)}g protein</span>` : ''}`;

  let toastTimer;
  function toast(msg, actionLabel, action) {
    const el = $('#toast');
    el.innerHTML = `<span>${esc(msg)}</span>${actionLabel ? `<button type="button">${esc(actionLabel)}</button>` : ''}`;
    if (actionLabel) $('button', el).onclick = () => { el.classList.remove('show'); action(); };
    el.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('show'), 4500);
  }

  /* ======================= header & store status ======================= */
  function renderStatus() {
    const st = storeStatus();
    const pill = $('#statusPill');
    pill.className = 'status-pill ' + (st.open ? 'open' : 'closed');
    pill.innerHTML = `<span class="status-dot"></span><span class="status-short">${st.short}</span><span class="status-long"> · ${esc(st.label.split(' · ')[1] || '')}</span>`;
    pill.setAttribute('aria-label', `${st.label}. Store info and hours`);
  }
  function addrLine() { const a = CFG.address || {}; return `${a.line1 || ''}, ${a.city || ''}, ${a.state || ''} ${a.zip || ''}`.replace(/^, /, ''); }
  const mapsUrl = () => 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(CFG.mapsQuery || addrLine());
  const hasPhone = () => String(CFG.phone || '').replace(/\D/g, '').length >= 10;
  const telUrl = () => (hasPhone() ? 'tel:' + String(CFG.phone).replace(/[^\d+]/g, '') : null);
  function hoursTable() {
    const n = nowInStore();
    const order = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    return `<table class="hours-table"><tbody>${order.map((d) => {
      const r = rangesFor(d);
      return `<tr class="${d === n.day ? 'today' : ''}"><td>${DAY_NAMES[d]}${d === n.day ? ' (today)' : ''}</td><td>${r.length ? r.map(([o, c]) => `${fmtTime(o)} – ${fmtTime(c)}`).join(', ') : 'Closed'}</td></tr>`;
    }).join('')}</tbody></table>`;
  }
  function fillStaticInfo() {
    $$('[data-addr]').forEach((e) => { e.textContent = (CFG.address && CFG.address.line1) || 'Boston'; });
    $$('[data-addr-full]').forEach((e) => { e.textContent = addrLine(); });
    $$('[data-area]').forEach((e) => { e.textContent = (CFG.address && CFG.address.area) || ''; });
    $$('[data-maps]').forEach((e) => { e.href = mapsUrl(); });
    $$('[data-tel]').forEach((e) => { const u = telUrl(); if (u) e.href = u; else { e.removeAttribute('href'); e.setAttribute('aria-disabled', 'true'); e.title = 'Phone number coming soon'; } if (!e.dataset.keep) e.textContent = CFG.phone; });
    $$('[data-hours]').forEach((e) => { e.innerHTML = hoursTable(); });
    $$('[data-std-min]').forEach((e) => { e.textContent = (CFG.pickupMinutes || {}).standard || 8; });
    $$('[data-tax]').forEach((e) => { e.textContent = ((CFG.taxRate || 0) * 100).toFixed(2).replace(/\.?0+$/, '') + '%'; });
    const g = CFG.groupOrder || {};
    $$('[data-group]').forEach((e) => { e.textContent = `${g.minBowls || 10}+ bowls · order by ${fmtTime(toMinSafe(g.orderBy || '10:30'))} · ${g.discount || '10% off'}`; });
    $$('[data-student]').forEach((e) => { e.textContent = CFG.studentDeal || ''; });
    $$('[data-year]').forEach((e) => { e.textContent = new Date().getFullYear(); });
  }
  const toMinSafe = (s) => { const [h, m] = String(s).split(':').map(Number); return (h || 0) * 60 + (m || 0); };

  function initTextSize() {
    const btn = $('#textSize');
    const apply = (on) => { document.documentElement.classList.toggle('big', on); btn.setAttribute('aria-pressed', String(on)); };
    apply(!!store.get('riceline.big', false));
    btn.addEventListener('click', () => { const on = !document.documentElement.classList.contains('big'); apply(on); store.set('riceline.big', on); toast(on ? 'Larger text on' : 'Standard text size'); });
  }

  /* ======================= menu rendering ======================= */
  const SECTIONS = [
    { id: 'deals', title: 'Meal Deals', sub: 'Bowl + add-on + drink, $15–21 with tax. Built for a quick lunch.' },
    { id: 'apps', title: 'Appetizers', sub: 'Small plates to share or start.' },
    { id: 'soups', title: 'Soups', sub: 'From light miso to a full bowl of Bún Bò Huế.' },
    { id: 'salads', title: 'Salads', sub: 'Crisp greens with house dressings.' },
    { id: 'sandwiches', title: 'Sandwiches', sub: 'Every sandwich comes with 1 side.' },
    { id: 'bowls', title: 'Entrées · Rice Bowls', sub: 'Every entrée comes with 2 sides. Tap to choose sides or tweak anything.' },
    { id: 'byo', title: 'Build Your Own', sub: 'Six quick steps down the line. Price is set by your protein.' },
    { id: 'sides', title: 'Sides & Extras', sub: 'Extra sides, more protein, avocado, egg or a sauce cup.' },
    { id: 'drinks', title: 'Drinks', sub: 'Vietnamese iced coffee, fresh-brewed tea and cold cans.' },
  ];
  function itemsFor(section) {
    switch (section) {
      case 'deals': return M.combos.map((x) => ({ kind: 'combo', id: x.id }));
      case 'bowls': return M.bowls.map((x) => ({ kind: 'bowl', id: x.id }));
      case 'apps': case 'soups': case 'salads': case 'sandwiches': return (M.plates || []).filter((x) => x.cat === section).map((x) => ({ kind: 'plate', id: x.id }));
      case 'sides': return M.sides.map((x) => ({ kind: 'side', id: x.id }));
      case 'drinks': return M.drinks.map((x) => ({ kind: 'drink', id: x.id }));
      default: return [];
    }
  }
  function itemInfo(kind, id) {
    if (kind === 'bowl') return BOWL[id];
    if (kind === 'combo') return COMBO[id];
    if (kind === 'drink') return DRINK[id];
    if (kind === 'side') return SIDE[id];
    if (kind === 'plate') return PLATE[id];
    return { name: 'Build Your Own Bowl', img: 'byo' };
  }
  function searchText(kind, id) {
    const it = itemInfo(kind, id);
    let s = [it.name, it.desc, it.sub, it.for].join(' ');
    if (kind === 'bowl') { const b = it.build; s += ' ' + [b.base, b.protein, b.veg, ...b.toppings, b.sauce, ...b.finish].filter(Boolean).map((x) => C[x].name).join(' '); }
    if (kind === 'combo') { s += ' ' + BOWL[it.bowl].name + ' ' + DRINK[it.drink].name; }
    return s.toLowerCase();
  }
  const AVOID_MAP = { 'Shellfish & mollusk': ['Mollusk (oyster)', 'Shellfish'], 'Wheat / gluten': ['Wheat'], 'Tree nuts': ['Tree nuts'] };
  function passes(kind, id, t) {
    const f = state.filters;
    if (f.q && !searchText(kind, id).includes(f.q.toLowerCase())) return false;
    for (const d of f.diet) {
      if (DIET_KEYS.includes(d) && !t.diet[d]) return false;
      if (d === 'mild' && t.spicy > 0) return false;
      if (d === 'lowcal' && kcal(t.cal) > 700) return false;
      if (d === 'protein' && t.p < 35) return false;
      if (d === 'express' && !(itemInfo(kind, id).tags || []).includes('Express')) return false;
    }
    for (const a of f.avoid) {
      const names = AVOID_MAP[a] || [a];
      if (names.some((n) => t.allergens.has(n) || t.may.has(n))) return false;
    }
    return true;
  }
  function cardHTML(kind, id, t) {
    const it = itemInfo(kind, id);
    const tags = (it.tags || []).map((x) => `<span class="${tagClass(x)}">${esc(x)}</span>`).join('');
    let price = money(t.price), extra = '', media, desc = it.desc || it.sub || '';
    if (kind === 'combo') {
      const b = BOWL[it.bowl]; const d = DRINK[it.drink];
      if (it.alc > it.price) extra = `<s>${money(it.alc)}</s>`;
      desc = `${b.name} + ${it.addons.map((a) => A[a].name.replace(/ \(.*\)/, '')).join(' + ')} + ${d.name}`;
      media = `<div class="card-media deal-media"><img src="${IMG(b.img)}" alt="" loading="lazy" decoding="async" width="560" height="420"><span class="drink-bubble"><img src="${IMG(d.img)}" alt="" loading="lazy" width="560" height="420"></span></div>`;
    } else {
      media = `<div class="card-media"><img src="${IMG(it.img)}" alt="" loading="lazy" decoding="async" width="560" height="420"></div>`;
    }
    const sub = kind === 'combo' ? `<span class="vn">${esc(it.for)}</span>` : it.sub ? `<span class="vn">${esc(it.sub)}</span>` : '';
    const save = kind === 'combo' && it.alc > it.price ? `<span class="save">Save ${money(it.alc - it.price)}</span>` : '';
    const withTax = kind === 'combo' ? `<span class="cal">${money(it.price * (1 + (CFG.taxRate || 0)))} with tax</span>` : '';
    let metaHTML = `${metaLine(price, t, extra)}${save}${withTax}`, badges = dietBadges(t, true);
    if (kind === 'side' && it.sauceCup) {
      const cals = SAUCES.map((s) => kcal(s.cal)); metaHTML = `<span class="price">${price}</span><span class="cal">${Math.min(...cals)}–${Math.max(...cals)} cal</span>`; badges = '';
    }
    if (sidesNeeded(kind, id)) metaHTML = metaHTML.replace(`${kcal(t.cal)} cal</span>`, `${kcal(t.cal)} cal + sides</span>`);
    const label = `${it.name}, ${money(t.price)}, ${kcal(t.cal)} calories`;
    return `<article class="card" data-kind="${kind}" data-id="${id}">
      <button class="card-open" type="button" aria-label="${esc(label)}. View details"></button>
      <div class="card-body">
        ${tags ? `<div class="card-tags">${tags}</div>` : ''}
        <h3>${esc(it.name)}</h3>${sub}
        <p class="desc">${esc(desc)}</p>
        <div class="diet-row">${badges}</div>
        <div class="meta">${metaHTML}</div>
      </div>
      ${media}
      <button class="add-btn" type="button" aria-label="Quick add ${esc(it.name)} to bag">${icon('plus')}</button>
    </article>`;
  }
  function byoCardHTML() {
    const min = Math.min(...byStep('protein').map((p) => p.bowlPrice));
    return `<article class="card-byo-wrap"><button class="byo-card" type="button" data-open-byo>
      <div class="byo-img"><img src="${IMG('byo', 1000)}" alt="" loading="lazy" width="1000" height="750"></div>
      <div class="byo-body">
        <span class="eyebrow">From ${money(min)} · 9 proteins</span>
        <h3>Build Your Own Bowl</h3>
        <p>Pick a base, protein, hot veggie, up to 3 fresh toppings, a sauce and a finish. We'll show calories and allergens as you go.</p>
        <ol class="byo-steps">${M.steps.map((s, i) => `<li>${i + 1} · ${esc(s.label)}</li>`).join('')}</ol>
        <span class="btn btn-light">Start building ${icon('arrow')}</span>
      </div></button></article>`;
  }
  function renderMenu() {
    const root = $('#menu'); let html = ''; let shown = 0, hidden = 0;
    for (const s of SECTIONS) {
      let body = '';
      if (s.id === 'byo') {
        const anyFilter = state.filters.q || state.filters.diet.size || state.filters.avoid.size;
        body = anyFilter && state.filters.q && !'build your own bowl custom byo'.includes(state.filters.q.toLowerCase()) ? '' : byoCardHTML();
        if (body) shown++;
      } else {
        const items = itemsFor(s.id).map((x) => ({ ...x, t: totalsFor(x.kind, x.id) }));
        const ok = items.filter((x) => passes(x.kind, x.id, x.t));
        hidden += items.length - ok.length; shown += ok.length;
        if (ok.length) body = `<div class="grid">${ok.map((x) => cardHTML(x.kind, x.id, x.t)).join('')}</div>`;
      }
      html += `<section class="menu-section wrap" id="sec-${s.id}" aria-labelledby="h-${s.id}" ${body ? '' : 'hidden'}>
        <div class="section-head"><div><h2 id="h-${s.id}">${s.title}</h2><p>${s.sub}</p></div></div>${body}</section>`;
    }
    if (!shown) html += `<div class="wrap"><p class="empty-note">No items match your filters. <button class="link-btn" type="button" data-clear-filters>Clear filters</button></p></div>`;
    else if (hidden) html += `<div class="wrap"><p class="empty-note">${hidden} item${hidden > 1 ? 's' : ''} hidden by your filters. Many bowls can be changed to fit — tap one to swap ingredients. <button class="link-btn" type="button" data-clear-filters>Show everything</button></p></div>`;
    root.innerHTML = html;
    // nav visibility
    SECTIONS.forEach((s) => { const a = $(`.cat[href="#sec-${s.id}"]`); if (a) a.hidden = !!$(`#sec-${s.id}`).hidden; });
    renderActiveFilters();
    setupScrollSpy();
  }

  /* ---------- filters ---------- */
  const DIET_FILTERS = [
    ['vegan', 'Vegan'], ['veg', 'Vegetarian'], ['gf', 'Gluten-free'], ['df', 'Dairy-free'], ['mild', 'Not spicy'],
    ['lowcal', 'Under 700 cal'], ['protein', '35g+ protein'], ['express', 'Express (ready fastest)'],
  ];
  const AVOID_FILTERS = ['Egg', 'Milk', 'Fish', 'Shellfish & mollusk', 'Soy', 'Wheat / gluten', 'Sesame', 'Peanuts', 'Tree nuts', 'Coconut'];
  function renderFilterSheet() {
    $('#dietChips').innerHTML = DIET_FILTERS.map(([k, l]) => `<button type="button" class="chip-toggle" data-diet="${k}" aria-pressed="${state.filters.diet.has(k)}">${esc(l)}</button>`).join('');
    $('#avoidChips').innerHTML = AVOID_FILTERS.map((a) => `<button type="button" class="chip-toggle avoid" data-avoid="${esc(a)}" aria-pressed="${state.filters.avoid.has(a)}">${esc(a)}</button>`).join('');
    updateFilterCount();
  }
  function updateFilterCount() {
    const n = state.filters.diet.size + state.filters.avoid.size;
    $('#filterBtn').classList.toggle('has', n > 0); $('#filterCount').textContent = n;
    $('#filterApply').textContent = n ? `Show results (${n} filter${n > 1 ? 's' : ''})` : 'Show all items';
  }
  function renderActiveFilters() {
    const f = state.filters; const box = $('#activeFilters');
    const chips = [...f.diet].map((k) => `<button type="button" class="fchip" data-rm-diet="${k}" aria-label="Remove filter ${esc((DIET_FILTERS.find((x) => x[0] === k) || [k, k])[1])}">${esc((DIET_FILTERS.find((x) => x[0] === k) || [k, k])[1])} ${icon('x')}</button>`)
      .concat([...f.avoid].map((a) => `<button type="button" class="fchip avoid" data-rm-avoid="${esc(a)}" aria-label="Remove filter no ${esc(a)}">No ${esc(a.toLowerCase())} ${icon('x')}</button>`));
    if (f.q) chips.unshift(`<button type="button" class="fchip" data-rm-q aria-label="Clear search">“${esc(f.q)}” ${icon('x')}</button>`);
    box.innerHTML = chips.join('');
    box.hidden = !chips.length;
    updateFilterCount();
  }

  /* ======================= overlays ======================= */
  let openStack = [];
  function openOverlay(id, push = true) {
    const ov = $('#' + id); if (!ov || ov.classList.contains('open')) return;
    ov._lastFocus = document.activeElement;
    ov.style.zIndex = String(60 + openStack.length * 2); ov.classList.add('open'); ov.setAttribute('aria-hidden', 'false');
    document.body.classList.add('locked');
    openStack.push(id);
    if (push) history.pushState({ ov: id }, '', location.pathname + location.search + (ov.dataset.hash ? '#' + ov.dataset.hash : location.hash));
    requestAnimationFrame(() => { const f = $('[data-autofocus]', ov) || $('.panel', ov); f && f.focus({ preventScroll: true }); });
  }
  function closeOverlay(id, fromPop = false) {
    const ov = $('#' + id); if (!ov || !ov.classList.contains('open')) return;
    ov.classList.remove('open'); ov.setAttribute('aria-hidden', 'true');
    openStack = openStack.filter((x) => x !== id);
    if (!openStack.length) document.body.classList.remove('locked');
    if (ov._lastFocus && document.contains(ov._lastFocus)) ov._lastFocus.focus({ preventScroll: true });
    if (!fromPop && history.state && history.state.ov === id) { ignorePop++; history.back(); }
    else if (!fromPop && location.hash && /^#(item|byo|bag)/.test(location.hash) && !openStack.length) history.replaceState(null, '', location.pathname + location.search);
  }
  let ignorePop = 0;
  window.addEventListener('popstate', () => {
    if (ignorePop > 0) { ignorePop--; return; }
    // Back button closes the top overlay first (feels native on phones)
    const top = openStack[openStack.length - 1];
    if (top) closeOverlay(top, true);
  });
  document.addEventListener('keydown', (e) => {
    const top = openStack[openStack.length - 1]; if (!top) return;
    const ov = $('#' + top);
    if (e.key === 'Escape') { e.preventDefault(); closeOverlay(top); return; }
    if (e.key === 'Tab') { // focus trap
      const f = $$('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])', ov).filter((x) => !x.disabled && x.offsetParent !== null);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  document.addEventListener('click', (e) => {
    const c = e.target.closest('[data-close]'); if (c) { closeOverlay(c.dataset.close); }
  });

  /* ======================= item sheet ======================= */
  let cur = null; // { kind, id, build|opts, qty, editUid }

  function openItem(kind, id, line) {
    const it = kind === 'byo' ? null : itemInfo(kind, id);
    cur = { kind, id, qty: line ? line.qty : 1, editUid: line ? line.uid : null };
    if (kind === 'bowl' || kind === 'byo') cur.build = line ? clone(line.build) : defaultBuild(kind, id);
    else cur.opts = line ? clone(line.opts || {}) : {};
    if ((kind === 'plate' || kind === 'combo') && sidesNeeded(kind, id) && !cur.opts.sides) cur.opts.sides = [];
    if (kind === 'bowl' && !cur.build.sides) cur.build.sides = [];
    if (kind === 'side' && SIDE[id].sauceCup && !cur.opts.sauce) cur.opts.sauce = 's_mayo';
    if ((kind === 'drink' || kind === 'combo')) {
      const d = kind === 'drink' ? DRINK[id] : DRINK[COMBO[id].drink];
      (d.options || []).forEach((o) => { if (!cur.opts[o.id]) cur.opts[o.id] = o.choices[0].id; });
    }
    $('#sheet').dataset.hash = kind === 'byo' ? 'byo' : `item=${id}`;
    renderSheet(true);
    openOverlay('sheet');
  }

  function optHTML({ type, name, value, checked, title, small, price, disabled, step }) {
    const idv = `o-${name}-${value}`.replace(/[^\w-]/g, '');
    const pr = price === undefined ? '' : price > 0 ? `<span class="opt-price">+${money(price)}</span>` : price === 0 ? '<span class="opt-price free">Included</span>' : '';
    return `<div class="opt"><input type="${type}" id="${idv}" name="${name}" value="${esc(value)}" ${checked ? 'checked' : ''} ${disabled ? 'disabled' : ''} data-step="${step || name}">
      <label for="${idv}"><span class="tick"><svg viewBox="0 0 24 24"><path d="M5 12l5 5 9-10"/></svg></span><span class="opt-text"><b>${esc(title)}</b>${small ? `<small>${esc(small)}</small>` : ''}</span>${pr}</label></div>`;
  }
  const compSmall = (c) => [c.portion, `${kcal(c.cal)} cal`, c.allergens.length ? c.allergens.join(', ') : '', c.spicy ? (c.spicy > 1 ? 'spicy' : 'mild heat') : ''].filter(Boolean).join(' · ');

  function groupHTML(step, build, kind) {
    const meta = M.steps.find((s) => s.id === step);
    const comps = byStep(step);
    let body = '', status = '';
    if (step === 'protein') {
      body = comps.map((c) => {
        const h = optHTML({ type: 'radio', name: 'protein', value: c.id, checked: build.protein === c.id, title: c.name, small: `${c.portion} · ${kcal(c.cal)} cal · ${grams(c.p)}g protein${c.spicy ? (c.spicy > 1 ? ' · spicy' : ' · mild heat') : ''}` });
        return h.replace('</label>', `<span class="opt-price">${money(c.bowlPrice)}</span></label>`);
      }).join('');
      status = build.protein ? '<span class="req ok">Done</span>' : '<span class="req need">Required</span>';
    } else if (step === 'base') {
      const bowl = kind === 'bowl' ? BOWL[cur.id] : null;
      body = comps.map((c) => optHTML({ type: 'radio', name: 'base', value: c.id, checked: build.base === c.id, title: c.name, small: compSmall(c), price: c.price && !(bowl && bowl.baseIncluded) ? c.price : 0 })).join('');
      body += `<label class="toggle-row" style="grid-column:1/-1"><input type="checkbox" data-toggle="light" ${build.light ? 'checked' : ''}><span class="opt-text"><b>Light bowl</b><small>Half rice + extra lime slaw · same price</small></span></label>`;
      status = '<span class="req">Pick 1</span>';
    } else if (step === 'veg') {
      body = optHTML({ type: 'radio', name: 'veg', value: 'none', checked: !build.veg, title: 'No hot veggie', small: '', price: undefined })
        + comps.map((c) => optHTML({ type: 'radio', name: 'veg', value: c.id, checked: build.veg === c.id, title: c.name, small: compSmall(c), price: 0 })).join('');
      status = '<span class="req">Pick 1</span>';
    } else if (step === 'topping') {
      const n = build.toppings.length;
      body = comps.map((c) => optHTML({ type: 'checkbox', name: 'topping', value: c.id, checked: build.toppings.includes(c.id), title: c.name, small: compSmall(c), price: 0, disabled: n >= 3 && !build.toppings.includes(c.id) })).join('');
      status = `<span class="req ${n ? 'ok' : ''}">${n} of 3</span>`;
    } else if (step === 'sauce') {
      body = optHTML({ type: 'radio', name: 'sauce', value: 'none', checked: !build.sauce, title: 'No sauce' })
        + comps.map((c) => optHTML({ type: 'radio', name: 'sauce', value: c.id, checked: build.sauce === c.id, title: c.name, small: compSmall(c), price: 0 })).join('');
      body += `<label class="toggle-row" style="grid-column:1/-1"><input type="checkbox" data-toggle="sauceSide" ${build.sauceSide ? 'checked' : ''} ${build.sauce ? '' : 'disabled'}><span class="opt-text"><b>Sauce on the side</b><small>Packed in a lidded cup — keeps it crisp</small></span></label>`;
      status = '<span class="req">Pick 1</span>';
    } else if (step === 'finish') {
      body = comps.map((c) => optHTML({ type: 'checkbox', name: 'finish', value: c.id, checked: build.finish.includes(c.id), title: c.name, small: compSmall(c), price: 0 })).join('');
      status = '<span class="req">Optional</span>';
    }
    return `<section class="opt-group" data-group="${step}" id="grp-${step}"><div class="opt-head"><h3>${esc(meta.label)}</h3>${status}</div>
      <p class="opt-hint">${step === 'topping' && build.toppings.length >= 3 ? 'That’s 3 — want more? Just ask the line, extras are free.' : esc(meta.hint)}</p><div class="opts">${body}</div></section>`;
  }

  const MEAL_SIDES = () => M.sides.filter((x) => x.mealSide);
  function sidesGroupHTML(selected, n, step) {
    const chosen = selected || [];
    const body = MEAL_SIDES().map((c) => optHTML({ type: n === 1 ? 'radio' : 'checkbox', name: step, value: c.id, checked: chosen.includes(c.id), title: c.name,
      small: [c.sub, `${kcal(c.cal)} cal`, c.allergens.length ? c.allergens.join(', ') : '', c.spicy ? 'mild heat' : ''].filter(Boolean).join(' · '), price: 0,
      disabled: n > 1 && chosen.length >= n && !chosen.includes(c.id), step })).join('');
    const status = `<span class="req ${chosen.length >= n ? 'ok' : 'need'}">${chosen.length} of ${n}</span>`;
    return `<section class="opt-group" id="grp-${step}"><div class="opt-head"><h3>Choose ${n} side${n > 1 ? 's' : ''}</h3>${status}</div>
      <p class="opt-hint">Included in the price. Want more? Add extra sides from Sides & Extras.</p><div class="opts">${body}</div></section>`;
  }
  const estNote = (it) => (it && it.est ? '<p class="label-check">ⓘ Nutrition for this item is an estimate from our draft recipe.</p>' : '');

  function addonsHTML(build) {
    const p = C[build.protein];
    const rows = [
      { id: 'avocado', title: 'Avocado (½, fanned)', price: A.avocado.price, small: `${kcal(A.avocado.cal)} cal` },
      { id: 'egg', title: 'Soft Scrambled Egg', price: A.egg.price, small: `${kcal(A.egg.cal)} cal · Egg` },
      { id: 'double', title: p ? `Double ${p.name}` : 'Double protein', price: p ? doublePrice(build) : undefined, small: p ? `+${p.portion}, ${kcal(p.cal)} cal` : 'Choose a protein first', disabled: !p },
      { id: 'extrarice', title: 'Extra Rice (7 oz)', price: A.extrarice.price, small: `${kcal(A.extrarice.cal)} cal` },
      { id: 'extrasauce', title: build.sauce ? `Extra ${C[build.sauce].name.replace(/ \(.*\)/, '')} cup` : 'Extra sauce cup', price: build.sauce ? A.extrasauce.price : undefined, small: build.sauce ? `${kcal(C[build.sauce].cal)} cal` : 'Choose a sauce first', disabled: !build.sauce },
      { id: 'consomme', title: 'Birria Consommé cup (4 oz)', price: A.consomme.price, small: `${kcal(A.consomme.cal)} cal · for dipping` },
    ];
    return `<section class="opt-group" id="grp-addons"><div class="opt-head"><h3>Make it bigger</h3><span class="req">Optional</span></div><div class="opts">
      ${rows.map((r) => optHTML({ type: 'checkbox', name: 'addon', value: r.id, checked: !!build.addons[r.id] && !r.disabled, title: r.title, small: r.small, price: r.price, disabled: r.disabled })).join('')}
      </div>
      <label class="toggle-row" style="margin-top:10px"><input type="checkbox" data-toggle="viet" ${build.viet ? 'checked' : ''}><span class="opt-text"><b>Make it Saigon style — free</b><small>Add a side of garlic-lime fish sauce + pickled carrot</small></span></label>
    </section>`;
  }

  function notesHTML(value) {
    return `<section class="opt-group"><div class="opt-head"><h3>Special instructions</h3><span class="req">Optional</span></div>
      <textarea class="notes" id="itemNotes" maxlength="140" placeholder="e.g. light on rice, extra scallions">${esc(value || '')}</textarea>
      <p class="opt-hint" style="margin:8px 0 0">Food allergy? Please also tell the cashier at pickup.</p></section>`;
  }

  function nutritionHTML(t) {
    return `<details class="more"><summary>Nutrition & ingredients</summary>
      <table class="nutri-table"><thead><tr><th>Item</th><th>Calories</th></tr></thead><tbody>
      ${t.parts.map((p) => `<tr><td>${esc(p.name)}</td><td>${kcal(p.cal)}</td></tr>`).join('')}
      <tr><td><b>Total</b></td><td><b>${kcal(t.cal)}</b></td></tr></tbody></table>
      <p class="fineprint" style="margin-top:10px">Protein ${grams(t.p)}g · Carbs ${grams(t.c)}g · Fat ${grams(t.f)}g. Calculated from our recipes with USDA reference values; actual amounts vary by scoop. 2,000 calories a day is used for general nutrition advice, but calorie needs vary.</p></details>`;
  }

  function dealUpsellHTML() {
    if (cur.kind !== 'bowl' || cur.editUid) return '';
    const cb = M.combos.find((x) => x.bowl === cur.id); if (!cb) return '';
    const extra = cb.price - BOWL[cur.id].price;
    return `<div class="deal-upsell">${icon('tag')}<p><b>${esc(cb.name)} deal:</b> add ${esc(cb.addons.map((a) => A[a].name.replace(/ \(.*\)/, '')).join(' + '))} + ${esc(DRINK[cb.drink].name)} for <b>+${money(extra)}</b></p><button type="button" class="btn btn-sm btn-ghost" data-switch-combo="${cb.id}">Switch</button></div>`;
  }

  function renderSheet(first = false) {
    const { kind, id } = cur;
    const body = $('#sheetBody');
    const scrollTop = body.scrollTop;
    let t, html = '', title, sub = '', desc = '', img, imgExtra = '';
    if (kind === 'bowl' || kind === 'byo') {
      t = calcBowl(cur.build, kind, id);
      if (kind === 'bowl') { const b = BOWL[id]; title = b.name; sub = ''; desc = b.desc; img = b.img; }
      else { title = 'Build Your Own Bowl'; desc = 'Start with a protein — it sets the price. Everything else is included unless marked.'; img = 'byo'; }
    } else if (kind === 'combo') {
      const cb = COMBO[id]; t = totalsFor('combo', id, { opts: cur.opts }); title = cb.name; sub = cb.for; img = BOWL[cb.bowl].img;
      desc = `${BOWL[cb.bowl].name} + ${cb.addons.map((a) => A[a].name).join(' + ')} + ${DRINK[cb.drink].name}${cb.alc > cb.price ? ` — save ${money(cb.alc - cb.price)} vs. ordering separately` : ''}. ${CFG.studentDeal || ''}`;
      imgExtra = `<span class="drink-bubble" style="position:absolute;right:12px;bottom:12px;width:28%;aspect-ratio:1;border-radius:50%;overflow:hidden;border:4px solid var(--bg)"><img src="${IMG(DRINK[cb.drink].img)}" alt="" style="width:100%;height:100%;object-fit:cover"></span>`;
    } else if (kind === 'drink') { const d = DRINK[id]; t = totalsFor('drink', id, { opts: cur.opts }); title = d.name; sub = d.sub; desc = d.desc; img = d.img; }
    else if (kind === 'plate') { const pl = PLATE[id]; t = totalsFor('plate', id, { opts: cur.opts }); title = pl.name; sub = pl.sub; desc = pl.desc; img = pl.img; }
    else { const s = SIDE[id]; t = totalsFor('side', id, { opts: cur.opts }); title = s.name; sub = s.sub; desc = s.desc; img = s.img; }
    cur.t = t;

    html += `<div class="sheet-hero"><img src="${IMG(img, 1000)}" alt="${esc(title)}" width="1000" height="750">${imgExtra}
      <button class="icon-btn sheet-close" type="button" data-close="sheet" aria-label="Close">${icon('x')}</button></div>
      <div class="sheet-intro">
        <h2 id="sheetTitle">${esc(title)}</h2>${sub ? `<div class="vn">${esc(sub)}</div>` : ''}
        <p class="desc">${esc(desc)}</p>
        <div class="sheet-stats" aria-live="polite">
          <div class="stat"><b>${kcal(t.cal)}</b><span>Calories</span></div>
          <div class="stat"><b>${grams(t.p)}g</b><span>Protein</span></div>
          <div class="stat"><b>${grams(t.c)}g</b><span>Carbs</span></div>
          <div class="stat"><b>${grams(t.f)}g</b><span>Fat</span></div>
        </div>
        <div class="live-flags">${dietBadges(t) || '<span class="badge">Contains meat or animal products</span>'}</div>
        <p class="allergen-line"><b>Allergens:</b> ${esc(allergenText(t))}</p>
        ${[...t.checks].map((c) => `<p class="label-check">ⓘ ${esc(c)}</p>`).join('')}
        ${estNote(kind === 'plate' ? PLATE[id] : kind === 'side' ? SIDE[id] : null)}
      </div>`;

    if (kind === 'bowl') {
      html += dealUpsellHTML();
      const p = C[cur.build.protein];
      html += `<section class="opt-group"><div class="opt-head"><h3>Protein</h3><span class="req ok">${esc(p.name)}</span></div>
        <p class="opt-hint">${esc(p.desc || '')} Want a different protein? <button type="button" class="link-btn" data-open-byo>Build your own</button></p></section>`;
      if (sidesNeeded('bowl', id)) html += sidesGroupHTML(cur.build.sides, sidesNeeded('bowl', id), 'bsides');
      ['base', 'veg', 'topping', 'sauce', 'finish'].forEach((s) => { html += groupHTML(s, cur.build, kind); });
      html += addonsHTML(cur.build) + notesHTML(cur.build.notes) + nutritionHTML(t);
    } else if (kind === 'byo') {
      ['protein', 'base', 'veg', 'topping', 'sauce', 'finish'].forEach((s) => { html += groupHTML(s, cur.build, kind); });
      html += addonsHTML(cur.build) + notesHTML(cur.build.notes) + nutritionHTML(t);
    } else if (kind === 'drink' || kind === 'combo') {
      const d = kind === 'drink' ? DRINK[id] : DRINK[COMBO[id].drink];
      (d.options || []).forEach((o) => {
        html += `<section class="opt-group"><div class="opt-head"><h3>${esc(kind === 'combo' ? `${d.name}: ${o.label}` : o.label)}</h3><span class="req">Pick 1</span></div><div class="opts">
          ${o.choices.map((ch) => optHTML({ type: 'radio', name: 'opt-' + o.id, value: ch.id, checked: cur.opts[o.id] === ch.id, title: ch.label, small: `${kcal((d.cal || 0) + (ch.cal || 0))} cal`, step: 'opt:' + o.id })).join('')}</div></section>`;
      });
      if (kind === 'combo') {
        const cb = COMBO[id];
        if (sidesNeeded('combo', id)) html += sidesGroupHTML(cur.opts.sides, sidesNeeded('combo', id), 'csides');
        html += `<section class="opt-group"><div class="opt-head"><h3>What's inside</h3></div><ul style="margin:0;padding-left:20px">
          <li>${esc(BOWL[cb.bowl].name)} — ${esc(BOWL[cb.bowl].desc)}</li>${cb.addons.map((a) => `<li>${esc(a === 'double' ? 'Double protein' : A[a].name)}</li>`).join('')}<li>${esc(DRINK[cb.drink].name)}</li></ul>
          <p class="opt-hint" style="margin-top:10px">Need a change (sauce on the side, no sesame…)? Add a note and the line will take care of it.</p></section>`;
        html += notesHTML(cur.opts.notes);
      }
      html += nutritionHTML(t);
    } else if (kind === 'plate') {
      const pl = PLATE[id];
      if (pl.sides) html += sidesGroupHTML(cur.opts.sides, pl.sides, 'psides');
      html += notesHTML(cur.opts.notes) + nutritionHTML(t);
    } else if (kind === 'side') {
      if (SIDE[id].sauceCup) {
        html += `<section class="opt-group"><div class="opt-head"><h3>Choose a sauce</h3><span class="req">Pick 1</span></div><div class="opts">
          ${SAUCES.map((c) => optHTML({ type: 'radio', name: 'opt-sauce', value: c.id, checked: cur.opts.sauce === c.id, title: c.name.replace(/ \(.*\)/, ''), small: compSmall(c), step: 'opt:sauce' })).join('')}</div></section>`;
      }
      html += nutritionHTML(t);
    }
    body.innerHTML = html;
    if (!first) body.scrollTop = scrollTop; else body.scrollTop = 0;
    renderSheetFoot();
  }

  function renderSheetFoot() {
    const t = cur.t; const needP = (cur.kind === 'byo' && !cur.build.protein);
    const sn = sidesNeeded(cur.kind, cur.id), sc = sidesChosen(cur.kind, cur).length;
    const needS = sn && sc < sn; const need = needP || needS;
    const btn = $('#sheetAdd');
    $('#qtyOut').textContent = cur.qty; $('#qtyMinus').disabled = cur.qty <= 1;
    btn.disabled = need;
    btn.innerHTML = needP ? '<span>Choose a protein</span>' : needS ? `<span>Choose ${sn - sc} more side${sn - sc > 1 ? 's' : ''}</span>` : `<span>${cur.editUid ? 'Update bag' : 'Add to bag'}</span><span>${money(t.price * cur.qty)}</span>`;
  }

  // sheet interactions (event delegation)
  $('#sheetBody').addEventListener('change', (e) => {
    const el = e.target; if (!cur) return;
    const b = cur.build;
    if (el.dataset.toggle) {
      b[el.dataset.toggle] = el.checked;
      if (el.dataset.toggle === 'light' && el.checked) toast('Light bowl: half rice, extra lime slaw');
      renderSheet(); return;
    }
    const step = el.dataset.step; if (!step) return;
    if (step.startsWith('opt:')) { cur.opts[step.slice(4)] = el.value; renderSheet(); return; }
    if (step === 'psides') {
      const n = PLATE[cur.id].sides; let a = cur.opts.sides || [];
      if (n === 1) a = [el.value]; else if (el.checked && a.length < n) a = [...a, el.value]; else a = a.filter((x) => x !== el.value);
      cur.opts.sides = a; renderSheet(); return;
    }
    if (step === 'csides') {
      let a = cur.opts.sides || []; const n = sidesNeeded('combo', cur.id);
      if (el.checked && a.length < n) a = [...a, el.value]; else a = a.filter((x) => x !== el.value);
      cur.opts.sides = a; renderSheet(); return;
    }
    if (step === 'bsides') {
      let a = b.sides || []; if (el.checked && a.length < 2) a = [...a, el.value]; else a = a.filter((x) => x !== el.value);
      b.sides = a; renderSheet(); return;
    }
    if (step === 'protein') { b.protein = el.value; b.addons.double = b.addons.double && C[b.protein] ? 1 : 0; }
    else if (step === 'base') b.base = el.value;
    else if (step === 'veg') b.veg = el.value === 'none' ? null : el.value;
    else if (step === 'sauce') { b.sauce = el.value === 'none' ? null : el.value; if (!b.sauce) { b.sauceSide = false; delete b.addons.extrasauce; } }
    else if (step === 'topping') { if (el.checked && b.toppings.length < 3) b.toppings.push(el.value); else b.toppings = b.toppings.filter((x) => x !== el.value); }
    else if (step === 'finish') { if (el.checked) b.finish.push(el.value); else b.finish = b.finish.filter((x) => x !== el.value); }
    else if (step === 'addon') { if (el.checked) b.addons[el.value] = 1; else delete b.addons[el.value]; }
    renderSheet();
    if (step === 'protein' && cur.kind === 'byo') { // guide to next step
      const g = $('#grp-base'); g && setTimeout(() => g.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
    }
  });
  $('#sheetBody').addEventListener('input', (e) => {
    if (e.target.id === 'itemNotes' && cur) { if (cur.build) cur.build.notes = e.target.value; else cur.opts.notes = e.target.value; }
  });
  $('#sheetBody').addEventListener('click', (e) => {
    const sw = e.target.closest('[data-switch-combo]');
    if (sw) { const id = sw.dataset.switchCombo; cur = null; $('#sheet').dataset.hash = 'item=' + id; openItemReplace('combo', id); }
    const byo = e.target.closest('[data-open-byo]');
    if (byo) { openItemReplace('byo', 'byo'); }
  });
  function openItemReplace(kind, id) {
    cur = { kind, id, qty: 1, editUid: null };
    if (kind === 'byo') cur.build = defaultBuild('byo');
    else { cur.opts = {}; const d = DRINK[COMBO[id].drink]; (d.options || []).forEach((o) => { cur.opts[o.id] = o.choices[0].id; }); }
    $('#sheet').dataset.hash = kind === 'byo' ? 'byo' : 'item=' + id;
    history.replaceState({ ov: 'sheet' }, '', location.pathname + location.search + '#' + $('#sheet').dataset.hash);
    renderSheet(true);
    $('#sheetBody').focus();
  }
  $('#qtyMinus').addEventListener('click', () => { if (cur.qty > 1) { cur.qty--; renderSheetFoot(); } });
  $('#qtyPlus').addEventListener('click', () => { if (cur.qty < 20) { cur.qty++; renderSheetFoot(); } });
  $('#sheetAdd').addEventListener('click', () => {
    if (!cur) return;
    if (cur.kind === 'byo' && !cur.build.protein) { $('#grp-protein').scrollIntoView({ behavior: 'smooth' }); return; }
    { const sn = sidesNeeded(cur.kind, cur.id); if (sn && sidesChosen(cur.kind, cur).length < sn) { const g = $('[id$="sides"].opt-group'); g && g.scrollIntoView({ behavior: 'smooth' }); return; } }
    const line = { uid: cur.editUid || uid(), kind: cur.kind, id: cur.id, qty: cur.qty };
    if (cur.build) line.build = clone(cur.build); else line.opts = clone(cur.opts);
    const name = cur.kind === 'byo' ? 'Build Your Own Bowl' : itemInfo(cur.kind, cur.id).name;
    if (cur.editUid) { const i = state.bag.findIndex((l) => l.uid === cur.editUid); if (i > -1) state.bag[i] = line; }
    else state.bag.push(line);
    saveBag(); renderBagBadge();
    const editing = !!cur.editUid;
    closeOverlay('sheet');
    if (editing) { renderBag(); toast('Bag updated'); }
    else toast(`Added ${cur.qty > 1 ? cur.qty + '× ' : ''}${name}`, 'View bag', openBag);
  });

  /* ======================= quick add from cards ======================= */
  $('#menu').addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    if (e.target.closest('[data-clear-filters]')) { clearFilters(); return; }
    if (e.target.closest('[data-open-byo]')) { openItem('byo', 'byo'); return; }
    if (!card) return;
    const { kind, id } = card.dataset;
    if (e.target.closest('.add-btn')) {
      if ((kind === 'side' && SIDE[id].sauceCup) || sidesNeeded(kind, id)) { openItem(kind, id); return; }
      const line = { uid: uid(), kind, id, qty: 1 };
      if (kind === 'bowl') line.build = defaultBuild('bowl', id);
      else if (kind === 'plate') line.opts = {};
      else { line.opts = {}; const d = kind === 'drink' ? DRINK[id] : kind === 'combo' ? DRINK[COMBO[id].drink] : null; d && (d.options || []).forEach((o) => { line.opts[o.id] = o.choices[0].id; }); }
      state.bag.push(line); saveBag(); renderBagBadge();
      const btn = e.target.closest('.add-btn'); btn.innerHTML = icon('check'); setTimeout(() => { btn.innerHTML = icon('plus'); }, 900);
      toast(`Added ${itemInfo(kind, id).name}`, 'Customize', () => { state.bag = state.bag.filter((l) => l.uid !== line.uid); saveBag(); renderBagBadge(); openItem(kind, id); });
      return;
    }
    openItem(kind, id);
  });

  /* ======================= bag ======================= */
  function lineView(l) {
    const t = totalsFor(l.kind, l.id, l);
    let name, img, mods = [];
    if (l.kind === 'byo') {
      name = 'Build Your Own Bowl'; img = 'byo';
      const b = l.build;
      mods = [b.protein && C[b.protein].name, b.base && C[b.base].name + (b.light ? ' (light)' : ''), b.veg && C[b.veg].name, ...b.toppings.map((x) => C[x].name), b.sauce && C[b.sauce].name + (b.sauceSide ? ' (side)' : ''), ...b.finish.map((x) => C[x].name)].filter(Boolean);
    } else if (l.kind === 'bowl') {
      const bw = BOWL[l.id]; name = bw.name; img = bw.img; const d = bw.build, b = l.build;
      if (b.base !== d.base) mods.push(C[b.base].name);
      if (b.light) mods.push('Light bowl');
      if ((b.veg || null) !== (d.veg || null)) mods.push(b.veg ? C[b.veg].name : 'No hot veggie');
      d.toppings.filter((x) => !b.toppings.includes(x)).forEach((x) => mods.push('No ' + C[x].name));
      b.toppings.filter((x) => !d.toppings.includes(x)).forEach((x) => mods.push('+ ' + C[x].name));
      if ((b.sauce || null) !== (d.sauce || null)) mods.push(b.sauce ? C[b.sauce].name : 'No sauce');
      if (b.sauceSide) mods.push('Sauce on the side');
      d.finish.filter((x) => !b.finish.includes(x)).forEach((x) => mods.push('No ' + C[x].name));
      b.finish.filter((x) => !d.finish.includes(x)).forEach((x) => mods.push('+ ' + C[x].name));
      if ((b.sides || []).length) mods.push('Sides: ' + b.sides.map((x) => SIDE[x].name).join(' + '));
    }
    else if (l.kind === 'plate') { const pl = PLATE[l.id]; name = pl.name; img = pl.img; const sd = (l.opts || {}).sides || []; if (pl.sides && sd.length) mods.push('Side: ' + sd.slice(0, pl.sides).map((x) => SIDE[x].name).join(' + ')); } else if (l.kind === 'combo') { const cb = COMBO[l.id]; name = cb.name + ' (Meal Deal)'; img = BOWL[cb.bowl].img; mods.push(BOWL[cb.bowl].name, ...cb.addons.map((a) => (a === 'double' ? 'Double protein' : A[a].name)), DRINK[cb.drink].name); if (((l.opts || {}).sides || []).length) mods.push('Sides: ' + l.opts.sides.map((x) => SIDE[x].name).join(' + ')); }
    else if (l.kind === 'drink') { const d = DRINK[l.id]; name = d.name; img = d.img; }
    else { const s = SIDE[l.id]; name = s.name; img = s.img; if (s.sauceCup) mods.push(C[(l.opts || {}).sauce || 's_mayo'].name); }
    if (l.build) {
      Object.keys(l.build.addons || {}).forEach((a) => { if (!l.build.addons[a]) return; mods.push('+ ' + (a === 'double' ? 'Double protein' : a === 'extrasauce' && l.build.sauce ? 'Extra ' + C[l.build.sauce].name : A[a].name)); });
      if (l.build.viet) mods.push('Saigon style');
      if (l.build.notes) mods.push(`“${l.build.notes}”`);
    }
    const d = l.kind === 'drink' ? DRINK[l.id] : l.kind === 'combo' ? DRINK[COMBO[l.id].drink] : null;
    if (d && d.options && l.opts) d.options.forEach((o) => { const ch = o.choices.find((c) => c.id === l.opts[o.id]); if (ch && (ch !== o.choices[0] || o.id === 'flavor')) mods.push(ch.label); });
    if (l.opts && l.opts.notes) mods.push(`“${l.opts.notes}”`);
    return { t, name, img, mods, unit: t.price, total: t.price * l.qty };
  }
  function bagTotals() {
    const sub = state.bag.reduce((s, l) => s + lineView(l).total, 0);
    const tax = Math.round(sub * (CFG.taxRate || 0) * 100) / 100;
    const tip = Math.round(sub * (state.checkout.tip || 0)) / 100;
    const count = state.bag.reduce((s, l) => s + l.qty, 0);
    return { sub, tax, tip, total: sub + tax + tip, count };
  }
  function renderBagBadge() {
    const { count, sub } = bagTotals();
    $('#bagCount').textContent = count; $('#bagTotal').textContent = money(sub);
    $('#bagBtn').setAttribute('aria-label', `Bag, ${count} item${count === 1 ? '' : 's'}, ${money(sub)}`);
    $('#bagBtn').classList.remove('bump'); void $('#bagBtn').offsetWidth; if (count) $('#bagBtn').classList.add('bump');
    const bar = $('#bagbar'); bar.classList.toggle('show', count > 0 && !openStack.length);
    $('#bagbarCount').textContent = `${count} item${count === 1 ? '' : 's'}`; $('#bagbarTotal').textContent = money(sub);
  }
  function estMinutes() {
    const p = CFG.pickupMinutes || {}; const bowls = state.bag.filter((l) => ['bowl', 'byo', 'combo'].includes(l.kind)).reduce((s, l) => s + l.qty, 0);
    const allExpress = state.bag.every((l) => l.kind === 'drink' || l.kind === 'side' || (l.kind === 'bowl' && (BOWL[l.id].tags || []).includes('Express') && JSON.stringify(l.build) === JSON.stringify(defaultBuild('bowl', l.id))));
    return (allExpress ? p.express || 5 : p.standard || 8) + Math.max(0, bowls - 2) * (p.perExtraBowl || 1);
  }
  let bagView = 'bag';
  function openBag() { if (bagView !== 'done' || !$('#bag').classList.contains('open')) bagView = 'bag'; $('#bag').dataset.hash = 'bag'; renderBag(); openOverlay('bag'); }
  function renderBag() {
    const body = $('#bagBody'), foot = $('#bagFoot'), title = $('#bagTitle');
    if (bagView === 'done') return; // confirmation stays until "new order"
    if (!state.bag.length) {
      title.textContent = 'Your bag';
      body.innerHTML = `<div class="bag-empty">${icon('bag')}<p><b>Your bag is empty.</b><br>Add a bowl to get started.</p><button class="btn btn-primary" type="button" data-close="bag">Browse the menu</button></div>`;
      foot.hidden = true; return;
    }
    foot.hidden = false;
    const tt = bagTotals();
    if (bagView === 'bag') {
      title.textContent = `Your bag (${tt.count})`;
      const has = (k, id) => state.bag.some((l) => l.kind === k && l.id === id);
      const hasDrink = state.bag.some((l) => l.kind === 'drink' || l.kind === 'combo');
      const ups = [];
      if (!hasDrink) ups.push(['drink', 'caphe'], ['drink', 'iced-tea'], ['drink', 'can-soda']);
      if (!has('side', 'side-avocado')) ups.push(['side', 'side-avocado']);
      if (!has('side', 'side-egg')) ups.push(['side', 'side-egg']);
      body.innerHTML = `<ul class="bag-lines">${state.bag.map((l) => {
        const v = lineView(l);
        return `<li class="bag-line" data-uid="${l.uid}"><img src="${IMG(v.img)}" alt="" width="64" height="64" loading="lazy">
          <div><h3>${esc(v.name)}</h3>${v.mods.length ? `<p class="mods">${esc(v.mods.join(' · '))}</p>` : '<p class="mods">As described</p>'}
          <p class="mods">${kcal(v.t.cal)} cal each</p>
          <div class="line-actions"><div class="qty" role="group" aria-label="Quantity for ${esc(v.name)}"><button type="button" data-dec aria-label="Remove one">${l.qty > 1 ? icon('minus') : icon('trash')}</button><output aria-live="polite">${l.qty}</output><button type="button" data-inc aria-label="Add one">${icon('plus')}</button></div>
          ${l.kind !== 'drink' || (DRINK[l.id].options || []).length ? `<button type="button" class="link-btn" data-edit>Edit</button>` : ''}</div></div>
          <div class="line-price">${money(v.total)}</div></li>`;
      }).join('')}</ul>
      ${ups.length ? `<div class="upsell"><h3>Complete your meal</h3><div class="upsell-row">${ups.slice(0, 4).map(([k, id]) => { const it = itemInfo(k, id); return `<button type="button" class="upsell-item" data-up-kind="${k}" data-up-id="${id}"><img src="${IMG(it.img)}" alt="" loading="lazy"><b>${esc(it.name)}</b><span>+${money(it.price)}</span></button>`; }).join('')}</div></div>` : ''}
      <div class="totals"><div class="row"><span>Subtotal</span><span>${money(tt.sub)}</span></div>
      <div class="row"><span>Meals tax (<span data-tax></span>)</span><span>${money(tt.tax)}</span></div>
      <div class="row total"><span>Estimated total</span><span>${money(tt.sub + tt.tax)}</span></div>
      <p class="fineprint" style="margin-top:8px">Tip is optional and added at checkout.</p></div>`;
      foot.innerHTML = `<button type="button" class="btn btn-primary btn-block" id="toCheckout" style="justify-content:space-between"><span>Checkout</span><span>${money(tt.sub + tt.tax)}</span></button>`;
    } else if (bagView === 'checkout') {
      title.textContent = 'Checkout';
      const st = storeStatus(); const est = estMinutes(); const slots = pickupSlots(est);
      const co = state.checkout;
      const demo = (CFG.orderMode || 'demo') === 'demo';
      body.innerHTML = `<div class="checkout">
        ${demo ? `<p class="notice warn"><b>Preview mode.</b> Online ordering isn’t connected yet, so this order will not be sent to the kitchen.</p>` : ''}
        ${!st.ordering ? `<p class="notice warn">${esc(st.label)}. Choose a time below to order ahead.</p>` : ''}
        <h3>How are you eating?</h3>
        <div class="seg" role="group" aria-label="Order type"><button type="button" data-type="pickup" aria-pressed="${co.type === 'pickup'}">Pickup / to go</button><button type="button" data-type="dinein" aria-pressed="${co.type === 'dinein'}">Dine-in</button></div>
        <h3>When?</h3>
        <label class="field"><span>Ready time</span><select id="coTime">${slots.map((s) => `<option value="${s.v}">${esc(s.label)}</option>`).join('') || '<option value="">No times available</option>'}</select></label>
        <h3>Your details</h3>
        <label class="field" id="fName"><span>First name (for the pickup shelf)</span><input id="coName" autocomplete="given-name" value="${esc(co.name)}" maxlength="30" required><span class="err">Please add your name.</span></label>
        <label class="field" id="fPhone"><span>Mobile number (we text you when it’s ready)</span><input id="coPhone" type="tel" inputmode="tel" autocomplete="tel" value="${esc(co.phone)}" placeholder="(617) xxx-xxxx" required><span class="err">Please enter a 10-digit US number.</span></label>
        <label class="toggle-row"><input type="checkbox" id="coAllergy"><span class="opt-text"><b>Someone in my party has a food allergy</b><small>We’ll flag your order. Please also tell the cashier.</small></span></label>
        <label class="field" id="fAllergy" hidden><span>Which allergy?</span><input id="coAllergyText" maxlength="80" placeholder="e.g. sesame"></label>
        <h3>Add a tip? <span class="fineprint">(optional — 100% goes to the team)</span></h3>
        <div class="seg" role="group" aria-label="Tip">${(CFG.tipOptions || [0, 10, 15, 20]).map((p) => `<button type="button" data-tip="${p}" aria-pressed="${co.tip === p}">${p ? p + '%' : 'No tip'}</button>`).join('')}</div>
        <div class="totals" style="padding:16px 0 0"><div class="row"><span>Subtotal (${tt.count} item${tt.count === 1 ? '' : 's'})</span><span>${money(tt.sub)}</span></div>
        <div class="row"><span>Meals tax (<span data-tax></span>)</span><span>${money(tt.tax)}</span></div>
        <div class="row"><span>Tip</span><span>${money(tt.tip)}</span></div>
        <div class="row total"><span>Total</span><span>${money(tt.total)}</span></div></div>
        <p class="notice">${demo ? 'In the live version you’ll pay at the counter or online.' : 'Pay at the counter when you pick up — card, phone or cash.'} Before placing your order, please inform us if a person in your party has a food allergy.</p>
      </div>`;
      foot.innerHTML = `<button type="button" class="btn-ghost btn" id="backToBag">${icon('back')} Bag</button><button type="button" class="btn btn-primary" id="placeOrder" style="flex:1;justify-content:space-between"><span>${demo ? 'Place test order' : 'Place order'}</span><span>${money(tt.total)}</span></button>`;
      $('#coAllergy').addEventListener('change', (e) => { $('#fAllergy').hidden = !e.target.checked; if (e.target.checked) $('#coAllergyText').focus(); });
    }
    $$('[data-tax]', body).forEach((e) => { e.textContent = ((CFG.taxRate || 0) * 100).toFixed(2).replace(/\.?0+$/, '') + '%'; });
  }
  $('#bagBody').addEventListener('click', (e) => {
    const li = e.target.closest('.bag-line');
    if (li) {
      const l = state.bag.find((x) => x.uid === li.dataset.uid); if (!l) return;
      if (e.target.closest('[data-inc]')) { l.qty = Math.min(20, l.qty + 1); }
      else if (e.target.closest('[data-dec]')) {
        if (l.qty > 1) l.qty--; else {
          const idx = state.bag.indexOf(l); state.bag.splice(idx, 1);
          toast(`Removed ${lineView(l).name}`, 'Undo', () => { state.bag.splice(idx, 0, l); saveBag(); renderBag(); renderBagBadge(); });
        }
      } else if (e.target.closest('[data-edit]')) { openItem(l.kind, l.id, l); return; }
      else return;
      saveBag(); renderBag(); renderBagBadge(); return;
    }
    const up = e.target.closest('[data-up-kind]');
    if (up) {
      const { upKind: k, upId: id } = up.dataset; const line = { uid: uid(), kind: k, id, qty: 1, opts: {} };
      const d = k === 'drink' ? DRINK[id] : null; d && (d.options || []).forEach((o) => { line.opts[o.id] = o.choices[0].id; });
      state.bag.push(line); saveBag(); renderBag(); renderBagBadge(); toast(`Added ${itemInfo(k, id).name}`);
      return;
    }
    const ty = e.target.closest('[data-type]'); if (ty) { state.checkout.type = ty.dataset.type; $$('[data-type]').forEach((b) => b.setAttribute('aria-pressed', String(b === ty))); store.set('riceline.checkout.v1', state.checkout); return; }
    const tp = e.target.closest('[data-tip]'); if (tp) { readCheckoutFields(); state.checkout.tip = Number(tp.dataset.tip); store.set('riceline.checkout.v1', state.checkout); const keep = $('#coTime').value; const al = $('#coAllergy').checked, at = $('#coAllergyText').value; renderBag(); $('#coTime').value = keep; $('#coAllergy').checked = al; $('#coAllergyText').value = at; $('#fAllergy').hidden = !al; $(`[data-tip="${tp.dataset.tip}"]`).focus(); return; }
  });
  $('#bagFoot').addEventListener('click', (e) => {
    if (e.target.closest('#toCheckout')) { bagView = 'checkout'; renderBag(); $('#bagBody').scrollTop = 0; $('#bagTitle').focus(); }
    else if (e.target.closest('#backToBag')) { readCheckoutFields(); bagView = 'bag'; renderBag(); }
    else if (e.target.closest('#placeOrder')) placeOrder();
    else if (e.target.closest('#newOrder')) { bagView = 'bag'; closeOverlay('bag'); renderBag(); }
  });
  function readCheckoutFields() {
    const n = $('#coName'), p = $('#coPhone'); if (!n) return;
    state.checkout.name = n.value.trim(); state.checkout.phone = p.value.trim(); store.set('riceline.checkout.v1', state.checkout);
  }
  function orderText(no, slotLabel, tt) {
    const co = state.checkout;
    const lines = state.bag.map((l) => { const v = lineView(l); return `${l.qty}x ${v.name} — ${money(v.total)}${v.mods.length ? '\n   ' + v.mods.join(', ') : ''}`; });
    const allergy = $('#coAllergy') && $('#coAllergy').checked ? `\n⚠ ALLERGY: ${$('#coAllergyText').value || 'yes — ask guest'}` : '';
    return `${CFG.name || 'Riceline'} order ${no}\n${co.type === 'dinein' ? 'Dine-in' : 'Pickup'} · ${slotLabel}\nName: ${co.name} · ${co.phone}${allergy}\n\n${lines.join('\n')}\n\nSubtotal ${money(tt.sub)} · Tax ${money(tt.tax)} · Tip ${money(tt.tip)}\nTOTAL ${money(tt.total)}`;
  }
  function placeOrder() {
    readCheckoutFields();
    const co = state.checkout; let ok = true;
    const fName = $('#fName'), fPhone = $('#fPhone');
    fName.classList.toggle('invalid', !co.name); if (!co.name) ok = false;
    const digits = co.phone.replace(/\D/g, '').replace(/^1(?=\d{10}$)/, '');
    fPhone.classList.toggle('invalid', digits.length !== 10); if (digits.length !== 10) ok = false;
    const sel = $('#coTime'); if (!sel.value) ok = false;
    if (!ok) { const first = $('.field.invalid input'); first && first.focus(); toast('Please check the highlighted fields'); return; }
    const slotLabel = sel.options[sel.selectedIndex].text;
    const tt = bagTotals();
    const no = 'R' + String(Math.floor(100 + Math.random() * 900));
    const text = orderText(no, slotLabel, tt);
    const mode = CFG.orderMode || 'demo';
    if (mode === 'sms' && CFG.smsNumber) location.href = `sms:${CFG.smsNumber}${/iPhone|iPad/.test(navigator.userAgent) ? '&' : '?'}body=${encodeURIComponent(text)}`;
    else if (mode === 'email' && CFG.email) location.href = `mailto:${CFG.email}?subject=${encodeURIComponent(`Order ${no} — ${co.name}`)}&body=${encodeURIComponent(text)}`;
    else if (mode === 'link' && CFG.orderLink) { try { navigator.clipboard && navigator.clipboard.writeText(text).catch(() => {}); } catch (e) { /* ignore */ } window.open(CFG.orderLink, '_blank', 'noopener'); }
    const summary = state.bag.map((l) => { const v = lineView(l); return `<li><span>${l.qty}× ${esc(v.name)}</span><span>${money(v.total)}</span></li>`; }).join('');
    bagView = 'done';
    $('#bagTitle').textContent = 'Order placed';
    $('#bagBody').innerHTML = `<div class="confirm"><div class="big-check">${icon('check')}</div>
      <h2>${mode === 'demo' ? 'Test order complete' : 'Thanks, ' + esc(co.name) + '!'}</h2>
      <p>${co.type === 'dinein' ? 'Dine-in' : 'Pickup'} · ${esc(slotLabel)}</p>
      <div class="order-no" aria-label="Order number ${no}">${no}</div>
      <p class="fineprint">Show this number at the counter${co.type === 'pickup' ? ' or grab your bag from the named pickup shelf' : ''}.</p>
      <ul class="confirm-list">${summary}<li><b>Total</b><b>${money(tt.total)}</b></li></ul>
      ${mode === 'demo' ? '<p class="notice warn">Preview mode — nothing was sent. The owner can connect ordering in config.js.</p>' : mode === 'link' ? '<p class="notice">We copied your order and opened our ordering page — paste it there if needed.</p>' : ''}
      <p class="fineprint">📍 <span>${esc(addrLine())}</span> · <a href="${mapsUrl()}" target="_blank" rel="noopener">Directions</a></p></div>`;
    $('#bagFoot').innerHTML = `<button type="button" class="btn btn-primary btn-block" id="newOrder">Start a new order</button>`;
    state.bag = []; saveBag(); renderBagBadge();
    $('#bagBody').scrollTop = 0;
  }

  /* ======================= filters UI ======================= */
  function clearFilters() { state.filters.diet.clear(); state.filters.avoid.clear(); state.filters.q = ''; $('#q').value = ''; renderFilterSheet(); renderMenu(); }
  $('#filterBtn').addEventListener('click', () => { renderFilterSheet(); openOverlay('filters'); });
  $('#filters').addEventListener('click', (e) => {
    const d = e.target.closest('[data-diet]'); const a = e.target.closest('[data-avoid]');
    if (d) { const k = d.dataset.diet; state.filters.diet.has(k) ? state.filters.diet.delete(k) : state.filters.diet.add(k); d.setAttribute('aria-pressed', String(state.filters.diet.has(k))); updateFilterCount(); renderMenu(); }
    if (a) { const k = a.dataset.avoid; state.filters.avoid.has(k) ? state.filters.avoid.delete(k) : state.filters.avoid.add(k); a.setAttribute('aria-pressed', String(state.filters.avoid.has(k))); updateFilterCount(); renderMenu(); }
    if (e.target.closest('#filterClear')) { clearFilters(); }
    if (e.target.closest('#filterApply')) { closeOverlay('filters'); $('#menu').scrollIntoView({ behavior: 'smooth' }); }
  });
  $('#activeFilters').addEventListener('click', (e) => {
    const d = e.target.closest('[data-rm-diet]'), a = e.target.closest('[data-rm-avoid]'), q = e.target.closest('[data-rm-q]');
    if (d) state.filters.diet.delete(d.dataset.rmDiet); if (a) state.filters.avoid.delete(a.dataset.rmAvoid); if (q) { state.filters.q = ''; $('#q').value = ''; }
    if (d || a || q) renderMenu();
  });
  $('#searchBtn').addEventListener('click', () => {
    const sb = $('#searchbar'); const show = !sb.classList.contains('show'); sb.classList.toggle('show', show);
    $('#searchBtn').setAttribute('aria-expanded', String(show)); if (show) $('#q').focus(); else if (state.filters.q) { state.filters.q = ''; $('#q').value = ''; renderMenu(); }
  });
  let qTimer; $('#q').addEventListener('input', (e) => { clearTimeout(qTimer); qTimer = setTimeout(() => { state.filters.q = e.target.value.trim(); renderMenu(); }, 160); });
  $('#qClear').addEventListener('click', () => { $('#q').value = ''; state.filters.q = ''; renderMenu(); $('#q').focus(); });

  /* ======================= nav / scrollspy ======================= */
  let spy;
  function setupScrollSpy() {
    if (spy) spy.disconnect();
    if (!('IntersectionObserver' in window)) return;
    spy = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          const id = en.target.id; $$('.cat').forEach((c) => { const on = c.getAttribute('href') === '#' + id; c.classList.toggle('active', on); if (on) { c.setAttribute('aria-current', 'true'); const bar = $('.cats'); bar.scrollTo({ left: c.offsetLeft - 16, behavior: 'smooth' }); } else c.removeAttribute('aria-current'); });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('.menu-section').forEach((s) => spy.observe(s));
  }
  $$('.cat[href^="#"]').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); const t = $(a.getAttribute('href')); t && t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }));

  /* ======================= wiring ======================= */
  $('#bagBtn').addEventListener('click', openBag);
  $('#bagbarBtn').addEventListener('click', openBag);
  $('#statusPill').addEventListener('click', () => { $('#infoHours').innerHTML = hoursTable(); $('#infoStatus').textContent = storeStatus().label; openOverlay('info'); });
  $$('[data-open-info]').forEach((b) => b.addEventListener('click', () => $('#statusPill').click()));
  $$('[data-goto]').forEach((b) => b.addEventListener('click', () => { const t = $('#' + b.dataset.goto); t && t.scrollIntoView({ behavior: 'smooth' }); }));
  $$('[data-start-byo]').forEach((b) => b.addEventListener('click', () => openItem('byo', 'byo')));
  // keep bag bar hidden while an overlay is open
  const mo = new MutationObserver(() => renderBagBadge()); $$('.overlay').forEach((o) => mo.observe(o, { attributes: true, attributeFilter: ['class'] }));

  function routeFromHash() {
    const h = location.hash.slice(1);
    if (h.startsWith('item=')) { const id = decodeURIComponent(h.slice(5)); const kind = BOWL[id] ? 'bowl' : COMBO[id] ? 'combo' : DRINK[id] ? 'drink' : SIDE[id] ? 'side' : PLATE[id] ? 'plate' : null; if (kind) { history.replaceState(null, '', location.pathname + location.search); openItem(kind, id); } }
    else if (h === 'byo') { history.replaceState(null, '', location.pathname + location.search); openItem('byo', 'byo'); }
    else if (h === 'bag') { history.replaceState(null, '', location.pathname + location.search); openBag(); }
  }

  window.addEventListener('hashchange', () => { if (/^#(item=|byo$|bag$)/.test(location.hash) && !openStack.length) routeFromHash(); });
  fillStaticInfo();
  renderStatus(); setInterval(renderStatus, 60000);
  initTextSize();
  renderMenu();
  renderBagBadge();
  routeFromHash();
  window.__RLUI = { openItem, openBag, state, renderMenu }; // handy for QA in the console
})();
