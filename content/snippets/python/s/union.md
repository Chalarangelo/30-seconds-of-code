---
title: List union
type: snippet
language: python
tags: [list]
cover: river-houses
excerpt: Returns every element that exists in any of the two lists once.
listed: true
dateModified: 2020-11-02
---

Returns every element that exists in any of the two lists once.

- Create a `set` with all values of `a` and `b` and convert to a `list`.

```py
def union(a, b):
  return list(set(a + b))

union([1, 2, 3], [4, 3, 2]) # [1, 2, 3, 4]
```
