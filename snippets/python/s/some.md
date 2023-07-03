---
title: Test if some list elements are truthy
type: snippet
language: python
tags: [list]
cover: leafy-screens
dateModified: 2020-11-02T19:28:35+02:00
---

Checks if the provided function returns `True` for at least one element in the list.

- Use `any()` in combination with `map()` to check if `fn` returns `True` for any element in the list.

```py
def some(lst, fn = lambda x: x):
  return any(map(fn, lst))
```

```py
some([0, 1, 2, 0], lambda x: x >= 2 ) # True
some([0, 0, 1, 0]) # True
```
