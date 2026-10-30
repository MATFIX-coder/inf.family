// Страницы сайта. Каждая функция получает корневой элемент и параметры адреса.
(function () {
  const INF = (window.INF = window.INF || {});
  const { ui, icon, store, engine } = INF;
  const esc = s => ui.esc(s);
  const D = window.INF_DATA;
  const go = (href, label, cls = 'btn--primary btn--go') => `<a class="btn ${cls}" href="${href}">${label}${cls.includes('btn--go') ? `<span class="btn__go">${icon('arrow-up-right')}</span>` : ''}</a>`;
  const dateText = ms => new Date(ms).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });

  // ---------- Сводка по тренажёру из хранилища ----------
  function status(t) {
    const e = store.get(t.key);
    const total = t.data.tasks.length;
    if (e.run) return { e, text: `решено ${e.run.score} из ${e.run.order.length}, задание ${Math.min(e.run.index + 1, e.run.order.length)}`, short: 'в процессе', value: (e.run.index / e.run.order.length) * 100 };
    if (e.best) return { e, text: `лучший результат ${e.best.score} из ${e.best.total}`, short: `${e.best.score} / ${e.best.total}`, value: (e.best.score / e.best.total) * 100 };
    if (e.last) return { e, text: `повтор ошибок: ${e.last.score} из ${e.last.total}`, short: 'повтор', value: 0 };
    return { e, text: 'ещё не начат', short: `${total} ${engine.taskWord(total)}`, value: 0 };
  }
  // Последняя незаконченная попытка — для кнопки «Продолжить»
  function resumable() {
    return INF.trainers.map(t => ({ t, run: store.get(t.key).run })).filter(x => x.run && x.run.index < x.run.order.length)
      .sort((a, b) => b.run.startedAt - a.run.startedAt)[0] || null;
  }

  // ---------- Карточки разделов: на каждой видно, что это и что будет по нажатию ----------
  const firstSentence = s => (d => d[0].toUpperCase() + d.slice(1))(s.split(' · ').slice(-1)[0]);
  const cta = (label, ic = 'arrow-right') => `<span class="t-card__cta">${label}${icon(ic)}</span>`;

  // Тренажёр (вариант А): значок, название, одна строка, одно состояние и кнопка.
  // Незаконченную попытку кнопка сразу продолжает.
  function cardState(t) {
    const e = store.get(t.key), total = t.data.tasks.length, n = `${total} ${engine.taskWord(total)}`;
    if (e.run && e.run.index < e.run.order.length) return { main: `Задание ${e.run.index + 1} из ${e.run.order.length}`, value: (e.run.index / e.run.order.length) * 100, going: true };
    if (e.best) return { main: `Лучший результат ${e.best.score} из ${e.best.total}`, value: (e.best.score / e.best.total) * 100 };
    if (e.last) return { main: n, sub: `повтор ошибок: ${e.last.score} из ${e.last.total}` };
    return { main: n, sub: 'ещё не начат' };
  }
  function trainerCard(t) {
    const s = cardState(t);
    return `<a class="tc" data-tone="${t.tone}" href="${s.going ? t.href + '/play' : t.href}">
      <span class="tc__head"><span class="tc__glyph" aria-hidden="true">${esc(t.glyph)}</span><span class="tc__title">${esc(t.title)}</span></span>
      <span class="tc__line">${esc(t.short || firstSentence(t.data.cardDescription))}</span>
      <span class="tc__foot"><span class="tc__state">${esc(s.main)}${s.value ? `<span class="tc__bar"><span style="width:${s.value.toFixed(1)}%"></span></span>` : `<small>${esc(s.sub)}</small>`}</span>${cta(s.going ? 'Продолжить' : 'Открыть')}</span>
    </a>`;
  }
  function trainerGrid() {
    return `<div class="t-grid">${INF.trainers.filter(t => t.kind === 'block').map(t => trainerCard(t)).join('')}</div>`;
  }
  // Состав защиты словами: «тест по срезам и две задачи», «четыре задачи»
  function defenseParts(d) {
    const tests = d.modules.filter(m => m.type !== 'image'), tasks = d.modules.length - tests.length;
    const num = ['', 'одна', 'две', 'три', 'четыре', 'пять', 'шесть'][tasks] || String(tasks);
    const word = tasks === 1 ? 'задача' : tasks > 1 && tasks < 5 ? 'задачи' : 'задач';
    return [...tests.map(m => m.name.toLowerCase()), tasks ? `${num} ${word}` : ''].filter(Boolean).join(' и ');
  }
  const hasTest = d => d.modules.some(m => m.type !== 'image');

  // Защита месяца и игра — отдельные разделы, на главной показываются под тренажёрами.
  // Из защит на главной — только текущая (первая в списке), остальные в разделе «Защиты».
  function extraCards() {
    const ar = INF.arcade.summary();
    const d = D.defenses[D.catalog.defenseOrder[0]];
    return `<div class="x-grid">
      <a class="block-card block-card--calm block-card--thumb" data-tone="peach" href="#/defense/${d.id}">
        <span class="block-card__meta">Защита месяца</span><span class="block-card__title">${esc(d.name)}</span>
        <span class="t-card__desc">Проверка знаний за месяц: ${esc(defenseParts(d))}. Готовиться можно заранее.</span>
        <img class="block-card__thumb" src="${esc(INF.coverOf(d).square)}" alt="" width="160" height="160">
        <span class="t-card__foot"><span class="t-card__row">${cta('Открыть')}</span></span>
      </a>
      <a class="block-card block-card--night block-card--thumb" href="#/arcade">
        <span class="block-card__meta">Игра</span><span class="block-card__title">Python Arcade</span>
        <span class="t-card__desc">8 игровых автоматов с заданиями. За каждый — жетон, 8 жетонов открывают финальный уровень.</span>
        <img class="block-card__thumb block-card__thumb--robot" src="assets/img/arcade/robot-wheel.webp" alt="" width="160" height="160">
        <span class="t-card__foot"><span class="t-card__row"><span class="t-card__status">жетоны ${ar.keys} из 8</span>${cta('Играть')}</span></span>
      </a>
    </div>`;
  }

  // ---------- Главная ----------
  function home(root) {
    const r = resumable();
    const first = INF.trainers.find(t => t.kind === 'block');
    const mainAction = r ? go(`${r.t.href}/play`, `Продолжить «${esc(r.t.title)}»`) : go(first.href, `Начать с «${esc(first.title)}»`);
    root.innerHTML = `
      <section class="hero" aria-labelledby="heroTitle">
        <div>
          <span class="sticker" data-tone="lime">Информатика и Python, 7–11 класс</span>
          <h1 id="heroTitle" tabindex="-1" style="margin-top:var(--s5)">
            От <span class="code-pill" data-tone="violet" style="--tilt:-3deg">print()</span><span class="hand-note hero-note" aria-hidden="true"><svg viewBox="0 0 54 40" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M50 30C38 30 22 26 10 14"/><path d="M6 22 8 12l10 1"/></svg>с этого<br>начинает каждый</span><br>
            до <span class="word-pill" data-tone="yellow" style="--tilt:2deg">ЕГЭ</span> —<br>шаг за шагом
          </h1>
          <p class="hero__lead">Тренажёры по Python и информатике для подготовки к ЕГЭ и ОГЭ. Решаешь задание, а если ошибся — смотришь разбор по шагам. Прогресс сохраняется.</p>
          <div class="hero__actions">${mainAction}<a class="btn btn--secondary" href="#/progress">Мой прогресс</a></div>
        </div>
        <div class="hero__side">
          <img class="hero__mascot" src="assets/img/brand/mascot.webp" alt="Робот-талисман inf.family машет рукой" width="672" height="900">
        </div>
      </section>
      <section class="section" aria-labelledby="trainersTitle">
        <div class="section__head"><h2 id="trainersTitle">Тренажёры</h2>
          <p class="muted">Пять тренажёров: от первых уроков Python до задания 31. Прогресс сохраняется на этом устройстве.</p></div>
        ${trainerGrid()}
      </section>
      <section class="section" aria-labelledby="extrasTitle">
        <div class="section__head"><h2 id="extrasTitle">Защита месяца и игра</h2></div>
        ${extraCards()}
      </section>`;
    document.title = 'inf.family — тренажёры по информатике и Python';
  }

  // ---------- Все тренажёры ----------
  function blocksPage(root) {
    root.innerHTML = `
      <div class="page-head"><h1 tabindex="-1">Тренажёры</h1><p class="muted">Выбери тренажёр. Задания идут от простого к сложному, после верного ответа — разбор по шагам.</p></div>
      ${trainerGrid()}`;
    document.title = 'Тренажёры — inf.family';
  }

  // ---------- Экран тренажёра: всё на одной странице, главная кнопка — первой ----------
  function trainerPage(root, t) {
    const back = t.parent ? `<a class="back-link" href="#/defense/${t.parent.id}">${icon('arrow-left')}${esc(t.parent.name)}</a>` : `<a class="back-link" href="#/blocks">${icon('arrow-left')}Все тренажёры</a>`;
    const total = t.data.tasks.length;
    const quest = engine.isQuest(t.data);
    const inside = quest
      ? `<div class="route">${t.data.rounds.map(r => `
        <figure class="route__item${r.id === 'boss' ? ' is-boss' : ''}"><img src="${esc(INF.roundImage(r))}" alt="" width="200" height="200" loading="lazy">
        <figcaption><small>${r.id === 'boss' ? 'Задание 31' : `Раунд ${r.id} · задания ${(r.id - 1) * 5 + 1}–${r.id * 5}`}</small><b>${esc(r.name)}</b></figcaption></figure>`).join('')}</div>`
      : `<div class="chips">${[...new Set(t.data.tasks.map(x => x.topic))].map(x => `<span class="chip">${esc(x)}</span>`).join('')}</div>`;
    root.innerHTML = `${back}
      <div class="page-head trainer-head" data-tone="${t.tone}">
        <span class="trainer-head__glyph" aria-hidden="true">${esc(t.glyph)}</span>
        <div><h1 tabindex="-1">${esc(t.title)}</h1><p class="muted">${esc(t.data.subtitle)}</p></div>
      </div>
      <section class="calm-panel" data-tone="${t.tone}" id="panel-result" aria-label="Мой результат"></section>
      <section class="section section--tight" aria-labelledby="insideTitle">
        <h2 id="insideTitle" class="panel-title">${quest ? 'Маршрут: 6 раундов и финальное задание' : `Что внутри: ${total} ${engine.taskWord(total)}`}</h2>
        <div class="plain-panel">${inside}</div>
      </section>
      ${(t.data.benefits || []).length ? `<section class="section section--tight" aria-labelledby="aboutTitle">
        <h2 id="aboutTitle" class="panel-title">Как устроен тренажёр</h2>
        <ul class="benefits plain-panel" role="list">${t.data.benefits.map(([h, p]) => `<li><b>${esc(h)}</b><span>${esc(p)}</span></li>`).join('')}</ul>
      </section>` : ''}`;
    resultPanel(root.querySelector('#panel-result'), t);
    document.title = `${t.title} — inf.family`;
  }

  function resultPanel(panel, t) {
    const e = store.get(t.key);
    const quest = engine.isQuest(t.data);
    const run = e.run && e.run.index < e.run.order.length ? e.run : null;
    const stat = (k, v) => `<div class="stat"><span>${esc(k)}</span><b>${esc(String(v))}</b></div>`;
    const shuffleLabel = quest ? 'Перемешать внутри раундов' : 'Перемешать задания';
    let html = '';
    if (run) {
      html = `<h2 class="panel-title">${run.mode === 'mistakes' ? 'Повтор ошибок' : 'Попытка идёт'}</h2>
        <div class="stats">${stat('Решено', `${run.score} / ${run.order.length}`)}${stat('Сейчас', `задание ${run.index + 1}`)}${stat('Ошибок', run.mistakes.length)}${stat('Время', engine.fmtTime(run.elapsedMs))}</div>
        <div class="row-actions">
          <a class="btn btn--primary" href="${t.href}/play">${icon('play')}Продолжить с ${run.index + 1}-го</a>
          <button class="btn btn--secondary" type="button" data-restart>${icon('rotate')}Начать заново</button>
          <button class="btn btn--danger" type="button" data-reset>${icon('trash')}Сбросить результаты</button>
        </div>`;
    } else {
      const has = e.best || e.last;
      html = `<h2 class="panel-title">${has ? 'Мои результаты' : 'Пока без попыток'}</h2>
        ${has ? `<div class="stats">${e.best ? stat('Лучший результат', `${e.best.score} / ${e.best.total}`) : ''}${e.last ? stat('Последняя попытка', `${e.last.score} / ${e.last.total}`) : ''}${e.last ? stat('Ошибок в ней', e.last.mistakes.length) : ''}${e.last ? stat('Время', engine.fmtTime(e.last.timeMs)) : ''}</div>`
        : `<p>Задания идут от простого к сложному. Если ошибёшься — появится подсказка, а после верного ответа — разбор по шагам.</p>`}
        <div class="row-actions">
          <button class="btn btn--primary btn--go" type="button" data-start>${has ? 'Пройти снова' : 'Начать'}<span class="btn__go">${icon('arrow-right')}</span></button>
          <button class="switch" type="button" role="switch" aria-checked="false" data-shuffle><span class="switch__track"></span>${shuffleLabel}</button>
        </div>
        <div class="row-actions" ${e.last || has ? '' : 'hidden'}>
          ${e.last && e.last.mistakes.length ? `<button class="btn btn--secondary" type="button" data-mistakes>${icon('rotate')}Повторить ошибки (${e.last.mistakes.length})</button>` : ''}
          ${e.last ? `<a class="btn btn--ghost" href="${t.href}/result">Итоги последней попытки</a>` : ''}
          ${has ? `<button class="btn btn--danger" type="button" data-reset>${icon('trash')}Сбросить результаты</button>` : ''}
        </div>
        ${e.history && e.history.length > 1 ? `<details class="history"><summary>История попыток</summary><ol role="list">${e.history.map(h => `<li><span>${dateText(h.date)}</span><span>${h.mode === 'mistakes' ? 'повтор ошибок' : h.mode === 'shuffle' ? 'вперемешку' : 'по порядку'}</span><b class="num">${h.score} / ${h.total}</b><span class="num">${engine.fmtTime(h.timeMs)}</span></li>`).join('')}</ol></details>` : ''}`;
    }
    panel.innerHTML = html;
    const sw = panel.querySelector('[data-shuffle]');
    sw && sw.addEventListener('click', () => sw.setAttribute('aria-checked', String(sw.getAttribute('aria-checked') !== 'true')));
    panel.querySelector('[data-start]')?.addEventListener('click', () => engine.start(t, sw && sw.getAttribute('aria-checked') === 'true' ? 'shuffle' : 'ordered'));
    panel.querySelector('[data-mistakes]')?.addEventListener('click', () => engine.start(t, 'mistakes'));
    panel.querySelector('[data-restart]')?.addEventListener('click', async () => {
      const ok = await ui.confirm({ title: 'Начать заново?', text: 'Текущая попытка закончится, её ответы не сохранятся. Лучший результат останется.', confirm: 'Начать заново' });
      if (ok) engine.start(t, 'ordered');
    });
    panel.querySelector('[data-reset]')?.addEventListener('click', async () => {
      const ok = await ui.confirm({ title: `Сбросить результаты «${t.title}»?`, text: 'Удалятся лучший результат, история попыток, ошибки и место, где ты остановился. Отменить это нельзя.', confirm: 'Сбросить', danger: true });
      if (ok) { store.reset(t.key); ui.toast(`Результаты «${t.title}» сброшены`, 'trash'); resultPanel(panel, t); }
    });
  }

  // ---------- Прохождение ----------
  function play(root, t) {
    engine.mount(root, t);
  }

  // ---------- Итоги ----------
  function result(root, t) {
    const e = store.get(t.key);
    if (!e.last) { location.hash = t.href; return; }
    const l = e.last;
    const percent = l.total ? Math.round((l.score / l.total) * 100) : 0;
    const mistakes = new Set(l.mistakes);
    const topics = [...new Set(t.data.tasks.filter(x => mistakes.has(x.id)).map(x => x.topic))];
    const C = 2 * Math.PI * 52;
    root.innerHTML = `<a class="back-link" href="${t.href}">${icon('arrow-left')}${esc(t.title)}</a>
      <section class="result" data-tone="${t.tone}">
        <div class="result__score">
          <svg class="result__ring" viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="52" class="ring__track"/><circle cx="60" cy="60" r="52" class="ring__value" stroke-dasharray="${C.toFixed(1)}" stroke-dashoffset="${(C * (1 - percent / 100)).toFixed(1)}"/></svg>
          <div><b class="num">${l.score}<span>/${l.total}</span></b><small>${percent}%</small></div>
        </div>
        <div class="stack" style="--flow:var(--s4)">
          <span class="sticker" data-tone="${percent === 100 ? 'mint' : 'yellow'}">${l.mode === 'mistakes' ? 'Повтор ошибок завершён' : 'Попытка завершена'}</span>
          <h1 tabindex="-1">${esc(engine.resultText(percent)[0])}</h1>
          <p class="muted">${esc(engine.resultText(percent)[1])}</p>
          <div class="stats stats--plain">
            <div class="stat"><span>Заданий с ошибкой</span><b>${l.mistakes.length}</b></div>
            <div class="stat"><span>Лучшая серия</span><b>${l.bestStreak}</b></div>
            <div class="stat"><span>Время</span><b>${engine.fmtTime(l.timeMs)}</b></div>
          </div>
          ${topics.length ? `<div><b>Стоит повторить</b><div class="chips" style="margin-top:var(--s2)">${topics.map(x => `<span class="chip">${esc(x)}</span>`).join('')}</div></div>` : ''}
          <div class="row-actions">
            ${l.mistakes.length ? `<button class="btn btn--primary" type="button" data-mistakes>${icon('rotate')}Повторить ошибки</button>` : ''}
            <button class="btn ${l.mistakes.length ? 'btn--secondary' : 'btn--primary'}" type="button" data-again>Пройти ещё раз</button>
            <button class="btn btn--ghost" type="button" data-copy>${icon('copy')}Скопировать результат</button>
          </div>
        </div>
      </section>`;
    root.querySelector('[data-mistakes]')?.addEventListener('click', () => engine.start(t, 'mistakes'));
    root.querySelector('[data-again]').addEventListener('click', () => engine.start(t, 'ordered'));
    root.querySelector('[data-copy]').addEventListener('click', () => copy([
      `${t.title} — inf.family`,
      `Результат: ${l.score}/${l.total} (${percent}%)`,
      `Ошибок: ${l.mistakes.length}`,
      `Лучшая серия: ${l.bestStreak}`,
      `Время: ${engine.fmtTime(l.timeMs)}`,
      topics.length ? `Повторить: ${topics.join(', ')}` : '',
    ].filter(Boolean).join('\n')));
    document.title = `Итоги — ${t.title} — inf.family`;
  }

  async function copy(text) {
    // Доступна и другим разделам (Arcade)
    try {
      if (navigator.clipboard && window.isSecureContext) { await navigator.clipboard.writeText(text); ui.toast('Скопировано — отправь куратору', 'copy'); return; }
    } catch { /* ниже — запасной способ для file:// */ }
    const area = document.createElement('textarea');
    area.value = text; area.setAttribute('readonly', ''); area.style.position = 'fixed'; area.style.opacity = '0';
    document.body.appendChild(area); area.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch { ok = false; }
    area.remove();
    ui.toast(ok ? 'Скопировано — отправь куратору' : 'Не получилось скопировать автоматически', ok ? 'copy' : 'x');
  }

  // ---------- Защиты ----------
  function defensesPage(root) {
    root.innerHTML = `<div class="page-head"><h1 tabindex="-1">Защиты</h1><p class="muted">Раз в месяц ученики защищают пройденное: тест и задачи. Здесь можно подготовиться заранее.</p></div>
      <div class="defense-list">${D.catalog.defenseOrder.map(id => { const d = D.defenses[id]; return `
        <a class="defense-card" href="#/defense/${id}">
          <img src="${esc(INF.coverOf(d).cover)}" alt="Обложка: ${esc(d.name)}" width="840" height="1050">
          <span class="defense-card__body"><span class="sticker" data-tone="peach">${esc(d.season)}</span><b>${esc(d.name)}</b><span class="muted">Внутри: ${esc(defenseParts(d))}</span>${cta('Открыть')}</span>
        </a>`; }).join('')}</div>`;
    document.title = 'Защиты — inf.family';
  }

  function defensePage(root, d) {
    const mods = d.modules.map(m => {
      if (m.type === 'image') return `<a class="block-card block-card--calm" data-tone="peach" href="#/defense/${d.id}/${m.id}"><span class="block-card__meta">Задача-картинка</span><span class="block-card__title">${esc(m.name)}</span><span class="block-card__glyph" aria-hidden="true">${esc(m.icon)}</span><span class="t-card__foot"><span class="t-card__row"><span class="t-card__status">${esc(m.tag)}</span>${cta('Открыть')}</span></span></a>`;
      const t = INF.trainers.find(x => x.id === m.id);
      const s = status(t);
      const going = s.e.run && s.e.run.index < s.e.run.order.length;
      return `<a class="block-card block-card--calm block-card--wide" data-tone="mint" href="${going ? t.href + '/play' : t.href}"><span class="block-card__meta">${m.tasks.length} ${engine.taskWord(m.tasks.length)}</span><span class="block-card__title">${esc(m.name)}</span><span class="block-card__glyph" aria-hidden="true">${esc(m.icon)}</span><span class="t-card__foot">${s.value ? `<div class="bar" style="--value:${s.value}%"><span></span></div>` : ''}<span class="t-card__row"><span class="t-card__status">${esc(s.text)}</span>${cta(going ? 'Продолжить' : 'Открыть')}</span></span></a>`;
    }).join('');
    root.innerHTML = `<a class="back-link" href="#/defenses">${icon('arrow-left')}Все защиты</a>
      <section class="defense-hero">
        <img class="defense-hero__cover" src="${esc(INF.coverOf(d).cover)}" alt="Обложка: ${esc(d.name)}" width="840" height="1050">
        <div class="stack" style="--flow:var(--s4)"><span class="sticker" data-tone="peach">${esc(d.season)}</span><h1 tabindex="-1">${esc(d.name)}</h1>
          <p class="muted">${hasTest(d)
            ? 'Защита — это проверка знаний за месяц: тест и задачи по пройденному. Здесь можно потренироваться заранее: тест проходится сколько угодно раз, а задачи открываются как условия-картинки.'
            : 'Защита — это проверка знаний за месяц: задачи по пройденному. Здесь можно подготовиться заранее: каждая задача открывается как условие-картинка.'}</p>
        </div>
      </section>
      <div class="section__head" style="margin-top:var(--s7)"><h2>Программа защиты</h2><p class="muted">${hasTest(d) ? 'Тест можно проходить сколько угодно раз. ' : ''}Задачи — это условия-картинки, решения покажет учитель.</p></div>
      <div class="bento bento--3">${mods}</div>`;
    document.title = `${d.name} — inf.family`;
  }

  function imageTask(root, d, m) {
    // Учителю: решение-картинка и/или ответ (у части задач есть только ответ)
    const solution = INF.teacher.on && (m.solutionImage || m.answer);
    const what = m.solutionImage ? 'решение' : 'ответ';
    const answer = m.answer ? `<p class="image-task__answer">Ответ: <b>${esc(m.answer)}</b></p>${m.answerNote ? `<p class="muted">${esc(m.answerNote)}</p>` : ''}` : '';
    root.innerHTML = `<a class="back-link" href="#/defense/${d.id}">${icon('arrow-left')}${esc(d.name)}</a>
      <div class="page-head"><span class="chip">${esc(m.tag)}</span><h1 tabindex="-1">${esc(m.name)}</h1></div>
      <figure class="image-task"><img src="${esc(INF.lightImage(m.image))}" alt="${esc(m.imageAlt || 'Условие: ' + m.name)}"><figcaption><a href="${esc(INF.lightImage(m.image))}" target="_blank" rel="noopener">Открыть условие в полном размере</a></figcaption></figure>
      ${solution ? `<div class="row-actions"><button class="btn btn--primary" type="button" data-solution aria-expanded="false" aria-controls="solution">${icon('lock')}Показать ${what}</button></div>
      <figure class="image-task" id="solution" hidden>${m.solutionImage ? '<figcaption class="image-task__label">Решение</figcaption>' : ''}${answer}${m.solutionImage ? `<img src="${esc(INF.lightImage(m.solutionImage))}" alt="${esc(m.solutionAlt || 'Решение: ' + m.name)}">` : ''}</figure>` : ''}`;
    const btn = root.querySelector('[data-solution]');
    btn && btn.addEventListener('click', () => {
      const fig = root.querySelector('#solution');
      fig.hidden = !fig.hidden;
      btn.setAttribute('aria-expanded', String(!fig.hidden));
      btn.innerHTML = `${icon('lock')}${fig.hidden ? 'Показать' : 'Скрыть'} ${what}`;
    });
    document.title = `${m.name} — ${d.name} — inf.family`;
  }

  // ---------- Мой прогресс ----------
  function progressPage(root) {
    const rows = INF.trainers.map(t => {
      const s = status(t);
      const e = s.e;
      const when = e.run ? 'сейчас' : e.history && e.history[0] ? dateText(e.history[0].date) : '—';
      return `<li class="progress-row" data-tone="${t.tone}">
        <span class="progress-row__dot" aria-hidden="true">${esc(t.glyph)}</span>
        <span class="progress-row__name"><b>${esc(t.title)}</b><small class="muted">${esc(t.parent ? t.parent.name : 'Тренажёр')}</small></span>
        <span class="progress-row__state">${esc(s.text)}</span>
        <span class="progress-row__when muted small">${esc(when)}</span>
        <span class="progress-row__actions"><a class="btn btn--secondary" href="${t.href}">Открыть</a>${e.run || e.last ? `<button class="icon-btn" type="button" data-reset="${esc(t.key)}" aria-label="Сбросить результаты «${esc(t.title)}»">${icon('trash')}</button>` : ''}</span>
      </li>`;
    }).join('');
    const ar = INF.arcade.summary();
    const arcadeRow = `<li class="progress-row" data-tone="sky">
        <span class="progress-row__dot" aria-hidden="true">▶</span>
        <span class="progress-row__name"><b>Python Arcade</b><small class="muted">Игровой зал</small></span>
        <span class="progress-row__state">жетоны ${ar.keys} из 8, решено ${ar.solved}${ar.boss ? ', финальный уровень пройден' : ''}</span>
        <span class="progress-row__when muted small">—</span>
        <span class="progress-row__actions"><a class="btn btn--secondary" href="#/arcade">Открыть</a>${ar.touched ? `<button class="icon-btn" type="button" data-reset-arcade aria-label="Сбросить прогресс Python Arcade">${icon('trash')}</button>` : ''}</span>
      </li>`;
    root.innerHTML = `<div class="page-head"><h1 tabindex="-1">Мой прогресс</h1>
      <p class="muted">Результаты хранятся в этом браузере на этом устройстве. Чтобы показать их куратору, скопируй отчёт.</p>
      ${store.persistent ? '' : '<p class="feedback feedback--bad">Браузер не даёт сохранять данные: прогресс пропадёт после перезагрузки страницы.</p>'}</div>
      <ul class="progress-list" role="list">${rows}${arcadeRow}</ul>
      <div class="row-actions" style="margin-top:var(--s6)">
        <button class="btn btn--primary" type="button" data-report>${icon('copy')}Скопировать отчёт для куратора</button>
        <button class="btn btn--danger" type="button" data-reset-all>${icon('trash')}Сбросить всё</button>
      </div>`;
    root.querySelectorAll('[data-reset]').forEach(b => b.addEventListener('click', async () => {
      const t = INF.trainers.find(x => x.key === b.dataset.reset);
      if (await ui.confirm({ title: `Сбросить результаты «${t.title}»?`, text: 'Удалятся лучший результат, история и незаконченная попытка. Отменить это нельзя.', confirm: 'Сбросить', danger: true })) {
        store.reset(t.key); ui.toast(`Результаты «${t.title}» сброшены`, 'trash'); progressPage(root);
      }
    }));
    root.querySelector('[data-reset-arcade]')?.addEventListener('click', async () => {
      if (await ui.confirm({ title: 'Сбросить Python Arcade?', text: 'Удалятся жетоны, ошибки, статистика и финальный уровень игры. Отменить это нельзя.', confirm: 'Сбросить', danger: true })) {
        INF.arcade.reset(); ui.toast('Прогресс Python Arcade сброшен', 'trash'); progressPage(root);
      }
    });
    root.querySelector('[data-reset-all]').addEventListener('click', async () => {
      if (await ui.confirm({ title: 'Сбросить весь прогресс?', text: 'Удалятся результаты всех тренажёров, тестов и игры Python Arcade на этом устройстве. Отменить это нельзя.', confirm: 'Сбросить всё', danger: true })) {
        store.resetAll(); INF.arcade.reset(); ui.toast('Весь прогресс сброшен', 'trash'); progressPage(root);
      }
    });
    root.querySelector('[data-report]').addEventListener('click', () => copy(['Отчёт inf.family', new Date().toLocaleDateString('ru-RU'), '',
      ...INF.trainers.map(t => `${t.title}: ${status(t).text}`), `Python Arcade: жетоны ${ar.keys} из 8, решено ${ar.solved}`].join('\n')));
    document.title = 'Мой прогресс — inf.family';
  }

  function notFound(root) {
    root.innerHTML = `<div class="page-head"><h1 tabindex="-1">Такой страницы нет</h1><p class="muted">Возможно, ссылка устарела.</p></div>${go('#/', 'На главную')}`;
    document.title = 'Страница не найдена — inf.family';
  }

  INF.copyText = copy;
  INF.pages = { home, blocksPage, trainerPage, play, result, defensesPage, defensePage, imageTask, progressPage, notFound };
})();
