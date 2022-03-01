---
title: Number is divisible
tags: math
expertise: beginner
unlisted: true
firstSeen: 2019-08-20T14:19:55+03:00
lastUpdated: 2021-01-04T12:47:04+02:00
---

Checks if the first numeric argument is divisible by the second one.

- Use the modulo operator (`%`) to check if the remainder is equal to `0`.

```py
def is_divisible(dividend, divisor):
  return dividend % divisor == 0
```

```py
is_divisible(6, 3) # True
```
