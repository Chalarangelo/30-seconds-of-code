---
title: min_n
tags: list,math,beginner
---

Returns the `n` minimum elements from the provided list. 
If `n` is greater than or equal to the provided list's length, then return the original list (sorted in ascending order).

- Use `sorted() to sort the list, `[:n]` to get the specified number of elements.
- Omit the second argument, `n`, to get a one-element list.

```py
def min_n(lst, n=1):
  return sorted(lst, reverse=False)[:n]
```

```py
min_n([1, 2, 3]) # [1]
min_n([1, 2, 3], 2) # [1,2]
```
