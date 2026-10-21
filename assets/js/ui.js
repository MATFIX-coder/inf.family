// Общие функции интерфейса inf.family. Без библиотек, работает и с file://.
(function () {
  const INF = (window.INF = window.INF || {});
  const THEME_KEY = 'inf-family-theme';
  const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- Безопасный вывод текста ----------
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  // Разметка объяснений: только `код` в обратных кавычках
  const md = text => esc(text).replace(/`([^`]+)`/g, '<code class="ic">$1</code>');

  // ---------- Тема ----------
  function storedTheme() {
    try { return localStorage.getItem(THEME_KEY); } catch { return null; }
  }
  function systemTheme() {
    return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
      const dark = theme === 'dark';
      btn.setAttribute('aria-label', dark ? 'Включить светлую тему' : 'Включить тёмную тему');
      btn.setAttribute('aria-pressed', String(dark));
      btn.innerHTML = INF.icon(dark ? 'sun' : 'moon');
    });
  }
  function initTheme() {
    applyTheme(storedTheme() || systemTheme());
    document.querySelectorAll('[data-theme-toggle]').forEach(btn => btn.addEventListener('click', () => {
      const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem(THEME_KEY, next); } catch { /* без хранилища тема живёт до перезагрузки */ }
      applyTheme(next);
    }));
  }

  function hydrateIcons(root = document) {
    root.querySelectorAll('[data-icon]').forEach(el => {
      el.outerHTML = INF.icon(el.dataset.icon, el.className || '');
    });
  }

  // ---------- Подсветка Python ----------
  const KW = new Set(['if', 'elif', 'else', 'for', 'while', 'in', 'def', 'return', 'and', 'or', 'not', 'break', 'continue', 'True', 'False', 'None', 'import', 'from', 'pass']);
  const FN = new Set(['print', 'len', 'int', 'str', 'float', 'range', 'input', 'list', 'abs', 'min', 'max', 'sum', 'round']);
  function highlightLine(line) {
    const re = /(#.*$)|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")|(\b\d+(?:\.\d+)?\b)|([A-Za-z_]\w*)/g;
    let out = '', last = 0, m;
    while ((m = re.exec(line))) {
      out += esc(line.slice(last, m.index));
      const [tok, com, str, num, word] = m;
      if (com) out += `<span class="tok-com">${esc(com)}</span>`;
      else if (str) out += `<span class="tok-str">${esc(str)}</span>`;
      else if (num) out += `<span class="tok-num">${esc(num)}</span>`;
      else if (KW.has(word)) out += `<span class="tok-kw">${esc(word)}</span>`;
      else if (FN.has(word)) out += `<span class="tok-fn">${esc(word)}</span>`;
      else out += esc(tok);
      last = m.index + tok.length;
    }
    return out + esc(line.slice(last));
  }
  function codeBlock(source, label) {
    const pre = document.createElement('pre');
    pre.className = 'code';
    if (label) pre.setAttribute('aria-label', label);
    pre.innerHTML = String(source).split('\n').map(l => `<span class="ln">${highlightLine(l) || ' '}</span>`).join('');
    return pre;
  }

  // ---------- Индексы и срезы как в Python ----------
  function pyIndices(n, start, stop, step) {
    step = step == null ? 1 : step;
    if (step === 0) throw new Error('Шаг среза не может быть равен 0');
    const norm = (v, def, lo, hi) => {
      if (v == null) return def;
      if (v < 0) v += n;
      return Math.min(Math.max(v, lo), hi);
    };
    const out = [];
    if (step > 0) {
      const a = norm(start, 0, 0, n), b = norm(stop, n, 0, n);
      for (let i = a; i < b; i += step) out.push(i);
    } else {
      const a = norm(start, n - 1, -1, n - 1), b = norm(stop, -1, -1, n - 1);
      for (let i = a; i > b; i += step) out.push(i);
    }
    return out;
  }
  // Какие символы строки name задействует выражение вида name[...] (первый срез или индекс)
  function touchedIndices(expr, name, text) {
    const m = expr.match(new RegExp(`(?:^|[^\\w.])${name}\\[([^\\]]*)\\]`));
    if (!m) return [];
    const parts = m[1].split(':').map(p => (p.trim() === '' ? null : Number(p)));
    if (parts.some(p => p !== null && Number.isNaN(p))) return [];
    const n = text.length;
    if (parts.length === 1) {
      const i = parts[0] < 0 ? parts[0] + n : parts[0];
      return i >= 0 && i < n ? [i] : [];
    }
    return pyIndices(n, parts[0], parts[1], parts[2]);
  }

  function indexStrip(text, name, tone) {
    const wrap = document.createElement('div');
    wrap.className = 'strip-wrap';
    if (tone) wrap.dataset.tone = tone;
    const n = text.length;
    wrap.innerHTML = `<div class="strip-name">${esc(name)} = ${esc(JSON.stringify(text).replace(/^"|"$/g, "'"))}</div>` +
      `<div class="strip" role="img" aria-label="Строка ${esc(name)}: ${n} символов, индексы от 0 до ${n - 1}">` +
      [...text].map((c, i) => `<span class="strip__cell${c === ' ' ? ' is-space' : ''}" data-i="${i}"><small>${i}</small><b>${c === ' ' ? '␣' : esc(c)}</b><small>${i - n}</small></span>`).join('') +
      '</div>';
    wrap.mark = indices => {
      const on = new Set(indices);
      wrap.querySelectorAll('.strip__cell').forEach(cell => cell.classList.toggle('is-on', on.has(Number(cell.dataset.i))));
    };
    return wrap;
  }

  // ---------- Карусель-«полка» (coverflow) ----------
  // Всё зависит от одного числа pos — дробного номера карточки в центре.
  // Каждая карточка смотрит, насколько она от центра (d = i - pos), и по этому
  // поворачивается и отодвигается вглубь. Поворот «обратный»: внешний край боковой
  // карточки выходит к зрителю, и полка раскрывается навстречу.
  function coverflow(root, { items, card, caption, onOpen, label = 'Карусель', start = 0 } = {}) {
    const ROTATE = 44, FALLOFF = 0.56, DEPTH = 0.6, MAX_TILT = 78, SPREAD = 1.02;
    const n = items.length;
    const loop = n >= 8; // на короткой полке зацикливание видно — тогда просто упираемся в края
    const stage = root.querySelector('.coverflow__stage');
    const capEl = root.parentElement.querySelector('.coverflow__caption');
    const dotsEl = root.parentElement.querySelector('.coverflow__dots');
    let pos = Math.min(Math.max(start, 0), n - 1), target = pos, raf = 0, shown = -1;

    root.tabIndex = 0;
    root.setAttribute('role', 'region');
    root.setAttribute('aria-roledescription', 'карусель');
    root.setAttribute('aria-label', label);
    stage.innerHTML = items.map((it, i) =>
      `<div class="coverflow__card${it.cls ? ' ' + it.cls : ''}" role="group" aria-roledescription="слайд" aria-label="${i + 1} из ${n}: ${esc(it.title || '')}" data-i="${i}"${it.tone ? ` data-tone="${it.tone}"` : ''}>${card(it, i)}</div>`).join('');
    const cards = [...stage.children];
    if (dotsEl) {
      dotsEl.innerHTML = items.map((it, i) => `<button type="button" aria-label="${esc(it.title || 'Карточка ' + (i + 1))}" data-i="${i}"></button>`).join('');
      dotsEl.addEventListener('click', e => {
        const b = e.target.closest('button');
        if (b) go(target + shortest(Number(b.dataset.i) - wrapIndex(target)));
      });
    }

    const width = () => cards[0].offsetWidth || 200;
    const wrapIndex = v => ((Math.round(v) % n) + n) % n;
    const shortest = d => (loop ? ((d % n) + n + n / 2) % n - n / 2 : d);
    const offsetOf = i => {
      let d = i - pos;
      if (loop) d = ((d % n) + n + n / 2) % n - n / 2;
      return d;
    };

    function layout() {
      const W = width();
      cards.forEach((el, i) => {
        const d = offsetOf(i), a = Math.abs(d), s = Math.sign(d);
        const f = Math.pow(a, FALLOFF);
        const rot = -s * Math.min(ROTATE * f, MAX_TILT);
        const z = -DEPTH * f * W;
        const x = s * W * SPREAD * Math.pow(a, 0.9);
        let opacity = a > 4 ? Math.max(0, 1 - (a - 4)) : 1;
        if (loop && a > n / 2 - 1) opacity = Math.min(opacity, Math.max(0, (n / 2 - a) / 1)); // шов кольца не видно
        el.style.transform = `translate3d(${x.toFixed(1)}px,0,${z.toFixed(1)}px) rotateY(${rot.toFixed(2)}deg)`;
        el.style.opacity = opacity.toFixed(3);
        el.style.zIndex = String(1000 - Math.round(a * 10));
        el.style.visibility = opacity < 0.01 ? 'hidden' : '';
        el.style.setProperty('--dim', String(Math.min(a, 3) * 0.07));
      });
      const current = wrapIndex(pos);
      if (current !== shown) announce(current);
    }

    function announce(i) {
      shown = i;
      cards.forEach((el, k) => el.toggleAttribute('data-current', k === i));
      if (dotsEl) [...dotsEl.children].forEach((d, k) => d.setAttribute('aria-current', String(k === i)));
      if (capEl && caption) {
        capEl.classList.add('is-fading');
        clearTimeout(capEl._t);
        capEl._t = setTimeout(() => { capEl.innerHTML = caption(items[i], i); capEl.classList.remove('is-fading'); }, reduced() ? 0 : 120);
      }
    }

    function animate() {
      cancelAnimationFrame(raf);
      if (reduced()) { pos = target; layout(); return; }
      const tick = () => {
        pos += (target - pos) * 0.16;
        if (Math.abs(target - pos) < 0.002) pos = target;
        layout();
        if (pos !== target) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }
    function go(t) {
      target = loop ? Math.round(t) : Math.min(Math.max(Math.round(t), 0), n - 1);
      animate();
    }

    // Перетаскивание с броском и доводкой до ближайшей карточки
    let drag = null;
    root.addEventListener('pointerdown', e => {
      if (e.button !== 0) return;
      cancelAnimationFrame(raf);
      drag = { x: e.clientX, pos, moved: 0, last: e.clientX, t: performance.now(), v: 0, hit: e.target.closest('.coverflow__card') };
      root.setPointerCapture(e.pointerId);
    });
    root.addEventListener('pointermove', e => {
      if (!drag) return;
      const W = width(), now = performance.now();
      drag.moved = Math.max(drag.moved, Math.abs(e.clientX - drag.x));
      drag.v = (e.clientX - drag.last) / Math.max(now - drag.t, 1);
      drag.last = e.clientX; drag.t = now;
      let p = drag.pos - (e.clientX - drag.x) / (W * 0.9);
      if (!loop) p = p < 0 ? p * 0.3 : p > n - 1 ? n - 1 + (p - (n - 1)) * 0.3 : p; // упругие края
      pos = p;
      layout();
    });
    const release = () => {
      if (!drag) return;
      const W = width(), d = drag;
      drag = null;
      if (d.moved < 6) { // это щелчок, а не перетаскивание
        const i = d.hit ? Number(d.hit.dataset.i) : wrapIndex(target);
        if (i === wrapIndex(target)) { pos = target; layout(); onOpen && onOpen(items[i], i); }
        else go(target + shortest(i - wrapIndex(target)));
        return;
      }
      go(pos - (d.v * 110) / (W * 0.9));
    };
    root.addEventListener('pointerup', release);
    root.addEventListener('pointercancel', release);

    root.addEventListener('keydown', e => {
      const k = e.key;
      if (k === 'ArrowRight') { e.preventDefault(); go(target + 1); }
      else if (k === 'ArrowLeft') { e.preventDefault(); go(target - 1); }
      else if (k === 'Home' && !loop) { e.preventDefault(); go(0); }
      else if (k === 'End' && !loop) { e.preventDefault(); go(n - 1); }
      else if (k === 'Enter' || k === ' ') { e.preventDefault(); onOpen && onOpen(items[wrapIndex(target)], wrapIndex(target)); }
    });
    const prev = root.parentElement.querySelector('[data-cf-prev]');
    const next = root.parentElement.querySelector('[data-cf-next]');
    prev && prev.addEventListener('click', () => go(target - 1));
    next && next.addEventListener('click', () => go(target + 1));
    addEventListener('resize', layout);
    layout();
    return { go, get current() { return wrapIndex(target); } };
  }

  // ---------- Вкладки (в том числе «папки») ----------
  function tabs(root, { onChange } = {}) {
    const list = root.querySelector('[role="tablist"]');
    const btns = [...list.querySelectorAll('[role="tab"]')];
    function select(btn, focus) {
      btns.forEach(b => {
        const on = b === btn;
        b.setAttribute('aria-selected', String(on));
        b.tabIndex = on ? 0 : -1;
        root.querySelector('#' + CSS.escape(b.getAttribute('aria-controls'))).hidden = !on;
      });
      if (focus) btn.focus();
      onChange && onChange(btn);
    }
    btns.forEach((b, i) => {
      b.addEventListener('click', () => select(b));
      b.addEventListener('keydown', e => {
        const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (d) { e.preventDefault(); select(btns[(i + d + btns.length) % btns.length], true); }
      });
    });
    select(btns.find(b => b.getAttribute('aria-selected') === 'true') || btns[0]);
  }

  // ---------- Всплывающее сообщение ----------
  let toastEl, toastTimer;
  function toast(text, iconName = 'check') {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'toast';
      toastEl.setAttribute('role', 'status');
      toastEl.setAttribute('aria-live', 'polite');
      document.body.appendChild(toastEl);
    }
    toastEl.innerHTML = INF.icon(iconName) + `<span>${esc(text)}</span>`;
    requestAnimationFrame(() => toastEl.classList.add('is-shown'));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('is-shown'), 3500);
  }

  // ---------- Подтверждение действия ----------
  function confirmDialog({ title, text, confirm = 'Подтвердить', cancel = 'Отмена', danger = false }) {
    return new Promise(resolve => {
      const dlg = document.createElement('dialog');
      dlg.className = 'dialog';
      dlg.setAttribute('aria-labelledby', 'dlg-title');
      dlg.innerHTML = `<h3 id="dlg-title">${esc(title)}</h3><p>${esc(text)}</p>
        <div class="dialog__actions">
          <button class="btn btn--secondary" value="cancel">${esc(cancel)}</button>
          <button class="btn ${danger ? 'btn--danger-solid' : 'btn--primary'}" value="ok">${esc(confirm)}</button>
        </div>`;
      document.body.appendChild(dlg);
      const done = ok => { dlg.close(); dlg.remove(); resolve(ok); };
      dlg.querySelectorAll('button').forEach(b => b.addEventListener('click', () => done(b.value === 'ok')));
      dlg.addEventListener('cancel', e => { e.preventDefault(); done(false); });
      dlg.showModal();
      dlg.querySelector('[value="cancel"]').focus();
    });
  }

  INF.ui = { esc, md, initTheme, applyTheme, hydrateIcons, highlightLine, codeBlock, pyIndices, touchedIndices, indexStrip, coverflow, tabs, toast, confirm: confirmDialog, reduced };
})();
