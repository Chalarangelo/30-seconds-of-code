---
title: Count occurrences
type: snippet
language: python
tags: [list]
cover: pineapple-at-work
dateModified: 2021-01-10
---

Counts the occurrences of a value in a list.

- Use `list.count()` to count the number of occurrences of `val` in `lst`.

```py
def count_occurrences(lst, val):
  return lst.count(val)
```

```py
count_occurrences([1, 1, 2, 1, 2, 3], 1) # 3
```
