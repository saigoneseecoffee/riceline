/* Riceline — menu & ordering app (no framework, no build step).
   Data: data/menu.js (window.RICELINE_MENU) · Settings: config.js (window.RICELINE_CONFIG) */
(() => {
  'use strict';

  const CFG = window.RICELINE_CONFIG || {};
  const M = window.RICELINE_MENU;
  if (!M) { document.getElementById('menu').innerHTML = '<p class="empty-note">Menu failed to load. Please refresh.</p>'; return; }

  /* ---------------- helpers ---------------- */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const money = (n) => '$' + (Math.round(n * 100) / 100).toFixed(2);
  const kcal = (n) => (n < 5 ? 0 : n <= 50 ? Math.round(n / 5) * 5 : Math.round(n / 10) * 10); // FDA rounding rules
  const grams = (n) => (n < 0.5 ? 0 : Math.round(n));
  const ILLUS = (CFG.imageStyle || window.RICELINE_IMAGE_STYLE || 'illustration') !== 'photo';
  const IMG = (k, size = 560) => (ILLUS ? `illus/${k}.svg` : `img/${k}-${size}.webp`);
  const icon = (id, cls = 'icon') => `<svg class="${cls}" aria-hidden="true"><use href="#i-${id}"/></svg>`;
  const uid = () => Math.random().toString(36).slice(2, 9);
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* private mode */ } },
  };
  const clone = (o) => JSON.parse(JSON.stringify(o));

  /* ---------------- data indexes ---------------- */
  const C = Object.fromEntries(M.components.map((c) => [c.id, c]));
  const A = Object.fromEntries(M.addons.map((a) => [a.id, a]));
  const BOWL = Object.fromEntries(M.bowls.map((b) => [b.id, b]));
  const COMBO = Object.fromEntries(M.combos.map((b) => [b.id, b]));
  const DRINK = Object.fromEntries(M.drinks.map((b) => [b.id, b]));
  const SIDE = Object.fromEntries(M.sides.map((b) => [b.id, b]));
  const PLATE = Object.fromEntries((M.plates || []).map((b) => [b.id, b]));
  const byStep = (step) => M.components.filter((c) => c.step === step);
  const SAUCES = byStep('sauce');
  const DIET_KEYS = ['vegan', 'veg', 'gf', 'df'];
  const DIET_LABEL = { vegan: 'Vegan', veg: 'Vegetarian', gf: 'Gluten-free', df: 'Dairy-free' };

  /* ---------------- nutrition / price engine ---------------- */
  function emptyTotals() {
    return { cal: 0, p: 0, c: 0, f: 0, allergens: new Set(), may: new Set(), diet: { vegan: true, veg: true, gf: true, df: true }, spicy: 0, checks: new Set(), parts: [] };
  }
  function addPart(t, src, factor = 1, label) {
    if (!src) return;
    t.cal += (src.cal || 0) * factor; t.p += (src.p || 0) * factor; t.c += (src.c || 0) * factor; t.f += (src.f || 0) * factor;
    (src.allergens || []).forEach((a) => t.allergens.add(a));
    (src.mayContain || []).forEach((a) => t.may.add(a));
    if (src.diet) DIET_KEYS.forEach((k) => { if (!src.diet[k]) t.diet[k] = false; });
    t.spicy = Math.max(t.spicy, src.spicy || 0);
    if (src.labelCheck) t.checks.add(src.labelCheck);
    t.parts.push({ name: label || src.name, cal: (src.cal || 0) * factor });
  }

  function defaultBuild(kind, id) {
    if (kind === 'bowl') {
      const b = BOWL[id].build;
      return { base: b.base, protein: b.protein, proteinOz: b.proteinOz || null, veg: b.veg || null, toppings: [...b.toppings], sauce: b.sauce || null,
        sauceSide: false, finish: [...b.finish], addons: {}, light: false, viet: false, notes: '', sides: [] };
    }
    return { base: 'jasmine', protein: null, proteinOz: null, veg: null, toppings: [], sauce: null, sauceSide: false, finish: [], addons: {}, light: false, viet: false, notes: '' };
  }

  function doublePrice(build) {
    const p = C[build.protein];
    return p ? A.double.doublePrices[p.cls] : 0;
  }

  function calcBowl(build, kind, id) {
    const t = emptyTotals();
    let price = 0;
    const bowl = kind === 'bowl' ? BOWL[id] : null;
    if (bowl) price = bowl.price;
    else if (build.protein) price = C[build.protein].bowlPrice;
    if (build.base === 'friedrice' && !(bowl && bowl.baseIncluded)) price += C.friedrice.price;

    if (build.base) addPart(t, C[build.base], build.light ? 0.5 : 1, C[build.base].name + (build.light ? ' (half)' : ''));
    if (build.protein) {
      const p = C[build.protein];
      const f = build.proteinOz ? build.proteinOz / p.oz : 1;
      addPart(t, p, f, p.name + (build.proteinOz ? ` (${build.proteinOz} oz)` : ''));
    }
    if (build.veg) addPart(t, C[build.veg]);
    build.toppings.forEach((x) => addPart(t, C[x]));
    if (build.light) addPart(t, C.slaw, 1, 'Extra Lime Slaw (Light bowl)');
    if (build.sauce) addPart(t, C[build.sauce], 1, C[build.sauce].name + (build.sauceSide ? ' (on the side)' : ''));
    build.finish.forEach((x) => addPart(t, C[x]));
    (build.sides || []).forEach((x) => { if (SIDE[x]) addPart(t, SIDE[x], 1, SIDE[x].name + ' (side)'); });
    if (build.viet) {
      addPart(t, C.s_nuoccham, 1, 'Garlic-Lime Fish Sauce (Saigon style)');
      if (!build.toppings.includes('dochua')) addPart(t, C.dochua, 1, 'Pickled Carrot (Saigon style)');
    }
    const ad = build.addons || {};
    if (ad.avocado) { addPart(t, A.avocado); price += A.avocado.price; }
    if (ad.egg) { addPart(t, A.egg); price += A.egg.price; }
    if (ad.extrarice) { addPart(t, A.extrarice); price += A.extrarice.price; }
    if (ad.consomme) { addPart(t, A.consomme); price += A.consomme.price; }
    if (ad.extrasauce && build.sauce) { addPart(t, C[build.sauce], 1, 'Extra ' + C[build.sauce].name); price += A.extrasauce.price; }
    if (ad.double && build.protein) { addPart(t, C[build.protein], build.proteinOz ? build.proteinOz / C[build.protein].oz : 1, 'Double ' + C[build.protein].name); price += doublePrice(build); }
    t.price = price;
    return t;
  }

  function drinkTotals(d, opts = {}) {
    const t = emptyTotals();
    const src = { ...d };
    (d.options || []).forEach((o) => {
      const ch = o.choices.find((c) => c.id === (opts[o.id] || o.choices[0].id));
      if (ch) { src.cal += ch.cal || 0; src.c += ch.c || 0; }
    });
    addPart(t, src);
    t.price = d.price;
    return t;
  }

  function sideTotals(s, opts = {}) {
    if (s.sauceCup) {
      const sauce = C[opts.sauce || 's_mayo'];
      const t = emptyTotals(); addPart(t, sauce); t.price = s.price; return t;
    }
    const t = emptyTotals(); addPart(t, s); t.price = s.price; return t;
  }

  function plateTotals(pl, opts = {}) {
    const t = emptyTotals(); addPart(t, pl);
    const sides = opts.sides || [];
    sides.slice(0, pl.sides || 0).forEach((x) => { if (SIDE[x]) addPart(t, SIDE[x], 1, SIDE[x].name + ' (side)'); });
    t.price = pl.price;
    return t;
  }

  function comboTotals(cb, opts = {}) {
    const build = defaultBuild('bowl', cb.bowl);
    cb.addons.forEach((a) => { build.addons[a] = 1; });
    const t = calcBowl(build, 'bowl', cb.bowl);
    const dt = drinkTotals(DRINK[cb.drink], opts);
    addPart(t, { ...DRINK[cb.drink], cal: dt.cal, c: dt.c }, 1, DRINK[cb.drink].name);
    (opts.sides || []).forEach((x) => { if (SIDE[x]) addPart(t, SIDE[x], 1, SIDE[x].name + ' (side)'); });
    t.price = cb.price;
    return t;
  }

  // how many included sides an item needs, and how many are chosen
  function sidesNeeded(kind, id) {
    if (kind === 'bowl') return BOWL[id].sideCount || 0;
    if (kind === 'combo') return BOWL[COMBO[id].bowl].sideCount || 0;
    if (kind === 'plate') return PLATE[id].sides || 0;
    return 0;
  }
  function sidesChosen(kind, line) {
    if (!line) return [];
    return (kind === 'bowl' ? (line.build || {}).sides : (line.opts || {}).sides) || [];
  }

  function totalsFor(kind, id, line) {
    if (kind === 'bowl' || kind === 'byo') return calcBowl(line ? line.build : defaultBuild(kind, id), kind, id);
    if (kind === 'combo') return comboTotals(COMBO[id], line ? line.opts : {});
    if (kind === 'drink') return drinkTotals(DRINK[id], line ? line.opts : {});
    if (kind === 'side') return sideTotals(SIDE[id], line ? line.opts : {});
    if (kind === 'plate') return plateTotals(PLATE[id], line ? line.opts : {});
    return emptyTotals();
  }

  /* ---------------- store hours ---------------- */
  const DAYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const DAY_NAMES = { sun: 'Sunday', mon: 'Monday', tue: 'Tuesday', wed: 'Wednesday', thu: 'Thursday', fri: 'Friday', sat: 'Saturday' };
  const toMin = (hhmm) => { const [h, m] = hhmm.split(':').map(Number); return h * 60 + m; };
  const fmtTime = (min) => {
    const h = Math.floor(min / 60) % 24, m = min % 60;
    const ap = h >= 12 ? 'PM' : 'AM'; const h12 = ((h + 11) % 12) + 1;
    return m ? `${h12}:${String(m).padStart(2, '0')} ${ap}` : `${h12} ${ap}`;
  };
  function nowInStore() {
    const qp = new URLSearchParams(location.search).get('now'); // QA helper: ?now=2026-10-13T12:00
    let d = new Date();
    if (qp) {
      const [date, time] = qp.split('T'); const [y, mo, da] = date.split('-').map(Number); const [h, mi] = (time || '12:00').split(':').map(Number);
      const dow = new Date(Date.UTC(y, mo - 1, da)).getUTCDay();
      return { day: DAYS[dow], dayIdx: dow, min: h * 60 + mi };
    }
    try {
      const parts = new Intl.DateTimeFormat('en-US', { timeZone: CFG.timezone || 'America/New_York', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(d);
      const get = (t) => parts.find((p) => p.type === t).value;
      const day = get('weekday').toLowerCase().slice(0, 3);
      return { day, dayIdx: DAYS.indexOf(day), min: (Number(get('hour')) % 24) * 60 + Number(get('minute')) };
    } catch (e) {
      return { day: DAYS[d.getDay()], dayIdx: d.getDay(), min: d.getHours() * 60 + d.getMinutes() };
    }
  }
  const rangesFor = (day) => ((CFG.hours || {})[day] || []).map(([o, c]) => [toMin(o), toMin(c)]);
  function storeStatus() {
    const n = nowInStore(); const last = CFG.lastOrderMinutesBeforeClose || 0;
    const today = rangesFor(n.day);
    for (const [o, c] of today) {
      if (n.min >= o && n.min < c) {
        const ordering = n.min < c - last;
        return { open: true, ordering, closeAt: c, label: `Open · until ${fmtTime(c)}`, short: 'Open' };
      }
    }
    // next opening
    for (let i = 0; i < 8; i++) {
      const idx = (n.dayIdx + i) % 7; const day = DAYS[idx];
      for (const [o] of rangesFor(day)) {
        if (i === 0 && o <= n.min) continue;
        const when = i === 0 ? `today ${fmtTime(o)}` : i === 1 ? `tomorrow ${fmtTime(o)}` : `${DAY_NAMES[day]} ${fmtTime(o)}`;
        return { open: false, ordering: false, nextDay: i, nextDayKey: day, label: `Closed · opens ${when}`, short: 'Closed' };
      }
    }
    return { open: false, ordering: false, label: 'Closed', short: 'Closed' };
  }
  function pickupSlots(estMin) {
    const n = nowInStore(); const st = storeStatus(); const last = CFG.lastOrderMinutesBeforeClose || 0; const slots = [];
    if (st.ordering) {
      slots.push({ v: 'asap', label: `ASAP · about ${estMin} min (${fmtTime(Math.ceil((n.min + estMin) / 5) * 5)})` });
      let t = Math.ceil((n.min + estMin + 10) / 15) * 15;
      const ranges = rangesFor(n.day);
      for (const [o, c] of ranges) for (let x = Math.max(t, o + 15); x <= c - last; x += 15) slots.push({ v: `0-${x}`, label: `Today ${fmtTime(x)}` });
    }
    // allow scheduling for the next open day too
    for (let i = st.ordering ? 1 : 0; i < 3 && slots.length < 3; i++) {
      const idx = (n.dayIdx + i) % 7; const day = DAYS[idx];
      for (const [o, c] of rangesFor(day)) {
        for (let x = o + 15; x <= c - last; x += 15) {
          if (i === 0 && x <= n.min + estMin) continue;
          const d = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : DAY_NAMES[day];
          slots.push({ v: `${i}-${x}`, label: `${d} ${fmtTime(x)}` });
        }
      }
      if (slots.length) break;
    }
    return slots;
  }

  /* ---------------- state ---------------- */
  const state = {
    bag: store.get('riceline.bag.v1', []).filter((l) => l && l.kind && l.id),
    filters: { diet: new Set(), avoid: new Set(), q: '' },
    checkout: store.get('riceline.checkout.v1', { type: 'pickup', name: '', phone: '', tip: 0 }),
  };
  const saveBag = () => store.set('riceline.bag.v1', state.bag);

  /* expose for the other part of the app (ui.js-style split in one file) */
  window.__RL = { CFG, M, C, A, BOWL, COMBO, DRINK, SIDE, PLATE, plateTotals, sidesNeeded, sidesChosen, SAUCES, DIET_KEYS, DIET_LABEL, $, $$, esc, money, kcal, grams, IMG, icon, uid, store, clone,
    byStep, defaultBuild, calcBowl, drinkTotals, sideTotals, comboTotals, totalsFor, doublePrice, storeStatus, pickupSlots, rangesFor, fmtTime, nowInStore, DAYS, DAY_NAMES, state, saveBag };
})();
