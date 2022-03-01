---
title: Index of max element
tags: math,list
expertise: beginner
firstSeen: 2019-10-31T09:42:21+02:00
lastUpdated: 2020-11-02T19:28:27+02:00
---

Returns the index of the element with the maximum value in a list.

- Use `max()` and `list.index()` to get the maximum value in the list and return its index.

```py
def max_element_index(arr):
  return arr.index(max(arr))
```

```py
max_element_index([5, 8, 9, 7, 10, 3, 0]) # 4
```
