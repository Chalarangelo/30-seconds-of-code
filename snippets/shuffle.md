---
title: Shuffle list
tags: list,random
expertise: advanced
firstSeen: 2018-01-19T11:59:33+02:00
lastUpdated: 2020-11-02T19:28:35+02:00
---

Randomizes the order of the values of an list, returning a new list.

- Uses the [Fisher-Yates algorithm](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle) to reorder the elements of the list.
- [`random.shuffle`](https://docs.python.org/3/library/random.html#random.shuffle) provides similar functionality to this snippet.

```py
from copy import deepcopy
from random import randint

def shuffle(lst):
  temp_lst = deepcopy(lst)
  m = len(temp_lst)
  while (m):
    m -= 1
    i = randint(0, m)
    temp_lst[m], temp_lst[i] = temp_lst[i], temp_lst[m]
  return temp_lst
```

```py
foo = [1, 2, 3]
shuffle(foo) # [2, 3, 1], foo = [1, 2, 3]
```
