---
title: Remove list elements
type: snippet
language: python
tags: [list]
cover: sea-view-2
excerpt: Returns a list with `n` elements removed from the beginning.
listed: true
dateModified: 2020-09-15
---

Returns a list with `n` elements removed from the beginning.

- Use slice notation to create a slice of the list with `n` elements taken from the beginning.

```py
def take(itr, n = 1):
  return itr[:n]

take([1, 2, 3], 5) # [1, 2, 3]
take([1, 2, 3], 0) # []
```
