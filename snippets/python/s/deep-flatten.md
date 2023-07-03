---
title: Deep flatten list
type: snippet
language: python
tags: [list,recursion]
cover: standing-stones
dateModified: 2020-12-29T19:53:45+02:00
---

Deep flattens a list.

- Use recursion.
- Use `isinstance()` with `collections.abc.Iterable` to check if an element is iterable.
- If it is iterable, apply `deep_flatten()` recursively, otherwise return `[lst]`.

```py
from collections.abc import Iterable

def deep_flatten(lst):
  return ([a for i in lst for a in
          deep_flatten(i)] if isinstance(lst, Iterable) else [lst])
```

```py
deep_flatten([1, [2], [[3], 4], 5]) # [1, 2, 3, 4, 5]
```
