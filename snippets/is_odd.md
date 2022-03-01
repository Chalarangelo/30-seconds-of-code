---
title: Number is odd
tags: math
expertise: beginner
unlisted: true
firstSeen: 2019-08-20T14:21:44+03:00
lastUpdated: 2021-01-04T12:47:04+02:00
---

Checks if the given number is odd.

- Checks whether a number is even or odd using the modulo (`%`) operator.
- Returns `True` if the number is odd, `False` if the number is even.

```py
def is_odd(num):
  return num % 2 != 0
```

```py
is_odd(3) # True
```
