---
title: Drop list elements from the right
type: snippet
language: python
tags: [list]
cover: digital-nomad-7
excerpt: Returns a list with `n` elements removed from the right.
listed: true
dateModified: 2020-11-02
---

Returns a list with `n` elements removed from the right.

- Use slice notation to remove the specified number of elements from the right.
- Omit the last argument, `n`, to use a default value of `1`.

```py
def drop_right(a, n = 1):
  return a[:-n]

drop_right([1, 2, 3]) # [1, 2]
drop_right([1, 2, 3], 2) # [1]
drop_right([1, 2, 3], 42) # []
```
