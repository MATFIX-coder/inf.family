// Иконки: линейные, 24×24, толщина 2. Встроены в код — работают без интернета.
// В HTML: <span data-icon="sun"></span> — заменяется на <svg> функцией INF.ui.hydrateIcons().
(function () {
  const P = {
    'arrow-up-right': '<path d="M7 17 17 7"/><path d="M8 7h9v9"/>',
    'arrow-right': '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
    'arrow-left': '<path d="M19 12H5"/><path d="m11 6-6 6 6 6"/>',
    'chevron-left': '<path d="m15 6-6 6 6 6"/>',
    'chevron-right': '<path d="m9 6 6 6-6 6"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    'check-circle': '<circle cx="12" cy="12" r="9"/><path d="m8 12.5 2.7 2.7L16.5 9.5"/>',
    'x-circle': '<circle cx="12" cy="12" r="9"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>',
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon: '<path d="M20.5 13.2A8.5 8.5 0 1 1 10.8 3.5a6.6 6.6 0 0 0 9.7 9.7Z"/>',
    trash: '<path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="m19 6-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/>',
    rotate: '<path d="M3 12a9 9 0 1 0 2.6-6.4L3 8"/><path d="M3 3v5h5"/>',
    bulb: '<path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.3h6c0-1 .4-1.8 1-2.3A7 7 0 0 0 12 2Z"/>',
    lock: '<rect x="5" y="11" width="14" height="10" rx="2.5"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    home: '<path d="m3 11 9-8 9 8"/><path d="M5 10v10h5v-6h4v6h5V10"/>',
    grid: '<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',
    shield: '<path d="M12 3 20 6v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6Z"/><path d="m9 12 2 2 4-4"/>',
    gamepad: '<path d="M7 6h10a5 5 0 0 1 4.9 6l-.9 4.3a2.8 2.8 0 0 1-5 1.1L14.4 15H9.6L8 17.4a2.8 2.8 0 0 1-5-1.1L2.1 12A5 5 0 0 1 7 6Z"/><path d="M8 9v4M6 11h4"/><path d="M15.5 10.5h.01M18 12.5h.01"/>',
    chart: '<path d="M4 20V11"/><path d="M10 20V5"/><path d="M16 20v-7"/><path d="M3 20h18"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    play: '<path d="M7 4.5v15l12-7.5Z"/>',
    copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15H4.5A1.5 1.5 0 0 1 3 13.5v-9A1.5 1.5 0 0 1 4.5 3h9A1.5 1.5 0 0 1 15 4.5V5"/>',
    sparkle: '<path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8Z"/>',
    flame: '<path d="M12 22a7 7 0 0 0 7-7c0-4-3-6-4-9-1.5 2-2 3.5-2 5-1-1-2-2.5-2-4-3 2.5-6 5.5-6 8a7 7 0 0 0 7 7Z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  };
  function icon(name, cls) {
    const body = P[name];
    if (!body) return '';
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"${cls ? ` class="${cls}"` : ''}>${body}</svg>`;
  }
  window.INF = window.INF || {};
  window.INF.icon = icon;
})();
