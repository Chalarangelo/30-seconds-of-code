---
title: N min elements
type: snippet
language: python
tags: [list,math]
cover: balloons
excerpt: Returns the `n` minimum elements from the provided list.
listed: true
dateModified: 2020-11-02
---

Returns the `n` minimum elements from the provided list.

- Use `sorted()` to sort the list.
- Use slice notation to get the specified number of elements.
- Omit the second argument, `n`, to get a one-element list.
- If `n` is greater than or equal to the provided list's length, then return the original list (sorted in ascending order).

```py
def min_n(lst, n = 1):
  return sorted(lst, reverse = False)[:n]

min_n([1, 2, 3]) # [1]
min_n([1, 2, 3], 2) # [1, 2]
```
