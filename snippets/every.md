---
title: Test if every list element is truthy
tags: list
expertise: intermediate
firstSeen: 2019-08-20T11:34:24+03:00
lastUpdated: 2020-11-02T19:27:53+02:00
---

Checks if the provided function returns `True` for every element in the list.

- Use `all()` in combination with `map()` and `fn` to check if `fn` returns `True` for all elements in the list.

```py
def every(lst, fn = lambda x: x):
  return all(map(fn, lst))
```

```py
every([4, 2, 3], lambda x: x > 1) # True
every([1, 2, 3]) # True
```
