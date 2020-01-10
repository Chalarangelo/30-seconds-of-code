---
title: max_element_index
tags: list,beginner
---

Returns the index of the element with the maximum value in a list.

Use `max()` and `list.index()` to get the maximum value in the list and return its index.

```py
def max_element_index(arr):
  return arr.index(max(arr))
```

```python
max_element_index([5, 8, 9, 7, 10, 3, 0]) # 4
```
