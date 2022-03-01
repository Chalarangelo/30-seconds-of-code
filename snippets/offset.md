---
title: Offset list elements
tags: list
expertise: beginner
firstSeen: 2019-08-20T15:53:15+03:00
lastUpdated: 2020-11-02T19:28:27+02:00
---

Moves the specified amount of elements to the end of the list.

- Use slice notation to get the two slices of the list and combine them before returning.

```py
def offset(lst, offset):
  return lst[offset:] + lst[:offset]
```

```py
offset([1, 2, 3, 4, 5], 2) # [3, 4, 5, 1, 2]
offset([1, 2, 3, 4, 5], -2) # [4, 5, 1, 2, 3]
```
