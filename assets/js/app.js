// Запуск сайта: список тренажёров, режим учителя, адреса страниц (#/...).
(function () {
  const INF = (window.INF = window.INF || {});
  const { ui, icon, engine, pages } = INF;
  const D = window.INF_DATA;
  const E = D.explanations || {};

  // ---------- Тренажёры: блоки и интерактивные модули защит ----------
  const LOOK = {
    python: { tone: 'yellow', glyph: 'Py' },
    basics: { tone: 'lilac', glyph: 'a=1' },
    slices: { tone: 'mint', glyph: '[::]' },
    units: { tone: 'coral', glyph: '8b' },
    infquest31: { tone: 'sky', glyph: '31' },
  };
  INF.trainers = D.catalog.blockOrder.map(id => ({
    key: `block:${id}`, kind: 'block', id, data: D.blocks[id], title: D.blocks[id].name,
    tone: (LOOK[id] || {}).tone || 'violet', glyph: (LOOK[id] || {}).glyph || D.blocks[id].icon,
    href: `#/block/${id}`, explanations: (E.blocks || {})[id] || {},
  }));
  D.catalog.defenseOrder.forEach(did => {
    const d = D.defenses[did];
    d.modules.filter(m => m.type !== 'image').forEach(m => INF.trainers.push({
      key: `module:${m.id}`, kind: 'module', id: m.id, data: m, parent: d, title: m.name,
      tone: 'mint', glyph: m.icon, href: `#/defense/${did}/${m.id}`, explanations: (E.defenses || {})[did] || {},
    }));
  });

  // Обложки защит (выбор пользователя 21.10.2026; старый постер остаётся в данных как материал)
  INF.defenseLook = {
    'defense-september': { cover: 'assets/img/defenses/september-cover-v2.webp', square: 'assets/img/defenses/september-cover-v2-square.webp' },
  };
  INF.coverOf = d => (INF.defenseLook[d.id] || { cover: d.poster, square: d.poster });

  // Картинки раундов ИНФОКВЕСТА по темам раундов (21.10.2026); старые остаются в данных как материал
  INF.roundLook = { 1: 'quest-round-1', 2: 'quest-round-2', 3: 'quest-round-3', 4: 'quest-round-4', 5: 'quest-round-5', 6: 'quest-round-6', boss: 'quest-boss' };
  INF.roundImage = r => (INF.roundLook[r.id] ? `assets/img/infquest/${INF.roundLook[r.id]}.webp` : r.image);

  // Условия и решения задач защит: те же картинки без потерь качества, но в 2 раза легче (WebP lossless, 21.10.2026).
  // Оригиналы PNG остаются в данных — по ним идёт сверка со старым сайтом.
  INF.lightImage = src => (/^assets\/img\/defenses\/september-task-[12](-solution)?\.png$/.test(src || '') ? src.replace(/\.png$/, '.webp') : src);

  // ---------- Режим учителя (код как в старом сайте; не сохраняется между сеансами) ----------
  const TEACHER_CODE = '2714';
  INF.teacher = { on: false };
  const teacherBtn = document.getElementById('teacherBtn');
  function syncTeacherButton() {
    teacherBtn.classList.toggle('is-on', INF.teacher.on);
    teacherBtn.setAttribute('aria-pressed', String(INF.teacher.on));
    teacherBtn.querySelector('.btn__label').textContent = INF.teacher.on ? 'Учитель ✓' : 'Учитель';
  }
  function askCode() {
    return new Promise(resolve => {
      const dlg = document.createElement('dialog');
      dlg.className = 'dialog';
      dlg.setAttribute('aria-labelledby', 'tTitle');
      dlg.innerHTML = `<form method="dialog" novalidate>
        <h3 id="tTitle">Режим учителя</h3>
        <p>Учитель может пропускать задания и смотреть решения задач защиты.</p>
        <label class="field-label" for="tCode" style="margin-top:var(--s4)">Код учителя</label>
        <input class="field" id="tCode" inputmode="numeric" autocomplete="off" aria-describedby="tErr">
        <p class="small" id="tErr" style="color:var(--bad);min-height:1.4em;margin-top:6px" role="alert"></p>
        <div class="dialog__actions"><button class="btn btn--secondary" type="button" value="cancel">Отмена</button><button class="btn btn--primary" type="submit">Войти</button></div>
      </form>`;
      document.body.appendChild(dlg);
      const close = ok => { dlg.close(); dlg.remove(); resolve(ok); };
      dlg.querySelector('[value="cancel"]').addEventListener('click', () => close(false));
      dlg.addEventListener('cancel', e => { e.preventDefault(); close(false); });
      dlg.querySelector('form').addEventListener('submit', e => {
        e.preventDefault();
        const v = dlg.querySelector('#tCode').value.replace(/\s/g, '');
        if (v === TEACHER_CODE) close(true);
        else { dlg.querySelector('#tErr').textContent = 'Неверный код. Попробуй ещё раз.'; dlg.querySelector('#tCode').select(); }
      });
      dlg.showModal();
      dlg.querySelector('#tCode').focus();
    });
  }
  teacherBtn.addEventListener('click', async () => {
    if (!INF.teacher.on) {
      if (!(await askCode())) return;
      INF.teacher.on = true;
      ui.toast('Режим учителя включён', 'user');
    } else {
      if (!(await ui.confirm({ title: 'Выйти из режима учителя?', text: 'Кнопки пропуска и решения задач снова скроются.', confirm: 'Выйти' }))) return;
      INF.teacher.on = false;
      ui.toast('Режим учителя выключен', 'user');
    }
    syncTeacherButton();
    engine.syncTeacher();
    INF.arcade?.syncAdmin();
    if (location.hash === '#/arcade') route(); // в зале открыть или закрыть финальный уровень
    if (/^#\/defense\/[^/]+\/[^/]+$/.test(location.hash) && !INF.trainers.some(t => t.href === location.hash)) route();
  });

  // ---------- Адреса ----------
  const main = document.getElementById('main');
  const section = h => (h.startsWith('#/block') ? 'blocks' : h.startsWith('#/defense') ? 'defenses' : h.startsWith('#/arcade') ? 'arcade' : h.startsWith('#/progress') ? 'progress' : ['', '#', '#/'].includes(h) ? 'home' : '');

  function route() {
    engine.unmount();
    INF.arcade?.unmount();
    const hash = location.hash || '#/';
    const parts = hash.replace(/^#\/?/, '').split('/').filter(Boolean).map(decodeURIComponent);
    const view = document.createElement('div');
    view.className = 'view';
    main.replaceChildren(view); // сначала в документ — потом заполнять (размеры, поиск по id)
    const [a, b, c, d] = parts;
    const trainerBy = href => INF.trainers.find(t => t.href === href);
    try {
      if (!a) pages.home(view);
      else if (a === 'blocks' && !b) pages.blocksPage(view);
      else if (a === 'block' && b) {
        const t = trainerBy(`#/block/${b}`);
        if (!t) pages.notFound(view);
        else if (c === 'play') pages.play(view, t);
        else if (c === 'result') pages.result(view, t);
        else pages.trainerPage(view, t);
      } else if (a === 'defenses') pages.defensesPage(view);
      else if (a === 'defense' && b) {
        const def = D.defenses[b];
        const mod = def && c ? def.modules.find(m => m.id === c) : null;
        if (!def || (c && !mod)) pages.notFound(view);
        else if (!c) pages.defensePage(view, def);
        else if (mod.type === 'image') pages.imageTask(view, def, mod);
        else {
          const t = trainerBy(`#/defense/${b}/${c}`);
          if (d === 'play') pages.play(view, t);
          else if (d === 'result') pages.result(view, t);
          else pages.trainerPage(view, t);
        }
      } else if (a === 'progress') pages.progressPage(view);
      else if (a === 'arcade') INF.arcade.mount(view, b || 'hub');
      else pages.notFound(view);
    } catch (err) {
      console.error(err);
      view.innerHTML = `<div class="page-head"><h1 tabindex="-1">Что-то пошло не так</h1><p class="muted">Обнови страницу. Если ошибка повторится — напиши куратору.</p></div>`;
    }
    // Отметить раздел в меню
    const sec = section(hash);
    document.querySelectorAll('[data-nav]').forEach(l => {
      if (l.dataset.nav === sec) l.setAttribute('aria-current', 'page'); else l.removeAttribute('aria-current');
    });
    // Фокус на заголовок новой страницы — для клавиатуры и экранного диктора
    if (!hash.endsWith('/play')) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      requestAnimationFrame(() => main.querySelector('h1')?.focus({ preventScroll: true }));
    }
  }

  ui.initTheme();
  ui.hydrateIcons();
  syncTeacherButton();
  addEventListener('hashchange', route);
  route();
})();
