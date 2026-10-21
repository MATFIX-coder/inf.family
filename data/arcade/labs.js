// Перенесено из inf.family.html (baseline v1.4 от 07.10.2026) программой tools/extract_legacy.mjs.
// Проверка совпадения со старым сайтом: tools/verify_legacy.mjs.
window.INF_DATA = window.INF_DATA || { blocks: {}, defenses: {}, arcade: {} };

window.INF_DATA.arcade.labs = {
  "weights": {
    "variants": [
      {
        "id": "u0",
        "a": "16384 бит",
        "b": "2 Кбайта",
        "answer": "="
      },
      {
        "id": "u1",
        "a": "5 байтов",
        "b": "32 бита",
        "answer": ">"
      },
      {
        "id": "u2",
        "a": "3072 байта",
        "b": "4 Кбайта",
        "answer": "<"
      },
      {
        "id": "u3",
        "a": "2 Мбайта",
        "b": "1024 Кбайта",
        "answer": ">"
      },
      {
        "id": "u4",
        "a": "64 бита",
        "b": "9 байтов",
        "answer": "<"
      }
    ],
    "explanation": "1 байт = 8 бит; 1 Кбайт = 1024 байта; 1 Мбайт = 1024 Кбайта."
  },
  "pixel": {
    "task": {
      "id": "pixel1",
      "topic": "graphics",
      "difficulty": 1,
      "correctAnswer": "A",
      "explanation": "У растрового изображения при увеличении видны отдельные пиксели. Векторная форма остаётся гладкой."
    }
  }
};
