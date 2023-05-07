---
title: Partial sum list
type: snippet
language: python
tags: [list]
cover: digital-nomad-16
dateModified: 2021-01-13T23:30:41+02:00
---

Creates a list of partial sums.

- Use `itertools.accumulate()` to create the accumulated sum for each element.
- Use `list()` to convert the result into a list.

```py
from itertools import accumulate

def cumsum(lst):
  return list(accumulate(lst))
```

```py
cumsum(range(0, 15, 3)) # [0, 3, 9, 18, 30]
```
