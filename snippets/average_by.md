---
title: Mapped list average
tags: math,list
expertise: intermediate
firstSeen: 2019-08-20T11:55:10+03:00
lastUpdated: 2020-11-02T19:27:07+02:00
---

Calculates the average of a list, after mapping each element to a value using the provided function.

- Use `map()` to map each element to the value returned by `fn`.
- Use `sum()` to sum all of the mapped values, divide by `len(lst)`.
- Omit the last argument, `fn`, to use the default identity function.

```py
def average_by(lst, fn = lambda x: x):
  return sum(map(fn, lst), 0.0) / len(lst)
```

```py
average_by([{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }], lambda x: x['n'])
# 5.0
```
