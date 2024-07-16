---
title: Drop list elements from the left
type: snippet
language: python
tags: [list]
cover: pink-flower
excerpt: Returns a list with `n` elements removed from the left.
listed: true
dateModified: 2020-11-02
---

Returns a list with `n` elements removed from the left.

- Use slice notation to remove the specified number of elements from the left.
- Omit the last argument, `n`, to use a default value of `1`.

```py
def drop(a, n = 1):
  return a[n:]

drop([1, 2, 3]) # [2, 3]
drop([1, 2, 3], 2) # [3]
drop([1, 2, 3], 42) # []
```
