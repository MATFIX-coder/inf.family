// Python Arcade — «зал игровых автоматов». Механики перенесены из старой игры (baseline v1.4):
// — 8 автоматов: жетон за 3 разных решённых задания (сейф — за один открытый сейф);
// — финальный уровень открывается после 8 жетонов (учителю — всегда);
// — бонус-зал из 5 лабораторий жетонов не даёт;
// — повтор ошибок берёт всю историю ошибок и не выдаёт жетонов;
// — сложность банка 1/2/3 фильтрует задания, при пустом пуле берётся весь пул;
// — прогресс хранится в браузере под прежним ключом и в прежнем формате.
(function () {
  const INF = (window.INF = window.INF || {});
  const { ui, icon } = INF;
  const esc = s => ui.esc(s);
  const P = INF.ArcadePython;
  const D = window.INF_DATA;
  const bank = D.arcade.bank;
  const labs = D.arcade.labs;
  const EX = (D.explanations || {}).arcade || {};
  const KEY = 'inf.family.pythonArcade.v1';
  const TOPICS = { slices: 'срезы', indices: 'индексы', replace: 'replace', count: 'count', conversions: 'int / str', output: 'консоль', units: 'информация' };
  const LEVEL = ['', 'разминка', 'обычный уровень', 'испытание'];

  const MODES = [
    { id: 'wheel', name: 'Колесо фортуны', desc: 'Колесо выбирает испытание', robot: 'wheel', tone: 'coral', goal: 3 },
    { id: 'double', name: 'Слот-машина', desc: 'Тема × действие: два барабана', robot: 'slots', tone: 'yellow', goal: 3 },
    { id: 'slice', name: 'Лаборатория срезов', desc: 'Настрой start, stop и step', robot: 'slicer', tone: 'mint', goal: 3 },
    { id: 'shoot', name: 'Срезовый тир', desc: 'Проведи луч по символам', robot: 'shooter', tone: 'sky', goal: 3 },
    { id: 'console', name: 'Терминал', desc: 'Сначала прогноз, потом запуск', robot: 'terminal', tone: 'lilac', goal: 3 },
    { id: 'repair', name: 'Мастерская', desc: 'Почини сломанную программу', robot: 'repair', tone: 'peach', goal: 3 },
    { id: 'order', name: 'Конструктор', desc: 'Собери строки программы по порядку', robot: 'builder', tone: 'violet', goal: 3 },
    { id: 'safe', name: 'Сейф', desc: 'Четыре задачи — один PIN', robot: 'vault', tone: 'lime', goal: 1 },
  ];
  const EXTRAS = [
    { id: 'detective', name: 'Детектив', desc: 'Кто из роботов написал верный код?', tone: 'violet' },
    { id: 'machine', name: 'Конвейер', desc: 'Строка → int → + → str → + \'0\'', tone: 'yellow' },
    { id: 'replaceMachine', name: 'Машина замен', desc: 'Настрой число замен', tone: 'mint' },
    { id: 'units', name: 'Весы', desc: 'Сравни объёмы информации', tone: 'coral' },
    { id: 'pixel', name: 'Лупа', desc: 'Растровый знак или векторный?', tone: 'sky' },
  ];
  const BOSS = { id: 'boss', name: 'Финальный уровень', desc: 'Срез → число → строка → замена', tone: 'yellow', goal: 1 };
  const info = id => MODES.find(m => m.id === id) || EXTRAS.find(m => m.id === id) || BOSS;
  const robotSrc = m => (m.robot ? `assets/img/arcade/robot-${m.robot}.webp` : 'assets/img/brand/mascot.webp');

  // ---------- Сохранение (формат как в старой игре) ----------
  const fresh = () => ({ version: 1, attempts: 0, solved: [], mistakes: [], resolved: [], bestStreak: 0, streak: 0, completed: {}, skipped: 0, boss: false, difficulty: 3 });
  let saved = fresh();
  try {
    const v = JSON.parse(localStorage.getItem(KEY));
    if (v?.version === 1 && Array.isArray(v.solved) && Array.isArray(v.mistakes) && v.completed && typeof v.completed === 'object') {
      saved = { ...fresh(), ...v };
      for (const k of ['solved', 'mistakes', 'resolved']) saved[k] = Array.isArray(saved[k]) ? saved[k].filter(x => typeof x === 'string') : [];
      for (const k of ['attempts', 'bestStreak', 'streak', 'skipped']) saved[k] = Number.isFinite(saved[k]) && saved[k] >= 0 ? saved[k] : 0;
      saved.difficulty = [1, 2, 3].includes(saved.difficulty) ? saved.difficulty : 3;
      for (const k of Object.keys(saved.completed)) saved.completed[k] = Array.isArray(saved.completed[k]) ? saved.completed[k].filter(x => typeof x === 'string') : [];
    }
  } catch { /* без хранилища — игра в памяти до перезагрузки */ }
  const persist = () => { try { localStorage.setItem(KEY, JSON.stringify(saved)); } catch { /* ничего */ } };

  const completed = id => (saved.completed[id]?.length || 0) >= (info(id).goal || 1);
  const keys = () => MODES.filter(m => completed(m.id)).length;
  const teacher = () => Boolean(INF.teacher && INF.teacher.on);

  // ---------- Время и отмена отложенных действий ----------
  const game = { mode: 'hub', task: null, kind: null, solved: false, token: 0, timers: [], seen: {}, review: null, reviewIndex: 0, order: [], pin: '', safeSolved: [], busy: false, rotation: 0, root: null };
  const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  function clearTimers() { game.token++; game.timers.forEach(clearTimeout); game.timers = []; game.busy = false; }
  function later(fn, ms) {
    const token = game.token;
    const id = setTimeout(() => { if (token === game.token && game.root?.isConnected) fn(); }, reduced() ? 0 : ms);
    game.timers.push(id);
  }
  const $ = sel => game.root.querySelector(sel);

  function pick(pool, key) {
    const level = pool.filter(t => t.difficulty <= saved.difficulty);
    const choices = level.length ? level : pool;
    let seen = game.seen[key] || [], available = choices.filter(t => !seen.includes(t.id));
    if (!available.length) { seen = []; available = choices; }
    const t = available[Math.floor(Math.random() * available.length)];
    game.seen[key] = [...seen, t.id];
    return t;
  }
  const shuffle = items => { const a = [...items]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  // ---------- Зал автоматов ----------
  function hub() {
    clearTimers();
    Object.assign(game, { mode: 'hub', task: null, review: null, solved: false });
    const n = keys();
    const nextMode = n === 8 ? 'boss' : MODES.find(m => !completed(m.id)).id;
    const unresolved = saved.mistakes.filter(x => !saved.resolved.includes(x)).length;
    game.root.innerHTML = `<div class="ar-hall">
      <section class="arcade-screen ar-hero">
        <div class="ar-hero__text">
          <span class="sticker" data-tone="lime" style="--tilt:-3deg">Игровой зал</span>
          <h1 tabindex="-1">Python Arcade</h1>
          <p>Восемь игровых автоматов. За каждый — жетон: реши три разных задания (сейф — открой один раз). Восемь жетонов открывают финальный уровень.</p>
          <div class="row-actions">
            <a class="btn btn--tone btn--go" data-tone="${n === 8 ? 'yellow' : info(nextMode).tone}" href="#/arcade/${nextMode}">${n === 8 ? 'На финальный уровень' : `Играть: ${esc(info(nextMode).name)}`}<span class="btn__go" style="background:var(--ink);color:#fff">${icon('arrow-right')}</span></a>
            <a class="btn btn--secondary ar-btn-light" href="#/arcade/review" ${saved.mistakes.length ? '' : 'aria-disabled="true" data-disabled'}>${icon('rotate')}Повторить ошибки (${unresolved})</a>
          </div>
        </div>
        <div class="ar-hero__side">
          <div class="tokens tokens--big" role="img" aria-label="Жетоны: ${n} из 8">${MODES.map(m => `<span class="token${completed(m.id) ? ' is-on' : ''}" title="${esc(m.name)}"></span>`).join('')}</div>
          <p class="ar-dim">${n} из 8 жетонов</p>
          <dl class="ar-stats"><div><dt>Решено</dt><dd>${saved.solved.length}</dd></div><div><dt>Попыток</dt><dd>${saved.attempts}</dd></div><div><dt>Лучшая серия</dt><dd>${saved.bestStreak}</dd></div><div><dt>Пропусков</dt><dd>${saved.skipped}</dd></div></dl>
        </div>
      </section>

      <section class="section" aria-labelledby="arRackTitle">
        <div class="section__head"><h2 id="arRackTitle">Автоматы</h2><p class="muted">Потяни полку или листай стрелками. Можно играть в любом порядке.</p></div>
        <div class="coverflow coverflow--arcade" id="arRack"><div class="coverflow__stage"></div></div>
        <div class="coverflow__caption" aria-live="polite"></div>
        <div class="coverflow__controls">
          <button class="icon-btn" type="button" data-cf-prev aria-label="Предыдущий автомат">${icon('chevron-left')}</button>
          <div class="coverflow__dots"></div>
          <button class="icon-btn" type="button" data-cf-next aria-label="Следующий автомат">${icon('chevron-right')}</button>
        </div>
      </section>

      <section class="arcade-screen ar-boss${n === 8 || teacher() ? ' is-open' : ''}" aria-labelledby="arBossTitle">
        <span class="ar-boss__lock">${icon(n === 8 || teacher() ? 'sparkle' : 'lock')}</span>
        <div><h2 id="arBossTitle">${saved.boss ? 'Финальный уровень пройден' : 'Финальный уровень'}</h2>
          <p class="ar-dim">${n === 8 ? 'Все жетоны собраны. Объедини знакомые операции в одной программе.' : `Осталось собрать ${8 - n} ${(8 - n) === 1 ? 'жетон' : (8 - n) < 5 ? 'жетона' : 'жетонов'}.`}${teacher() && n < 8 ? ' Учителю уровень открыт.' : ''}</p></div>
        ${n === 8 || teacher() ? `<a class="btn btn--tone" data-tone="yellow" href="#/arcade/boss">${saved.boss ? 'Пройти снова' : 'Войти'}</a>` : `<button class="btn btn--secondary ar-btn-light" type="button" disabled>Закрыто</button>`}
      </section>

      <section class="section" aria-labelledby="arBonusTitle">
        <div class="section__head"><h2 id="arBonusTitle">Бонус-зал</h2><p class="muted">Лаборатории для тренировки. Жетонов не дают — просто играй.</p></div>
        <div class="ar-bonus">${EXTRAS.map(m => `<a class="block-card" data-tone="${m.tone}" href="#/arcade/${m.id}"><span class="block-card__meta">Лаборатория</span><span class="block-card__title">${esc(m.name)}</span><span class="block-card__foot"><span>${esc(m.desc)}</span></span></a>`).join('')}</div>
      </section>

      <section class="ar-settings">
        <div><b>Сложность банка</b><p class="muted small">Сложность не сбрасывает прогресс. В «Разминке» автоматы без простых заданий берут задания своего уровня.</p></div>
        <div class="segmented" role="radiogroup" aria-label="Сложность банка" id="arLevel">
          ${[[1, 'Разминка'], [2, 'Обычный'], [3, 'Все уровни']].map(([v, l]) => `<button type="button" role="radio" aria-checked="${saved.difficulty === v}" data-level="${v}">${l}</button>`).join('')}
        </div>
        <p class="muted small">Жетоны и статистика хранятся в этом браузере.</p>
      </section>
    </div>`;
    const items = MODES.map(m => ({ ...m, title: m.name, cls: 'cover--robot' }));
    ui.coverflow(game.root.querySelector('#arRack'), {
      items, start: Math.max(0, MODES.findIndex(m => m.id === nextMode)), label: 'Игровые автоматы',
      card: m => `<span class="cover__meta">${completed(m.id) ? 'жетон получен' : `${saved.completed[m.id]?.length || 0} из ${m.goal}`}</span><img class="cover__robot" src="${robotSrc(m)}" alt="" draggable="false"><span class="cover__title">${esc(m.name)}</span>`,
      caption: m => `<h3>${esc(m.name)}</h3><p>${esc(m.desc)}</p><div class="pips pips--light" aria-label="${saved.completed[m.id]?.length || 0} из ${m.goal}">${Array.from({ length: m.goal }, (_, k) => `<i class="${k < (saved.completed[m.id]?.length || 0) ? 'is-on' : ''}"></i>`).join('')}</div><div style="margin-top:var(--s4)"><a class="btn btn--primary btn--go" href="#/arcade/${m.id}">${completed(m.id) ? 'Сыграть ещё' : 'Играть'}<span class="btn__go">${icon('arrow-up-right')}</span></a></div>`,
      onOpen: m => { location.hash = `#/arcade/${m.id}`; },
    });
    game.root.querySelectorAll('[data-level]').forEach(b => b.addEventListener('click', () => {
      saved.difficulty = Number(b.dataset.level); persist();
      game.root.querySelectorAll('[data-level]').forEach(x => x.setAttribute('aria-checked', String(x === b)));
      ui.toast(`Сложность: ${b.textContent}`, 'sparkle');
    }));
    game.root.querySelector('[data-disabled]')?.addEventListener('click', e => { e.preventDefault(); ui.toast('Ошибок пока нет — повторять нечего', 'check'); });
    document.title = 'Python Arcade — inf.family';
  }

  // ---------- Оболочка автомата ----------
  function shell(mode) {
    const m = info(mode);
    const main = MODES.some(x => x.id === mode);
    const done = saved.completed[mode]?.length || 0;
    const caption = game.review ? 'Повтор ошибок: жетоны здесь не выдаются.' : main ? `Жетон: ${Math.min(done, m.goal)} из ${m.goal} ${m.goal === 1 ? 'сейфа' : 'испытаний'}` : mode === 'boss' ? 'Последняя программа зала.' : 'Бонус-зал: тренировка без жетонов.';
    game.root.innerHTML = `<div class="ar-station" data-tone="${m.tone}">
      <div class="ar-top">
        <a class="back-link" href="#/arcade">${icon('arrow-left')}Зал автоматов</a>
        <span class="task-top__stats"><span class="num" title="Серия верных ответов подряд">${icon('flame')}<span data-streak>${saved.streak}</span></span><span class="num">${icon('sparkle')}${keys()} / 8</span></span>
      </div>
      <div class="ar-layout">
        <aside class="ar-robot">
          <div class="ar-robot__art"><img src="${robotSrc(m)}" alt="" width="360" height="360"></div>
          <p>${esc(caption)}</p>
          ${main && !game.review ? `<div class="pips" aria-hidden="true">${Array.from({ length: m.goal }, (_, k) => `<i class="${k < done ? 'is-on' : ''}"></i>`).join('')}</div>` : ''}
        </aside>
        <section class="arcade-screen ar-panel">
          <p class="ar-kicker">${game.review ? 'Повтор ошибок' : mode === 'boss' ? 'Финальный уровень' : main ? 'Автомат' : 'Лаборатория'}</p>
          <h1 tabindex="-1">${esc(m.name)}</h1>
          <div id="arGame"></div>
          <div class="ar-feedback" role="status" aria-live="polite"></div>
          <div class="ar-explain"></div>
          <div class="row-actions">
            <button class="btn btn--tone" data-tone="${m.tone}" type="button" data-next hidden>Следующее испытание${icon('arrow-right')}</button>
            <button class="btn btn--tone" data-tone="yellow" type="button" data-finish hidden>На финальный экран${icon('arrow-right')}</button>
          </div>
          <div class="ar-teacher" hidden>
            <b>Режим учителя</b>
            <div class="row-actions" style="margin-top:var(--s2)"><button class="btn btn--secondary ar-btn-light" type="button" data-reveal>${icon('lock')}Показать ответ</button><button class="btn btn--secondary ar-btn-light" type="button" data-skip>Пропустить</button></div>
            <pre class="ar-solution" hidden></pre>
          </div>
        </section>
      </div>
    </div>`;
    $('[data-next]').addEventListener('click', next);
    $('[data-finish]').addEventListener('click', () => { location.hash = '#/arcade/finish'; });
    $('[data-reveal]').addEventListener('click', reveal);
    $('[data-skip]').addEventListener('click', skip);
    syncAdmin();
    document.title = `${m.name} — Python Arcade — inf.family`;
    window.scrollTo({ top: 0, behavior: 'auto' });
    requestAnimationFrame(() => $('h1')?.focus({ preventScroll: true }));
  }

  function syncAdmin() {
    if (!game.root?.isConnected) return;
    if (!teacher() && game.mode === 'boss' && keys() < 8 && !game.review) { location.hash = '#/arcade'; return; }
    const panel = game.root.querySelector('.ar-teacher');
    if (!panel) return;
    panel.hidden = !teacher();
    if (!teacher()) { const s = $('.ar-solution'); s.hidden = true; s.textContent = ''; }
    $('[data-reveal]').disabled = !game.task;
    $('[data-skip]').disabled = !game.task || game.solved;
  }

  function solution() {
    const t = game.task;
    if (!t) return '';
    if (game.kind === 'slice' || game.kind === 'shoot') return `s[${t.params.map(x => (x === null ? '' : x)).join(':')}] → ${JSON.stringify(t.target)}`;
    if (game.kind === 'order') return t.lines.join('\n');
    if (game.kind === 'repair' || game.kind === 'write') return t.solution || t.code;
    if (game.kind === 'safe') return 'PIN: ' + t.correctAnswer + '\n' + t.expressions.map((x, i) => x + ' → ' + t.digits[i]).join('\n');
    if (game.kind === 'detective') {
      const i = game.detectiveOptions.findIndex(v => v.correctAnswer === t.correctAnswer);
      return 'Робот ' + String.fromCharCode(65 + i) + '\n' + game.detectiveOptions[i].code + '\n→ ' + t.correctAnswer;
    }
    if (game.kind === 'replaceMachine') return '.replace(' + JSON.stringify(t.old) + ', ' + JSON.stringify(t.new) + ', ' + t.count + ') → ' + t.correctAnswer;
    return t.correctAnswer;
  }
  function explanationFor(t) { return EX[t.id] || (t.explanation ? { explain: t.explanation } : null); }
  function reveal() {
    if (!teacher()) return;
    const ex = game.task && explanationFor(game.task);
    const s = $('.ar-solution');
    s.textContent = solution() + (ex ? '\n\n' + ex.explain.replace(/`/g, '') : '');
    s.hidden = false;
  }
  function skip() {
    if (!teacher() || !game.task || game.solved) return;
    saved.skipped++; saved.streak = 0; persist();
    ui.toast('Испытание пропущено учителем. Жетон и балл не начислены.', 'user');
    next();
  }
  function message(text, type = '') {
    const box = $('.ar-feedback');
    if (!box) return;
    box.className = 'ar-feedback' + (type ? ' is-' + type : '');
    box.innerHTML = text ? `${icon(type === 'good' ? 'check-circle' : type === 'bad' ? 'x-circle' : 'arrow-up-right')}<span>${esc(text)}</span>` : '';
  }

  // Засчитать попытку — правила как в старой игре
  function attempt(ok, wrong = 'Сигнал не совпал. Проверь операции и попробуй ещё раз.', countAttempt = true) {
    if (game.solved || !game.task) return false;
    const key = game.mode + ':' + game.kind + ':' + game.task.id;
    if (countAttempt) saved.attempts++;
    if (!ok) {
      if (!saved.mistakes.includes(key)) saved.mistakes.push(key);
      saved.resolved = saved.resolved.filter(x => x !== key);
      saved.streak = 0;
      persist();
      message(wrong, 'bad');
      $('[data-streak]').textContent = '0';
      return false;
    }
    game.solved = true;
    if (!saved.solved.includes(key)) saved.solved.push(key);
    if (saved.mistakes.includes(key) && !saved.resolved.includes(key)) saved.resolved.push(key);
    saved.streak++;
    saved.bestStreak = Math.max(saved.bestStreak, saved.streak);
    const main = MODES.some(m => m.id === game.mode);
    const hadToken = main && completed(game.mode);
    if (!game.review) {
      const ids = saved.completed[game.mode] || [];
      if (!ids.includes(game.task.id)) ids.push(game.task.id);
      saved.completed[game.mode] = ids;
      if (game.mode === 'boss') saved.boss = true;
    }
    persist();
    const gotToken = main && !game.review && !hadToken && completed(game.mode);
    message(gotToken ? 'Жетон получен!' : game.mode === 'boss' && !game.review ? 'Финальный уровень пройден!' : saved.streak >= 3 ? `Верно! Серия: ${saved.streak}` : 'Верно!', 'good');
    if (gotToken) celebrate();
    $('[data-streak]').textContent = String(saved.streak);
    const ex = explanationFor(game.task);
    if (ex) $('.ar-explain').replaceChildren(INF.renderExplanation(ex, { tone: info(game.mode).tone }));
    $('#arGame')?.querySelectorAll('input, textarea, select, button').forEach(b => { b.disabled = true; });
    $('#arGame')?.querySelectorAll('[draggable]').forEach(b => { b.draggable = false; });
    $('[data-next]').hidden = game.mode === 'boss';
    $('[data-finish]').hidden = game.mode !== 'boss';
    syncAdmin();
    requestAnimationFrame(() => $(game.mode === 'boss' ? '[data-finish]' : '[data-next]')?.focus({ preventScroll: true }));
    return true;
  }
  function celebrate() {
    const box = document.createElement('div');
    box.className = 'ar-token-drop';
    box.innerHTML = '<span class="token is-on"></span>';
    $('.ar-robot').appendChild(box);
    later(() => box.remove(), 1600);
    $('.ar-robot .pips')?.querySelectorAll('i').forEach((p, k) => p.classList.toggle('is-on', k < (saved.completed[game.mode]?.length || 0)));
  }

  function next() {
    if (game.review) {
      game.reviewIndex++;
      if (game.reviewIndex >= game.review.length) { game.review = null; location.hash = '#/arcade/finish'; return; }
      loadReview();
      return;
    }
    openMode(game.mode);
  }
  function setupTask(t, kind) { Object.assign(game, { task: t, kind, solved: false, busy: false }); syncAdmin(); }

  // ---------- Открыть автомат или лабораторию ----------
  function openMode(mode) {
    clearTimers();
    Object.assign(game, { mode, review: null, task: null, kind: null, solved: false });
    if (mode === 'boss' && !teacher() && keys() < 8) { location.hash = '#/arcade'; return; }
    if (mode === 'wheel') return roulette();
    if (mode === 'double') return doubleReels();
    if (mode === 'units') return weights();
    if (mode === 'pixel') return pixelLab();
    const pools = {
      slice: bank.tasks.filter(t => t.topic === 'slices'), shoot: bank.tasks.filter(t => t.topic === 'slices'),
      console: bank.tasks.filter(t => t.topic !== 'units'), repair: bank.repairs, order: bank.orders, safe: bank.safes, boss: bank.boss,
      detective: bank.tasks.filter(t => t.topic === 'slices' || t.topic === 'indices'),
      machine: bank.tasks.filter(t => t.topic === 'conversions' && t.difficulty === 3),
      replaceMachine: bank.tasks.filter(t => t.topic === 'replace' && t.count > 0),
    };
    if (!pools[mode]) { location.hash = '#/arcade'; return; }
    renderTask(pick(pools[mode], mode), mode);
  }

  function badge(t) {
    return `<span class="chip ar-chip">${esc(TOPICS[t.topic] || 'комбинация')} · ${esc(LEVEL[t.difficulty] || '')}</span>`;
  }

  // Общий показ задания; inline — внутри колеса или слот-машины
  function renderTask(t, kind, inline = false) {
    setupTask(t, kind);
    if (!inline) shell(game.mode);
    else { message(''); $('.ar-explain').innerHTML = ''; $('[data-next]').hidden = true; $('[data-finish]').hidden = true; const s = $('.ar-solution'); s.hidden = true; s.textContent = ''; syncAdmin(); }
    const area = $('#arGame');
    const holder = document.createElement('div');
    holder.className = 'ar-task stack';
    holder.style.setProperty('--flow', 'var(--s4)');
    holder.innerHTML = badge(t);
    if (inline) area.querySelector('.ar-task')?.remove();
    area.appendChild(holder);
    if (kind === 'slice' || kind === 'shoot') return sliceLab(t, kind, holder);
    if (kind === 'safe') return safe(t, holder);
    if (kind === 'order') return ordering(t, holder);
    if (kind === 'replaceMachine') return replaceLab(t, holder);
    if (kind === 'detective') return detective(t, holder);
    if (kind === 'repair' || kind === 'write') return editor(t, kind, holder);
    if (kind === 'machine') {
      const a = t.code.match(/a = (.+)/)?.[1] || '', b = t.code.match(/b = (.+)/)?.[1] || '';
      holder.insertAdjacentHTML('beforeend', `<div class="ar-conveyor" aria-label="Цепочка преобразований">${[a, 'int()', `+ ${b}`, 'str()', "+ '0'"].map((x, i) => `${i ? '<b aria-hidden="true">→</b>' : ''}<span>${esc(x)}</span>`).join('')}</div>`);
    }
    holder.insertAdjacentHTML('beforeend', `<p class="ar-prompt">${esc(t.question || t.prompt)}</p>`);
    if (t.topic !== 'units') holder.appendChild(ui.codeBlock(t.code, 'Код программы'));
    if (kind === 'choose') return choose(t, holder);
    predict(t, kind, holder);
  }

  // Прогноз вывода (терминал, конвейер, финальный уровень)
  function normalize(raw) { const v = raw.trim(); return /^(['"])[\s\S]*\1$/.test(v) ? v.slice(1, -1) : v; }
  function predict(t, kind, holder) {
    const label = t.topic === 'units' ? 'Ответ запиши только числом' : 'Твой прогноз вывода' + (t.correctAnswer === '' ? ' (пустую строку обозначь двумя кавычками)' : '');
    holder.insertAdjacentHTML('beforeend', `<form class="ar-form" novalidate>
      <label class="field-label" for="arAnswer">${esc(label)}</label>
      <div class="answer-row"><input class="field ar-field" id="arAnswer" autocomplete="off" spellcheck="false" autocapitalize="off">
      <button class="btn btn--tone" data-tone="${info(game.mode).tone}" type="submit">${kind === 'boss' ? 'Активировать' : kind === 'machine' ? 'Запустить' : 'Запуск'}${icon('play')}</button></div>
      <div class="ar-terminal" aria-live="off"><span class="ar-terminal__prompt">&gt;</span> <span data-out>результат скрыт до верного прогноза</span></div>
    </form>`);
    holder.querySelector('form').addEventListener('submit', e => {
      e.preventDefault();
      if (game.busy || game.solved) return;
      const raw = $('#arAnswer').value;
      if (!raw.trim()) { message('Введи прогноз перед запуском.'); $('#arAnswer').focus(); return; }
      const ok = normalize(raw) === t.correctAnswer;
      animateConsole(holder, ok ? t.correctAnswer : 'Сигнал не совпал. Терминал ждёт нового прогноза.', () => attempt(ok));
    });
    requestAnimationFrame(() => $('#arAnswer')?.focus({ preventScroll: true }));
  }
  function animateConsole(holder, result, done) {
    game.busy = true;
    const out = holder.querySelector('[data-out]');
    const term = holder.querySelector('.ar-terminal');
    const btn = holder.querySelector('button[type=submit], [data-run]');
    if (btn) btn.disabled = true;
    out.textContent = 'запускаем код…';
    term.classList.add('is-running');
    later(() => {
      out.textContent = result === '' ? "''" : result;
      term.classList.remove('is-running');
      game.busy = false;
      if (btn) btn.disabled = false;
      done();
    }, 450);
  }

  function answers(correct) {
    const options = new Set([correct]);
    if (/^-?\d+(\.\d+)?$/.test(correct)) [1, -1, 2].forEach(d => options.add(String(Number(correct) + d)));
    else { options.add(correct.split('').reverse().join('')); options.add(correct.slice(0, -1)); options.add(correct + '0'); options.add('Ошибка'); options.add(correct.toLowerCase()); }
    return shuffle([...options].slice(0, 4));
  }
  function choose(t, holder) {
    const options = answers(t.correctAnswer);
    holder.insertAdjacentHTML('beforeend', `<div class="choices ar-choices" role="radiogroup" aria-label="Варианты вывода">${options.map((x, i) => `<button type="button" class="choice" role="radio" aria-checked="false" data-choice="${i}"><span class="choice__mark"></span><code class="ic">${esc(x === '' ? "'' (пустая строка)" : x)}</code></button>`).join('')}</div>
      <button class="btn btn--tone" data-tone="${info(game.mode).tone}" type="button" data-run>Передать сигнал${icon('play')}</button>`);
    let selected = null;
    holder.querySelectorAll('[data-choice]').forEach(b => b.addEventListener('click', () => {
      selected = options[Number(b.dataset.choice)];
      holder.querySelectorAll('[data-choice]').forEach(x => x.setAttribute('aria-checked', String(x === b)));
    }));
    holder.querySelector('[data-run]').addEventListener('click', () => {
      if (selected === null) { message('Сначала выбери сигнал.'); return; }
      attempt(selected === t.correctAnswer);
    });
  }

  // Мастерская: исправить программу; слот-машина «напиши»
  function editor(t, kind, holder) {
    const prompt = kind === 'write'
      ? (t.topic === 'units' ? t.question + ' Напиши программу для этого перевода.' : 'Напиши программу, которая выдаст сигнал ' + JSON.stringify(t.correctAnswer) + '. Используй исходные данные и выбранную операцию.')
      : t.prompt;
    holder.insertAdjacentHTML('beforeend', `<p class="ar-prompt">${esc(prompt)}</p>
      <label class="field-label" for="arEditor">${kind === 'repair' ? 'Исправь программу' : 'Собери свой код'}</label>
      <textarea id="arEditor" class="ar-editor" spellcheck="false" autocomplete="off" autocapitalize="off" rows="5" aria-describedby="arEditorHelp"></textarea>
      <p class="small muted" id="arEditorHelp">Tab — отступ. Чтобы уйти из редактора клавишами: Esc, затем Tab.</p>
      <div class="row-actions" style="margin-top:0"><button class="btn btn--tone" data-tone="${info(game.mode).tone}" type="button" data-run>${kind === 'repair' ? 'Починить и запустить' : 'Запустить программу'}${icon('play')}</button></div>
      <div class="ar-terminal"><span class="ar-terminal__prompt">&gt;</span> <span data-out>диагностика готова к запуску</span></div>`);
    const ed = holder.querySelector('#arEditor');
    ed.value = kind === 'repair' ? t.code : t.code.split('\n').slice(0, -1).join('\n') + '\nprint()';
    // Tab — отступ; после Esc следующий Tab уводит фокус дальше (иначе без мыши из редактора не выйти)
    let tabLeaves = false;
    ed.addEventListener('blur', () => { tabLeaves = false; });
    ed.addEventListener('keydown', e => {
      if (e.key === 'Escape') { tabLeaves = true; return; }
      if (e.key === 'Tab' && !tabLeaves && !e.shiftKey) { e.preventDefault(); ed.setRangeText('    ', ed.selectionStart, ed.selectionEnd, 'end'); return; }
      if (e.key !== 'Tab') tabLeaves = false;
    });
    holder.querySelector('[data-run]').addEventListener('click', () => {
      if (game.solved || game.busy) return;
      const code = ed.value;
      try {
        const result = P.run(code);
        const required = t.topic === 'count' ? /\.count\s*\(/ : t.topic === 'replace' ? /\.replace\s*\(/ : t.topic === 'conversions' ? /\b(?:int|str)\s*\(/ : t.topic === 'slices' ? /\[[^\]]*:/ : t.topic === 'indices' ? /\[[^\]]+\]/ : null;
        const sourceLine = (t.solution || t.code).split('\n')[0];
        const preservesSource = sourceLine.startsWith('print') || code.split('\n').some(l => l.replace(/\s/g, '').replace(/"/g, "'") === sourceLine.replace(/\s/g, '').replace(/"/g, "'"));
        const ok = result === t.correctAnswer && (!required || required.test(code)) && preservesSource;
        animateConsole(holder, ok ? result : 'диагностика: цель пока не достигнута', () => attempt(ok));
      } catch (err) {
        holder.querySelector('[data-out]').textContent = 'ошибка: ' + err.message;
        attempt(false, 'Программа не запускается: ' + err.message);
      }
    });
  }

  // ---------- Колесо фортуны ----------
  function roulette() {
    const cats = ['slices', 'indices', 'replace', 'count', 'conversions', 'output', 'repair', 'joker'];
    const labels = { repair: 'почини', joker: 'джокер' };
    const tones = ['#8b6cff', '#ffd84d', '#7ee0a8', '#ff8a7a', '#4cc9e0', '#e7a6f5', '#ffc99a', '#c6f36b'];
    shell('wheel');
    const R = 140, C = 150;
    const pt = (deg, r) => { const a = (deg - 90) * Math.PI / 180; return [C + r * Math.cos(a), C + r * Math.sin(a)]; };
    const sectors = cats.map((c, i) => {
      const [x1, y1] = pt(i * 45, R), [x2, y2] = pt((i + 1) * 45, R), mid = i * 45 + 22.5;
      const [tx, ty] = pt(mid, R * 0.62);
      return `<path d="M${C},${C} L${x1.toFixed(1)},${y1.toFixed(1)} A${R},${R} 0 0 1 ${x2.toFixed(1)},${y2.toFixed(1)} Z" fill="${tones[i]}"/>
        <text x="${tx.toFixed(1)}" y="${ty.toFixed(1)}" transform="rotate(${mid} ${tx.toFixed(1)} ${ty.toFixed(1)})" text-anchor="middle" dominant-baseline="middle">${esc(labels[c] || TOPICS[c])}</text>`;
    }).join('');
    $('#arGame').innerHTML = `<p class="ar-prompt">Крути колесо. Сектор под стрелкой выберет тему испытания.</p>
      <div class="ar-wheel">
        <span class="ar-wheel__pointer" aria-hidden="true"></span>
        <svg class="ar-wheel__disc" viewBox="0 0 300 300" role="img" aria-label="Колесо из восьми секторов">${sectors}<circle cx="150" cy="150" r="30" fill="#16141a"/><text x="150" y="151" text-anchor="middle" dominant-baseline="middle" class="ar-wheel__hub">Py</text></svg>
      </div>
      <div class="row-actions" style="justify-content:center"><button class="btn btn--tone" data-tone="coral" type="button" data-spin>${icon('rotate')}Крутить колесо</button></div>`;
    const disc = $('.ar-wheel__disc');
    disc.style.transform = `rotate(${game.rotation}deg)`;
    $('[data-spin]').addEventListener('click', () => {
      if (game.busy) return;
      game.busy = true;
      $('[data-spin]').disabled = true;
      const i = Math.floor(Math.random() * 8), target = (360 - (i * 45 + 22.5)) % 360;
      const current = ((game.rotation % 360) + 360) % 360;
      game.rotation += 1440 + ((target - current + 360) % 360);
      disc.style.transform = `rotate(${game.rotation}deg)`;
      later(() => {
        game.busy = false;
        const landed = Math.floor(((((360 - (game.rotation % 360)) % 360) + 360) % 360) / 45);
        const category = cats[landed];
        const topic = category === 'joker' ? ['slices', 'replace', 'conversions'][Math.floor(Math.random() * 3)] : category;
        const t = pick(topic === 'repair' ? bank.repairs : bank.tasks.filter(x => x.topic === topic), 'wheel:' + topic);
        renderTask(t, topic === 'repair' ? 'repair' : 'console', true);
        message(`Выпало: ${labels[category] || TOPICS[category]}`);
      }, 2550);
    });
  }

  // ---------- Слот-машина ----------
  function doubleReels() {
    const ts = ['slices', 'indices', 'replace', 'count', 'conversions', 'units'];
    const actions = [['предскажи', 'console'], ['напиши', 'write'], ['почини', 'repair'], ['выбери', 'choose'], ['собери', 'order']];
    const pairs = ts.flatMap(topic => actions.filter(([, kind]) => (kind === 'repair' ? bank.repairs : kind === 'order' ? bank.orders : bank.tasks).some(t => t.topic === topic)).map(([label, kind]) => ({ topic, label, kind })));
    shell('double');
    $('#arGame').innerHTML = `<p class="ar-prompt">Два барабана собирают испытание: тему и действие.</p>
      <div class="ar-slots"><div class="ar-reel" data-reel="1"><small>тема</small><strong>?</strong></div><div class="ar-reel" data-reel="2"><small>действие</small><strong>?</strong></div></div>
      <div class="row-actions" style="justify-content:center"><button class="btn btn--tone" data-tone="yellow" type="button" data-spin>${icon('rotate')}Дёрнуть рычаг</button></div>`;
    $('[data-spin]').addEventListener('click', () => {
      if (game.busy) return;
      game.busy = true;
      $('[data-spin]').disabled = true;
      const pair = pairs[Math.floor(Math.random() * pairs.length)];
      const r1 = $('[data-reel="1"]'), r2 = $('[data-reel="2"]');
      r1.classList.add('is-spinning'); r2.classList.add('is-spinning');
      for (let k = 0; k < 14; k++) later(() => {
        r1.querySelector('strong').textContent = TOPICS[ts[Math.floor(Math.random() * ts.length)]];
        if (k < 11) r2.querySelector('strong').textContent = actions[Math.floor(Math.random() * 5)][0];
      }, k * 85);
      later(() => { r1.classList.remove('is-spinning'); r1.querySelector('strong').textContent = TOPICS[pair.topic]; }, 1250);
      later(() => { r2.classList.remove('is-spinning'); r2.querySelector('strong').textContent = pair.label; }, 1450);
      later(() => {
        game.busy = false;
        const pool = pair.kind === 'repair' ? bank.repairs : pair.kind === 'order' ? bank.orders : bank.tasks;
        const t = pick(pool.filter(x => x.topic === pair.topic), 'double:' + pair.topic + ':' + pair.kind);
        renderTask(t, pair.kind, true);
        message(`Испытание: ${TOPICS[pair.topic]} × ${pair.label}`);
      }, 1900);
    });
  }

  // ---------- Лаборатория срезов и тир ----------
  function sliceLab(t, kind, holder) {
    const n = t.source.length;
    holder.insertAdjacentHTML('beforeend', `<p class="ar-prompt">Получи <code class="ic ar-target">${esc(JSON.stringify(t.target))}</code> из строки <code class="ic">${esc(JSON.stringify(t.source))}</code>.</p>
      <div class="strip-wrap"><div class="strip ar-strip">${[...t.source].map((c, i) => `<span class="strip__cell${c === ' ' ? ' is-space' : ''}" data-index="${i}"><small>${i}</small><b>${c === ' ' ? '␣' : esc(c)}</b><small>${i - n}</small></span>`).join('')}</div></div>
      <div class="ar-slice-controls">${['start', 'stop', 'step'].map((name, i) => `<div class="ar-control">
        <label for="ar-${name}">${name}</label>
        <input id="ar-${name}" class="field field--sm" type="number" min="${-n - 1}" max="${n + 1}" value="${i === 2 ? 1 : 0}">
        <input id="ar-${name}-range" type="range" aria-label="Ползунок ${name}" min="${-n - 1}" max="${n + 1}" value="${i === 2 ? 1 : 0}">
        ${i < 2 ? `<label class="ar-null"><input id="ar-${name}-null" type="checkbox"> не указывать</label>` : ''}</div>`).join('')}</div>
      <div class="ar-slice-result"><code class="ic" data-code></code><strong data-output></strong><span class="ar-dim" data-direction></span></div>
      <div class="row-actions" style="margin-top:0"><button class="btn btn--tone" data-tone="${info(game.mode).tone}" type="button" data-run>${kind === 'shoot' ? 'Огонь' : 'Зафиксировать срез'}${icon('play')}</button></div>`);
    let selected = [], result = '', valid = false;
    const g = id => holder.querySelector('#ar-' + id);
    const config = () => ['start', 'stop', 'step'].map((name, i) => (i < 2 && g(name + '-null').checked ? null : Number(g(name).value)));
    function update() {
      holder.querySelectorAll('.strip__cell').forEach(b => b.classList.remove('is-on', 'is-hit'));
      const values = config();
      holder.querySelector('[data-code]').textContent = 's[' + values.map(v => (v === null ? '' : v)).join(':') + ']';
      try {
        if (['start', 'stop', 'step'].some((name, i) => !(i < 2 && g(name + '-null').checked) && g(name).value === '')) throw Error('Укажи целые границы и шаг.');
        selected = P.indices(n, ...values);
        result = selected.map(i => t.source[i]).join('');
        valid = true;
        holder.querySelector('[data-output]').textContent = kind === 'shoot' ? 'мишени готовы' : '→ ' + JSON.stringify(result);
        holder.querySelector('[data-direction]').textContent = (values[2] < 0 ? '← справа налево' : '→ слева направо') + ' · шаг ' + Math.abs(values[2]);
        if (kind === 'slice') selected.forEach(i => holder.querySelector(`[data-index="${i}"]`).classList.add('is-on'));
      } catch (e) {
        valid = false;
        holder.querySelector('[data-output]').textContent = e.message;
        holder.querySelector('[data-direction]').textContent = '';
      }
    }
    ['start', 'stop', 'step'].forEach((name, i) => {
      g(name).addEventListener('input', e => { g(name + '-range').value = e.target.value; update(); });
      g(name + '-range').addEventListener('input', e => { g(name).value = e.target.value; update(); });
      if (i < 2) g(name + '-null').addEventListener('change', e => { g(name).disabled = e.target.checked; g(name + '-range').disabled = e.target.checked; update(); });
    });
    holder.querySelector('[data-run]').addEventListener('click', () => {
      if (game.solved || game.busy) return;
      if (!valid) { message('Исправь параметры среза.', 'bad'); return; }
      if (kind === 'slice') { attempt(result === t.target, 'Этот срез даёт другую строку. Настрой границы и шаг.'); return; }
      game.busy = true;
      holder.querySelectorAll('input, button').forEach(x => { x.disabled = true; });
      holder.querySelectorAll('.strip__cell').forEach(b => b.classList.remove('is-hit'));
      selected.forEach((i, k) => later(() => {
        holder.querySelector(`[data-index="${i}"]`).classList.add('is-hit');
        holder.querySelector('[data-output]').textContent = '→ ' + JSON.stringify(selected.slice(0, k + 1).map(j => t.source[j]).join(''));
      }, (k + 1) * 160));
      later(() => {
        game.busy = false;
        holder.querySelectorAll('input, button').forEach(x => { x.disabled = false; });
        ['start', 'stop'].forEach(name => { if (g(name + '-null').checked) { g(name).disabled = true; g(name + '-range').disabled = true; } });
        holder.querySelector('[data-output]').textContent = '→ ' + JSON.stringify(result);
        attempt(result === t.target, 'Луч собрал другую строку. Попробуй другую траекторию.');
      }, (selected.length + 1) * 160);
    });
    update();
  }

  // ---------- Конструктор: собрать программу ----------
  function ordering(t, holder) {
    game.order = shuffle(t.lines.map((_, i) => i));
    if (game.order.every((v, i) => v === i)) game.order.reverse();
    holder.insertAdjacentHTML('beforeend', `<p class="ar-prompt">Восстанови правильный порядок строк программы.</p>
      <div class="order ar-order" role="list"></div>
      <div class="row-actions" style="margin-top:0"><button class="btn btn--tone" data-tone="${info(game.mode).tone}" type="button" data-run>Запустить собранный код${icon('play')}</button></div>
      <div class="ar-terminal"><span class="ar-terminal__prompt">&gt;</span> <span data-out>перетащи строки или используй стрелки</span></div>`);
    const list = holder.querySelector('.ar-order');
    let dragged = null;
    function draw(focus = null) {
      list.innerHTML = game.order.map((v, i) => `<div class="order__item" role="listitem" draggable="true" data-pos="${i}">
        <span class="order__grip" aria-hidden="true">⋮⋮</span><code class="order__text">${esc(t.lines[v])}</code>
        <span class="order__btns"><button type="button" class="icon-btn icon-btn--sm" data-up="${i}" aria-label="Строка ${i + 1}: выше" ${i === 0 ? 'disabled' : ''}>↑</button><button type="button" class="icon-btn icon-btn--sm" data-down="${i}" aria-label="Строка ${i + 1}: ниже" ${i === game.order.length - 1 ? 'disabled' : ''}>↓</button></span></div>`).join('');
      if (focus !== null) list.querySelector(`[data-pos="${focus}"] button:not(:disabled)`)?.focus({ preventScroll: true });
    }
    list.addEventListener('click', e => {
      const b = e.target.closest('[data-up],[data-down]');
      if (!b || game.solved) return;
      const i = Number(b.dataset.up ?? b.dataset.down), j = i + (b.hasAttribute('data-up') ? -1 : 1);
      [game.order[i], game.order[j]] = [game.order[j], game.order[i]];
      draw(j);
    });
    list.addEventListener('dragstart', e => { const c = e.target.closest('[data-pos]'); if (!c || game.solved) { e.preventDefault(); return; } dragged = Number(c.dataset.pos); e.dataTransfer.setData('text/plain', String(dragged)); });
    list.addEventListener('dragover', e => e.preventDefault());
    list.addEventListener('drop', e => {
      e.preventDefault();
      const c = e.target.closest('[data-pos]');
      if (!c || dragged === null || game.solved) return;
      const j = Number(c.dataset.pos), [v] = game.order.splice(dragged, 1);
      game.order.splice(j, 0, v); dragged = null; draw(j);
    });
    draw();
    holder.querySelector('[data-run]').addEventListener('click', () => {
      if (game.busy || game.solved) return;
      const ok = game.order.every((v, i) => v === i);
      animateConsole(holder, ok ? t.correctAnswer : 'программа не собрана: проверь порядок строк', () => attempt(ok, 'Порядок строк не подходит. Попробуй ещё раз.'));
    });
  }

  // ---------- Сейф ----------
  function safe(t, holder) {
    game.pin = ''; game.safeSolved = [];
    holder.insertAdjacentHTML('beforeend', `<p class="ar-prompt">${esc(t.prompt)}</p>
      <div class="ar-safe-tasks">${t.expressions.map((x, i) => `<div class="ar-safe-task" data-safe="${i}">
        <label for="arDigit${i}">Цифра ${i + 1}</label><code class="ic">${esc(x)}</code>
        <div class="answer-row"><input class="field field--sm" id="arDigit${i}" inputmode="numeric" maxlength="2" autocomplete="off"><button class="btn btn--secondary ar-btn-light" type="button" data-digit="${i}">Открыть</button></div>
        <span class="ar-safe-status" role="status"></span></div>`).join('')}</div>
      <div class="ar-vault">
        <p class="ar-dim" data-pin-hint>Открой все четыре цифры, затем набери PIN.</p>
        <div class="ar-pin" aria-label="Введённый PIN: пусто" data-pin>${'<span>·</span>'.repeat(4)}</div>
        <div class="ar-keypad">${['1', '2', '3', '4', '5', '6', '7', '8', '9', '⌫', '0', '✓'].map(x => `<button type="button" data-key="${x}" aria-label="${x === '⌫' ? 'Удалить цифру' : x === '✓' ? 'Открыть сейф' : 'Цифра ' + x}">${x}</button>`).join('')}</div>
      </div>`);
    function digit(i) {
      if (game.safeSolved.includes(i) || game.solved) return;
      const v = holder.querySelector('#arDigit' + i).value.trim();
      if (!v) { message('Сначала реши задачу для цифры ' + (i + 1) + '.'); return; }
      saved.attempts++;
      if (v !== t.digits[i]) { attempt(false, 'Цифра ' + (i + 1) + ' пока не совпала. Пересчитай выражение.', false); return; }
      game.safeSolved.push(i);
      const row = holder.querySelector(`[data-safe="${i}"]`);
      row.classList.add('is-open');
      holder.querySelector('#arDigit' + i).disabled = true;
      row.querySelector('[data-digit]').disabled = true;
      row.querySelector('.ar-safe-status').textContent = '✓ ' + t.digits[i];
      persist();
      message('Цифра ' + (i + 1) + ' открыта.', 'good');
      if (game.safeSolved.length === 4) holder.querySelector('[data-pin-hint]').textContent = 'Все цифры открыты. Набери их в порядке задач.';
    }
    holder.querySelectorAll('[data-digit]').forEach(b => b.addEventListener('click', () => digit(Number(b.dataset.digit))));
    t.digits.forEach((_, i) => holder.querySelector('#arDigit' + i).addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); digit(i); } }));
    function key(value) {
      if (game.solved || game.busy) return;
      if (value === '⌫') game.pin = game.pin.slice(0, -1);
      else if (value === '✓') {
        if (game.safeSolved.length < 4) { message('Сначала открой четыре цифры в задачах.'); return; }
        if (game.pin.length !== 4) { message('PIN состоит из четырёх цифр.'); return; }
        if (game.pin !== t.correctAnswer) { attempt(false, 'Замок не открылся. Проверь порядок цифр.'); return; }
        if (attempt(true)) holder.querySelector('.ar-vault').classList.add('is-open');
        return;
      } else if (game.pin.length < 4) game.pin += value;
      const pin = holder.querySelector('[data-pin]');
      pin.innerHTML = [0, 1, 2, 3].map(i => `<span>${game.pin[i] || '·'}</span>`).join('');
      pin.setAttribute('aria-label', 'Введённый PIN: ' + (game.pin || 'пусто'));
    }
    holder.querySelectorAll('[data-key]').forEach(b => b.addEventListener('click', () => key(b.dataset.key)));
    holder.addEventListener('keydown', e => {
      if (e.target.matches('input, textarea')) return;
      if (/^\d$/.test(e.key)) { e.preventDefault(); key(e.key); }
      if (e.key === 'Backspace') { e.preventDefault(); key('⌫'); }
    });
  }

  // ---------- Бонус-зал ----------
  function detective(t, holder) {
    const unique = new Set([t.correctAnswer]);
    const alternatives = bank.tasks.filter(x => x.source === t.source && x.topic === t.topic && x.id !== t.id).filter(x => { if (unique.has(x.correctAnswer)) return false; unique.add(x.correctAnswer); return true; }).slice(0, 2);
    const options = shuffle([t, ...alternatives]);
    game.detectiveOptions = options;
    const tones = ['violet', 'sky', 'coral'];
    holder.insertAdjacentHTML('beforeend', `<p class="ar-prompt">Цель — получить <code class="ic ar-target">${esc(JSON.stringify(t.correctAnswer))}</code>. Кто из роботов написал правильную программу?</p>
      <div class="ar-suspects">${options.map((v, i) => `<button type="button" class="ar-suspect" data-tone="${tones[i]}" data-robot="${i}">
        <span class="cabinet__face" aria-hidden="true"><i></i><i></i></span><b>Робот ${String.fromCharCode(65 + i)}</b><code>${esc(v.code)}</code></button>`).join('')}</div>`);
    holder.querySelectorAll('[data-robot]').forEach(b => b.addEventListener('click', () => {
      if (game.solved) return;
      holder.querySelectorAll('[data-robot]').forEach(x => x.classList.toggle('is-picked', x === b));
      attempt(options[Number(b.dataset.robot)].correctAnswer === t.correctAnswer, 'Этот робот получает другой результат. Проверь его код ещё раз.');
    }));
  }

  function replaceLab(t, holder) {
    holder.insertAdjacentHTML('beforeend', `<p class="ar-prompt">Настрой число замен, чтобы получить <code class="ic ar-target">${esc(JSON.stringify(t.correctAnswer))}</code>.</p>
      <pre class="code ar-replace-code"><span class="ln">s = ${esc(JSON.stringify(t.source))}</span><span class="ln">s.replace(${esc(JSON.stringify(t.old))}, ${esc(JSON.stringify(t.new))}, <b data-n>0</b>)</span></pre>
      <label class="field-label" for="arCount">Третий аргумент count: <span data-n2>0</span></label>
      <input id="arCount" type="range" min="0" max="5" value="0" class="ar-range">
      <div class="ar-slice-result"><strong data-result class="ar-replace-result"></strong></div>
      <div class="row-actions" style="margin-top:0"><button class="btn btn--tone" data-tone="${info(game.mode).tone}" type="button" data-run>Запустить замены${icon('play')}</button></div>`);
    function update() {
      const n = Number(holder.querySelector('#arCount').value);
      holder.querySelector('[data-n]').textContent = String(n);
      holder.querySelector('[data-n2]').textContent = String(n);
      const parts = []; let pos = 0, k = 0;
      while (k < n) { const i = t.source.indexOf(t.old, pos); if (i < 0) break; parts.push(esc(t.source.slice(pos, i)) + `<mark>${esc(t.new)}</mark>`); pos = i + t.old.length; k++; }
      parts.push(esc(t.source.slice(pos)));
      holder.querySelector('[data-result]').innerHTML = parts.join('');
      return P.run(`s = ${JSON.stringify(t.source)}\nprint(s.replace(${JSON.stringify(t.old)}, ${JSON.stringify(t.new)}, ${n}))`);
    }
    holder.querySelector('#arCount').addEventListener('input', update);
    holder.querySelector('[data-run]').addEventListener('click', () => attempt(update() === t.correctAnswer, 'Машина заменила другое число фрагментов. Настрой count.'));
    update();
  }

  function weights(taskId = null) {
    const variants = labs.weights.variants;
    const base = variants.find(v => v.id === taskId) || pick(variants, 'weights');
    const t = { ...base, difficulty: 1, topic: 'units', explanation: labs.weights.explanation, correctAnswer: base.answer };
    shell('units');
    setupTask(t, 'units');
    $('#arGame').innerHTML = `<div class="ar-task stack" style="--flow:var(--s4)">${badge(t)}
      <p class="ar-prompt">Сравни объёмы информации: какой знак поставить между ними?</p>
      <div class="ar-scales" data-tilt="0"><div class="ar-scales__beam"><span class="ar-pan">${esc(t.a)}</span><span class="ar-pan">${esc(t.b)}</span></div><span class="ar-scales__stand" aria-hidden="true"></span></div>
      <div class="row-actions" style="justify-content:center">${['<', '=', '>'].map(v => `<button class="btn btn--secondary ar-btn-light ar-sign" type="button" data-weight="${esc(v)}" aria-label="${v === '<' ? 'Меньше' : v === '>' ? 'Больше' : 'Равно'}">${esc(v)}</button>`).join('')}</div></div>`;
    $('#arGame').querySelectorAll('[data-weight]').forEach(b => b.addEventListener('click', () => {
      if (attempt(b.dataset.weight === t.answer)) $('.ar-scales').dataset.tilt = t.answer === '<' ? 'right' : t.answer === '>' ? 'left' : 'even';
    }));
  }

  function pixelLab() {
    const t = { ...labs.pixel.task };
    shell('pixel');
    setupTask(t, 'pixel');
    $('#arGame').innerHTML = `<div class="ar-task stack" style="--flow:var(--s4)"><span class="chip ar-chip">графика · разминка</span>
      <p class="ar-prompt">Увеличь оба знака лупой, затем найди растровый.</p>
      <div class="ar-pixel-pair">
        <figure><figcaption>A</figcaption><div class="ar-pixel-box"><canvas width="12" height="12" aria-label="Знак A"></canvas></div></figure>
        <figure><figcaption>B</figcaption><div class="ar-pixel-box"><svg viewBox="0 0 36 36" aria-label="Знак B"><circle cx="18" cy="18" r="15" fill="#62e9d4"/><path d="M10 18l6 6 11-13" fill="none" stroke="#132644" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></div></figure>
      </div>
      <label class="field-label" for="arZoom">Лупа: <span data-zoom>100%</span></label>
      <input id="arZoom" type="range" min="1" max="8" step=".25" value="1" class="ar-range">
      <div class="row-actions" style="justify-content:center"><button class="btn btn--secondary ar-btn-light" type="button" data-raster="A" disabled>A — растровый</button><button class="btn btn--secondary ar-btn-light" type="button" data-raster="B" disabled>B — растровый</button></div></div>`;
    const ctx = $('canvas').getContext('2d');
    ctx.fillStyle = '#62e9d4'; ctx.beginPath(); ctx.arc(6, 6, 5, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#132644'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(3, 6); ctx.lineTo(5, 8); ctx.lineTo(9, 3); ctx.stroke();
    $('#arZoom').addEventListener('input', e => {
      const v = Number(e.target.value);
      $('[data-zoom]').textContent = Math.round(v * 100) + '%';
      game.root.querySelectorAll('.ar-pixel-box').forEach(b => b.style.setProperty('--zoom', v));
      if (v >= 3) game.root.querySelectorAll('[data-raster]').forEach(b => { if (!game.solved) b.disabled = false; });
    });
    game.root.querySelectorAll('[data-raster]').forEach(b => b.addEventListener('click', () => attempt(b.dataset.raster === 'A')));
  }

  // ---------- Повтор ошибок ----------
  const findTask = id => Object.values(bank).flat().find(t => t.id === id);
  function review() {
    clearTimers();
    const list = [...saved.mistakes];
    if (!list.length) { location.hash = '#/arcade'; return; }
    game.review = list; game.reviewIndex = 0;
    loadReview();
  }
  function loadReview() {
    clearTimers();
    const [mode, kind, id] = game.review[game.reviewIndex].split(':');
    game.mode = mode;
    const t = findTask(id);
    if (t) renderTask(t, kind);
    else if (kind === 'units') weights(id);
    else if (kind === 'pixel') pixelLab();
    else next();
    const k = $('.ar-kicker');
    if (k) k.textContent = `Повтор ошибок · ${game.reviewIndex + 1} из ${game.review.length}`;
  }

  // ---------- Финальный экран ----------
  function finish() {
    clearTimers();
    Object.assign(game, { task: null, mode: 'finish' });
    const n = keys(), remaining = saved.mistakes.filter(x => !saved.resolved.includes(x)).length;
    game.root.innerHTML = `<section class="arcade-screen ar-finish">
      <img class="ar-finish__robot" src="assets/img/brand/mascot.webp" alt="" width="672" height="900">
      <div class="stack" style="--flow:var(--s4)">
        <span class="sticker" data-tone="${saved.boss ? 'yellow' : 'lime'}" style="--tilt:-3deg">${saved.boss ? 'Миссия выполнена' : 'Сеанс завершён'}</span>
        <h1 tabindex="-1">${saved.boss ? 'Финальный уровень пройден' : 'Код становится точнее'}</h1>
        <div class="tokens tokens--big" role="img" aria-label="Жетоны: ${n} из 8">${MODES.map(m => `<span class="token${completed(m.id) ? ' is-on' : ''}"></span>`).join('')}</div>
        <p class="ar-dim">${n} из 8 жетонов · финальный уровень ${saved.boss ? 'пройден' : 'ещё ждёт'} · ${remaining} ${remaining === 1 ? 'задание' : remaining < 5 && remaining > 0 ? 'задания' : 'заданий'} для закрепления</p>
        <dl class="ar-stats"><div><dt>Решено</dt><dd>${saved.solved.length}</dd></div><div><dt>Попыток</dt><dd>${saved.attempts}</dd></div><div><dt>Лучшая серия</dt><dd>${saved.bestStreak}</dd></div><div><dt>Пропусков</dt><dd>${saved.skipped}</dd></div></dl>
        <div class="row-actions">
          <a class="btn btn--tone" data-tone="lime" href="#/arcade">В зал автоматов</a>
          ${saved.mistakes.length ? `<a class="btn btn--secondary ar-btn-light" href="#/arcade/review">${icon('rotate')}Повторить ошибки</a>` : ''}
          <button class="btn btn--secondary ar-btn-light" type="button" data-copy>${icon('copy')}Скопировать результат</button>
          <button class="btn btn--danger" type="button" data-replay>Сыграть с нуля</button>
        </div>
      </div>
    </section>`;
    game.root.querySelector('[data-replay]').addEventListener('click', async () => {
      const ok = await ui.confirm({ title: 'Начать новый маршрут?', text: 'Сбросятся все жетоны, ошибки, статистика и финальный уровень. Отменить это нельзя.', confirm: 'Начать новый маршрут', danger: true });
      if (!ok) return;
      saved = fresh(); game.seen = {}; persist();
      location.hash = '#/arcade';
    });
    game.root.querySelector('[data-copy]').addEventListener('click', () => {
      const text = ['Python Arcade — inf.family', `Жетоны: ${n} из 8`, `Финальный уровень: ${saved.boss ? 'пройден' : 'не пройден'}`, `Решено конфигураций: ${saved.solved.length}`, `Попыток: ${saved.attempts}`, `Лучшая серия: ${saved.bestStreak}`, `Ошибок для закрепления: ${remaining}`].join('\n');
      INF.copyText ? INF.copyText(text) : navigator.clipboard?.writeText(text);
    });
    document.title = 'Итоги — Python Arcade — inf.family';
  }

  // ---------- Вход по адресу ----------
  function mount(root, part) {
    clearTimers();
    game.root = root;
    if (!part || part === 'hub') return hub();
    if (part === 'finish') return finish();
    if (part === 'review') return review();
    return openMode(part);
  }
  function unmount() { clearTimers(); }

  // Сводка для главной и «Моего прогресса»
  function summary() { return { keys: keys(), solved: saved.solved.length, boss: saved.boss, touched: saved.attempts > 0 || saved.skipped > 0 }; }
  function reset() { saved = fresh(); game.seen = {}; persist(); }

  INF.arcade = {
    mount, unmount, syncAdmin, keys, summary, reset,
    // для автотестов
    _game: () => game, _saved: () => saved, _reset: () => { saved = fresh(); game.seen = {}; persist(); },
  };
})();
