---
title: Digitize number
tags: math,list
expertise: beginner
firstSeen: 2019-08-20T13:00:27+03:00
lastUpdated: 2020-09-15T16:13:06+03:00
---

Converts a number to a list of digits.

- Use `map()` combined with `int` on the string representation of `n` and return a list from the result.

```py
def digitize(n):
  return list(map(int, str(n)))
```

```py
digitize(123) # [1, 2, 3]
```
