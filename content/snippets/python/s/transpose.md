---
title: Transpose matrix
type: snippet
language: python
tags: [list]
cover: lake-bench
excerpt: Transposes a two-dimensional list.
listed: true
dateModified: 2020-11-02
---

Transposes a two-dimensional list.

- Use `*lst` to get the provided list as tuples.
- Use `zip()` in combination with `list()` to create the transpose of the given two-dimensional list.

```py
def transpose(lst):
  return list(zip(*lst))

transpose([[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]])
# [(1, 4, 7, 10), (2, 5, 8, 11), (3, 6, 9, 12)]
```
