---
title: is_divisible
tags: math,beginner
unlisted: true
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
