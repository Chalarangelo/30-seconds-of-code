---
title: Number in range
tags: math
expertise: beginner
firstSeen: 2019-08-20T13:41:40+03:00
lastUpdated: 2020-09-15T16:13:06+03:00
---

Checks if the given number falls within the given range.

- Use arithmetic comparison to check if the given number is in the specified range.
- If the second parameter, `end`, is not specified, the range is considered to be from `0` to `start`.

```py
def in_range(n, start, end = 0):
  return start <= n <= end if end >= start else end <= n <= start
```

```py
in_range(3, 2, 5) # True
in_range(3, 4) # True
in_range(2, 3, 5) # False
in_range(3, 2) # False
```
