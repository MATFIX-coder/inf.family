// Прогресс ученика: хранится в браузере (localStorage), на этом устройстве.
// Если хранилище недоступно, всё работает до перезагрузки страницы.
//
// Формат: { version: 1, trainers: { [ключ тренажёра]: запись } }
// Ключ: 'block:python', 'module:defense-september-slices'.
// Запись: {
//   run:  текущая попытка или null — { mode, order[], index, score, streak, bestStreak,
//         attempts{}, mistakes[], solved[], startedAt, elapsedMs, checkpoint }
//   last: итог последней законченной попытки — { mode, score, total, mistakes[], bestStreak, timeMs, date }
//   best: лучший результат полной попытки — { score, total, timeMs, date }
//   history: последние 10 законченных попыток — [{ mode, score, total, timeMs, date }]
// }
(function () {
  const INF = (window.INF = window.INF || {});
  const KEY = 'inf-family-progress-v1';
  let persistent = true;
  let data = { version: 1, trainers: {} };

  function read() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return;
      const v = JSON.parse(raw);
      if (v && v.version === 1 && v.trainers && typeof v.trainers === 'object') data = v;
    } catch {
      persistent = false;
    }
  }
  function write() {
    try {
      localStorage.setItem(KEY, JSON.stringify(data));
    } catch {
      persistent = false;
    }
  }
  const clone = v => (v == null ? v : JSON.parse(JSON.stringify(v)));

  function entry(id) {
    return data.trainers[id] || { run: null, last: null, best: null, history: [] };
  }
  function update(id, fn) {
    const e = clone(entry(id));
    fn(e);
    data.trainers[id] = e;
    write();
    return e;
  }

  const store = {
    get persistent() { return persistent; },
    get: id => clone(entry(id)),
    all: () => clone(data.trainers),
    saveRun: (id, run) => update(id, e => { e.run = run; }),
    // Закрыть попытку: записать итог, историю и лучший результат
    finishRun(id, result) {
      return update(id, e => {
        e.run = null;
        e.last = result;
        e.history = [{ mode: result.mode, score: result.score, total: result.total, timeMs: result.timeMs, date: result.date }, ...(e.history || [])].slice(0, 10);
        if (result.mode !== 'mistakes') {
          const better = !e.best || result.score / result.total > e.best.score / e.best.total ||
            (result.score / result.total === e.best.score / e.best.total && result.timeMs < e.best.timeMs);
          if (better) e.best = { score: result.score, total: result.total, timeMs: result.timeMs, date: result.date };
        }
      });
    },
    reset(id) { delete data.trainers[id]; write(); },
    resetAll() { data = { version: 1, trainers: {} }; write(); },
  };

  read();
  INF.store = store;
})();
