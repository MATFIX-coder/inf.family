// Движок заданий: запуск попытки, показ задания, проверка ответа, разбор, промежуточные экраны, итог.
// Правила проверки перенесены из старого сайта (baseline v1.4):
// — нормализация ответа: обрезать пробелы по краям и схлопнуть пробелы внутри, регистр НЕ меняется;
// — пустой ответ не считается попыткой; в карточке с полями — если пусты все поля;
// — ошибка: серия обнуляется, задание попадает в ошибки, правильный ответ не раскрывается,
//   подсказка доступна только после ошибки и только если она есть;
// — верно: +1 балл один раз, серия растёт, показывается разбор;
// — ИНФОКВЕСТ: промежуточный экран после каждого раунда (кроме повтора ошибок), №31 всегда последний;
// — учитель может пропустить нерешённое задание: балла нет, задание идёт в ошибки, серия обнуляется.
(function () {
  const INF = (window.INF = window.INF || {});
  const { ui, icon, store } = INF;
  const esc = s => ui.esc(s);
  const norm = v => String(v ?? '').trim().replace(/\s+/g, ' ');
  const CUSTOM = ['choice', 'multi_choice', 'matching', 'categorize', 'ordering', 'symbol'];
  const WIDE = ['matching', 'categorize', 'ordering', 'multi_choice'];
  const PAIR_TONES = ['violet', 'yellow', 'mint', 'coral', 'sky', 'lilac'];

  const isCustom = t => CUSTOM.includes(t.ui);
  const isMulti = t => !isCustom(t) && Array.isArray(t.items) && t.items.length > 0;
  const isQuest = d => d.gameMode === 'infquest';
  const taskWord = n => { const m = n % 100; return m > 10 && m < 20 ? 'заданий' : n % 10 === 1 ? 'задание' : [2, 3, 4].includes(n % 10) ? 'задания' : 'заданий'; };
  const fmtTime = ms => { const s = Math.max(0, Math.floor(ms / 1000)); return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`; };
  const shuffle = items => { const a = [...items]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  // ---------- Новая попытка ----------
  function newRun(trainer, mode) {
    const d = trainer.data;
    let tasks = [...d.tasks];
    if (mode === 'shuffle') {
      if (d.shuffleWithinRounds && Array.isArray(d.rounds)) {
        const out = [];
        d.rounds.filter(r => r.id !== 'boss').forEach(r => out.push(...shuffle(d.tasks.filter(t => String(t.round) === String(r.id)))));
        out.push(...d.tasks.filter(t => t.round === 'boss'));
        tasks = out;
      } else tasks = shuffle(tasks);
    }
    if (mode === 'mistakes') {
      const ids = new Set((store.get(trainer.key).last || {}).mistakes || []);
      tasks = d.tasks.filter(t => ids.has(t.id));
    }
    return { mode, order: tasks.map(t => t.id), index: 0, score: 0, streak: 0, bestStreak: 0, attempts: {}, mistakes: [], solved: [], startedAt: Date.now(), elapsedMs: 0, checkpoint: null };
  }
  function start(trainer, mode) {
    const run = newRun(trainer, mode);
    if (!run.order.length) return false;
    unmount(); // сначала закрыть открытую попытку, чтобы она не записалась поверх новой
    store.saveRun(trainer.key, run);
    const target = trainer.href + '/play';
    if (location.hash === target) dispatchEvent(new HashChangeEvent('hashchange'));
    else location.hash = target;
    return true;
  }

  // ---------- Экран прохождения ----------
  let session = null; // { trainer, run, task, solved, sinceMs, timerId, root }

  function save() {
    if (!session) return;
    const now = Date.now();
    session.run.elapsedMs += now - session.sinceMs;
    session.sinceMs = now;
    store.saveRun(session.trainer.key, session.run);
  }
  function unmount() {
    if (!session) return;
    save();
    clearInterval(session.timerId);
    session = null;
  }
  addEventListener('pagehide', save);
  document.addEventListener('visibilitychange', () => { if (document.hidden) save(); else if (session) session.sinceMs = Date.now(); });

  function mount(root, trainer) {
    unmount();
    const run = store.get(trainer.key).run;
    if (!run) { location.hash = trainer.href; return; }
    session = { trainer, run, root, sinceMs: Date.now(), timerId: 0, solved: false };
    session.timerId = setInterval(() => {
      const el = root.querySelector('[data-timer]');
      if (el && session) el.textContent = fmtTime(session.run.elapsedMs + Date.now() - session.sinceMs);
    }, 1000);
    if (run.checkpoint != null) renderCheckpoint();
    else if (run.index >= run.order.length) finish();
    else renderTask();
  }

  const findTask = id => session.trainer.data.tasks.find(t => t.id === id);
  const explanationOf = task => (session.trainer.explanations || {})[String(task.id)] || (task.explain ? { explain: task.explain } : null);
  const teacher = () => Boolean(INF.teacher && INF.teacher.on);

  function top(task) {
    const { trainer, run } = session;
    const d = trainer.data;
    const total = run.order.length;
    const counter = isQuest(d) && run.mode !== 'mistakes' ? `Задание ${task.displayNumber} из ${d.tasks.length}` : `Задание ${run.index + 1} из ${total}`;
    const mode = run.mode === 'mistakes' ? ' · повтор ошибок' : '';
    return `<div class="task-top" data-tone="${trainer.tone}">
      <div class="task-top__row">
        <a class="back-link" href="${trainer.href}">${icon('arrow-left')}${esc(trainer.title)}</a>
        <span class="task-top__stats">
          <span><b>${esc(counter)}</b>${esc(mode)}</span>
          <span class="num" title="Счёт">${icon('check-circle')}<span data-score>${run.score} / ${total}</span></span>
          <span class="num" title="Серия верных ответов подряд">${icon('flame')}<span data-streak>${run.streak}</span></span>
          <span class="num" title="Время">${icon('clock')}<span data-timer>${fmtTime(run.elapsedMs)}</span></span>
        </span>
      </div>
      <div class="bar" role="progressbar" aria-label="Пройдено заданий" aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="${run.index}" style="--value:${(run.index / total) * 100}%"><span></span></div>
    </div>`;
  }

  function roundBanner(task) {
    const d = session.trainer.data;
    if (!isQuest(d)) return '';
    const r = (d.rounds || []).find(x => String(x.id) === String(task.round));
    if (!r) return '';
    return `<div class="round-banner${r.id === 'boss' ? ' is-boss' : ''}">
      <img src="${esc(INF.roundImage(r))}" alt="" width="96" height="96">
      <div><span class="round-banner__kicker">${esc(r.kicker.replace(/^РАУНД/, 'Раунд'))}</span><b>${esc(r.name)}</b><span class="small muted">${esc(r.description)}</span></div>
    </div>`;
  }

  function presentation(task) {
    const d = session.trainer.data;
    if (!task.code) return '';
    if (task.codeStyle === 'prose') return `<div class="prose-box">${esc(task.code).replace(/\n/g, '<br>')}</div>`;
    if (session.trainer.id === 'units') return `<div class="formula-box">${esc(task.code)}</div>`;
    return ui.codeBlock(task.code, 'Код задания').outerHTML;
  }

  function renderTask() {
    const { trainer, run, root } = session;
    const d = trainer.data;
    const task = findTask(run.order[run.index]);
    session.task = task;
    session.solved = false;
    session.custom = {};
    // Запасные заголовки — как в старом сайте; для карточек с выражениями — свои
    const exprCard = isMulti(task) && task.items.some(it => it.expr);
    const heading = task.heading || d.taskHeading || (exprCard ? 'Вычисли каждое выражение' : 'Что напечатает программа?');
    const instruction = task.instruction ?? d.taskInstruction ?? (exprCard ? 'Python запускать не нужно: посчитай в голове и запиши ответы по порядку.' : 'Пройди программу по строкам. Python запускать не нужно.');
    const layout = isCustom(task) && WIDE.includes(task.ui) ? 'wide' : (task.codeStyle === 'prose' || (task.code || '').length > 420) ? 'reading' : 'split';
    root.innerHTML = `<div class="play" data-tone="${trainer.tone}">
      ${top(task)}
      ${roundBanner(task)}
      <div class="task task--${layout}">
        <div class="task__body stack" style="--flow:var(--s4)">
          <span class="chip">${esc(task.topic)}</span>
          <h1 class="task__title" tabindex="-1">${esc(heading)}</h1>
          ${instruction ? `<p class="muted">${esc(instruction)}</p>` : ''}
          ${presentation(task)}
          ${task.question ? `<p class="task__question">${esc(task.question)}</p>` : ''}
        </div>
        <form class="task__panel" novalidate>
          <div class="answer-area"></div>
          <div class="feedback-slot" role="status" aria-live="polite"></div>
          <div class="hint-slot"></div>
          <div class="task__actions">
            <button class="btn btn--primary" type="submit" data-check>Проверить</button>
            <button class="btn btn--ghost" type="button" data-hint hidden>${icon('bulb')}Подсказка</button>
            <button class="btn btn--secondary" type="button" data-skip hidden>Пропустить (учитель)</button>
            <button class="btn btn--primary btn--go" type="button" data-next hidden></button>
          </div>
        </form>
      </div>
      <div class="play__explain"></div>
    </div>`;
    const area = root.querySelector('.answer-area');
    if (isCustom(task)) renderCustom(task, area);
    else if (isMulti(task)) renderMulti(task, area);
    else renderSingle(task, area);

    const form = root.querySelector('form');
    form.addEventListener('submit', e => { e.preventDefault(); check(); });
    root.querySelector('[data-hint]').addEventListener('click', showHint);
    root.querySelector('[data-skip]').addEventListener('click', skip);
    root.querySelector('[data-next]').addEventListener('click', advance);
    syncTeacher();
    document.title = `${heading} — ${trainer.title} — inf.family`;
    requestAnimationFrame(() => (area.querySelector('input:not([type=hidden]), button') || root.querySelector('.task__title')).focus({ preventScroll: true }));
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  // ---------- Поля ответа ----------
  function renderSingle(task, area) {
    area.innerHTML = `<label class="field-label" for="answer">Твой ответ</label>
      <input class="field" id="answer" name="answer" autocomplete="off" autocapitalize="off" spellcheck="false">`;
  }
  function itemLabels(task) {
    const lines = (task.code || '').split('\n').map(l => l.match(/^\s*\d+\.\s+(.*)$/)).filter(Boolean).map(m => m[1]);
    return task.items.map((it, i) => it.label ? { text: it.label, code: false } : { text: it.expr || lines[i] || `Пункт ${i + 1}`, code: Boolean(it.expr || lines[i]) });
  }
  function renderMulti(task, area) {
    const labels = itemLabels(task);
    const note = session.trainer.data.showMultiAnswerNote || session.trainer.id === 'slices'
      ? `<p class="small muted multi-note">Если результат — пустая строка, введи <code class="ic">''</code>.</p>` : '';
    area.innerHTML = `<div class="multi${task.answerLayout === 'columns' ? ' multi--columns' : ''}">` + task.items.map((it, i) => `
      <label class="multi__row">
        <span class="multi__label">${labels[i].code ? `<code class="ic">${esc(labels[i].text)}</code>` : esc(labels[i].text)}</span>
        <input class="field field--sm" data-item="${i}" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="${esc(labels[i].text)}">
      </label>`).join('') + `</div>${note}`;
  }

  function renderCustom(task, area) {
    const help = {
      matching: 'Нажми на элемент слева, затем на его пару справа. Можно перетаскивать.',
      categorize: 'Выбери карточку, затем нажми «Сюда» в нужной группе. Можно перетаскивать.',
      ordering: 'Меняй порядок кнопками ↑ ↓ или перетаскивай карточки.',
      multi_choice: 'Можно выбрать несколько вариантов.',
    }[task.ui];
    area.innerHTML = help ? `<p class="small muted custom-help">${esc(help)}</p>` : '';
    const box = document.createElement('div');
    area.appendChild(box);
    ({ choice: choiceUI, multi_choice: choiceUI, matching: matchingUI, categorize: categorizeUI, ordering: orderingUI, symbol: symbolUI })[task.ui](task, box);
  }

  function choiceUI(task, box) {
    const multi = task.ui === 'multi_choice';
    box.className = 'choices';
    box.setAttribute('role', multi ? 'group' : 'radiogroup');
    box.setAttribute('aria-label', 'Варианты ответа');
    box.innerHTML = task.options.map(o => `<button class="choice${multi ? ' choice--multi' : ''}" type="button" role="${multi ? 'checkbox' : 'radio'}" aria-checked="false" data-id="${esc(o.id)}"><span class="choice__mark">${multi ? icon('check') : ''}</span><span>${esc(o.text)}</span></button>`).join('');
    box.querySelectorAll('.choice').forEach(b => b.addEventListener('click', () => {
      if (b.disabled) return;
      if (multi) b.setAttribute('aria-checked', String(b.getAttribute('aria-checked') !== 'true'));
      else box.querySelectorAll('.choice').forEach(x => x.setAttribute('aria-checked', String(x === b)));
      clearFeedback();
    }));
  }

  function matchingUI(task, box) {
    const st = (session.custom = { map: {}, selected: null });
    box.className = 'match';
    box.innerHTML = `<div class="match__col" aria-label="Слева">${task.left.map(it => `<button type="button" class="match__item" data-side="left" data-id="${esc(it.id)}"><span>${esc(it.text)}</span><small class="match__note">выбери пару</small></button>`).join('')}</div>
      <div class="match__col" aria-label="Справа">${task.right.map(it => `<button type="button" class="match__item" data-side="right" data-id="${esc(it.id)}" draggable="true"><span>${esc(it.text)}</span><small class="match__note"></small></button>`).join('')}</div>`;
    const paint = () => {
      const leftIds = task.left.map(x => x.id);
      box.querySelectorAll('.match__item').forEach(b => {
        const id = b.dataset.id, left = b.dataset.side === 'left';
        const leftId = left ? id : Object.keys(st.map).find(k => st.map[k] === id);
        const paired = left ? Boolean(st.map[id]) : Boolean(leftId);
        const k = leftIds.indexOf(leftId);
        b.dataset.tone = paired ? PAIR_TONES[k % PAIR_TONES.length] : '';
        if (!paired) b.removeAttribute('data-tone');
        b.classList.toggle('is-paired', paired);
        b.setAttribute('aria-pressed', String(left && st.selected === id));
        const note = b.querySelector('.match__note');
        if (left) note.textContent = paired ? `пара: ${task.right.find(r => r.id === st.map[id]).text}` : st.selected === id ? 'теперь выбери справа' : 'выбери пару';
        else note.textContent = paired ? `пара ${k + 1}` : '';
      });
    };
    const pair = (leftId, rightId) => {
      Object.keys(st.map).forEach(k => { if (st.map[k] === rightId) delete st.map[k]; });
      st.map[leftId] = rightId;
      st.selected = null;
      paint(); clearFeedback();
    };
    box.addEventListener('click', e => {
      const b = e.target.closest('.match__item');
      if (!b || b.disabled) return;
      if (b.dataset.side === 'left') { st.selected = st.selected === b.dataset.id ? null : b.dataset.id; paint(); }
      else if (st.selected) pair(st.selected, b.dataset.id);
      else ui.toast('Сначала выбери элемент слева', 'arrow-left');
    });
    box.addEventListener('dragstart', e => { const b = e.target.closest('[data-side="right"]'); if (b) e.dataTransfer.setData('text/plain', b.dataset.id); });
    box.addEventListener('dragover', e => { if (e.target.closest('[data-side="left"]')) e.preventDefault(); });
    box.addEventListener('drop', e => {
      const b = e.target.closest('[data-side="left"]');
      const id = e.dataTransfer.getData('text/plain');
      if (b && id && task.right.some(r => r.id === id)) { e.preventDefault(); pair(b.dataset.id, id); }
    });
    paint();
  }

  function categorizeUI(task, box) {
    const st = (session.custom = { map: {}, selected: null });
    box.className = 'sort';
    box.innerHTML = `<div class="sort__bank" data-group="">
        <div class="sort__head"><b>Карточки</b><button type="button" class="btn btn--ghost sort__put" data-put="">Вернуть сюда</button></div>
        <div class="sort__cards"></div>
      </div>
      <div class="sort__zones">${task.groups.map((g, i) => `<div class="sort__zone" data-group="${esc(g.id)}" data-tone="${PAIR_TONES[i]}">
        <div class="sort__head"><b>${esc(g.title)}</b><button type="button" class="btn btn--tone sort__put" data-tone="${PAIR_TONES[i]}" data-put="${esc(g.id)}">Сюда</button></div>
        <div class="sort__cards"></div></div>`).join('')}</div>`;
    const bankHost = box.querySelector('.sort__bank .sort__cards');
    task.cards.forEach(c => bankHost.insertAdjacentHTML('beforeend', `<button type="button" class="sort__card" draggable="true" aria-pressed="false" data-id="${esc(c.id)}">${esc(c.text)}</button>`));
    const select = id => {
      st.selected = st.selected === id ? null : id;
      box.querySelectorAll('.sort__card').forEach(c => c.setAttribute('aria-pressed', String(c.dataset.id === st.selected)));
    };
    const move = (id, group) => {
      const card = box.querySelector(`.sort__card[data-id="${CSS.escape(id)}"]`);
      const host = box.querySelector(`[data-group="${CSS.escape(group)}"] .sort__cards`);
      if (!card || !host) return;
      host.appendChild(card);
      if (group) st.map[id] = group; else delete st.map[id];
      st.selected = null;
      box.querySelectorAll('.sort__card').forEach(c => c.setAttribute('aria-pressed', 'false'));
      clearFeedback();
    };
    box.addEventListener('click', e => {
      const card = e.target.closest('.sort__card');
      if (card && !card.disabled) { select(card.dataset.id); return; }
      const put = e.target.closest('[data-put]');
      if (put && !put.disabled) {
        if (st.selected) move(st.selected, put.dataset.put);
        else ui.toast('Сначала выбери карточку', 'arrow-left');
      }
    });
    box.addEventListener('dragstart', e => { const c = e.target.closest('.sort__card'); if (c) e.dataTransfer.setData('text/plain', c.dataset.id); });
    box.addEventListener('dragover', e => { if (e.target.closest('[data-group]')) e.preventDefault(); });
    box.addEventListener('drop', e => {
      const z = e.target.closest('[data-group]');
      const id = e.dataTransfer.getData('text/plain');
      if (z && id) { e.preventDefault(); move(id, z.dataset.group); }
    });
  }

  function orderingUI(task, box) {
    box.className = 'order';
    box.setAttribute('role', 'list');
    box.innerHTML = task.orderItems.map(it => `<div class="order__item" role="listitem" draggable="true" data-id="${esc(it.id)}">
      <span class="order__grip" aria-hidden="true">⋮⋮</span><span class="order__text">${esc(it.text)}</span>
      <span class="order__btns"><button type="button" class="icon-btn icon-btn--sm" data-move="-1" aria-label="Выше: ${esc(it.text)}">↑</button><button type="button" class="icon-btn icon-btn--sm" data-move="1" aria-label="Ниже: ${esc(it.text)}">↓</button></span></div>`).join('');
    let dragged = null;
    box.addEventListener('click', e => {
      const b = e.target.closest('[data-move]');
      if (!b || b.disabled) return;
      const item = b.closest('.order__item');
      if (b.dataset.move === '-1' && item.previousElementSibling) box.insertBefore(item, item.previousElementSibling);
      if (b.dataset.move === '1' && item.nextElementSibling) box.insertBefore(item.nextElementSibling, item);
      b.focus(); clearFeedback();
    });
    box.addEventListener('dragstart', e => { dragged = e.target.closest('.order__item'); dragged?.classList.add('is-dragging'); });
    box.addEventListener('dragend', () => { dragged?.classList.remove('is-dragging'); dragged = null; });
    box.addEventListener('dragover', e => {
      if (!dragged) return;
      e.preventDefault();
      const over = e.target.closest('.order__item');
      if (!over || over === dragged) return;
      const r = over.getBoundingClientRect();
      box.insertBefore(dragged, e.clientY > r.top + r.height / 2 ? over.nextElementSibling : over);
    });
  }

  function symbolUI(task, box) {
    session.custom = { selected: null };
    box.className = 'symbols';
    box.setAttribute('role', 'radiogroup');
    box.setAttribute('aria-label', 'Символы строки');
    box.innerHTML = task.symbols.map((s, i) => `<button type="button" class="symbol" role="radio" aria-checked="false" data-i="${i}" aria-label="Символ ${esc(s)}">${esc(s)}</button>`).join('');
    box.addEventListener('click', e => {
      const b = e.target.closest('.symbol');
      if (!b || b.disabled) return;
      session.custom.selected = task.symbols[Number(b.dataset.i)];
      box.querySelectorAll('.symbol').forEach(x => x.setAttribute('aria-checked', String(x === b)));
      clearFeedback();
    });
  }

  // ---------- Проверка ----------
  function evaluateCustom(task, area) {
    const st = session.custom || {};
    if (task.ui === 'choice') {
      const sel = area.querySelector('.choice[aria-checked="true"]');
      return sel ? { complete: true, correct: sel.dataset.id === task.correct } : { complete: false, message: 'Выбери вариант ответа.' };
    }
    if (task.ui === 'multi_choice') {
      const picked = [...area.querySelectorAll('.choice[aria-checked="true"]')].map(b => b.dataset.id).sort();
      if (!picked.length) return { complete: false, message: 'Выбери хотя бы один вариант.' };
      const right = [...task.correct].sort();
      return { complete: true, correct: picked.length === right.length && picked.every((v, i) => v === right[i]) };
    }
    if (task.ui === 'matching') {
      if (Object.keys(st.map).length !== task.left.length) return { complete: false, message: 'Соедини все пары.' };
      return { complete: true, correct: task.left.every(it => st.map[it.id] === task.correct[it.id]) };
    }
    if (task.ui === 'categorize') {
      if (Object.keys(st.map).length !== task.cards.length) return { complete: false, message: 'Распредели все карточки по группам.' };
      return { complete: true, correct: task.cards.every(c => st.map[c.id] === task.correct[c.id]) };
    }
    if (task.ui === 'ordering') {
      const order = [...area.querySelectorAll('.order__item')].map(n => n.dataset.id);
      const accepted = Array.isArray(task.correctOrders) ? task.correctOrders : [task.correctOrder];
      return { complete: true, correct: accepted.some(ok => ok.length === order.length && ok.every((id, i) => id === order[i])) };
    }
    if (task.ui === 'symbol') {
      return st.selected == null ? { complete: false, message: 'Нажми на символ.' } : { complete: true, correct: st.selected === task.correctSymbol };
    }
    return { complete: false, message: 'Нужен ответ.' };
  }

  function feedback(kind, text) {
    const slot = session.root.querySelector('.feedback-slot');
    const ic = kind === 'ok' ? 'check-circle' : kind === 'bad' ? 'x-circle' : 'arrow-up-right';
    slot.innerHTML = `<p class="feedback${kind ? ' feedback--' + kind : ''}">${icon(ic)}<span>${esc(text)}</span></p>`;
  }
  function clearFeedback() {
    if (!session || session.solved) return;
    const slot = session.root.querySelector('.feedback-slot');
    if (slot) slot.innerHTML = '';
    session.root.querySelectorAll('.field.is-wrong').forEach(f => f.classList.remove('is-wrong'));
  }

  function check() {
    if (!session || session.solved) return;
    const { task, run, root } = session;
    const area = root.querySelector('.answer-area');
    let correct = false;
    const wrongInputs = [];
    if (isCustom(task)) {
      const r = evaluateCustom(task, area);
      if (!r.complete) { feedback('', r.message); return; }
      correct = r.correct;
    } else if (isMulti(task)) {
      const inputs = [...area.querySelectorAll('input[data-item]')];
      const values = inputs.map(i => norm(i.value));
      if (values.every(v => v === '')) { feedback('', 'Впиши хотя бы один ответ.'); inputs[0].focus(); return; }
      correct = true;
      task.items.forEach((it, i) => {
        if (!it.answers.some(a => norm(a) === values[i])) { correct = false; wrongInputs.push(inputs[i]); }
      });
    } else {
      const input = area.querySelector('#answer');
      const v = norm(input.value);
      if (!v) { feedback('', 'Сначала впиши ответ.'); input.focus(); return; }
      correct = task.answers.some(a => norm(a) === v);
      if (!correct) wrongInputs.push(input);
    }
    run.attempts[task.id] = (run.attempts[task.id] || 0) + 1;

    if (!correct) {
      run.streak = 0;
      if (!run.mistakes.includes(task.id)) run.mistakes.push(task.id);
      save();
      root.querySelector('[data-streak]').textContent = '0';
      wrongInputs.forEach(f => { f.classList.remove('is-wrong'); void f.offsetWidth; f.classList.add('is-wrong'); f.setAttribute('aria-invalid', 'true'); });
      const codeTask = /print\(|def |for |while /.test(task.code || '');
      feedback('bad', isQuest(session.trainer.data) || !codeTask
        ? 'Пока не сходится. Проверь решение и попробуй ещё раз.'
        : 'Пока не сходится. Не спеши менять ответ наугад — пройди код по строкам.');
      // Подсказка — только после ошибки и только если она есть (и ещё не открыта)
      root.querySelector('[data-hint]').hidden = !task.hint || Boolean(root.querySelector('.hint-slot').innerHTML);
      const first = wrongInputs[0];
      if (first) requestAnimationFrame(() => { if (first.isConnected) { first.focus(); first.select && first.select(); } });
      return;
    }

    session.solved = true;
    run.score += 1;
    run.streak += 1;
    run.bestStreak = Math.max(run.bestStreak, run.streak);
    if (!run.solved.includes(task.id)) run.solved.push(task.id);
    save();
    lockAnswer();
    root.querySelector('[data-score]').textContent = `${run.score} / ${run.order.length}`;
    root.querySelector('[data-streak]').textContent = String(run.streak);
    const bar = root.querySelector('.task-top .bar');
    bar.style.setProperty('--value', `${((run.index + 1) / run.order.length) * 100}%`);
    bar.setAttribute('aria-valuenow', String(run.index + 1));
    feedback('ok', run.streak >= 3 ? `Верно! Серия: ${run.streak}` : 'Верно!');
    root.querySelector('[data-hint]').hidden = true;
    root.querySelector('[data-check]').hidden = true;
    const next = root.querySelector('[data-next]');
    next.innerHTML = `${run.index === run.order.length - 1 ? 'Завершить' : 'Следующее'}<span class="btn__go">${icon('arrow-right')}</span>`;
    next.hidden = false;
    syncTeacher();
    const ex = explanationOf(task);
    if (ex) {
      const exprs = Array.isArray(task.items) ? itemLabels(task).map(l => (l.code ? l.text : null)) : [];
      root.querySelector('.play__explain').replaceChildren(INF.renderExplanation(ex, { tone: session.trainer.tone, exprs }));
    }
    requestAnimationFrame(() => next.focus({ preventScroll: true }));
  }

  function lockAnswer() {
    const area = session.root.querySelector('.answer-area');
    area.querySelectorAll('input').forEach(i => { i.readOnly = true; i.classList.remove('is-wrong'); i.classList.add('is-correct'); i.removeAttribute('aria-invalid'); });
    area.querySelectorAll('button').forEach(b => { b.disabled = true; });
    area.querySelectorAll('[draggable="true"]').forEach(n => { n.draggable = false; });
    area.querySelectorAll('.choice[aria-checked="true"], .symbol[aria-checked="true"]').forEach(b => b.classList.add('is-correct'));
  }

  function showHint() {
    const { task, root } = session;
    root.querySelector('.hint-slot').innerHTML = `<div class="hint">${icon('bulb')}<b>Подсказка</b><span class="small">${ui.md(task.hint)}</span></div>`;
    root.querySelector('[data-hint]').hidden = true;
  }

  function skip() {
    if (!session || session.solved || !teacher()) return;
    const { task, run } = session;
    if (!run.mistakes.includes(task.id)) run.mistakes.push(task.id);
    run.streak = 0;
    advance(true);
  }

  // ---------- Переход дальше ----------
  function advance(skipped) {
    const { run, trainer } = session;
    if (!session.solved && skipped !== true) return;
    const done = findTask(run.order[run.index]);
    run.index += 1;
    const d = trainer.data;
    const nextTask = run.index < run.order.length ? findTask(run.order[run.index]) : null;
    if (isQuest(d) && d.checkpoints && run.mode !== 'mistakes' && Number.isInteger(done.round) && String(nextTask?.round) !== String(done.round)) {
      run.checkpoint = done.round;
      save();
      renderCheckpoint();
      return;
    }
    save();
    if (run.index >= run.order.length) finish();
    else renderTask();
  }

  function renderCheckpoint() {
    const { run, trainer, root } = session;
    const r = trainer.data.rounds.find(x => String(x.id) === String(run.checkpoint));
    root.innerHTML = `<div class="checkpoint" data-tone="${trainer.tone}">
      <img src="${esc(INF.roundImage(r))}" alt="" width="320" height="320">
      <div class="stack" style="--flow:var(--s4)">
        <span class="sticker" data-tone="lime" style="--tilt:-3deg">${icon('sparkle')}Раунд ${esc(r.id)} пройден</span>
        <h1 tabindex="-1">${esc(r.name)}</h1>
        <p class="muted">${esc(r.after)}</p>
        <div class="stats stats--plain">
          <div class="stat"><span>Счёт</span><b>${run.score} / ${trainer.data.tasks.length}</b></div>
          <div class="stat"><span>Серия</span><b>${run.streak}</b></div>
        </div>
        <button class="btn btn--primary btn--go" type="button" data-continue>Дальше<span class="btn__go">${icon('arrow-right')}</span></button>
      </div>
    </div>`;
    document.title = `Раунд ${r.id} пройден — ${trainer.title} — inf.family`;
    root.querySelector('[data-continue]').addEventListener('click', () => {
      run.checkpoint = null;
      save();
      if (run.index >= run.order.length) finish(); else renderTask();
    });
    requestAnimationFrame(() => root.querySelector('[data-continue]')?.focus());
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  function finish() {
    const { run, trainer } = session;
    save();
    const result = { mode: run.mode, score: run.score, total: run.order.length, mistakes: run.mistakes, bestStreak: run.bestStreak, timeMs: run.elapsedMs, date: Date.now() };
    clearInterval(session.timerId);
    session = null;
    store.finishRun(trainer.key, result);
    location.hash = trainer.href + '/result';
  }

  function syncTeacher() {
    if (!session || !session.root) return;
    const b = session.root.querySelector('[data-skip]');
    if (b) b.hidden = !teacher() || session.solved;
  }

  // ---------- Текст итога для куратора ----------
  // Оценка результата: короткий заголовок и пояснение (смысл — как в старом сайте)
  function resultText(percent) {
    if (percent === 100) return ['Все задания решены', 'Можно браться за следующий блок.'];
    if (percent >= 80) return ['Сильный результат', 'Повтори ошибки — и будет идеально.'];
    if (percent >= 60) return ['Основа есть', 'Повтори ошибки, чтобы закрепить тему.'];
    return ['Есть что повторить', 'После разбора ошибок результат можно быстро улучшить.'];
  }

  INF.engine = { start, mount, unmount, syncTeacher, norm, taskWord, fmtTime, resultText, isQuest, _session: () => session };
})();
