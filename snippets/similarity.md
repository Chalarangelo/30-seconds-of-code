---
title: List similarity
tags: list
expertise: beginner
firstSeen: 2019-08-20T16:12:11+03:00
lastUpdated: 2020-11-02T19:28:35+02:00
---

Returns a list of elements that exist in both lists.

- Use a list comprehension on `a` to only keep values contained in both lists.

```py
def similarity(a, b):
  return [item for item in a if item in b]
```

```py
similarity([1, 2, 3], [1, 2, 4]) # [1, 2]
```
