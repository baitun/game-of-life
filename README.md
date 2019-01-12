# Game of Life (Игра)

Этот репозиторий - практическая реализация учебного проекта [codedojo.ru](https://codedojo.ru/)

Ссылки:

* [Стать на Википедии](https://ru.m.wikipedia.org/wiki/%D0%96%D0%B8%D0%B7%D0%BD%D1%8C_(%D0%B8%D0%B3%D1%80%D0%B0))
* [Видео на YouTube](https://youtu.be/CgOcEZinQ2I)

---

Симуляция жизни клеток, основанная на простых правилах:

1. Если **живая** клетка окружена меньше чем **двумя** живыми соседями - клетка **умирает**.
2. Если **живая** клетка окружена **двумя или тремя** живыми соседями - клетка продолжает **жить**.
3. Если **живая** клетка окружена **тремя и более** соседями - клетка **умирает**.
4. Если **мертвая** клетка окружена **тремя** живыми соседями - клетка **оживает**.

Давайте посмотрим на примере сетки 5x5.

Это начальная конфигурация клеток (# - живые клетки):

```
[ ][ ][ ][ ][ ]
[ ][#][ ][ ][ ]
[ ][ ][#][#][ ]
[ ][#][#][ ][ ]
[ ][ ][ ][ ][ ]
```

Для применения правил, нам понадобится еще одна чистая сетка.

После применения правил для **каждой** клетки, мы получим следующее расположение нового поколения клеток.

```
[ ][ ][ ][ ][ ]
[ ][ ][#][ ][ ]
[ ][ ][ ][#][ ]
[ ][#][#][#][ ]
[ ][ ][ ][ ][ ]

```

И так далее.