---
title: Offset the elements of a Python list
shortTitle: Offset
language: python
tags: [list]
cover: digital-nomad-10
excerpt: Move a specified amount of elements to the end of a list.
listed: false
dateModified: 2024-05-24
---

Have you ever wanted to move a specified amount of elements to the end of a list? This can be useful when you want to rotate the elements of a list or reorder them in a specific way.

The only thing you really need is to use slice notation to get the two slices of the list and combine them before returning. This way, you can easily move the elements to the end of the list, by rearranging the order of the slices.

```py
def offset(lst, offset):
  return lst[offset:] + lst[:offset]

offset([1, 2, 3, 4, 5], 2) # [3, 4, 5, 1, 2]
offset([1, 2, 3, 4, 5], -2) # [4, 5, 1, 2, 3]
```
