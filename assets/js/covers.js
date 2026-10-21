// Рисунки для обложек блоков: маленькая схема из темы блока (выбор пользователя 21.10.2026 —
// приглушённый цвет блока + цветной корешок). Цвета берутся из CSS: currentColor, --hi (выделение), --ln (линии).
(function () {
  const INF = (window.INF = window.INF || {});
  const svg = body => `<svg class="cover-art" viewBox="0 0 180 96" aria-hidden="true" focusable="false">${body}</svg>`;

  const ART = {
    python: () => svg(`
      <text x="0" y="16" font-size="11.5"><tspan opacity=".6">name</tspan> = "Аня"</text>
      <text x="0" y="36" font-size="11.5">print("Привет,", name)</text>
      <rect x="0" y="54" width="180" height="30" rx="8" fill="var(--hi)"/>
      <text x="10" y="74" font-size="11.5" font-weight="700">&gt; Привет, Аня</text>`),

    basics: () => svg([['a', '1', 'int', 8], ['s', '"1"', 'str', 98]].map(([n, v, t, x]) => `
      <text x="${x}" y="12" font-size="11" opacity=".7">${n}</text>
      <rect x="${x}" y="20" width="74" height="44" rx="10" fill="var(--hi)" stroke="var(--ln)"/>
      <text x="${x + 37}" y="48" font-size="17" font-weight="700" text-anchor="middle">${v}</text>
      <text x="${x}" y="84" font-size="10.5" opacity=".7">${t}</text>`).join('')),

    slices: () => svg([...'PYTHON'].map((ch, i) => `
      <rect x="${i * 30}" y="10" width="28" height="34" rx="6" fill="${i >= 1 && i < 4 ? 'var(--hi)' : 'none'}" stroke="var(--ln)"/>
      <text x="${i * 30 + 14}" y="33" font-size="15" font-weight="700" text-anchor="middle">${ch}</text>
      <text x="${i * 30 + 14}" y="58" font-size="10" text-anchor="middle" opacity=".6">${i}</text>`).join('') + `
      <path d="M30 68 v6 h88 v-6" fill="none" stroke="currentColor" stroke-width="1.2"/>
      <text x="74" y="90" font-size="11.5" font-weight="700" text-anchor="middle">s[1:4]</text>`),

    units: () => svg([...'01000001'].map((b, i) => `
      <rect x="${i * 22.5}" y="14" width="20" height="30" rx="5" fill="${b === '1' ? 'var(--hi)' : 'none'}" stroke="var(--ln)"/>
      <text x="${i * 22.5 + 10}" y="34" font-size="13" font-weight="700" text-anchor="middle">${b}</text>`).join('') + `
      <path d="M0 54 v6 h178 v-6" fill="none" stroke="currentColor" stroke-width="1.2"/>
      <text x="89" y="80" font-size="11.5" font-weight="700" text-anchor="middle">1 байт = 8 бит</text>`),

    // 6 раундов по 5 заданий + финальное 31-е
    infquest31: () => {
      let dots = '';
      for (let r = 0; r < 6; r++) for (let k = 0; k < 5; k++) {
        dots += `<circle cx="${8 + r * 25}" cy="${12 + k * 13}" r="3.6" fill="${r < 2 ? 'currentColor' : 'none'}" stroke="var(--ln)"/>`;
      }
      return svg(dots + `
        <circle cx="170" cy="40" r="9" fill="var(--hi)" stroke="var(--ln)"/>
        <text x="170" y="44" font-size="9.5" font-weight="700" text-anchor="middle">31</text>
        <text x="0" y="92" font-size="10.5" opacity=".7">6 раундов → финал</text>`);
    },
  };

  INF.coverArt = id => (ART[id] ? ART[id]() : '');
})();
