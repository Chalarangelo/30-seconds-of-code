---
title: Test if every list element is falsy
tags: list
expertise: intermediate
firstSeen: 2019-08-20T15:54:50+03:00
lastUpdated: 2020-11-02T19:28:27+02:00
---

Checks if the provided function returns `True` for at least one element in the list.

- Use `all()` and `fn` to check if `fn` returns `False` for all the elements in the list.

```py
def none(lst, fn = lambda x: x):
  return all(not fn(x) for x in lst)
```

```py
none([0, 1, 2, 0], lambda x: x >= 2 ) # False
none([0, 0, 0]) # True
```
