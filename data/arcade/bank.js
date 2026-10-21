// Перенесено из inf.family.html (baseline v1.4 от 07.10.2026) программой tools/extract_legacy.mjs.
// Проверка совпадения со старым сайтом: tools/verify_legacy.mjs.
window.INF_DATA = window.INF_DATA || { blocks: {}, defenses: {}, arcade: {} };

window.INF_DATA.arcade.bank = {
  "tasks": [
    {
      "id": "a001",
      "topic": "indices",
      "code": "s = 'PYTHON'\nprint(s[0])",
      "correctAnswer": "P",
      "difficulty": 1,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "Отрицательные индексы отсчитываются с конца: последний символ имеет индекс -1.",
      "source": "PYTHON",
      "index": 0
    },
    {
      "id": "a002",
      "topic": "indices",
      "code": "s = 'PYTHON'\nprint(s[2])",
      "correctAnswer": "T",
      "difficulty": 1,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "Отрицательные индексы отсчитываются с конца: последний символ имеет индекс -1.",
      "source": "PYTHON",
      "index": 2
    },
    {
      "id": "a003",
      "topic": "indices",
      "code": "s = 'PYTHON'\nprint(s[-1])",
      "correctAnswer": "N",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "Отрицательные индексы отсчитываются с конца: последний символ имеет индекс -1.",
      "source": "PYTHON",
      "index": -1
    },
    {
      "id": "a004",
      "topic": "indices",
      "code": "s = 'PYTHON'\nprint(s[-3])",
      "correctAnswer": "H",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "Отрицательные индексы отсчитываются с конца: последний символ имеет индекс -1.",
      "source": "PYTHON",
      "index": -3
    },
    {
      "id": "a005",
      "topic": "slices",
      "code": "s = 'PYTHON'\nprint(s[1:5:1])",
      "correctAnswer": "YTHO",
      "difficulty": 1,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "stop не входит в срез; знак step задаёт направление. Пустая граница использует значение по умолчанию.",
      "source": "PYTHON",
      "params": [
        1,
        5,
        1
      ],
      "target": "YTHO"
    },
    {
      "id": "a006",
      "topic": "slices",
      "code": "s = 'PYTHON'\nprint(s[0::2])",
      "correctAnswer": "PTO",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "stop не входит в срез; знак step задаёт направление. Пустая граница использует значение по умолчанию.",
      "source": "PYTHON",
      "params": [
        0,
        null,
        2
      ],
      "target": "PTO"
    },
    {
      "id": "a007",
      "topic": "slices",
      "code": "s = 'PYTHON'\nprint(s[::-1])",
      "correctAnswer": "NOHTYP",
      "difficulty": 3,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "stop не входит в срез; знак step задаёт направление. Пустая граница использует значение по умолчанию.",
      "source": "PYTHON",
      "params": [
        null,
        null,
        -1
      ],
      "target": "NOHTYP"
    },
    {
      "id": "a008",
      "topic": "slices",
      "code": "s = 'PYTHON'\nprint(s[-2:0:-2])",
      "correctAnswer": "OT",
      "difficulty": 3,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "stop не входит в срез; знак step задаёт направление. Пустая граница использует значение по умолчанию.",
      "source": "PYTHON",
      "params": [
        -2,
        0,
        -2
      ],
      "target": "OT"
    },
    {
      "id": "a009",
      "topic": "slices",
      "code": "s = 'PYTHON'\nprint(s[0::3])",
      "correctAnswer": "PH",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "stop не входит в срез; знак step задаёт направление. Пустая граница использует значение по умолчанию.",
      "source": "PYTHON",
      "params": [
        0,
        null,
        3
      ],
      "target": "PH"
    },
    {
      "id": "a010",
      "topic": "slices",
      "code": "s = 'PYTHON'\nprint(s[5:1:-1])",
      "correctAnswer": "NOHT",
      "difficulty": 3,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "stop не входит в срез; знак step задаёт направление. Пустая граница использует значение по умолчанию.",
      "source": "PYTHON",
      "params": [
        5,
        1,
        -1
      ],
      "target": "NOHT"
    },
    {
      "id": "a011",
      "topic": "indices",
      "code": "s = 'ALGORITHM'\nprint(s[0])",
      "correctAnswer": "A",
      "difficulty": 1,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "Отрицательные индексы отсчитываются с конца: последний символ имеет индекс -1.",
      "source": "ALGORITHM",
      "index": 0
    },
    {
      "id": "a012",
      "topic": "indices",
      "code": "s = 'ALGORITHM'\nprint(s[2])",
      "correctAnswer": "G",
      "difficulty": 1,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "Отрицательные индексы отсчитываются с конца: последний символ имеет индекс -1.",
      "source": "ALGORITHM",
      "index": 2
    },
    {
      "id": "a013",
      "topic": "indices",
      "code": "s = 'ALGORITHM'\nprint(s[-1])",
      "correctAnswer": "M",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "Отрицательные индексы отсчитываются с конца: последний символ имеет индекс -1.",
      "source": "ALGORITHM",
      "index": -1
    },
    {
      "id": "a014",
      "topic": "indices",
      "code": "s = 'ALGORITHM'\nprint(s[-3])",
      "correctAnswer": "T",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "Отрицательные индексы отсчитываются с конца: последний символ имеет индекс -1.",
      "source": "ALGORITHM",
      "index": -3
    },
    {
      "id": "a015",
      "topic": "slices",
      "code": "s = 'ALGORITHM'\nprint(s[1:5:1])",
      "correctAnswer": "LGOR",
      "difficulty": 1,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "stop не входит в срез; знак step задаёт направление. Пустая граница использует значение по умолчанию.",
      "source": "ALGORITHM",
      "params": [
        1,
        5,
        1
      ],
      "target": "LGOR"
    },
    {
      "id": "a016",
      "topic": "slices",
      "code": "s = 'ALGORITHM'\nprint(s[0::2])",
      "correctAnswer": "AGRTM",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "stop не входит в срез; знак step задаёт направление. Пустая граница использует значение по умолчанию.",
      "source": "ALGORITHM",
      "params": [
        0,
        null,
        2
      ],
      "target": "AGRTM"
    },
    {
      "id": "a017",
      "topic": "slices",
      "code": "s = 'ALGORITHM'\nprint(s[::-1])",
      "correctAnswer": "MHTIROGLA",
      "difficulty": 3,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "stop не входит в срез; знак step задаёт направление. Пустая граница использует значение по умолчанию.",
      "source": "ALGORITHM",
      "params": [
        null,
        null,
        -1
      ],
      "target": "MHTIROGLA"
    },
    {
      "id": "a018",
      "topic": "slices",
      "code": "s = 'ALGORITHM'\nprint(s[-2:0:-2])",
      "correctAnswer": "HIOL",
      "difficulty": 3,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "stop не входит в срез; знак step задаёт направление. Пустая граница использует значение по умолчанию.",
      "source": "ALGORITHM",
      "params": [
        -2,
        0,
        -2
      ],
      "target": "HIOL"
    },
    {
      "id": "a019",
      "topic": "slices",
      "code": "s = 'ALGORITHM'\nprint(s[0::3])",
      "correctAnswer": "AOT",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "stop не входит в срез; знак step задаёт направление. Пустая граница использует значение по умолчанию.",
      "source": "ALGORITHM",
      "params": [
        0,
        null,
        3
      ],
      "target": "AOT"
    },
    {
      "id": "a020",
      "topic": "slices",
      "code": "s = 'ALGORITHM'\nprint(s[5:1:-1])",
      "correctAnswer": "IROG",
      "difficulty": 3,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "stop не входит в срез; знак step задаёт направление. Пустая граница использует значение по умолчанию.",
      "source": "ALGORITHM",
      "params": [
        5,
        1,
        -1
      ],
      "target": "IROG"
    },
    {
      "id": "a021",
      "topic": "indices",
      "code": "s = 'ROBOTICS'\nprint(s[0])",
      "correctAnswer": "R",
      "difficulty": 1,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "Отрицательные индексы отсчитываются с конца: последний символ имеет индекс -1.",
      "source": "ROBOTICS",
      "index": 0
    },
    {
      "id": "a022",
      "topic": "indices",
      "code": "s = 'ROBOTICS'\nprint(s[2])",
      "correctAnswer": "B",
      "difficulty": 1,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "Отрицательные индексы отсчитываются с конца: последний символ имеет индекс -1.",
      "source": "ROBOTICS",
      "index": 2
    },
    {
      "id": "a023",
      "topic": "indices",
      "code": "s = 'ROBOTICS'\nprint(s[-1])",
      "correctAnswer": "S",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "Отрицательные индексы отсчитываются с конца: последний символ имеет индекс -1.",
      "source": "ROBOTICS",
      "index": -1
    },
    {
      "id": "a024",
      "topic": "indices",
      "code": "s = 'ROBOTICS'\nprint(s[-3])",
      "correctAnswer": "I",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "Отрицательные индексы отсчитываются с конца: последний символ имеет индекс -1.",
      "source": "ROBOTICS",
      "index": -3
    },
    {
      "id": "a025",
      "topic": "slices",
      "code": "s = 'ROBOTICS'\nprint(s[1:5:1])",
      "correctAnswer": "OBOT",
      "difficulty": 1,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "stop не входит в срез; знак step задаёт направление. Пустая граница использует значение по умолчанию.",
      "source": "ROBOTICS",
      "params": [
        1,
        5,
        1
      ],
      "target": "OBOT"
    },
    {
      "id": "a026",
      "topic": "slices",
      "code": "s = 'ROBOTICS'\nprint(s[0::2])",
      "correctAnswer": "RBTC",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "stop не входит в срез; знак step задаёт направление. Пустая граница использует значение по умолчанию.",
      "source": "ROBOTICS",
      "params": [
        0,
        null,
        2
      ],
      "target": "RBTC"
    },
    {
      "id": "a027",
      "topic": "slices",
      "code": "s = 'ROBOTICS'\nprint(s[::-1])",
      "correctAnswer": "SCITOBOR",
      "difficulty": 3,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "stop не входит в срез; знак step задаёт направление. Пустая граница использует значение по умолчанию.",
      "source": "ROBOTICS",
      "params": [
        null,
        null,
        -1
      ],
      "target": "SCITOBOR"
    },
    {
      "id": "a028",
      "topic": "slices",
      "code": "s = 'ROBOTICS'\nprint(s[-2:0:-2])",
      "correctAnswer": "CTB",
      "difficulty": 3,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "stop не входит в срез; знак step задаёт направление. Пустая граница использует значение по умолчанию.",
      "source": "ROBOTICS",
      "params": [
        -2,
        0,
        -2
      ],
      "target": "CTB"
    },
    {
      "id": "a029",
      "topic": "slices",
      "code": "s = 'ROBOTICS'\nprint(s[0::3])",
      "correctAnswer": "ROC",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "stop не входит в срез; знак step задаёт направление. Пустая граница использует значение по умолчанию.",
      "source": "ROBOTICS",
      "params": [
        0,
        null,
        3
      ],
      "target": "ROC"
    },
    {
      "id": "a030",
      "topic": "slices",
      "code": "s = 'ROBOTICS'\nprint(s[5:1:-1])",
      "correctAnswer": "ITOB",
      "difficulty": 3,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "stop не входит в срез; знак step задаёт направление. Пустая граница использует значение по умолчанию.",
      "source": "ROBOTICS",
      "params": [
        5,
        1,
        -1
      ],
      "target": "ITOB"
    },
    {
      "id": "a031",
      "topic": "indices",
      "code": "s = 'COMPUTER'\nprint(s[0])",
      "correctAnswer": "C",
      "difficulty": 1,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "Отрицательные индексы отсчитываются с конца: последний символ имеет индекс -1.",
      "source": "COMPUTER",
      "index": 0
    },
    {
      "id": "a032",
      "topic": "indices",
      "code": "s = 'COMPUTER'\nprint(s[2])",
      "correctAnswer": "M",
      "difficulty": 1,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "Отрицательные индексы отсчитываются с конца: последний символ имеет индекс -1.",
      "source": "COMPUTER",
      "index": 2
    },
    {
      "id": "a033",
      "topic": "indices",
      "code": "s = 'COMPUTER'\nprint(s[-1])",
      "correctAnswer": "R",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "Отрицательные индексы отсчитываются с конца: последний символ имеет индекс -1.",
      "source": "COMPUTER",
      "index": -1
    },
    {
      "id": "a034",
      "topic": "indices",
      "code": "s = 'COMPUTER'\nprint(s[-3])",
      "correctAnswer": "T",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "Отрицательные индексы отсчитываются с конца: последний символ имеет индекс -1.",
      "source": "COMPUTER",
      "index": -3
    },
    {
      "id": "a035",
      "topic": "slices",
      "code": "s = 'COMPUTER'\nprint(s[1:5:1])",
      "correctAnswer": "OMPU",
      "difficulty": 1,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "stop не входит в срез; знак step задаёт направление. Пустая граница использует значение по умолчанию.",
      "source": "COMPUTER",
      "params": [
        1,
        5,
        1
      ],
      "target": "OMPU"
    },
    {
      "id": "a036",
      "topic": "slices",
      "code": "s = 'COMPUTER'\nprint(s[0::2])",
      "correctAnswer": "CMUE",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "stop не входит в срез; знак step задаёт направление. Пустая граница использует значение по умолчанию.",
      "source": "COMPUTER",
      "params": [
        0,
        null,
        2
      ],
      "target": "CMUE"
    },
    {
      "id": "a037",
      "topic": "slices",
      "code": "s = 'COMPUTER'\nprint(s[::-1])",
      "correctAnswer": "RETUPMOC",
      "difficulty": 3,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "stop не входит в срез; знак step задаёт направление. Пустая граница использует значение по умолчанию.",
      "source": "COMPUTER",
      "params": [
        null,
        null,
        -1
      ],
      "target": "RETUPMOC"
    },
    {
      "id": "a038",
      "topic": "slices",
      "code": "s = 'COMPUTER'\nprint(s[-2:0:-2])",
      "correctAnswer": "EUM",
      "difficulty": 3,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "stop не входит в срез; знак step задаёт направление. Пустая граница использует значение по умолчанию.",
      "source": "COMPUTER",
      "params": [
        -2,
        0,
        -2
      ],
      "target": "EUM"
    },
    {
      "id": "a039",
      "topic": "slices",
      "code": "s = 'COMPUTER'\nprint(s[0::3])",
      "correctAnswer": "CPE",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "stop не входит в срез; знак step задаёт направление. Пустая граница использует значение по умолчанию.",
      "source": "COMPUTER",
      "params": [
        0,
        null,
        3
      ],
      "target": "CPE"
    },
    {
      "id": "a040",
      "topic": "slices",
      "code": "s = 'COMPUTER'\nprint(s[5:1:-1])",
      "correctAnswer": "TUPM",
      "difficulty": 3,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "stop не входит в срез; знак step задаёт направление. Пустая граница использует значение по умолчанию.",
      "source": "COMPUTER",
      "params": [
        5,
        1,
        -1
      ],
      "target": "TUPM"
    },
    {
      "id": "a041",
      "topic": "indices",
      "code": "s = 'NEONCODE'\nprint(s[0])",
      "correctAnswer": "N",
      "difficulty": 1,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "Отрицательные индексы отсчитываются с конца: последний символ имеет индекс -1.",
      "source": "NEONCODE",
      "index": 0
    },
    {
      "id": "a042",
      "topic": "indices",
      "code": "s = 'NEONCODE'\nprint(s[2])",
      "correctAnswer": "O",
      "difficulty": 1,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "Отрицательные индексы отсчитываются с конца: последний символ имеет индекс -1.",
      "source": "NEONCODE",
      "index": 2
    },
    {
      "id": "a043",
      "topic": "indices",
      "code": "s = 'NEONCODE'\nprint(s[-1])",
      "correctAnswer": "E",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "Отрицательные индексы отсчитываются с конца: последний символ имеет индекс -1.",
      "source": "NEONCODE",
      "index": -1
    },
    {
      "id": "a044",
      "topic": "indices",
      "code": "s = 'NEONCODE'\nprint(s[-3])",
      "correctAnswer": "O",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "Отрицательные индексы отсчитываются с конца: последний символ имеет индекс -1.",
      "source": "NEONCODE",
      "index": -3
    },
    {
      "id": "a045",
      "topic": "slices",
      "code": "s = 'NEONCODE'\nprint(s[1:5:1])",
      "correctAnswer": "EONC",
      "difficulty": 1,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "stop не входит в срез; знак step задаёт направление. Пустая граница использует значение по умолчанию.",
      "source": "NEONCODE",
      "params": [
        1,
        5,
        1
      ],
      "target": "EONC"
    },
    {
      "id": "a046",
      "topic": "slices",
      "code": "s = 'NEONCODE'\nprint(s[0::2])",
      "correctAnswer": "NOCD",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "stop не входит в срез; знак step задаёт направление. Пустая граница использует значение по умолчанию.",
      "source": "NEONCODE",
      "params": [
        0,
        null,
        2
      ],
      "target": "NOCD"
    },
    {
      "id": "a047",
      "topic": "slices",
      "code": "s = 'NEONCODE'\nprint(s[::-1])",
      "correctAnswer": "EDOCNOEN",
      "difficulty": 3,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "stop не входит в срез; знак step задаёт направление. Пустая граница использует значение по умолчанию.",
      "source": "NEONCODE",
      "params": [
        null,
        null,
        -1
      ],
      "target": "EDOCNOEN"
    },
    {
      "id": "a048",
      "topic": "slices",
      "code": "s = 'NEONCODE'\nprint(s[-2:0:-2])",
      "correctAnswer": "DCO",
      "difficulty": 3,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "stop не входит в срез; знак step задаёт направление. Пустая граница использует значение по умолчанию.",
      "source": "NEONCODE",
      "params": [
        -2,
        0,
        -2
      ],
      "target": "DCO"
    },
    {
      "id": "a049",
      "topic": "slices",
      "code": "s = 'NEONCODE'\nprint(s[0::3])",
      "correctAnswer": "NND",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "stop не входит в срез; знак step задаёт направление. Пустая граница использует значение по умолчанию.",
      "source": "NEONCODE",
      "params": [
        0,
        null,
        3
      ],
      "target": "NND"
    },
    {
      "id": "a050",
      "topic": "slices",
      "code": "s = 'NEONCODE'\nprint(s[5:1:-1])",
      "correctAnswer": "OCNO",
      "difficulty": 3,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "stop не входит в срез; знак step задаёт направление. Пустая граница использует значение по умолчанию.",
      "source": "NEONCODE",
      "params": [
        5,
        1,
        -1
      ],
      "target": "OCNO"
    },
    {
      "id": "a051",
      "topic": "indices",
      "code": "s = 'PIXELART'\nprint(s[0])",
      "correctAnswer": "P",
      "difficulty": 1,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "Отрицательные индексы отсчитываются с конца: последний символ имеет индекс -1.",
      "source": "PIXELART",
      "index": 0
    },
    {
      "id": "a052",
      "topic": "indices",
      "code": "s = 'PIXELART'\nprint(s[2])",
      "correctAnswer": "X",
      "difficulty": 1,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "Отрицательные индексы отсчитываются с конца: последний символ имеет индекс -1.",
      "source": "PIXELART",
      "index": 2
    },
    {
      "id": "a053",
      "topic": "indices",
      "code": "s = 'PIXELART'\nprint(s[-1])",
      "correctAnswer": "T",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "Отрицательные индексы отсчитываются с конца: последний символ имеет индекс -1.",
      "source": "PIXELART",
      "index": -1
    },
    {
      "id": "a054",
      "topic": "indices",
      "code": "s = 'PIXELART'\nprint(s[-3])",
      "correctAnswer": "A",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "Отрицательные индексы отсчитываются с конца: последний символ имеет индекс -1.",
      "source": "PIXELART",
      "index": -3
    },
    {
      "id": "a055",
      "topic": "slices",
      "code": "s = 'PIXELART'\nprint(s[1:5:1])",
      "correctAnswer": "IXEL",
      "difficulty": 1,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "stop не входит в срез; знак step задаёт направление. Пустая граница использует значение по умолчанию.",
      "source": "PIXELART",
      "params": [
        1,
        5,
        1
      ],
      "target": "IXEL"
    },
    {
      "id": "a056",
      "topic": "slices",
      "code": "s = 'PIXELART'\nprint(s[0::2])",
      "correctAnswer": "PXLR",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "stop не входит в срез; знак step задаёт направление. Пустая граница использует значение по умолчанию.",
      "source": "PIXELART",
      "params": [
        0,
        null,
        2
      ],
      "target": "PXLR"
    },
    {
      "id": "a057",
      "topic": "slices",
      "code": "s = 'PIXELART'\nprint(s[::-1])",
      "correctAnswer": "TRALEXIP",
      "difficulty": 3,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "stop не входит в срез; знак step задаёт направление. Пустая граница использует значение по умолчанию.",
      "source": "PIXELART",
      "params": [
        null,
        null,
        -1
      ],
      "target": "TRALEXIP"
    },
    {
      "id": "a058",
      "topic": "slices",
      "code": "s = 'PIXELART'\nprint(s[-2:0:-2])",
      "correctAnswer": "RLX",
      "difficulty": 3,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "stop не входит в срез; знак step задаёт направление. Пустая граница использует значение по умолчанию.",
      "source": "PIXELART",
      "params": [
        -2,
        0,
        -2
      ],
      "target": "RLX"
    },
    {
      "id": "a059",
      "topic": "slices",
      "code": "s = 'PIXELART'\nprint(s[0::3])",
      "correctAnswer": "PER",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "stop не входит в срез; знак step задаёт направление. Пустая граница использует значение по умолчанию.",
      "source": "PIXELART",
      "params": [
        0,
        null,
        3
      ],
      "target": "PER"
    },
    {
      "id": "a060",
      "topic": "slices",
      "code": "s = 'PIXELART'\nprint(s[5:1:-1])",
      "correctAnswer": "ALEX",
      "difficulty": 3,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "stop не входит в срез; знак step задаёт направление. Пустая граница использует значение по умолчанию.",
      "source": "PIXELART",
      "params": [
        5,
        1,
        -1
      ],
      "target": "ALEX"
    },
    {
      "id": "a061",
      "topic": "indices",
      "code": "s = 'banana42'\nprint(s[0])",
      "correctAnswer": "b",
      "difficulty": 1,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "Отрицательные индексы отсчитываются с конца: последний символ имеет индекс -1.",
      "source": "banana42",
      "index": 0
    },
    {
      "id": "a062",
      "topic": "indices",
      "code": "s = 'banana42'\nprint(s[2])",
      "correctAnswer": "n",
      "difficulty": 1,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "Отрицательные индексы отсчитываются с конца: последний символ имеет индекс -1.",
      "source": "banana42",
      "index": 2
    },
    {
      "id": "a063",
      "topic": "indices",
      "code": "s = 'banana42'\nprint(s[-1])",
      "correctAnswer": "2",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "Отрицательные индексы отсчитываются с конца: последний символ имеет индекс -1.",
      "source": "banana42",
      "index": -1
    },
    {
      "id": "a064",
      "topic": "indices",
      "code": "s = 'banana42'\nprint(s[-3])",
      "correctAnswer": "a",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "Отрицательные индексы отсчитываются с конца: последний символ имеет индекс -1.",
      "source": "banana42",
      "index": -3
    },
    {
      "id": "a065",
      "topic": "slices",
      "code": "s = 'banana42'\nprint(s[1:5:1])",
      "correctAnswer": "anan",
      "difficulty": 1,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "stop не входит в срез; знак step задаёт направление. Пустая граница использует значение по умолчанию.",
      "source": "banana42",
      "params": [
        1,
        5,
        1
      ],
      "target": "anan"
    },
    {
      "id": "a066",
      "topic": "slices",
      "code": "s = 'banana42'\nprint(s[0::2])",
      "correctAnswer": "bnn4",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "stop не входит в срез; знак step задаёт направление. Пустая граница использует значение по умолчанию.",
      "source": "banana42",
      "params": [
        0,
        null,
        2
      ],
      "target": "bnn4"
    },
    {
      "id": "a067",
      "topic": "slices",
      "code": "s = 'banana42'\nprint(s[::-1])",
      "correctAnswer": "24ananab",
      "difficulty": 3,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "stop не входит в срез; знак step задаёт направление. Пустая граница использует значение по умолчанию.",
      "source": "banana42",
      "params": [
        null,
        null,
        -1
      ],
      "target": "24ananab"
    },
    {
      "id": "a068",
      "topic": "slices",
      "code": "s = 'banana42'\nprint(s[-2:0:-2])",
      "correctAnswer": "4nn",
      "difficulty": 3,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "stop не входит в срез; знак step задаёт направление. Пустая граница использует значение по умолчанию.",
      "source": "banana42",
      "params": [
        -2,
        0,
        -2
      ],
      "target": "4nn"
    },
    {
      "id": "a069",
      "topic": "slices",
      "code": "s = 'banana42'\nprint(s[0::3])",
      "correctAnswer": "ba4",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "stop не входит в срез; знак step задаёт направление. Пустая граница использует значение по умолчанию.",
      "source": "banana42",
      "params": [
        0,
        null,
        3
      ],
      "target": "ba4"
    },
    {
      "id": "a070",
      "topic": "slices",
      "code": "s = 'banana42'\nprint(s[5:1:-1])",
      "correctAnswer": "anan",
      "difficulty": 3,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "stop не входит в срез; знак step задаёт направление. Пустая граница использует значение по умолчанию.",
      "source": "banana42",
      "params": [
        5,
        1,
        -1
      ],
      "target": "anan"
    },
    {
      "id": "a071",
      "topic": "indices",
      "code": "s = 'abracadabra'\nprint(s[0])",
      "correctAnswer": "a",
      "difficulty": 1,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "Отрицательные индексы отсчитываются с конца: последний символ имеет индекс -1.",
      "source": "abracadabra",
      "index": 0
    },
    {
      "id": "a072",
      "topic": "indices",
      "code": "s = 'abracadabra'\nprint(s[2])",
      "correctAnswer": "r",
      "difficulty": 1,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "Отрицательные индексы отсчитываются с конца: последний символ имеет индекс -1.",
      "source": "abracadabra",
      "index": 2
    },
    {
      "id": "a073",
      "topic": "indices",
      "code": "s = 'abracadabra'\nprint(s[-1])",
      "correctAnswer": "a",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "Отрицательные индексы отсчитываются с конца: последний символ имеет индекс -1.",
      "source": "abracadabra",
      "index": -1
    },
    {
      "id": "a074",
      "topic": "indices",
      "code": "s = 'abracadabra'\nprint(s[-3])",
      "correctAnswer": "b",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "Отрицательные индексы отсчитываются с конца: последний символ имеет индекс -1.",
      "source": "abracadabra",
      "index": -3
    },
    {
      "id": "a075",
      "topic": "slices",
      "code": "s = 'abracadabra'\nprint(s[1:5:1])",
      "correctAnswer": "brac",
      "difficulty": 1,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "stop не входит в срез; знак step задаёт направление. Пустая граница использует значение по умолчанию.",
      "source": "abracadabra",
      "params": [
        1,
        5,
        1
      ],
      "target": "brac"
    },
    {
      "id": "a076",
      "topic": "slices",
      "code": "s = 'abracadabra'\nprint(s[0::2])",
      "correctAnswer": "arcdba",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "stop не входит в срез; знак step задаёт направление. Пустая граница использует значение по умолчанию.",
      "source": "abracadabra",
      "params": [
        0,
        null,
        2
      ],
      "target": "arcdba"
    },
    {
      "id": "a077",
      "topic": "slices",
      "code": "s = 'abracadabra'\nprint(s[::-1])",
      "correctAnswer": "arbadacarba",
      "difficulty": 3,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "stop не входит в срез; знак step задаёт направление. Пустая граница использует значение по умолчанию.",
      "source": "abracadabra",
      "params": [
        null,
        null,
        -1
      ],
      "target": "arbadacarba"
    },
    {
      "id": "a078",
      "topic": "slices",
      "code": "s = 'abracadabra'\nprint(s[-2:0:-2])",
      "correctAnswer": "raaab",
      "difficulty": 3,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "stop не входит в срез; знак step задаёт направление. Пустая граница использует значение по умолчанию.",
      "source": "abracadabra",
      "params": [
        -2,
        0,
        -2
      ],
      "target": "raaab"
    },
    {
      "id": "a079",
      "topic": "slices",
      "code": "s = 'abracadabra'\nprint(s[0::3])",
      "correctAnswer": "aadr",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "stop не входит в срез; знак step задаёт направление. Пустая граница использует значение по умолчанию.",
      "source": "abracadabra",
      "params": [
        0,
        null,
        3
      ],
      "target": "aadr"
    },
    {
      "id": "a080",
      "topic": "slices",
      "code": "s = 'abracadabra'\nprint(s[5:1:-1])",
      "correctAnswer": "acar",
      "difficulty": 3,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "stop не входит в срез; знак step задаёт направление. Пустая граница использует значение по умолчанию.",
      "source": "abracadabra",
      "params": [
        5,
        1,
        -1
      ],
      "target": "acar"
    },
    {
      "id": "a081",
      "topic": "count",
      "code": "s = 'banana'\nprint(s.count('a'))",
      "correctAnswer": "3",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "count считает неперекрывающиеся вхождения.",
      "source": "banana",
      "substring": "a"
    },
    {
      "id": "a082",
      "topic": "count",
      "code": "s = 'banana'\nprint(s.count('a') + 2)",
      "correctAnswer": "5",
      "difficulty": 3,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "Сначала count, затем арифметика.",
      "source": "banana",
      "substring": "a"
    },
    {
      "id": "a083",
      "topic": "count",
      "code": "s = 'banana'\nprint(s.count('an'))",
      "correctAnswer": "2",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "count считает неперекрывающиеся вхождения.",
      "source": "banana",
      "substring": "an"
    },
    {
      "id": "a084",
      "topic": "count",
      "code": "s = 'banana'\nprint(s.count('an') + 2)",
      "correctAnswer": "4",
      "difficulty": 3,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "Сначала count, затем арифметика.",
      "source": "banana",
      "substring": "an"
    },
    {
      "id": "a085",
      "topic": "count",
      "code": "s = 'bananana'\nprint(s.count('na'))",
      "correctAnswer": "3",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "count считает неперекрывающиеся вхождения.",
      "source": "bananana",
      "substring": "na"
    },
    {
      "id": "a086",
      "topic": "count",
      "code": "s = 'bananana'\nprint(s.count('na') + 2)",
      "correctAnswer": "5",
      "difficulty": 3,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "Сначала count, затем арифметика.",
      "source": "bananana",
      "substring": "na"
    },
    {
      "id": "a087",
      "topic": "count",
      "code": "s = 'aaaaa'\nprint(s.count('aa'))",
      "correctAnswer": "2",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "count считает неперекрывающиеся вхождения.",
      "source": "aaaaa",
      "substring": "aa"
    },
    {
      "id": "a088",
      "topic": "count",
      "code": "s = 'aaaaa'\nprint(s.count('aa') + 2)",
      "correctAnswer": "4",
      "difficulty": 3,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "Сначала count, затем арифметика.",
      "source": "aaaaa",
      "substring": "aa"
    },
    {
      "id": "a089",
      "topic": "count",
      "code": "s = 'abracadabra'\nprint(s.count('abra'))",
      "correctAnswer": "2",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "count считает неперекрывающиеся вхождения.",
      "source": "abracadabra",
      "substring": "abra"
    },
    {
      "id": "a090",
      "topic": "count",
      "code": "s = 'abracadabra'\nprint(s.count('abra') + 2)",
      "correctAnswer": "4",
      "difficulty": 3,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "Сначала count, затем арифметика.",
      "source": "abracadabra",
      "substring": "abra"
    },
    {
      "id": "a091",
      "topic": "count",
      "code": "s = 'mississippi'\nprint(s.count('ss'))",
      "correctAnswer": "2",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "count считает неперекрывающиеся вхождения.",
      "source": "mississippi",
      "substring": "ss"
    },
    {
      "id": "a092",
      "topic": "count",
      "code": "s = 'mississippi'\nprint(s.count('ss') + 2)",
      "correctAnswer": "4",
      "difficulty": 3,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "Сначала count, затем арифметика.",
      "source": "mississippi",
      "substring": "ss"
    },
    {
      "id": "a093",
      "topic": "count",
      "code": "s = 'robot robot'\nprint(s.count('robot'))",
      "correctAnswer": "2",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "count считает неперекрывающиеся вхождения.",
      "source": "robot robot",
      "substring": "robot"
    },
    {
      "id": "a094",
      "topic": "count",
      "code": "s = 'robot robot'\nprint(s.count('robot') + 2)",
      "correctAnswer": "4",
      "difficulty": 3,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "Сначала count, затем арифметика.",
      "source": "robot robot",
      "substring": "robot"
    },
    {
      "id": "a095",
      "topic": "count",
      "code": "s = '0001000'\nprint(s.count('00'))",
      "correctAnswer": "2",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "count считает неперекрывающиеся вхождения.",
      "source": "0001000",
      "substring": "00"
    },
    {
      "id": "a096",
      "topic": "count",
      "code": "s = '0001000'\nprint(s.count('00') + 2)",
      "correctAnswer": "4",
      "difficulty": 3,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "Сначала count, затем арифметика.",
      "source": "0001000",
      "substring": "00"
    },
    {
      "id": "a097",
      "topic": "replace",
      "code": "s = 'banana'\nprint(s.replace('a', 'A', 0))",
      "correctAnswer": "banana",
      "difficulty": 1,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "replace заменяет вхождения слева направо. Третий аргумент ограничивает число замен.",
      "source": "banana",
      "old": "a",
      "new": "A",
      "count": 0
    },
    {
      "id": "a098",
      "topic": "replace",
      "code": "s = 'banana'\nprint(s.replace('a', 'A', 1))",
      "correctAnswer": "bAnana",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "replace заменяет вхождения слева направо. Третий аргумент ограничивает число замен.",
      "source": "banana",
      "old": "a",
      "new": "A",
      "count": 1
    },
    {
      "id": "a099",
      "topic": "replace",
      "code": "s = 'banana'\nprint(s.replace('a', 'A', 2))",
      "correctAnswer": "bAnAna",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "replace заменяет вхождения слева направо. Третий аргумент ограничивает число замен.",
      "source": "banana",
      "old": "a",
      "new": "A",
      "count": 2
    },
    {
      "id": "a100",
      "topic": "replace",
      "code": "s = 'banana'\nprint(s.replace('a', 'A', 3))",
      "correctAnswer": "bAnAnA",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "replace заменяет вхождения слева направо. Третий аргумент ограничивает число замен.",
      "source": "banana",
      "old": "a",
      "new": "A",
      "count": 3
    },
    {
      "id": "a101",
      "topic": "replace",
      "code": "s = 'BANANANA'\nprint(s.replace('AN', 'XX', 0))",
      "correctAnswer": "BANANANA",
      "difficulty": 1,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "replace заменяет вхождения слева направо. Третий аргумент ограничивает число замен.",
      "source": "BANANANA",
      "old": "AN",
      "new": "XX",
      "count": 0
    },
    {
      "id": "a102",
      "topic": "replace",
      "code": "s = 'BANANANA'\nprint(s.replace('AN', 'XX', 1))",
      "correctAnswer": "BXXANANA",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "replace заменяет вхождения слева направо. Третий аргумент ограничивает число замен.",
      "source": "BANANANA",
      "old": "AN",
      "new": "XX",
      "count": 1
    },
    {
      "id": "a103",
      "topic": "replace",
      "code": "s = 'BANANANA'\nprint(s.replace('AN', 'XX', 2))",
      "correctAnswer": "BXXXXANA",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "replace заменяет вхождения слева направо. Третий аргумент ограничивает число замен.",
      "source": "BANANANA",
      "old": "AN",
      "new": "XX",
      "count": 2
    },
    {
      "id": "a104",
      "topic": "replace",
      "code": "s = 'BANANANA'\nprint(s.replace('AN', 'XX', 3))",
      "correctAnswer": "BXXXXXXA",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "replace заменяет вхождения слева направо. Третий аргумент ограничивает число замен.",
      "source": "BANANANA",
      "old": "AN",
      "new": "XX",
      "count": 3
    },
    {
      "id": "a105",
      "topic": "replace",
      "code": "s = 'robot robot'\nprint(s.replace('robot', 'code', 0))",
      "correctAnswer": "robot robot",
      "difficulty": 1,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "replace заменяет вхождения слева направо. Третий аргумент ограничивает число замен.",
      "source": "robot robot",
      "old": "robot",
      "new": "code",
      "count": 0
    },
    {
      "id": "a106",
      "topic": "replace",
      "code": "s = 'robot robot'\nprint(s.replace('robot', 'code', 1))",
      "correctAnswer": "code robot",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "replace заменяет вхождения слева направо. Третий аргумент ограничивает число замен.",
      "source": "robot robot",
      "old": "robot",
      "new": "code",
      "count": 1
    },
    {
      "id": "a107",
      "topic": "replace",
      "code": "s = 'robot robot'\nprint(s.replace('robot', 'code', 2))",
      "correctAnswer": "code code",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "replace заменяет вхождения слева направо. Третий аргумент ограничивает число замен.",
      "source": "robot robot",
      "old": "robot",
      "new": "code",
      "count": 2
    },
    {
      "id": "a108",
      "topic": "replace",
      "code": "s = 'robot robot'\nprint(s.replace('robot', 'code', 3))",
      "correctAnswer": "code code",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "replace заменяет вхождения слева направо. Третий аргумент ограничивает число замен.",
      "source": "robot robot",
      "old": "robot",
      "new": "code",
      "count": 3
    },
    {
      "id": "a109",
      "topic": "replace",
      "code": "s = 'aaaaa'\nprint(s.replace('aa', 'Z', 0))",
      "correctAnswer": "aaaaa",
      "difficulty": 1,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "replace заменяет вхождения слева направо. Третий аргумент ограничивает число замен.",
      "source": "aaaaa",
      "old": "aa",
      "new": "Z",
      "count": 0
    },
    {
      "id": "a110",
      "topic": "replace",
      "code": "s = 'aaaaa'\nprint(s.replace('aa', 'Z', 1))",
      "correctAnswer": "Zaaa",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "replace заменяет вхождения слева направо. Третий аргумент ограничивает число замен.",
      "source": "aaaaa",
      "old": "aa",
      "new": "Z",
      "count": 1
    },
    {
      "id": "a111",
      "topic": "replace",
      "code": "s = 'aaaaa'\nprint(s.replace('aa', 'Z', 2))",
      "correctAnswer": "ZZa",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "replace заменяет вхождения слева направо. Третий аргумент ограничивает число замен.",
      "source": "aaaaa",
      "old": "aa",
      "new": "Z",
      "count": 2
    },
    {
      "id": "a112",
      "topic": "replace",
      "code": "s = 'aaaaa'\nprint(s.replace('aa', 'Z', 3))",
      "correctAnswer": "ZZa",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "replace заменяет вхождения слева направо. Третий аргумент ограничивает число замен.",
      "source": "aaaaa",
      "old": "aa",
      "new": "Z",
      "count": 3
    },
    {
      "id": "a113",
      "topic": "replace",
      "code": "s = 'mississippi'\nprint(s.replace('ss', 'S', 0))",
      "correctAnswer": "mississippi",
      "difficulty": 1,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "replace заменяет вхождения слева направо. Третий аргумент ограничивает число замен.",
      "source": "mississippi",
      "old": "ss",
      "new": "S",
      "count": 0
    },
    {
      "id": "a114",
      "topic": "replace",
      "code": "s = 'mississippi'\nprint(s.replace('ss', 'S', 1))",
      "correctAnswer": "miSissippi",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "replace заменяет вхождения слева направо. Третий аргумент ограничивает число замен.",
      "source": "mississippi",
      "old": "ss",
      "new": "S",
      "count": 1
    },
    {
      "id": "a115",
      "topic": "replace",
      "code": "s = 'mississippi'\nprint(s.replace('ss', 'S', 2))",
      "correctAnswer": "miSiSippi",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "replace заменяет вхождения слева направо. Третий аргумент ограничивает число замен.",
      "source": "mississippi",
      "old": "ss",
      "new": "S",
      "count": 2
    },
    {
      "id": "a116",
      "topic": "replace",
      "code": "s = 'mississippi'\nprint(s.replace('ss', 'S', 3))",
      "correctAnswer": "miSiSippi",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "replace заменяет вхождения слева направо. Третий аргумент ограничивает число замен.",
      "source": "mississippi",
      "old": "ss",
      "new": "S",
      "count": 3
    },
    {
      "id": "a117",
      "topic": "replace",
      "code": "s = '101010'\nprint(s.replace('10', '01', 0))",
      "correctAnswer": "101010",
      "difficulty": 1,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "replace заменяет вхождения слева направо. Третий аргумент ограничивает число замен.",
      "source": "101010",
      "old": "10",
      "new": "01",
      "count": 0
    },
    {
      "id": "a118",
      "topic": "replace",
      "code": "s = '101010'\nprint(s.replace('10', '01', 1))",
      "correctAnswer": "011010",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "replace заменяет вхождения слева направо. Третий аргумент ограничивает число замен.",
      "source": "101010",
      "old": "10",
      "new": "01",
      "count": 1
    },
    {
      "id": "a119",
      "topic": "replace",
      "code": "s = '101010'\nprint(s.replace('10', '01', 2))",
      "correctAnswer": "010110",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "replace заменяет вхождения слева направо. Третий аргумент ограничивает число замен.",
      "source": "101010",
      "old": "10",
      "new": "01",
      "count": 2
    },
    {
      "id": "a120",
      "topic": "replace",
      "code": "s = '101010'\nprint(s.replace('10', '01', 3))",
      "correctAnswer": "010101",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "replace заменяет вхождения слева направо. Третий аргумент ограничивает число замен.",
      "source": "101010",
      "old": "10",
      "new": "01",
      "count": 3
    },
    {
      "id": "a121",
      "topic": "conversions",
      "code": "a = '12'\nb = 3\nprint(int(a) + b)",
      "correctAnswer": "15",
      "difficulty": 1,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "int превращает строку в целое число; затем выполняется сложение."
    },
    {
      "id": "a122",
      "topic": "conversions",
      "code": "a = '12'\nb = 3\nprint(a + str(b))",
      "correctAnswer": "123",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "str превращает число в строку; + соединяет строки."
    },
    {
      "id": "a123",
      "topic": "conversions",
      "code": "a = '12'\nb = 3\nprint(str(int(a) + b) + '0')",
      "correctAnswer": "150",
      "difficulty": 3,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "Преобразование в число, сложение, преобразование в строку и конкатенация."
    },
    {
      "id": "a124",
      "topic": "conversions",
      "code": "a = '57'\nb = 8\nprint(int(a) + b)",
      "correctAnswer": "65",
      "difficulty": 1,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "int превращает строку в целое число; затем выполняется сложение."
    },
    {
      "id": "a125",
      "topic": "conversions",
      "code": "a = '57'\nb = 8\nprint(a + str(b))",
      "correctAnswer": "578",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "str превращает число в строку; + соединяет строки."
    },
    {
      "id": "a126",
      "topic": "conversions",
      "code": "a = '57'\nb = 8\nprint(str(int(a) + b) + '0')",
      "correctAnswer": "650",
      "difficulty": 3,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "Преобразование в число, сложение, преобразование в строку и конкатенация."
    },
    {
      "id": "a127",
      "topic": "conversions",
      "code": "a = '25'\nb = 5\nprint(int(a) + b)",
      "correctAnswer": "30",
      "difficulty": 1,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "int превращает строку в целое число; затем выполняется сложение."
    },
    {
      "id": "a128",
      "topic": "conversions",
      "code": "a = '25'\nb = 5\nprint(a + str(b))",
      "correctAnswer": "255",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "str превращает число в строку; + соединяет строки."
    },
    {
      "id": "a129",
      "topic": "conversions",
      "code": "a = '25'\nb = 5\nprint(str(int(a) + b) + '0')",
      "correctAnswer": "300",
      "difficulty": 3,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "Преобразование в число, сложение, преобразование в строку и конкатенация."
    },
    {
      "id": "a130",
      "topic": "conversions",
      "code": "a = '40'\nb = 2\nprint(int(a) + b)",
      "correctAnswer": "42",
      "difficulty": 1,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "int превращает строку в целое число; затем выполняется сложение."
    },
    {
      "id": "a131",
      "topic": "conversions",
      "code": "a = '40'\nb = 2\nprint(a + str(b))",
      "correctAnswer": "402",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "str превращает число в строку; + соединяет строки."
    },
    {
      "id": "a132",
      "topic": "conversions",
      "code": "a = '40'\nb = 2\nprint(str(int(a) + b) + '0')",
      "correctAnswer": "420",
      "difficulty": 3,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "Преобразование в число, сложение, преобразование в строку и конкатенация."
    },
    {
      "id": "a133",
      "topic": "conversions",
      "code": "a = '9'\nb = 4\nprint(int(a) + b)",
      "correctAnswer": "13",
      "difficulty": 1,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "int превращает строку в целое число; затем выполняется сложение."
    },
    {
      "id": "a134",
      "topic": "conversions",
      "code": "a = '9'\nb = 4\nprint(a + str(b))",
      "correctAnswer": "94",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "str превращает число в строку; + соединяет строки."
    },
    {
      "id": "a135",
      "topic": "conversions",
      "code": "a = '9'\nb = 4\nprint(str(int(a) + b) + '0')",
      "correctAnswer": "130",
      "difficulty": 3,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "Преобразование в число, сложение, преобразование в строку и конкатенация."
    },
    {
      "id": "a136",
      "topic": "conversions",
      "code": "a = '100'\nb = 7\nprint(int(a) + b)",
      "correctAnswer": "107",
      "difficulty": 1,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "int превращает строку в целое число; затем выполняется сложение."
    },
    {
      "id": "a137",
      "topic": "conversions",
      "code": "a = '100'\nb = 7\nprint(a + str(b))",
      "correctAnswer": "1007",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "str превращает число в строку; + соединяет строки."
    },
    {
      "id": "a138",
      "topic": "conversions",
      "code": "a = '100'\nb = 7\nprint(str(int(a) + b) + '0')",
      "correctAnswer": "1070",
      "difficulty": 3,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "Преобразование в число, сложение, преобразование в строку и конкатенация."
    },
    {
      "id": "a139",
      "topic": "output",
      "code": "print(17 // 5)",
      "correctAnswer": "3",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "Учитывай типы данных и порядок операций."
    },
    {
      "id": "a140",
      "topic": "output",
      "code": "print(17 % 5)",
      "correctAnswer": "2",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "Учитывай типы данных и порядок операций."
    },
    {
      "id": "a141",
      "topic": "output",
      "code": "print(3 ** 4)",
      "correctAnswer": "81",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "Учитывай типы данных и порядок операций."
    },
    {
      "id": "a142",
      "topic": "output",
      "code": "print(9 / 4)",
      "correctAnswer": "2.25",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "Учитывай типы данных и порядок операций."
    },
    {
      "id": "a143",
      "topic": "output",
      "code": "print(5 * 3 - 2)",
      "correctAnswer": "13",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "Учитывай типы данных и порядок операций."
    },
    {
      "id": "a144",
      "topic": "output",
      "code": "print((8 + 4) // 3)",
      "correctAnswer": "4",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "Учитывай типы данных и порядок операций."
    },
    {
      "id": "a145",
      "topic": "output",
      "code": "print(2 ** 5 + 1)",
      "correctAnswer": "33",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "Учитывай типы данных и порядок операций."
    },
    {
      "id": "a146",
      "topic": "output",
      "code": "print('GO' * 3)",
      "correctAnswer": "GOGOGO",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "Учитывай типы данных и порядок операций."
    },
    {
      "id": "a147",
      "topic": "output",
      "code": "print('PY' + 'THON')",
      "correctAnswer": "PYTHON",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "Учитывай типы данных и порядок операций."
    },
    {
      "id": "a148",
      "topic": "output",
      "code": "print(27 // 4 + 27 % 4)",
      "correctAnswer": "9",
      "difficulty": 2,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "Учитывай типы данных и порядок операций."
    },
    {
      "id": "a149",
      "topic": "units",
      "code": "print(2 * 1024)",
      "correctAnswer": "2048",
      "difficulty": 1,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "1 Кбайт = 1024 байта.",
      "question": "Пакет занимает 2 Кбайта. Сколько это байтов?"
    },
    {
      "id": "a150",
      "topic": "units",
      "code": "print(2 * 8)",
      "correctAnswer": "16",
      "difficulty": 1,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "1 байт = 8 бит.",
      "question": "В регистре 2 байта. Сколько это бит?"
    },
    {
      "id": "a151",
      "topic": "units",
      "code": "print(3 * 1024)",
      "correctAnswer": "3072",
      "difficulty": 1,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "1 Кбайт = 1024 байта.",
      "question": "Пакет занимает 3 Кбайта. Сколько это байтов?"
    },
    {
      "id": "a152",
      "topic": "units",
      "code": "print(3 * 8)",
      "correctAnswer": "24",
      "difficulty": 1,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "1 байт = 8 бит.",
      "question": "В регистре 3 байта. Сколько это бит?"
    },
    {
      "id": "a153",
      "topic": "units",
      "code": "print(5 * 1024)",
      "correctAnswer": "5120",
      "difficulty": 1,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "1 Кбайт = 1024 байта.",
      "question": "Пакет занимает 5 Кбайт. Сколько это байтов?"
    },
    {
      "id": "a154",
      "topic": "units",
      "code": "print(5 * 8)",
      "correctAnswer": "40",
      "difficulty": 1,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "1 байт = 8 бит.",
      "question": "В регистре 5 байтов. Сколько это бит?"
    },
    {
      "id": "a155",
      "topic": "units",
      "code": "print(7 * 1024)",
      "correctAnswer": "7168",
      "difficulty": 1,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "1 Кбайт = 1024 байта.",
      "question": "Пакет занимает 7 Кбайт. Сколько это байтов?"
    },
    {
      "id": "a156",
      "topic": "units",
      "code": "print(7 * 8)",
      "correctAnswer": "56",
      "difficulty": 1,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "1 байт = 8 бит.",
      "question": "В регистре 7 байтов. Сколько это бит?"
    },
    {
      "id": "a157",
      "topic": "units",
      "code": "print(9 * 1024)",
      "correctAnswer": "9216",
      "difficulty": 1,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "1 Кбайт = 1024 байта.",
      "question": "Пакет занимает 9 Кбайт. Сколько это байтов?"
    },
    {
      "id": "a158",
      "topic": "units",
      "code": "print(9 * 8)",
      "correctAnswer": "72",
      "difficulty": 1,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "1 байт = 8 бит.",
      "question": "В регистре 9 байтов. Сколько это бит?"
    },
    {
      "id": "a159",
      "topic": "units",
      "code": "print(12 * 1024)",
      "correctAnswer": "12288",
      "difficulty": 1,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "1 Кбайт = 1024 байта.",
      "question": "Пакет занимает 12 Кбайт. Сколько это байтов?"
    },
    {
      "id": "a160",
      "topic": "units",
      "code": "print(12 * 8)",
      "correctAnswer": "96",
      "difficulty": 1,
      "prompt": "Определи, что появится в консоли.",
      "explanation": "1 байт = 8 бит.",
      "question": "В регистре 12 байтов. Сколько это бит?"
    }
  ],
  "repairs": [
    {
      "id": "r01",
      "topic": "count",
      "code": "s = 'banana'\nprint(s.count['a'])",
      "solution": "s = 'banana'\nprint(s.count('a'))",
      "correctAnswer": "3",
      "prompt": "Почини вызов count: нужно посчитать буквы a.",
      "difficulty": 2,
      "explanation": "Изменённая программа должна выполнить указанную цель."
    },
    {
      "id": "r02",
      "topic": "replace",
      "code": "s = 'banana'\nprint(s.replace('a', 'A'))",
      "solution": "s = 'banana'\nprint(s.replace('a', 'A', 1))",
      "correctAnswer": "bAnana",
      "prompt": "Замени только первую букву a на A.",
      "difficulty": 2,
      "explanation": "Изменённая программа должна выполнить указанную цель."
    },
    {
      "id": "r03",
      "topic": "count",
      "code": "s = 'abracadabra'\nprint(s.count['a'])",
      "solution": "s = 'abracadabra'\nprint(s.count('a'))",
      "correctAnswer": "5",
      "prompt": "Почини вызов count: нужно посчитать буквы a.",
      "difficulty": 2,
      "explanation": "Изменённая программа должна выполнить указанную цель."
    },
    {
      "id": "r04",
      "topic": "replace",
      "code": "s = 'abracadabra'\nprint(s.replace('a', 'A'))",
      "solution": "s = 'abracadabra'\nprint(s.replace('a', 'A', 1))",
      "correctAnswer": "Abracadabra",
      "prompt": "Замени только первую букву a на A.",
      "difficulty": 2,
      "explanation": "Изменённая программа должна выполнить указанную цель."
    },
    {
      "id": "r05",
      "topic": "count",
      "code": "s = 'bananana'\nprint(s.count['a'])",
      "solution": "s = 'bananana'\nprint(s.count('a'))",
      "correctAnswer": "4",
      "prompt": "Почини вызов count: нужно посчитать буквы a.",
      "difficulty": 2,
      "explanation": "Изменённая программа должна выполнить указанную цель."
    },
    {
      "id": "r06",
      "topic": "replace",
      "code": "s = 'bananana'\nprint(s.replace('a', 'A'))",
      "solution": "s = 'bananana'\nprint(s.replace('a', 'A', 1))",
      "correctAnswer": "bAnanana",
      "prompt": "Замени только первую букву a на A.",
      "difficulty": 2,
      "explanation": "Изменённая программа должна выполнить указанную цель."
    },
    {
      "id": "r07",
      "topic": "slices",
      "code": "s = 'PYTHON'\nprint(s[0:2])",
      "solution": "s = 'PYTHON'\nprint(s[0:3])",
      "correctAnswer": "PYT",
      "prompt": "Выведи первые три символа строки.",
      "difficulty": 2,
      "explanation": "Изменённая программа должна выполнить указанную цель."
    },
    {
      "id": "r08",
      "topic": "indices",
      "code": "s = 'PYTHON'\nprint(s[6])",
      "solution": "s = 'PYTHON'\nprint(s[-1])",
      "correctAnswer": "N",
      "prompt": "Выведи последний символ. Используй отрицательный индекс.",
      "difficulty": 2,
      "explanation": "Изменённая программа должна выполнить указанную цель."
    },
    {
      "id": "r09",
      "topic": "slices",
      "code": "s = 'ALGORITHM'\nprint(s[0:2])",
      "solution": "s = 'ALGORITHM'\nprint(s[0:3])",
      "correctAnswer": "ALG",
      "prompt": "Выведи первые три символа строки.",
      "difficulty": 2,
      "explanation": "Изменённая программа должна выполнить указанную цель."
    },
    {
      "id": "r10",
      "topic": "indices",
      "code": "s = 'ALGORITHM'\nprint(s[9])",
      "solution": "s = 'ALGORITHM'\nprint(s[-1])",
      "correctAnswer": "M",
      "prompt": "Выведи последний символ. Используй отрицательный индекс.",
      "difficulty": 2,
      "explanation": "Изменённая программа должна выполнить указанную цель."
    },
    {
      "id": "r11",
      "topic": "slices",
      "code": "s = 'ROBOTICS'\nprint(s[0:2])",
      "solution": "s = 'ROBOTICS'\nprint(s[0:3])",
      "correctAnswer": "ROB",
      "prompt": "Выведи первые три символа строки.",
      "difficulty": 2,
      "explanation": "Изменённая программа должна выполнить указанную цель."
    },
    {
      "id": "r12",
      "topic": "indices",
      "code": "s = 'ROBOTICS'\nprint(s[8])",
      "solution": "s = 'ROBOTICS'\nprint(s[-1])",
      "correctAnswer": "S",
      "prompt": "Выведи последний символ. Используй отрицательный индекс.",
      "difficulty": 2,
      "explanation": "Изменённая программа должна выполнить указанную цель."
    },
    {
      "id": "r13",
      "topic": "slices",
      "code": "s = 'COMPUTER'\nprint(s[0:2])",
      "solution": "s = 'COMPUTER'\nprint(s[0:3])",
      "correctAnswer": "COM",
      "prompt": "Выведи первые три символа строки.",
      "difficulty": 2,
      "explanation": "Изменённая программа должна выполнить указанную цель."
    },
    {
      "id": "r14",
      "topic": "indices",
      "code": "s = 'COMPUTER'\nprint(s[8])",
      "solution": "s = 'COMPUTER'\nprint(s[-1])",
      "correctAnswer": "R",
      "prompt": "Выведи последний символ. Используй отрицательный индекс.",
      "difficulty": 2,
      "explanation": "Изменённая программа должна выполнить указанную цель."
    },
    {
      "id": "r15",
      "topic": "slices",
      "code": "s = 'NEONCODE'\nprint(s[0:2])",
      "solution": "s = 'NEONCODE'\nprint(s[0:3])",
      "correctAnswer": "NEO",
      "prompt": "Выведи первые три символа строки.",
      "difficulty": 2,
      "explanation": "Изменённая программа должна выполнить указанную цель."
    },
    {
      "id": "r16",
      "topic": "indices",
      "code": "s = 'NEONCODE'\nprint(s[8])",
      "solution": "s = 'NEONCODE'\nprint(s[-1])",
      "correctAnswer": "E",
      "prompt": "Выведи последний символ. Используй отрицательный индекс.",
      "difficulty": 2,
      "explanation": "Изменённая программа должна выполнить указанную цель."
    },
    {
      "id": "r17",
      "topic": "slices",
      "code": "s = 'PIXELART'\nprint(s[0:2])",
      "solution": "s = 'PIXELART'\nprint(s[0:3])",
      "correctAnswer": "PIX",
      "prompt": "Выведи первые три символа строки.",
      "difficulty": 2,
      "explanation": "Изменённая программа должна выполнить указанную цель."
    },
    {
      "id": "r18",
      "topic": "indices",
      "code": "s = 'PIXELART'\nprint(s[8])",
      "solution": "s = 'PIXELART'\nprint(s[-1])",
      "correctAnswer": "T",
      "prompt": "Выведи последний символ. Используй отрицательный индекс.",
      "difficulty": 2,
      "explanation": "Изменённая программа должна выполнить указанную цель."
    },
    {
      "id": "r19",
      "topic": "conversions",
      "code": "x = '25'\nprint(x + 5)",
      "solution": "x = '25'\nprint(int(x) + 5)",
      "correctAnswer": "30",
      "prompt": "Сделай так, чтобы программа вывела число 30.",
      "difficulty": 2,
      "explanation": "Изменённая программа должна выполнить указанную цель."
    },
    {
      "id": "r20",
      "topic": "conversions",
      "code": "x = '14'\nprint(x + 6)",
      "solution": "x = '14'\nprint(int(x) + 6)",
      "correctAnswer": "20",
      "prompt": "Сделай так, чтобы программа вывела число 20.",
      "difficulty": 2,
      "explanation": "Изменённая программа должна выполнить указанную цель."
    },
    {
      "id": "r21",
      "topic": "conversions",
      "code": "x = '37'\nprint(x + 3)",
      "solution": "x = '37'\nprint(int(x) + 3)",
      "correctAnswer": "40",
      "prompt": "Сделай так, чтобы программа вывела число 40.",
      "difficulty": 2,
      "explanation": "Изменённая программа должна выполнить указанную цель."
    },
    {
      "id": "r22",
      "topic": "units",
      "code": "print(2 * 1000)",
      "solution": "print(2 * 1024)",
      "correctAnswer": "2048",
      "prompt": "Переведи 2 Кбайта в байты. Здесь нужны двоичные единицы.",
      "difficulty": 2,
      "explanation": "Изменённая программа должна выполнить указанную цель."
    },
    {
      "id": "r23",
      "topic": "units",
      "code": "print(3 * 1000)",
      "solution": "print(3 * 1024)",
      "correctAnswer": "3072",
      "prompt": "Переведи 3 Кбайта в байты. Здесь нужны двоичные единицы.",
      "difficulty": 2,
      "explanation": "Изменённая программа должна выполнить указанную цель."
    },
    {
      "id": "r24",
      "topic": "units",
      "code": "print(5 * 1000)",
      "solution": "print(5 * 1024)",
      "correctAnswer": "5120",
      "prompt": "Переведи 5 Кбайт в байты. Здесь нужны двоичные единицы.",
      "difficulty": 2,
      "explanation": "Изменённая программа должна выполнить указанную цель."
    }
  ],
  "orders": [
    {
      "id": "o01",
      "topic": "slices",
      "lines": [
        "s = 'ROBOTICS'",
        "piece = s[1:6:2]",
        "print(piece)"
      ],
      "code": "s = 'ROBOTICS'\npiece = s[1:6:2]\nprint(piece)",
      "correctAnswer": "OOI",
      "difficulty": 2,
      "prompt": "Восстанови порядок: сначала данные, затем преобразование, затем вывод.",
      "explanation": "Переменную нужно определить до её использования."
    },
    {
      "id": "o02",
      "topic": "slices",
      "lines": [
        "s = 'NEONCODE'",
        "piece = s[1:6:2]",
        "print(piece)"
      ],
      "code": "s = 'NEONCODE'\npiece = s[1:6:2]\nprint(piece)",
      "correctAnswer": "ENO",
      "difficulty": 2,
      "prompt": "Восстанови порядок: сначала данные, затем преобразование, затем вывод.",
      "explanation": "Переменную нужно определить до её использования."
    },
    {
      "id": "o03",
      "topic": "slices",
      "lines": [
        "s = 'COMPUTER'",
        "piece = s[1:6:2]",
        "print(piece)"
      ],
      "code": "s = 'COMPUTER'\npiece = s[1:6:2]\nprint(piece)",
      "correctAnswer": "OPT",
      "difficulty": 2,
      "prompt": "Восстанови порядок: сначала данные, затем преобразование, затем вывод.",
      "explanation": "Переменную нужно определить до её использования."
    },
    {
      "id": "o04",
      "topic": "indices",
      "lines": [
        "s = 'ROBOTICS'",
        "piece = s[-2]",
        "print(piece)"
      ],
      "code": "s = 'ROBOTICS'\npiece = s[-2]\nprint(piece)",
      "correctAnswer": "C",
      "difficulty": 2,
      "prompt": "Восстанови порядок: сначала данные, затем преобразование, затем вывод.",
      "explanation": "Переменную нужно определить до её использования."
    },
    {
      "id": "o05",
      "topic": "indices",
      "lines": [
        "s = 'NEONCODE'",
        "piece = s[-2]",
        "print(piece)"
      ],
      "code": "s = 'NEONCODE'\npiece = s[-2]\nprint(piece)",
      "correctAnswer": "D",
      "difficulty": 2,
      "prompt": "Восстанови порядок: сначала данные, затем преобразование, затем вывод.",
      "explanation": "Переменную нужно определить до её использования."
    },
    {
      "id": "o06",
      "topic": "indices",
      "lines": [
        "s = 'COMPUTER'",
        "piece = s[-2]",
        "print(piece)"
      ],
      "code": "s = 'COMPUTER'\npiece = s[-2]\nprint(piece)",
      "correctAnswer": "E",
      "difficulty": 2,
      "prompt": "Восстанови порядок: сначала данные, затем преобразование, затем вывод.",
      "explanation": "Переменную нужно определить до её использования."
    },
    {
      "id": "o07",
      "topic": "replace",
      "lines": [
        "s = 'ROBOTICS'",
        "piece = s.replace('O', '0', 1)",
        "print(piece)"
      ],
      "code": "s = 'ROBOTICS'\npiece = s.replace('O', '0', 1)\nprint(piece)",
      "correctAnswer": "R0BOTICS",
      "difficulty": 2,
      "prompt": "Восстанови порядок: сначала данные, затем преобразование, затем вывод.",
      "explanation": "Переменную нужно определить до её использования."
    },
    {
      "id": "o08",
      "topic": "replace",
      "lines": [
        "s = 'NEONCODE'",
        "piece = s.replace('O', '0', 1)",
        "print(piece)"
      ],
      "code": "s = 'NEONCODE'\npiece = s.replace('O', '0', 1)\nprint(piece)",
      "correctAnswer": "NE0NCODE",
      "difficulty": 2,
      "prompt": "Восстанови порядок: сначала данные, затем преобразование, затем вывод.",
      "explanation": "Переменную нужно определить до её использования."
    },
    {
      "id": "o09",
      "topic": "replace",
      "lines": [
        "s = 'COMPUTER'",
        "piece = s.replace('O', '0', 1)",
        "print(piece)"
      ],
      "code": "s = 'COMPUTER'\npiece = s.replace('O', '0', 1)\nprint(piece)",
      "correctAnswer": "C0MPUTER",
      "difficulty": 2,
      "prompt": "Восстанови порядок: сначала данные, затем преобразование, затем вывод.",
      "explanation": "Переменную нужно определить до её использования."
    },
    {
      "id": "o10",
      "topic": "count",
      "lines": [
        "s = 'ROBOTICS'",
        "piece = s.count('O')",
        "print(piece)"
      ],
      "code": "s = 'ROBOTICS'\npiece = s.count('O')\nprint(piece)",
      "correctAnswer": "2",
      "difficulty": 2,
      "prompt": "Восстанови порядок: сначала данные, затем преобразование, затем вывод.",
      "explanation": "Переменную нужно определить до её использования."
    },
    {
      "id": "o11",
      "topic": "count",
      "lines": [
        "s = 'NEONCODE'",
        "piece = s.count('O')",
        "print(piece)"
      ],
      "code": "s = 'NEONCODE'\npiece = s.count('O')\nprint(piece)",
      "correctAnswer": "2",
      "difficulty": 2,
      "prompt": "Восстанови порядок: сначала данные, затем преобразование, затем вывод.",
      "explanation": "Переменную нужно определить до её использования."
    },
    {
      "id": "o12",
      "topic": "count",
      "lines": [
        "s = 'COMPUTER'",
        "piece = s.count('O')",
        "print(piece)"
      ],
      "code": "s = 'COMPUTER'\npiece = s.count('O')\nprint(piece)",
      "correctAnswer": "1",
      "difficulty": 2,
      "prompt": "Восстанови порядок: сначала данные, затем преобразование, затем вывод.",
      "explanation": "Переменную нужно определить до её использования."
    },
    {
      "id": "o13",
      "topic": "conversions",
      "lines": [
        "s = '12'",
        "piece = str(int(s) + 3) + '0'",
        "print(piece)"
      ],
      "code": "s = '12'\npiece = str(int(s) + 3) + '0'\nprint(piece)",
      "correctAnswer": "150",
      "difficulty": 2,
      "prompt": "Восстанови порядок: сначала данные, затем преобразование, затем вывод.",
      "explanation": "Переменную нужно определить до её использования."
    },
    {
      "id": "o14",
      "topic": "conversions",
      "lines": [
        "s = '25'",
        "piece = str(int(s) + 3) + '0'",
        "print(piece)"
      ],
      "code": "s = '25'\npiece = str(int(s) + 3) + '0'\nprint(piece)",
      "correctAnswer": "280",
      "difficulty": 2,
      "prompt": "Восстанови порядок: сначала данные, затем преобразование, затем вывод.",
      "explanation": "Переменную нужно определить до её использования."
    },
    {
      "id": "o15",
      "topic": "conversions",
      "lines": [
        "s = '40'",
        "piece = str(int(s) + 3) + '0'",
        "print(piece)"
      ],
      "code": "s = '40'\npiece = str(int(s) + 3) + '0'\nprint(piece)",
      "correctAnswer": "430",
      "difficulty": 2,
      "prompt": "Восстанови порядок: сначала данные, затем преобразование, затем вывод.",
      "explanation": "Переменную нужно определить до её использования."
    },
    {
      "id": "o16",
      "topic": "units",
      "lines": [
        "s = 2",
        "piece = s * 1024",
        "print(piece)"
      ],
      "code": "s = 2\npiece = s * 1024\nprint(piece)",
      "correctAnswer": "2048",
      "difficulty": 2,
      "prompt": "Восстанови порядок: сначала данные, затем преобразование, затем вывод.",
      "explanation": "Переменную нужно определить до её использования."
    },
    {
      "id": "o17",
      "topic": "units",
      "lines": [
        "s = 3",
        "piece = s * 1024",
        "print(piece)"
      ],
      "code": "s = 3\npiece = s * 1024\nprint(piece)",
      "correctAnswer": "3072",
      "difficulty": 2,
      "prompt": "Восстанови порядок: сначала данные, затем преобразование, затем вывод.",
      "explanation": "Переменную нужно определить до её использования."
    },
    {
      "id": "o18",
      "topic": "units",
      "lines": [
        "s = 5",
        "piece = s * 1024",
        "print(piece)"
      ],
      "code": "s = 5\npiece = s * 1024\nprint(piece)",
      "correctAnswer": "5120",
      "difficulty": 2,
      "prompt": "Восстанови порядок: сначала данные, затем преобразование, затем вывод.",
      "explanation": "Переменную нужно определить до её использования."
    }
  ],
  "safes": [
    {
      "id": "v0",
      "topic": "mixed",
      "difficulty": 2,
      "prompt": "Реши четыре коротких задачи. Каждая откроет одну цифру PIN.",
      "expressions": [
        "'banana'.count('a')",
        "int('2') + 2",
        "'bananana'.count('na')",
        "1 % 4"
      ],
      "digits": [
        "3",
        "4",
        "3",
        "1"
      ],
      "correctAnswer": "3431",
      "explanation": "Цифры PIN идут в порядке четырёх вычислений."
    },
    {
      "id": "v1",
      "topic": "mixed",
      "difficulty": 2,
      "prompt": "Реши четыре коротких задачи. Каждая откроет одну цифру PIN.",
      "expressions": [
        "'banana'.count('a')",
        "int('3') + 2",
        "'bananana'.count('na')",
        "2 % 4"
      ],
      "digits": [
        "3",
        "5",
        "3",
        "2"
      ],
      "correctAnswer": "3532",
      "explanation": "Цифры PIN идут в порядке четырёх вычислений."
    },
    {
      "id": "v2",
      "topic": "mixed",
      "difficulty": 2,
      "prompt": "Реши четыре коротких задачи. Каждая откроет одну цифру PIN.",
      "expressions": [
        "'banana'.count('a')",
        "int('4') + 2",
        "'bananana'.count('na')",
        "3 % 4"
      ],
      "digits": [
        "3",
        "6",
        "3",
        "3"
      ],
      "correctAnswer": "3633",
      "explanation": "Цифры PIN идут в порядке четырёх вычислений."
    },
    {
      "id": "v3",
      "topic": "mixed",
      "difficulty": 2,
      "prompt": "Реши четыре коротких задачи. Каждая откроет одну цифру PIN.",
      "expressions": [
        "'banana'.count('a')",
        "int('5') + 2",
        "'bananana'.count('na')",
        "4 % 4"
      ],
      "digits": [
        "3",
        "7",
        "3",
        "0"
      ],
      "correctAnswer": "3730",
      "explanation": "Цифры PIN идут в порядке четырёх вычислений."
    },
    {
      "id": "v4",
      "topic": "mixed",
      "difficulty": 2,
      "prompt": "Реши четыре коротких задачи. Каждая откроет одну цифру PIN.",
      "expressions": [
        "'banana'.count('a')",
        "int('6') + 2",
        "'bananana'.count('na')",
        "5 % 4"
      ],
      "digits": [
        "3",
        "8",
        "3",
        "1"
      ],
      "correctAnswer": "3831",
      "explanation": "Цифры PIN идут в порядке четырёх вычислений."
    },
    {
      "id": "v5",
      "topic": "mixed",
      "difficulty": 2,
      "prompt": "Реши четыре коротких задачи. Каждая откроет одну цифру PIN.",
      "expressions": [
        "'banana'.count('a')",
        "int('7') + 2",
        "'bananana'.count('na')",
        "6 % 4"
      ],
      "digits": [
        "3",
        "9",
        "3",
        "2"
      ],
      "correctAnswer": "3932",
      "explanation": "Цифры PIN идут в порядке четырёх вычислений."
    }
  ],
  "boss": [
    {
      "id": "b0",
      "topic": "mixed",
      "code": "s = 'banana42'\npiece = s[:-2:2]\npiece = piece + str(int('3') + 1)\nprint(piece.replace('a', 'A', 1))",
      "correctAnswer": "bnn4",
      "difficulty": 3,
      "prompt": "Активируй портал: срез → число → строка → одна замена. Какой сигнал отправит программа?",
      "explanation": "Срез берёт каждый второй символ без последних двух; затем добавляется строка 4 и заменяется первая a."
    },
    {
      "id": "b1",
      "topic": "mixed",
      "code": "s = 'bananana73'\npiece = s[:-2:2]\npiece = piece + str(int('3') + 1)\nprint(piece.replace('a', 'A', 1))",
      "correctAnswer": "bnnn4",
      "difficulty": 3,
      "prompt": "Активируй портал: срез → число → строка → одна замена. Какой сигнал отправит программа?",
      "explanation": "Срез берёт каждый второй символ без последних двух; затем добавляется строка 4 и заменяется первая a."
    },
    {
      "id": "b2",
      "topic": "mixed",
      "code": "s = 'abracadabra58'\npiece = s[:-2:2]\npiece = piece + str(int('3') + 1)\nprint(piece.replace('a', 'A', 1))",
      "correctAnswer": "Arcdba4",
      "difficulty": 3,
      "prompt": "Активируй портал: срез → число → строка → одна замена. Какой сигнал отправит программа?",
      "explanation": "Срез берёт каждый второй символ без последних двух; затем добавляется строка 4 и заменяется первая a."
    }
  ]
};
