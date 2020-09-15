---
title: average_by
tags: math,list,function,intermediate
---

Returns the average of a list, after mapping each element to a value using the provided function.

- Use `map()` to map each element to the value returned by `fn`.
- Use `sum()` to sum all of the mapped values, divide by `len(lst)`.

```py
def average_by(lst, fn=lambda x: x):
  return sum(map(fn, lst), 0.0) / len(lst)
```

```py
average_by([{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }], lambda x: x['n']) # 5.0
```
