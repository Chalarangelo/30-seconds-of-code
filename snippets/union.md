---
title: List union
tags: list
expertise: beginner
firstSeen: 2019-08-21T09:10:39+03:00
lastUpdated: 2020-11-02T19:28:35+02:00
---

Returns every element that exists in any of the two lists once.

- Create a `set` with all values of `a` and `b` and convert to a `list`.

```py
def union(a, b):
  return list(set(a + b))
```

```py
union([1, 2, 3], [4, 3, 2]) # [1, 2, 3, 4]
```
