---
title: Find matching value
type: snippet
language: python
tags: [list]
cover: angry-waves
dateModified: 2020-11-02T19:27:53+02:00
---

Finds the value of the first element in the given list that satisfies the provided testing function.

- Use a list comprehension and `next()` to return the first element in `lst` for which `fn` returns `True`.

```py
def find(lst, fn):
  return next(x for x in lst if fn(x))
```

```py
find([1, 2, 3, 4], lambda n: n % 2 == 1) # 1
```
