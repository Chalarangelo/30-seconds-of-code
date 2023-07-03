---
title: Check if two iterables are permutations of each other
shortTitle: Iterable permutations
type: snippet
language: python
tags: [list,string]
cover: apples
dateModified: 2023-05-23T10:48:03+03:00
---

Check if two iterables are permutations of each other.

- Use `len` to check if both iterables have the same length.
- Use `Counter` to verify that each element appears an equal number of times in both iterables.

```py
from collections import Counter

def is_perm(items0, items1):
  return len(items0) == len(items1) and Counter(items0) == Counter(items1)
```

```py
is_perm([1, 2, 3], [4, 1, 6]) # False
is_perm([1, 2], [2, 1]) # True

is_perm("dad", "add") # True
is_perm("snack", "track") # False
```
