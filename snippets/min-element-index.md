---
title: Index of min element
type: snippet
tags: [math,list]
cover: two-cities
dateModified: 2020-11-02T19:28:27+02:00
---

Returns the index of the element with the minimum value in a list.

- Use `min()` and `list.index()` to obtain the minimum value in the list and then return its index.

```py
def min_element_index(arr):
  return arr.index(min(arr))
```

```py
min_element_index([3, 5, 2, 6, 10, 7, 9]) # 2
```
