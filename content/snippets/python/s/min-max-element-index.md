---
title: Index of min or max element
language: python
tags: [math,list]
cover: two-cities
excerpt: Find the index of the element with the minimum or maximum value in a list.
listed: false
dateModified: 2024-07-18
---

To find the index of the element with the minimum or maximum value in a list, you can use the `min()` and `max()` functions to get the minimum or maximum value in the list, and then use the `list.index()` method to find the index of that value.

```py
def min_element_index(arr):
  return arr.index(min(arr))

def max_element_index(arr):
  return arr.index(max(arr))

min_element_index([3, 5, 2, 6, 10, 7, 9]) # 2
max_element_index([3, 5, 2, 6, 10, 7, 9]) # 4
```
