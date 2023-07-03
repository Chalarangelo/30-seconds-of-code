---
title: Find last matching value
type: snippet
language: python
tags: [list]
cover: tropical-waterfall
dateModified: 2020-11-02T19:27:53+02:00
---

Finds the value of the last element in the given list that satisfies the provided testing function.

- Use a list comprehension and `next()` to return the last element in `lst` for which `fn` returns `True`.

```py
def find_last(lst, fn):
  return next(x for x in lst[::-1] if fn(x))
```

```py
find_last([1, 2, 3, 4], lambda n: n % 2 == 1) # 3
```
