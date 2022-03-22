---
title: Remove list elements from the end
tags: list
expertise: beginner
author: chalarangelo
firstSeen: 2020-03-16T19:52:44+02:00
lastUpdated: 2020-09-15T16:13:06+03:00
---

Returns a list with `n` elements removed from the end.

- Use slice notation to create a slice of the list with `n` elements taken from the end.

```py
def take_right(itr, n = 1):
  return itr[-n:]
```

```py
take_right([1, 2, 3], 2) # [2, 3]
take_right([1, 2, 3]) # [3]
```
