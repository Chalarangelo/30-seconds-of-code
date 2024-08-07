---
title: Test if every list element is truthy
type: snippet
language: python
tags: [list]
cover: walking
excerpt: Checks if the provided function returns `True` for every element in the list.
listed: true
dateModified: 2020-11-02
---

Checks if the provided function returns `True` for every element in the list.

- Use `all()` in combination with `map()` and `fn` to check if `fn` returns `True` for all elements in the list.

```py
def every(lst, fn = lambda x: x):
  return all(map(fn, lst))

every([4, 2, 3], lambda x: x > 1) # True
every([1, 2, 3]) # True
```
