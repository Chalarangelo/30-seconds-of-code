---
title: Test if every list element is falsy
type: snippet
language: python
tags: [list]
cover: jars-on-shelf-2
excerpt: Checks if the provided function returns `True` for at least one element in the list.
listed: true
dateModified: 2020-11-02
---

Checks if the provided function returns `True` for at least one element in the list.

- Use `all()` and `fn` to check if `fn` returns `False` for all the elements in the list.

```py
def none(lst, fn = lambda x: x):
  return all(not fn(x) for x in lst)

none([0, 1, 2, 0], lambda x: x >= 2 ) # False
none([0, 0, 0]) # True
```
