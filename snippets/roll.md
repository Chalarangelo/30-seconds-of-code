---
title: roll
tags: list,beginner
---

Moves the specified amount of elements to the start of the list.

- Use slice notation to get the two slices of the list and combine them before returning.

```py
def roll(lst, offset):
  return lst[-offset:] + lst[:-offset]
```

```py
roll([1, 2, 3, 4, 5], 2) # [4, 5, 1, 2, 3]
roll([1, 2, 3, 4, 5], -2) # [3, 4, 5, 1, 2]
```
