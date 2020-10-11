---
title: indices_of_occurrence
tags: list,beginner
---

Returns a list of indices of all the occurrences of an element in a list.

- Use `enumerate()` to get index and value simultaneously while iterating.
- Use `==` to check equality, if current element `val` is equal to `value`. Then `idx` to list.

```py
def indices_of_occurrence(lst, value):
  return [idx for idx, val in enumerate(lst) if val == value]
```

```py
indices_of_occurrence([1, 2, 1, 4, 5, 1], 1) # [0, 2, 5]
indices_of_occurrence([1, 2, 3, 4], 6) # [] 
```
