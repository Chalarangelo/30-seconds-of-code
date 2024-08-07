---
title: Number in range
type: snippet
language: python
tags: [math]
cover: pineapple-on-green
excerpt: Checks if the given number falls within the given range.
listed: true
dateModified: 2020-09-15
---

Checks if the given number falls within the given range.

- Use arithmetic comparison to check if the given number is in the specified range.
- If the second parameter, `end`, is not specified, the range is considered to be from `0` to `start`.

```py
def in_range(n, start, end = 0):
  return start <= n <= end if end >= start else end <= n <= start

in_range(3, 2, 5) # True
in_range(3, 4) # True
in_range(2, 3, 5) # False
in_range(3, 2) # False
```
