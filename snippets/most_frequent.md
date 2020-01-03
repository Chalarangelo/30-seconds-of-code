---
title: most_frequent
tags: list,beginner
---

Returns the most frequent element in a list.

Use `set(list)` to get the unique values in the `list` combined with `max()` to find the element that has the most appearances.

```py
def most_frequent(list):
  return max(set(list), key=list.count)
```

```py
most_frequent([1, 2, 1, 2, 3, 2, 1, 4, 2]) #2
```
