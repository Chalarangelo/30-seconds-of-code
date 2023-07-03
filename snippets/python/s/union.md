---
title: List union
type: snippet
language: python
tags: [list]
cover: river-houses
dateModified: 2020-11-02T19:28:35+02:00
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
