---
title: symmetric_difference
tags: list,intermediate
---

Returns the symmetric difference between two iterables, without filtering out duplicate values.

- Create a `set` from each list.
- Use a list comprehension on each of them to only keep values not contained in the previously created set of the other.

```py
def symmetric_difference(a, b):
  (_a, _b) = (set(a), set(b))
  return [item for item in a if item not in _b] + [item for item in b
          if item not in _a]
```

```py
symmetric_difference([1, 2, 3], [1, 2, 4]) # [3, 4]
```
