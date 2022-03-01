---
title: Sum list based on function
tags: math,list
expertise: beginner
firstSeen: 2019-08-21T08:30:04+03:00
lastUpdated: 2020-11-02T19:28:35+02:00
---

Calculates the sum of a list, after mapping each element to a value using the provided function.

- Use `map()` with `fn` to map each element to a value using the provided function.
- Use `sum()` to return the sum of the values.

```py
def sum_by(lst, fn):
  return sum(map(fn, lst))
```

```py
sum_by([{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }], lambda v : v['n']) # 20
```
