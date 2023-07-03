---
title: List difference
type: snippet
language: python
tags: [list]
cover: frog-blue-flower
dateModified: 2020-11-02T19:27:53+02:00
---

Calculates the difference between two iterables, without filtering duplicate values.

- Create a `set` from `b`.
- Use a list comprehension on `a` to only keep values not contained in the previously created set, `_b`.

```py
def difference(a, b):
  _b = set(b)
  return [item for item in a if item not in _b]
```

```py
difference([1, 2, 3], [1, 2, 4]) # [3]
```
