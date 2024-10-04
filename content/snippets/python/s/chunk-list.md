---
title: Split a Python list into chunks
shortTitle: Split list into chunks
language: python
tags: [list]
cover: succulent-10
excerpt: Chunks a list into a set amount of smaller lists or into lists of a specified size.
listed: false
dateModified: 2024-07-17
---

## Split a Python list into `n` chunks

In order to chunk a list into `n` smaller lists, you first need to calculate the size of each chunk, using `math.ceil()` and `len()`. Then, you can create a new list of size `n` using `list()` and `range()`.

Finally, you can use `map()` to map each element of the new list to a chunk the length of `size`. If the original list can't be split evenly, the final chunk will contain the remaining elements.

```py
from math import ceil

def chunk_into_n(lst, n):
  size = ceil(len(lst) / n)
  return list(
    map(lambda x: lst[x * size:x * size + size],
    list(range(n)))
  )

chunk_into_n([1, 2, 3, 4, 5, 6, 7], 4) # [[1, 2], [3, 4], [5, 6], [7]]
```

## Split a Python list into chunks of a specified size

Similarly, you can chunk a list into smaller lists of a specified size. You can use the same approach as above, but instead of calculating the size of each chunk, you can use the specified size directly.

```py
from math import ceil

def chunk(lst, size):
  return list(
    map(lambda x: lst[x * size:x * size + size],
      list(range(ceil(len(lst) / size)))))

chunk([1, 2, 3, 4, 5], 2) # [[1, 2], [3, 4], [5]]
```
