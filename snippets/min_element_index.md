---
title: min_element_index
tags: list,beginner
---

Returns the index of the element with the minimum value in a list.

- Use `min()` and `list.index()` to obtain the minimum value in the list and then return its index.

```py
def min_element_index(array):
  return array.index(min(array))
```

```py
min_element_index([3, 5, 2, 6, 10, 7, 9]) # 2
```