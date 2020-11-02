---
title: chunk
tags: list,intermediate
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
