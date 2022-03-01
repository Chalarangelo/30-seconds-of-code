---
title: Min list value based on function
tags: math,list
expertise: beginner
firstSeen: 2019-08-20T15:42:41+03:00
lastUpdated: 2020-11-02T19:28:27+02:00
---

Returns the minimum value of a list, after mapping each element to a value using the provided function.

- Use `map()` with `fn` to map each element to a value using the provided function.
- Use `min()` to return the minimum value.

```py
def min_by(lst, fn):
  return min(map(fn, lst))
```

```py
min_by([{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }], lambda v : v['n']) # 2
```
