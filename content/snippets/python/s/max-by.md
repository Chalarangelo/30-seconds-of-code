---
title: Max list value based on function
type: snippet
language: python
tags: [math,list]
cover: digital-nomad-3
excerpt: Returns the maximum value of a list, after mapping each element to a value using the provided function.
listed: true
dateModified: 2020-11-02
---

Returns the maximum value of a list, after mapping each element to a value using the provided function.

- Use `map()` with `fn` to map each element to a value using the provided function.
- Use `max()` to return the maximum value.

```py
def max_by(lst, fn):
  return max(map(fn, lst))

max_by([{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }], lambda v : v['n']) # 8
```
