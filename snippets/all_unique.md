---
title: Check if list has no duplicates
tags: list
expertise: beginner
firstSeen: 2018-04-01T11:03:09+03:00
lastUpdated: 2021-01-07T23:30:28+02:00
---

Checks if all the values in a list are unique.

- Use `set()` on the given list to keep only unique occurrences.
- Use `len()` to compare the length of the unique values to the original list.

```py
def all_unique(lst):
  return len(lst) == len(set(lst))
```

```py
x = [1, 2, 3, 4, 5, 6]
y = [1, 2, 2, 3, 4, 5]
all_unique(x) # True
all_unique(y) # False
```
