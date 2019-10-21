---
title: max_element_pos
tags: list,beginner
---

find the position of larger Element

using `list.index()` and `max()` function we can get the position of the max element in the list (for min element's possition change the `max()` to `min()`)

```py
def max_element_pos(arr):
  return arr.index(max(arr)) + 1
```

```py
max_element_pos([5, 8, 9, 7, 10, 3, 0]) # 5
```