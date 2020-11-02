---
title: initialize_list_with_range
tags: list,beginner
---

Initializes a list containing the numbers in the specified range where `start` and `end` are inclusive with their common difference `step`.

- Use `list()` and `range()` to generate a list of the appropriate length, filled with the desired values in the given range.
- Omit `start` to use the default value of `0`.
- Omit `step` to use the default value of `1`.

```py
def initialize_list_with_range(end, start = 0, step = 1):
  return list(range(start, end + 1, step))
```

```py
initialize_list_with_range(5) # [0, 1, 2, 3, 4, 5]
initialize_list_with_range(7, 3) # [3, 4, 5, 6, 7]
initialize_list_with_range(9, 0, 2) # [0, 2, 4, 6, 8]
```
