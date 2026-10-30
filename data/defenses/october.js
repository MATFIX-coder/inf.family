// Октябрьская защита (30.10.2026) — новая, на старом сайте её не было.
// Картинки — из папки «Октябрьская защита» пользователя, переведены в WebP без потерь.
// Ответы проверены запуском решений: 7292, 159720, 213, 59.
window.INF_DATA = window.INF_DATA || { blocks: {}, defenses: {}, arcade: {} };

window.INF_DATA.defenses["defense-october"] = {
  "id": "defense-october",
  "name": "Октябрьская защита",
  "icon": "10",
  "badge": "ОКТЯБРЬ",
  "season": "Checkpoint_10",
  "cardDescription": "Четыре задачи октябрьской защиты: два больших автомата на Python и две задачи в формате ЕГЭ.",
  "poster": "assets/img/defenses/october-poster.webp",
  "eyebrow": "Защита месяца",
  "title": "ОКТЯБРЬСКАЯ ЗАЩИТА",
  "subtitle": "Checkpoint_10: четыре задачи-картинки, решения и ответы — у учителя.",
  "modules": [
    {
      "id": "defense-october-task-1",
      "parentDefenseId": "defense-october",
      "type": "image",
      "name": "Протокол ZERO",
      "icon": "01",
      "badge": "ЗАДАЧА 1",
      "tag": "Строковый автомат",
      "image": "assets/img/defenses/october-task-1.webp",
      "imageAlt": "Протокол ZERO: восстановление повреждённого кода. Цифровой автомат из 10 шагов для N = 72012080712040, найти ANSWER.",
      "solutionImage": "assets/img/defenses/october-task-1-solution.webp",
      "solutionAlt": "Решение задачи «Протокол ZERO»: код на Python по шагам с пометками для учителя.",
      "answer": "7292"
    },
    {
      "id": "defense-october-task-2",
      "parentDefenseId": "defense-october",
      "type": "image",
      "name": "Проект Хронос: код временной петли",
      "icon": "02",
      "badge": "ЗАДАЧА 2",
      "tag": "Перебор кодов",
      "image": "assets/img/defenses/october-task-2.webp",
      "imageAlt": "Проект Хронос: 6-символьные коды из алфавита АБВГ0123#$@ и 10 условий. Сколько кодов удовлетворяют хотя бы 6 условиям?",
      "solutionImage": "assets/img/defenses/october-task-2-solution.webp",
      "solutionAlt": "Решение задачи «Проект Хронос»: перебор через itertools.product и проверка 10 условий, результат 159720.",
      "answer": "159720"
    },
    {
      "id": "defense-october-task-3",
      "parentDefenseId": "defense-october",
      "type": "image",
      "name": "Кленовый шифр",
      "icon": "03",
      "badge": "ЗАДАЧА 3",
      "tag": "Как задание 5 ЕГЭ",
      "image": "assets/img/defenses/october-task-3.webp",
      "imageAlt": "Кленовый шифр портала: автомат строит число R по 23-ричной записи N. Сколько различных R из отрезка [500; 3000]?",
      "answer": "213",
      "answerNote": "Считаются разные значения R: одно и то же R может получиться из разных N."
    },
    {
      "id": "defense-october-task-4",
      "parentDefenseId": "defense-october",
      "type": "image",
      "name": "Лента листьев",
      "icon": "04",
      "badge": "ЗАДАЧА 4",
      "tag": "Как задание 12 ЕГЭ",
      "image": "assets/img/defenses/october-task-4.webp",
      "imageAlt": "Лента листьев: машина Тьюринга с состояниями q0–q5 обрабатывает двоичную запись 2^40 − 2^15 + 7. Найти сумму цифр десятичной записи результата.",
      "answer": "59",
      "answerNote": "После работы на ленте 1101101101101101101101101001001001001110₂ = 942 438 519 374, сумма цифр 59."
    }
  ]
};

// Последняя защита идёт первой: её показывает главная.
window.INF_DATA.catalog.defenseOrder.unshift("defense-october");
