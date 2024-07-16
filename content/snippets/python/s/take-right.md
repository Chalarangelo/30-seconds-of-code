---
title: Remove list elements from the end
type: snippet
language: python
tags: [list]
cover: three-vases
excerpt: Returns a list with `n` elements removed from the end.
listed: true
dateModified: 2020-09-15
---

Returns a list with `n` elements removed from the end.

- Use slice notation to create a slice of the list with `n` elements taken from the end.

```py
def take_right(itr, n = 1):
  return itr[-n:]

take_right([1, 2, 3], 2) # [2, 3]
take_right([1, 2, 3]) # [3]
```
