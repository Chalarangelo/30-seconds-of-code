---
title: chunk_into_n
tags: list,intermediate
---

Chunks a list into `n` smaller lists.

- Use `math.ceil()` and `len()` to get the size of each chunk.
- Use `list()` and `range()` to create a new list of size `n`.
- Use `map()` to map each element of the new list to a chunk the length of `size`.
- If the original list can't be split evenly, the final chunk will contain the remaining elements.

```py
from math import ceil

def chunk_into_n(lst, n):
  size = ceil(len(lst) / n)
  return list(
    map(lambda x: lst[x * size:x * size + size],
    list(range(n)))
  )
```

```py
chunk_into_n([1, 2, 3, 4, 5, 6, 7], 4) # [[1, 2], [3, 4], [5, 6], [7]]
```
