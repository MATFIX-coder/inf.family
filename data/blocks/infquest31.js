// Перенесено из inf.family.html (baseline v1.4 от 07.10.2026) программой tools/extract_legacy.mjs.
// Проверка совпадения со старым сайтом: tools/verify_legacy.mjs.
window.INF_DATA = window.INF_DATA || { blocks: {}, defenses: {}, arcade: {} };

window.INF_DATA.blocks["infquest31"] = {
  "id": "infquest31",
  "name": "ИНФОКВЕСТ // 31",
  "icon": "31",
  "badge": "7 КЛАСС · ИНФОКВЕСТ",
  "cardDescription": "31 задание · 6 игровых раундов, разные механики и финальный босс.",
  "eyebrow": "inf.family · 7 класс",
  "title": "ИНФОКВЕСТ // 31",
  "subtitle": "31 задание. Шесть раундов, короткие победы между ними и один финальный босс.",
  "taskHeading": "",
  "taskInstruction": "",
  "benefits": [
    [
      "6 раундов по 5 заданий",
      "После каждого раунда — отдельный экран победы с текущим счётом и серией."
    ],
    [
      "1 финал · комплексная задача",
      "Задание 31 — финальный босс и всегда остаётся последним."
    ],
    [
      "Разные механики",
      "Выбор, matching, сортировка, распределение, нажатие на символ и ввод ответа."
    ]
  ],
  "tasks": [
    {
      "id": "infquest-01",
      "displayNumber": 1,
      "round": 1,
      "level": "РАУНД 1",
      "topic": "РАСТРОВАЯ / ВЕКТОРНАЯ ГРАФИКА",
      "heading": "Верно или неверно?",
      "code": "Векторное изображение состоит из отдельных пикселей, каждый из которых хранит свой цвет.",
      "instruction": "",
      "question": "",
      "hint": "",
      "explain": "",
      "ui": "choice",
      "options": [
        {
          "id": "true",
          "text": "ВЕРНО"
        },
        {
          "id": "false",
          "text": "НЕВЕРНО"
        }
      ],
      "correct": "false",
      "codeStyle": "prose"
    },
    {
      "id": "infquest-02",
      "displayNumber": 2,
      "round": 1,
      "level": "РАУНД 1",
      "topic": "PYTHON · СТРОКИ И ТИПЫ",
      "heading": "Определи вывод программы и тип результата.",
      "code": "a = '6'\nb = 4\nprint(a * b)",
      "instruction": "",
      "question": "",
      "hint": "",
      "explain": "",
      "items": [
        {
          "label": "Что появится на экране?",
          "answers": [
            "6666"
          ]
        },
        {
          "label": "Тип выражения a * b",
          "answers": [
            "str"
          ]
        }
      ]
    },
    {
      "id": "infquest-03",
      "displayNumber": 3,
      "round": 1,
      "level": "РАУНД 1",
      "topic": "ЕДИНИЦЫ ИНФОРМАЦИИ",
      "heading": "Переведи 384 байта в биты.",
      "code": "",
      "instruction": "В ответе запиши только число.",
      "question": "",
      "hint": "",
      "explain": "",
      "answers": [
        "3072"
      ]
    },
    {
      "id": "infquest-04",
      "displayNumber": 4,
      "round": 1,
      "level": "РАУНД 1",
      "topic": "ИНФОРМАЦИОННЫЙ ОБЪЁМ ИЗОБРАЖЕНИЯ",
      "heading": "Палитра содержит 32 цвета.",
      "code": "",
      "instruction": "Какова минимальная глубина цвета? Ответ дай в битах на пиксель.",
      "question": "",
      "hint": "",
      "explain": "",
      "answers": [
        "5"
      ]
    },
    {
      "id": "infquest-05",
      "displayNumber": 5,
      "round": 1,
      "level": "РАУНД 1",
      "topic": "РАСТРОВАЯ / ВЕКТОРНАЯ ГРАФИКА",
      "heading": "Распредели карточки по двум группам.",
      "code": "",
      "instruction": "Отнеси каждое свойство к растровой или векторной графике.",
      "question": "",
      "hint": "",
      "explain": "",
      "ui": "categorize",
      "correct": {
        "photo": "raster",
        "scale": "vector",
        "pixels": "raster",
        "logo": "vector"
      },
      "cards": [
        {
          "id": "photo",
          "text": "Фотография со смартфона"
        },
        {
          "id": "scale",
          "text": "Можно масштабировать без потери качества"
        },
        {
          "id": "pixels",
          "text": "При сильном увеличении становятся видны пиксели"
        },
        {
          "id": "logo",
          "text": "Логотип из геометрических фигур"
        }
      ],
      "groups": [
        {
          "id": "raster",
          "title": "РАСТР"
        },
        {
          "id": "vector",
          "title": "ВЕКТОР"
        }
      ]
    },
    {
      "id": "infquest-06",
      "displayNumber": 6,
      "round": 2,
      "level": "РАУНД 2",
      "topic": "СТЕПЕНИ ДВОЙКИ",
      "heading": "Соедини степень двойки с её значением.",
      "code": "",
      "instruction": "",
      "question": "",
      "hint": "",
      "explain": "",
      "ui": "matching",
      "correct": {
        "p5": "32",
        "p7": "128",
        "p10": "1024",
        "p12": "4096"
      },
      "left": [
        {
          "id": "p5",
          "text": "2⁵"
        },
        {
          "id": "p7",
          "text": "2⁷"
        },
        {
          "id": "p10",
          "text": "2¹⁰"
        },
        {
          "id": "p12",
          "text": "2¹²"
        }
      ],
      "right": [
        {
          "id": "1024",
          "text": "1024"
        },
        {
          "id": "32",
          "text": "32"
        },
        {
          "id": "4096",
          "text": "4096"
        },
        {
          "id": "128",
          "text": "128"
        }
      ]
    },
    {
      "id": "infquest-07",
      "displayNumber": 7,
      "round": 2,
      "level": "РАУНД 2",
      "topic": "PYTHON · ТИПЫ",
      "heading": "Что произойдёт при выполнении программы?",
      "code": "a = '12'\nb = 5\nprint(a + b)",
      "instruction": "",
      "question": "",
      "hint": "",
      "explain": "",
      "ui": "choice",
      "options": [
        {
          "id": "17",
          "text": "На экране появится 17"
        },
        {
          "id": "125",
          "text": "На экране появится 125"
        },
        {
          "id": "error",
          "text": "Возникнет ошибка"
        },
        {
          "id": "12_5",
          "text": "На экране появится 12 5"
        }
      ],
      "correct": "error"
    },
    {
      "id": "infquest-08",
      "displayNumber": 8,
      "round": 2,
      "level": "РАУНД 2",
      "topic": "ЕДИНИЦЫ ИНФОРМАЦИИ",
      "heading": "Расположи величины по возрастанию.",
      "code": "",
      "instruction": "Перетащи карточки в правильный порядок — от меньшей величины к большей.",
      "question": "",
      "hint": "",
      "explain": "",
      "ui": "ordering",
      "orderItems": [
        {
          "id": "mb",
          "text": "1 Мбайт"
        },
        {
          "id": "4b",
          "text": "4 бита"
        },
        {
          "id": "kb",
          "text": "1 Кбайт"
        },
        {
          "id": "2byte",
          "text": "2 байта"
        }
      ],
      "correctOrder": [
        "4b",
        "2byte",
        "kb",
        "mb"
      ]
    },
    {
      "id": "infquest-09",
      "displayNumber": 9,
      "round": 2,
      "level": "РАУНД 2",
      "topic": "РАСТРОВАЯ / ВЕКТОРНАЯ ГРАФИКА",
      "heading": "Выбери все верные утверждения о растровой графике.",
      "code": "",
      "instruction": "",
      "question": "",
      "hint": "",
      "explain": "",
      "ui": "multi_choice",
      "options": [
        {
          "id": "1",
          "text": "Изображение состоит из пикселей"
        },
        {
          "id": "2",
          "text": "Разрешение связано с количеством пикселей"
        },
        {
          "id": "3",
          "text": "Фотографии часто хранятся как растровые изображения"
        },
        {
          "id": "4",
          "text": "При любом масштабировании качество всегда сохраняется"
        },
        {
          "id": "5",
          "text": "Растровое изображение обязательно занимает меньше памяти, чем векторное"
        }
      ],
      "correct": [
        "1",
        "2",
        "3"
      ]
    },
    {
      "id": "infquest-10",
      "displayNumber": 10,
      "round": 2,
      "level": "РАУНД 2",
      "topic": "PYTHON · ОПЕРАТОРЫ",
      "heading": "Какой оператор нужно поставить вместо знака ?",
      "code": "print(29 ? 6)",
      "instruction": "Программа должна вывести число 4.",
      "question": "",
      "hint": "",
      "explain": "",
      "ui": "choice",
      "options": [
        {
          "id": "/",
          "text": "/"
        },
        {
          "id": "//",
          "text": "//"
        },
        {
          "id": "%",
          "text": "%"
        },
        {
          "id": "**",
          "text": "**"
        }
      ],
      "correct": "//"
    },
    {
      "id": "infquest-11",
      "displayNumber": 11,
      "round": 3,
      "level": "РАУНД 3",
      "topic": "ЕДИНИЦЫ ИНФОРМАЦИИ · НАЙДИ ОШИБКУ",
      "heading": "Отметь ВСЕ строки, в которых допущена ошибка.",
      "code": "",
      "instruction": "",
      "question": "",
      "hint": "",
      "explain": "",
      "ui": "multi_choice",
      "options": [
        {
          "id": "1",
          "text": "64 байта = 512 бит"
        },
        {
          "id": "2",
          "text": "2 Кбайта = 2048 байт"
        },
        {
          "id": "3",
          "text": "4096 бит = 4096 байт"
        },
        {
          "id": "4",
          "text": "3 Мбайта = 3072 Кбайт"
        },
        {
          "id": "5",
          "text": "1 Кбайт = 1024 бит"
        }
      ],
      "correct": [
        "3",
        "5"
      ]
    },
    {
      "id": "infquest-12",
      "displayNumber": 12,
      "round": 3,
      "level": "РАУНД 3",
      "topic": "ИНФОРМАЦИОННЫЙ ОБЪЁМ ИЗОБРАЖЕНИЯ",
      "heading": "На один пиксель отводится 7 бит.",
      "code": "",
      "instruction": "Сколько различных цветов можно закодировать?",
      "question": "",
      "hint": "",
      "explain": "",
      "answers": [
        "128"
      ]
    },
    {
      "id": "infquest-13",
      "displayNumber": 13,
      "round": 3,
      "level": "РАУНД 3",
      "topic": "PYTHON · ВОССТАНОВИ КОД",
      "heading": "Какой оператор нужно вставить, чтобы программа вывела 81?",
      "code": "print(3 ___ 4)",
      "instruction": "",
      "question": "",
      "hint": "",
      "explain": "",
      "ui": "choice",
      "options": [
        {
          "id": "*",
          "text": "*"
        },
        {
          "id": "**",
          "text": "**"
        },
        {
          "id": "//",
          "text": "//"
        },
        {
          "id": "%",
          "text": "%"
        }
      ],
      "correct": "**"
    },
    {
      "id": "infquest-14",
      "displayNumber": 14,
      "round": 3,
      "level": "РАУНД 3",
      "topic": "ЕДИНИЦЫ ИНФОРМАЦИИ · НАЙДИ ОШИБКУ",
      "heading": "Ученик переводит 4096 байт в Кбайты.",
      "code": "Он написал: 4096 · 1024 = 4 194 304 Кбайт. Где правильное исправление?",
      "instruction": "",
      "question": "",
      "hint": "",
      "explain": "",
      "ui": "choice",
      "options": [
        {
          "id": "a",
          "text": "Нужно 4096 : 1024 = 4 Кбайта"
        },
        {
          "id": "b",
          "text": "Нужно 4096 : 8 = 512 Кбайт"
        },
        {
          "id": "c",
          "text": "Нужно 4096 · 8 = 32768 Кбайт"
        },
        {
          "id": "d",
          "text": "Решение ученика правильное"
        }
      ],
      "correct": "a",
      "codeStyle": "prose"
    },
    {
      "id": "infquest-15",
      "displayNumber": 15,
      "round": 3,
      "level": "РАУНД 3",
      "topic": "РАСТРОВАЯ / ВЕКТОРНАЯ ГРАФИКА",
      "heading": "Какой термин здесь лишний?",
      "code": "",
      "instruction": "Выбери термин, который относится к другой модели представления изображения.",
      "question": "",
      "hint": "",
      "explain": "",
      "ui": "choice",
      "options": [
        {
          "id": "pixel",
          "text": "пиксель"
        },
        {
          "id": "palette",
          "text": "палитра"
        },
        {
          "id": "resolution",
          "text": "разрешение"
        },
        {
          "id": "primitive",
          "text": "геометрический примитив"
        }
      ],
      "correct": "primitive"
    },
    {
      "id": "infquest-16",
      "displayNumber": 16,
      "round": 4,
      "level": "РАУНД 4",
      "topic": "PYTHON · ПРЕОБРАЗОВАНИЕ ТИПОВ",
      "heading": "Что напечатает программа?",
      "code": "x = str(48)\ny = int('7')\nprint(x + str(y))",
      "instruction": "",
      "question": "",
      "hint": "",
      "explain": "",
      "answers": [
        "487"
      ]
    },
    {
      "id": "infquest-17",
      "displayNumber": 17,
      "round": 4,
      "level": "РАУНД 4",
      "topic": "СТЕПЕНИ ДВОЙКИ",
      "heading": "Восстанови показатели степени.",
      "code": "",
      "instruction": "",
      "question": "",
      "hint": "",
      "explain": "",
      "items": [
        {
          "label": "256 = 2^?",
          "answers": [
            "8"
          ]
        },
        {
          "label": "2048 = 2^?",
          "answers": [
            "11"
          ]
        }
      ]
    },
    {
      "id": "infquest-18",
      "displayNumber": 18,
      "round": 4,
      "level": "РАУНД 4",
      "topic": "ИНФОРМАЦИОННЫЙ ОБЪЁМ ИЗОБРАЖЕНИЯ",
      "heading": "Найди информационный объём изображения.",
      "code": "Изображение имеет размер 256 × 128 пикселей и использует палитру из 16 цветов. Ответ дай в Кбайтах.",
      "instruction": "",
      "question": "",
      "hint": "",
      "explain": "",
      "answers": [
        "16"
      ],
      "codeStyle": "prose"
    },
    {
      "id": "infquest-19",
      "displayNumber": 19,
      "round": 4,
      "level": "РАУНД 4",
      "topic": "PYTHON · ПОРЯДОК ВЫЧИСЛЕНИЙ",
      "heading": "Что напечатает программа?",
      "code": "a = 5\nb = 2\nprint(a ** b + 3)",
      "instruction": "",
      "question": "",
      "hint": "",
      "explain": "",
      "answers": [
        "28"
      ]
    },
    {
      "id": "infquest-20",
      "displayNumber": 20,
      "round": 4,
      "level": "РАУНД 4",
      "topic": "ЕДИНИЦЫ ИНФОРМАЦИИ · ИГРОВАЯ СИТУАЦИЯ",
      "heading": "Резервная копия мира Minecraft занимает 3 Мбайта.",
      "code": "",
      "instruction": "Сколько это Кбайт? В ответе запиши только число.",
      "question": "",
      "hint": "",
      "explain": "",
      "answers": [
        "3072"
      ]
    },
    {
      "id": "infquest-21",
      "displayNumber": 21,
      "round": 5,
      "level": "РАУНД 5",
      "topic": "PYTHON · ИНДЕКСЫ",
      "heading": "Нажми на символ строки с индексом -3.",
      "code": "s = 'ALGORITHM'",
      "instruction": "",
      "question": "",
      "hint": "",
      "explain": "",
      "ui": "symbol",
      "symbols": [
        "A",
        "L",
        "G",
        "O",
        "R",
        "I",
        "T",
        "H",
        "M"
      ],
      "correctSymbol": "T"
    },
    {
      "id": "infquest-22",
      "displayNumber": 22,
      "round": 5,
      "level": "РАУНД 5",
      "topic": "РАСТРОВАЯ / ВЕКТОРНАЯ ГРАФИКА",
      "heading": "Соедини термин и его смысл.",
      "code": "",
      "instruction": "",
      "question": "",
      "hint": "",
      "explain": "",
      "ui": "matching",
      "correct": {
        "pixel": "min",
        "resolution": "size",
        "palette": "colors",
        "vector": "primitive"
      },
      "left": [
        {
          "id": "pixel",
          "text": "Пиксель"
        },
        {
          "id": "resolution",
          "text": "Разрешение"
        },
        {
          "id": "palette",
          "text": "Палитра"
        },
        {
          "id": "vector",
          "text": "Векторный объект"
        }
      ],
      "right": [
        {
          "id": "colors",
          "text": "Набор используемых цветов"
        },
        {
          "id": "primitive",
          "text": "Геометрический примитив, описанный математически"
        },
        {
          "id": "min",
          "text": "Минимальный элемент растрового изображения"
        },
        {
          "id": "size",
          "text": "Размер изображения в пикселях"
        }
      ]
    },
    {
      "id": "infquest-23",
      "displayNumber": 23,
      "round": 5,
      "level": "РАУНД 5",
      "topic": "PYTHON · СРЕЗЫ",
      "heading": "Что получится в результате среза?",
      "code": "s = 'COMPUTER'\nprint(s[2:6])",
      "instruction": "",
      "question": "",
      "hint": "",
      "explain": "",
      "ui": "choice",
      "options": [
        {
          "id": "MPUT",
          "text": "MPUT"
        },
        {
          "id": "OMPU",
          "text": "OMPU"
        },
        {
          "id": "MPUTE",
          "text": "MPUTE"
        },
        {
          "id": "PUTE",
          "text": "PUTE"
        }
      ],
      "correct": "MPUT"
    },
    {
      "id": "infquest-24",
      "displayNumber": 24,
      "round": 5,
      "level": "РАУНД 5",
      "topic": "ЕДИНИЦЫ ИНФОРМАЦИИ",
      "heading": "Выбери ВСЕ записи, которые равны 1 Кбайту.",
      "code": "",
      "instruction": "",
      "question": "",
      "hint": "",
      "explain": "",
      "ui": "multi_choice",
      "options": [
        {
          "id": "1",
          "text": "1024 байта"
        },
        {
          "id": "2",
          "text": "8192 бит"
        },
        {
          "id": "3",
          "text": "8 Кбит"
        },
        {
          "id": "4",
          "text": "1000 байт"
        },
        {
          "id": "5",
          "text": "1024 бита"
        }
      ],
      "correct": [
        "1",
        "2",
        "3"
      ]
    },
    {
      "id": "infquest-25",
      "displayNumber": 25,
      "round": 5,
      "level": "РАУНД 5",
      "topic": "PYTHON · ДЕЛЕНИЕ",
      "heading": "Определи результат и его тип.",
      "code": "a = 9\nb = 4\nprint(a / b)",
      "instruction": "",
      "question": "",
      "hint": "",
      "explain": "",
      "items": [
        {
          "label": "Результат",
          "answers": [
            "2.25",
            "2,25"
          ]
        },
        {
          "label": "Тип данных",
          "answers": [
            "float"
          ]
        }
      ]
    },
    {
      "id": "infquest-26",
      "displayNumber": 26,
      "round": 6,
      "level": "РАУНД 6",
      "topic": "ФОРМУЛЫ РАСТРОВОЙ ГРАФИКИ",
      "heading": "Соедини обозначение с его смыслом.",
      "code": "",
      "instruction": "Перетащи каждую карточку с определением к нужной букве.",
      "question": "",
      "hint": "",
      "explain": "",
      "ui": "matching",
      "correct": {
        "I": "volume",
        "N": "colors",
        "i": "depth"
      },
      "left": [
        {
          "id": "I",
          "text": "I (I = K · i)"
        },
        {
          "id": "N",
          "text": "N (N = 2^i)"
        },
        {
          "id": "i",
          "text": "i (I = K · i; N = 2^i)"
        }
      ],
      "right": [
        {
          "id": "colors",
          "text": "Количество цветов в палитре"
        },
        {
          "id": "volume",
          "text": "Информационный объём изображения"
        },
        {
          "id": "depth",
          "text": "Глубина цвета — количество бит на один пиксель"
        }
      ]
    },
    {
      "id": "infquest-27",
      "displayNumber": 27,
      "round": 6,
      "level": "РАУНД 6",
      "topic": "ИНФОРМАЦИОННЫЙ ОБЪЁМ ИЗОБРАЖЕНИЯ",
      "heading": "Найди глубину цвета по известному объёму.",
      "code": "Растровое изображение размером 128 × 128 пикселей занимает 8 Кбайт. Сколько бит отводится на один пиксель?",
      "instruction": "",
      "question": "",
      "hint": "",
      "explain": "",
      "answers": [
        "4"
      ],
      "codeStyle": "prose"
    },
    {
      "id": "infquest-28",
      "displayNumber": 28,
      "round": 6,
      "level": "РАУНД 6",
      "topic": "ИНФОРМАЦИОННЫЙ ОБЪЁМ ИЗОБРАЖЕНИЯ",
      "heading": "Сравни информационный объём двух изображений.",
      "code": "Изображение A: 400 × 300 пикселей, глубина цвета 8 бит.\nИзображение B: 300 × 200 пикселей, глубина цвета 16 бит.",
      "instruction": "",
      "question": "",
      "hint": "",
      "explain": "",
      "ui": "choice",
      "options": [
        {
          "id": "a",
          "text": "A занимает больше"
        },
        {
          "id": "b",
          "text": "B занимает больше"
        },
        {
          "id": "equal",
          "text": "Объёмы одинаковы"
        },
        {
          "id": "unknown",
          "text": "Недостаточно данных"
        }
      ],
      "correct": "equal",
      "codeStyle": "prose"
    },
    {
      "id": "infquest-29",
      "displayNumber": 29,
      "round": 6,
      "level": "РАУНД 6",
      "topic": "ИНФОРМАЦИОННЫЙ ОБЪЁМ · MINECRAFT",
      "heading": "Мини-карта игрового мира сохранена как растровое изображение.",
      "code": "Размер мини-карты — 512 × 256 пикселей, палитра — 128 цветов. Найди информационный объём в Кбайтах.",
      "instruction": "",
      "question": "",
      "hint": "",
      "explain": "",
      "answers": [
        "112"
      ],
      "codeStyle": "prose"
    },
    {
      "id": "infquest-30",
      "displayNumber": 30,
      "round": 6,
      "level": "РАУНД 6",
      "topic": "АЛГОРИТМ РЕШЕНИЯ",
      "heading": "Расставь шаги решения задачи в правильном порядке.",
      "code": "Нужно найти информационный объём растрового изображения по его ширине, высоте и количеству цветов в палитре.",
      "instruction": "",
      "question": "",
      "hint": "",
      "explain": "",
      "ui": "ordering",
      "orderItems": [
        {
          "id": "kb",
          "text": "Перевести полученный объём из байтов в Кбайты"
        },
        {
          "id": "depth",
          "text": "Определить глубину цвета по количеству цветов"
        },
        {
          "id": "pixels",
          "text": "Найти количество пикселей изображения"
        },
        {
          "id": "bytes",
          "text": "Перевести объём из битов в байты"
        },
        {
          "id": "bits",
          "text": "Вычислить информационный объём изображения в битах"
        }
      ],
      "correctOrder": [
        "pixels",
        "depth",
        "bits",
        "bytes",
        "kb"
      ],
      "codeStyle": "prose",
      "correctOrders": [
        [
          "pixels",
          "depth",
          "bits",
          "bytes",
          "kb"
        ],
        [
          "depth",
          "pixels",
          "bits",
          "bytes",
          "kb"
        ]
      ]
    },
    {
      "id": "infquest-31",
      "displayNumber": 31,
      "round": "boss",
      "level": "ФИНАЛЬНЫЙ БОСС",
      "topic": "ФИНАЛЬНЫЙ БОСС · ЗАДАЧА ПО ТИПУ ЕГЭ №7",
      "heading": "Сколько Кбайт трафика экономится при передаче 100 изображений?",
      "code": "Ваня сделал 100 скриншотов построек в Minecraft. Каждый исходный скриншот имеет размер 1024 × 768 пикселей и палитру из 256 цветов. Перед отправкой мессенджер уменьшает изображение до 800 × 600 пикселей и использует глубину цвета 4 бита. Других способов сжатия нет. В ответе укажи целую часть полученного числа.",
      "instruction": "",
      "question": "",
      "hint": "",
      "explain": "",
      "answers": [
        "53362"
      ],
      "codeStyle": "prose"
    }
  ],
  "rounds": [
    {
      "id": 1,
      "kicker": "РАУНД 1 · Лёгкий старт",
      "name": "Разогрев",
      "description": "Задания 1–5. Короткие задания разных типов, чтобы быстро войти в ритм.",
      "after": "Разогрев закончен. Первые пять заданий позади.",
      "image": "assets/img/infquest/round-1.webp"
    },
    {
      "id": 2,
      "kicker": "РАУНД 2 · Держим темп",
      "name": "Базовые знания",
      "description": "Задания 6–10. Степени двойки, Python, единицы и графика — без длинных вычислений.",
      "after": "База держится. Двигаемся дальше.",
      "image": "assets/img/infquest/round-2.webp"
    },
    {
      "id": 3,
      "kicker": "РАУНД 3 · Проверка внимания",
      "name": "Не попадись",
      "description": "Задания 11–15. Здесь появляются ловушки и поиск ошибок в чужих решениях.",
      "after": "Ловушки пережиты. Раунд закрыт.",
      "image": "assets/img/infquest/round-3.webp"
    },
    {
      "id": 4,
      "kicker": "РАУНД 4 · Связываем знания",
      "name": "Уровень выше",
      "description": "Задания 16–20. Больше вычислений и несколько шагов в одной задаче.",
      "after": "Темп вырос — и ты его держишь.",
      "image": "assets/img/infquest/round-4.webp"
    },
    {
      "id": 5,
      "kicker": "РАУНД 5 · Работа без спешки",
      "name": "Точность",
      "description": "Задания 21–25. Индексы, срезы, термины и единицы: важна аккуратность.",
      "after": "Точность держится. Остался сложный участок.",
      "image": "assets/img/infquest/round-5.webp"
    },
    {
      "id": 6,
      "kicker": "РАУНД 6 · Собираем всё вместе",
      "name": "Финишная прямая",
      "description": "Задания 26–30. Формулы, объём изображения и алгоритм решения — почти финал.",
      "after": "Финишная прямая пройдена. Остался финальный босс.",
      "image": "assets/img/infquest/round-6.webp"
    },
    {
      "id": "boss",
      "kicker": "ФИНАЛЬНЫЙ БОСС",
      "name": "Последнее задание",
      "description": "Одна большая задача, в которой нужно самостоятельно собрать весь алгоритм.",
      "image": "assets/img/infquest/round-boss.webp"
    }
  ],
  "shuffleWithinRounds": true,
  "checkpoints": true,
  "gameMode": "infquest"
};
