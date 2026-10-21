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

  // ---------- Главная ----------
  function home(root) {
    const r = resumable();
    const cta = r ? go(`${r.t.href}/play`, `Продолжить «${esc(r.t.title)}»`) : go('#/blocks', 'Выбрать блок');
    root.innerHTML = `
      <section class="hero" aria-labelledby="heroTitle">
        <div>
          <span class="sticker" data-tone="lime" style="--tilt:-3deg">Информатика и Python, 7–11 класс</span>
          <h1 id="heroTitle" tabindex="-1" style="margin-top:var(--s5)">
            От <span class="code-pill" data-tone="violet" style="--tilt:-3deg">print()</span><span class="hand-note hero-note" aria-hidden="true"><svg viewBox="0 0 54 40" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M50 30C38 30 22 26 10 14"/><path d="M6 22 8 12l10 1"/></svg>с этого<br>начинает каждый</span><br>
            до <span class="word-pill" data-tone="yellow" style="--tilt:2deg">ЕГЭ</span> —<br>шаг за шагом
          </h1>
          <p class="hero__lead">Тренажёры по Python и информатике для подготовки к ЕГЭ и ОГЭ. Решаешь задание, а если ошибся — смотришь разбор по шагам. Прогресс сохраняется.</p>
          <div class="hero__actions">${cta}<a class="btn btn--secondary" href="#/progress">Мой прогресс</a></div>
        </div>
        <div class="hero__side">
          <img class="hero__mascot" src="assets/img/brand/mascot.webp" alt="Робот-талисман inf.family машет рукой" width="672" height="900">
          <div class="round-badge hero-badge" aria-hidden="true">
            <svg class="round-badge__ring" viewBox="0 0 100 100"><defs><path id="badgePath" d="M50 50m-38 0a38 38 0 1 1 76 0a38 38 0 1 1-76 0"/></defs><text><textPath href="#badgePath">решай · ошибайся · разбирайся ·</textPath></text></svg>
            <span class="btn__go">${icon('arrow-up-right')}</span>
          </div>
        </div>
      </section>
      <section class="section" aria-labelledby="rackTitle">
        <div class="section__head"><h2 id="rackTitle">Выбери, что тренировать</h2>
          <p class="muted">Потяни полку мышкой или пальцем, листай стрелками. Нажми на центральную обложку — откроется раздел.</p></div>
        <div class="coverflow" id="rack"><div class="coverflow__stage"></div></div>
        <div class="coverflow__caption" aria-live="polite"></div>
        <div class="coverflow__controls">
          <button class="icon-btn" type="button" data-cf-prev aria-label="Предыдущий раздел">${icon('chevron-left')}</button>
          <div class="coverflow__dots"></div>
          <button class="icon-btn" type="button" data-cf-next aria-label="Следующий раздел">${icon('chevron-right')}</button>
        </div>
      </section>`;
    const items = INF.trainers.filter(t => t.kind === 'block').map(t => {
      const s = status(t);
      const art = INF.coverArt(t.id);
      return { title: t.title, tone: t.tone, glyph: t.glyph, art, cls: art ? 'cover--calm' : '', meta: `${t.data.tasks.length} ${engine.taskWord(t.data.tasks.length)}`, desc: (d => d[0].toUpperCase() + d.slice(1))(t.data.cardDescription.split(' · ').slice(-1)[0]), rows: [['Заданий', t.data.tasks.length], ['Твой результат', s.text]], href: t.href };
    });
    const ar = INF.arcade.summary();
    items.push({ title: 'Python Arcade', cls: 'cover--night', glyph: '▶', meta: 'Игровой зал', desc: '8 игровых автоматов, жетоны и финальный уровень.', rows: [['Жетоны', `${ar.keys} из 8`], ['Финальный уровень', ar.boss ? 'пройден' : 'впереди']], href: '#/arcade' });
    D.catalog.defenseOrder.forEach(id => {
      const d = D.defenses[id];
      items.push({ title: d.name, tone: 'peach', glyph: d.icon, img: INF.coverOf(d).square, cls: 'cover--image', meta: 'Защита месяца', desc: 'Тест по срезам и две задачи-автомата с решениями.', rows: [['Модулей', d.modules.length], ['Сезон', d.season]], href: `#/defense/${id}` });
    });
    const startAt = Math.max(0, items.findIndex(i => r && i.href === r.t.href));
    ui.coverflow(root.querySelector('#rack'), {
      items, start: r ? startAt : 2, label: 'Разделы сайта',
      card: it => it.img
        ? `<img class="cover__img" src="${esc(it.img)}" alt="" draggable="false"><span class="cover__meta cover__meta--chip">${esc(it.meta)}</span>`
        : `<span class="cover__meta">${esc(it.meta)}</span>${it.art ? `<span class="cover__art">${it.art}</span>` : `<span class="cover__glyph" aria-hidden="true">${esc(it.glyph)}</span>`}<span class="cover__title">${esc(it.title)}</span>`,
      caption: it => `<h3>${esc(it.title)}</h3><p>${esc(it.desc)}</p><dl class="cf-meta">${it.rows.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(String(v))}</dd>`).join('')}</dl><div style="margin-top:var(--s4)">${go(it.href, 'Открыть')}</div>`,
      onOpen: it => { location.hash = it.href; },
    });
    document.title = 'inf.family — тренажёры по информатике и Python';
  }

  // ---------- Все блоки ----------
  function blocksPage(root) {
    const r = resumable();
    const blocks = INF.trainers.filter(t => t.kind === 'block');
    const bar = v => `<div class="bar" style="--value:${v}%"><span></span></div>`;
    const heroT = r ? r.t : blocks[0];
    const heroS = status(heroT);
    // Обложка блока: спокойная схема из темы, если она есть; иначе — прежний значок
    const look = t => { const art = INF.coverArt(t.id); return { cls: art ? ' block-card--calm' : '', art: art ? `<span class="block-card__art">${art}</span>` : `<span class="block-card__glyph" aria-hidden="true">${esc(t.glyph)}</span>` }; };
    root.innerHTML = `
      <div class="page-head"><h1 tabindex="-1">Блоки</h1><p class="muted">Учебные тренажёры. У каждого — задания, разборы и сохранённый прогресс.</p></div>
      <div class="bento">
        <a class="block-card block-card--hero${look(heroT).cls}" data-tone="${heroT.tone}" href="${r ? r.t.href + '/play' : heroT.href}">
          <span class="block-card__meta">${r ? 'Продолжить с места' : 'С чего начать'}</span>
          <span class="block-card__title">${esc(heroT.title)}</span>
          ${look(heroT).art}
          <span class="block-card__foot">${bar(heroS.value)}<span>${esc(heroS.text)}</span></span>
        </a>
        ${blocks.filter(t => t !== heroT).map(t => { const s = status(t); return `
        <a class="block-card${look(t).cls}" data-tone="${t.tone}" href="${t.href}">
          <span class="block-card__meta">${t.data.tasks.length} ${engine.taskWord(t.data.tasks.length)}</span>
          <span class="block-card__title">${esc(t.title)}</span>
          ${look(t).art}
          <span class="block-card__foot">${s.value ? bar(s.value) : ''}<span>${esc(s.text)}</span></span>
        </a>`; }).join('')}
        <a class="block-card block-card--night block-card--wide" href="#/arcade">
          <span class="block-card__meta">Игровой зал</span><span class="block-card__title">Python Arcade</span>
          <span class="block-card__glyph" aria-hidden="true">▶</span><span class="block-card__foot"><span>жетоны ${INF.arcade.summary().keys} из 8</span></span>
        </a>
        ${D.catalog.defenseOrder.map(id => { const d = D.defenses[id]; return `
        <a class="block-card block-card--wide block-card--thumb" data-tone="peach" href="#/defense/${id}">
          <span class="block-card__meta">Защита месяца</span><span class="block-card__title">${esc(d.name)}</span>
          <img class="block-card__thumb" src="${esc(INF.coverOf(d).square)}" alt="" width="160" height="160"><span class="block-card__foot"><span>тест по срезам и две задачи</span></span>
        </a>`; }).join('')}
      </div>`;
    document.title = 'Блоки — inf.family';
  }

  // ---------- Экран тренажёра: вкладки «Мой результат / О тренажёре / Что внутри» ----------
  function trainerPage(root, t) {
    const back = t.parent ? `<a class="back-link" href="#/defense/${t.parent.id}">${icon('arrow-left')}${esc(t.parent.name)}</a>` : `<a class="back-link" href="#/blocks">${icon('arrow-left')}Все блоки</a>`;
    const total = t.data.tasks.length;
    const quest = engine.isQuest(t.data);
    root.innerHTML = `${back}
      <div class="page-head trainer-head" data-tone="${t.tone}">
        <span class="trainer-head__glyph" aria-hidden="true">${esc(t.glyph)}</span>
        <div><h1 tabindex="-1">${esc(t.title)}</h1><p class="muted">${esc(t.data.subtitle)}</p></div>
      </div>
      <div class="folder" id="folder">
        <div class="folder__tabs" role="tablist" aria-label="${esc(t.title)}">
          <button class="folder__tab" role="tab" data-tone="${t.tone}" id="tab-result" aria-controls="panel-result" aria-selected="true">Мой результат</button>
          <button class="folder__tab" role="tab" data-tone="violet" id="tab-about" aria-controls="panel-about">О тренажёре</button>
          <button class="folder__tab" role="tab" data-tone="lilac" id="tab-inside" aria-controls="panel-inside">${quest ? 'Маршрут' : 'Что внутри'}</button>
        </div>
        <div class="folder__panel" data-tone="${t.tone}" id="panel-result" role="tabpanel" aria-labelledby="tab-result"></div>
        <div class="folder__panel" data-tone="violet" id="panel-about" role="tabpanel" aria-labelledby="tab-about" hidden>
          <h2 class="folder__title">${total} ${engine.taskWord(total)}</h2>
          <ul class="benefits" role="list">${(t.data.benefits || []).map(([h, p]) => `<li><b>${esc(h)}</b><span>${esc(p)}</span></li>`).join('')}</ul>
        </div>
        <div class="folder__panel" data-tone="lilac" id="panel-inside" role="tabpanel" aria-labelledby="tab-inside" hidden></div>
      </div>`;
    const inside = root.querySelector('#panel-inside');
    if (quest) {
      inside.innerHTML = `<h2 class="folder__title">6 раундов и финальный босс</h2><div class="route">${t.data.rounds.map(r => `
        <figure class="route__item${r.id === 'boss' ? ' is-boss' : ''}"><img src="${esc(INF.roundImage(r))}" alt="" width="200" height="200" loading="lazy">
        <figcaption><small>${r.id === 'boss' ? 'Задание 31' : `Раунд ${r.id} · задания ${(r.id - 1) * 5 + 1}–${r.id * 5}`}</small><b>${esc(r.name)}</b></figcaption></figure>`).join('')}</div>`;
    } else {
      const topics = [...new Set(t.data.tasks.map(x => x.topic))];
      inside.innerHTML = `<h2 class="folder__title">Темы</h2><div class="chips">${topics.map(x => `<span class="chip chip--ink">${esc(x)}</span>`).join('')}</div>`;
    }
    resultPanel(root.querySelector('#panel-result'), t);
    ui.tabs(root.querySelector('#folder'));
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
      html = `<h2 class="folder__title">${run.mode === 'mistakes' ? 'Повтор ошибок' : 'Попытка идёт'}</h2>
        <div class="stats">${stat('Решено', `${run.score} / ${run.order.length}`)}${stat('Сейчас', `задание ${run.index + 1}`)}${stat('Ошибок', run.mistakes.length)}${stat('Время', engine.fmtTime(run.elapsedMs))}</div>
        <div class="row-actions">
          <a class="btn btn--primary" href="${t.href}/play">${icon('play')}Продолжить с ${run.index + 1}-го</a>
          <button class="btn btn--secondary btn--ink" type="button" data-restart>${icon('rotate')}Начать заново</button>
          <button class="btn btn--danger" type="button" data-reset>${icon('trash')}Сбросить результаты</button>
        </div>`;
    } else {
      const has = e.best || e.last;
      html = `<h2 class="folder__title">${has ? 'Мои результаты' : 'Пока без попыток'}</h2>
        ${has ? `<div class="stats">${e.best ? stat('Лучший результат', `${e.best.score} / ${e.best.total}`) : ''}${e.last ? stat('Последняя попытка', `${e.last.score} / ${e.last.total}`) : ''}${e.last ? stat('Ошибок в ней', e.last.mistakes.length) : ''}${e.last ? stat('Время', engine.fmtTime(e.last.timeMs)) : ''}</div>`
        : `<p>Задания идут от простого к сложному. Если ошибёшься — появится подсказка, а после верного ответа — разбор по шагам.</p>`}
        <div class="row-actions">
          <button class="btn btn--primary btn--go" type="button" data-start>${has ? 'Пройти снова' : 'Начать'}<span class="btn__go">${icon('arrow-right')}</span></button>
          <button class="switch switch--ink" type="button" role="switch" aria-checked="false" data-shuffle><span class="switch__track"></span>${shuffleLabel}</button>
        </div>
        <div class="row-actions">
          ${e.last && e.last.mistakes.length ? `<button class="btn btn--secondary btn--ink" type="button" data-mistakes>${icon('rotate')}Повторить ошибки (${e.last.mistakes.length})</button>` : ''}
          ${e.last ? `<a class="btn btn--ghost btn--ink" href="${t.href}/result">Итоги последней попытки</a>` : ''}
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
          <span class="sticker" data-tone="${percent === 100 ? 'mint' : 'yellow'}" style="--tilt:-3deg">${l.mode === 'mistakes' ? 'Повтор ошибок завершён' : 'Попытка завершена'}</span>
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
    root.innerHTML = `<div class="page-head"><h1 tabindex="-1">Защиты</h1><p class="muted">Раз в месяц — защита: тест и задачи по пройденному. Здесь можно подготовиться заранее.</p></div>
      <div class="defense-list">${D.catalog.defenseOrder.map(id => { const d = D.defenses[id]; return `
        <a class="defense-card" href="#/defense/${id}">
          <img src="${esc(INF.coverOf(d).cover)}" alt="Обложка: ${esc(d.name)}" width="840" height="1050">
          <span class="defense-card__body"><span class="sticker" data-tone="peach" style="--tilt:-2deg">${esc(d.season)}</span><b>${esc(d.name)}</b><span class="muted">${d.modules.length} модуля: тест по срезам и две задачи</span></span>
        </a>`; }).join('')}</div>`;
    document.title = 'Защиты — inf.family';
  }

  function defensePage(root, d) {
    const mods = d.modules.map(m => {
      if (m.type === 'image') return `<a class="block-card" data-tone="peach" href="#/defense/${d.id}/${m.id}"><span class="block-card__meta">Задача-картинка</span><span class="block-card__title">${esc(m.name)}</span><span class="block-card__glyph" aria-hidden="true">${esc(m.icon)}</span><span class="block-card__foot"><span>${esc(m.tag)}</span></span></a>`;
      const t = INF.trainers.find(x => x.id === m.id);
      const s = status(t);
      return `<a class="block-card block-card--wide" data-tone="mint" href="${t.href}"><span class="block-card__meta">${m.tasks.length} ${engine.taskWord(m.tasks.length)}</span><span class="block-card__title">${esc(m.name)}</span><span class="block-card__glyph" aria-hidden="true">${esc(m.icon)}</span><span class="block-card__foot">${s.value ? `<div class="bar" style="--value:${s.value}%"><span></span></div>` : ''}<span>${esc(s.text)}</span></span></a>`;
    }).join('');
    root.innerHTML = `<a class="back-link" href="#/defenses">${icon('arrow-left')}Все защиты</a>
      <section class="defense-hero">
        <img class="defense-hero__cover" src="${esc(INF.coverOf(d).cover)}" alt="Обложка: ${esc(d.name)}" width="840" height="1050">
        <div class="stack" style="--flow:var(--s4)"><span class="sticker" data-tone="peach" style="--tilt:-3deg">${esc(d.season)}</span><h1 tabindex="-1">${esc(d.name)}</h1>
          <p class="muted">Защита — это проверка знаний за месяц: тест и задачи по пройденному. Здесь можно потренироваться заранее: тест проходится сколько угодно раз, а задачи открываются как условия-картинки.</p>
        </div>
      </section>
      <div class="section__head" style="margin-top:var(--s7)"><h2>Программа защиты</h2><p class="muted">Тест можно проходить сколько угодно раз. Задачи — это условия-картинки, решения покажет учитель.</p></div>
      <div class="bento bento--3">${mods}</div>`;
    document.title = `${d.name} — inf.family`;
  }

  function imageTask(root, d, m) {
    const solution = INF.teacher.on && m.solutionImage;
    root.innerHTML = `<a class="back-link" href="#/defense/${d.id}">${icon('arrow-left')}${esc(d.name)}</a>
      <div class="page-head"><span class="chip">${esc(m.tag)}</span><h1 tabindex="-1">${esc(m.name)}</h1></div>
      <figure class="image-task"><img src="${esc(INF.lightImage(m.image))}" alt="${esc(m.imageAlt || 'Условие: ' + m.name)}"><figcaption><a href="${esc(INF.lightImage(m.image))}" target="_blank" rel="noopener">Открыть условие в полном размере</a></figcaption></figure>
      ${solution ? `<div class="row-actions"><button class="btn btn--primary" type="button" data-solution aria-expanded="false" aria-controls="solution">${icon('lock')}Показать решение</button></div>
      <figure class="image-task" id="solution" hidden><figcaption class="image-task__label">Решение</figcaption><img src="${esc(INF.lightImage(m.solutionImage))}" alt="${esc(m.solutionAlt || 'Решение: ' + m.name)}"></figure>` : ''}`;
    const btn = root.querySelector('[data-solution]');
    btn && btn.addEventListener('click', () => {
      const fig = root.querySelector('#solution');
      fig.hidden = !fig.hidden;
      btn.setAttribute('aria-expanded', String(!fig.hidden));
      btn.innerHTML = `${icon('lock')}${fig.hidden ? 'Показать решение' : 'Скрыть решение'}`;
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
        <span class="progress-row__name"><b>${esc(t.title)}</b><small class="muted">${esc(t.parent ? t.parent.name : 'Блок')}</small></span>
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
      if (await ui.confirm({ title: 'Сбросить весь прогресс?', text: 'Удалятся результаты всех блоков, тестов и игры Python Arcade на этом устройстве. Отменить это нельзя.', confirm: 'Сбросить всё', danger: true })) {
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
