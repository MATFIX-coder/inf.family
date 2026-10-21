// Отрисовка разбора задания из data/explanations/*.js.
// Поля: explain, steps, items[{steps}], strings{имя: строка}, remember, trap.
(function () {
  const INF = (window.INF = window.INF || {});

  function renderExplanation(entry, { tone = 'mint', exprs = [], title = 'Разбор' } = {}) {
    const { md, icon } = { md: INF.ui.md, icon: INF.icon };
    const box = document.createElement('section');
    box.className = 'explain';
    box.dataset.tone = tone;
    box.setAttribute('aria-label', title);
    box.innerHTML = `<div class="explain__head"><h3>${INF.ui.esc(title)}</h3>` +
      `<span class="sticker" data-tone="mint" style="--tilt:3deg">${icon('check')}Верно</span></div>` +
      `<p class="explain__main">${md(entry.explain)}</p>`;

    // Линейки индексов для строк карточки
    const strips = [];
    for (const [name, text] of Object.entries(entry.strings || {})) {
      const strip = INF.ui.indexStrip(text, name, tone);
      strips.push({ name, text, strip });
      box.appendChild(strip);
    }

    if (entry.steps && entry.steps.length) {
      const ol = document.createElement('ol');
      ol.className = 'steps';
      ol.innerHTML = entry.steps.map(s => `<li>${md(s)}</li>`).join('');
      box.appendChild(ol);
    }

    // Разбор каждого поля карточки; нажатие подсвечивает символы на линейке
    if (entry.items && entry.items.length) {
      const list = document.createElement('div');
      list.className = 'explain-items';
      entry.items.forEach((item, i) => {
        const expr = exprs[i];
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'explain-item';
        btn.setAttribute('aria-pressed', 'false');
        const last = item.steps[item.steps.length - 1];
        const result = last.includes('→') ? last.slice(last.lastIndexOf('→') + 1).trim() : '';
        btn.innerHTML = `<div class="explain-item__head"><span>${i + 1}.</span>${expr ? `<code class="ic">${INF.ui.esc(expr)}</code>` : ''}${result ? `<span>→ ${md(result)}</span>` : ''}</div>` +
          `<div class="explain-item__steps">${item.steps.map(s => `<div>${md(s)}</div>`).join('')}</div>`;
        btn.addEventListener('click', () => {
          const on = btn.getAttribute('aria-pressed') !== 'true';
          list.querySelectorAll('.explain-item').forEach(b => b.setAttribute('aria-pressed', 'false'));
          btn.setAttribute('aria-pressed', String(on));
          strips.forEach(({ name, text, strip }) => strip.mark(on && expr ? INF.ui.touchedIndices(expr, name, text) : []));
        });
        list.appendChild(btn);
      });
      box.appendChild(list);
    }

    if (entry.remember || entry.trap) {
      const notes = document.createElement('div');
      notes.className = 'notes';
      if (entry.remember) notes.insertAdjacentHTML('beforeend', `<div class="note note--remember"><b>Запомни</b>${md(entry.remember)}</div>`);
      if (entry.trap) notes.insertAdjacentHTML('beforeend', `<div class="note note--trap"><b>Частая ошибка</b>${md(entry.trap)}</div>`);
      box.appendChild(notes);
    }
    return box;
  }

  INF.renderExplanation = renderExplanation;
})();
