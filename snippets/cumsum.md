---
title: cumsum
tags: list,intermediate
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
