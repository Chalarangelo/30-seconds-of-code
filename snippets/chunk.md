---
title: Split list into chunks
tags: list
expertise: intermediate
firstSeen: 2018-01-09T06:39:42+02:00
lastUpdated: 2020-11-02T19:27:07+02:00
---

Chunks a list into smaller lists of a specified size.

- Use `list()` and `range()` to create a list of the desired `size`.
- Use `map()` on the list and fill it with splices of the given list.
- Finally, return the created list.

```py
from math import ceil

def chunk(lst, size):
  return list(
    map(lambda x: lst[x * size:x * size + size],
      list(range(ceil(len(lst) / size)))))
```

```py
chunk([1, 2, 3, 4, 5], 2) # [[1, 2], [3, 4], [5]]
```
