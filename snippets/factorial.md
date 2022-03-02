---
title: Factorial
tags: math,recursion
expertise: beginner
firstSeen: 2018-01-27T07:29:56+02:00
lastUpdated: 2020-09-15T16:13:06+03:00
---

Calculates the factorial of a number.

- Use recursion.
- If `num` is less than or equal to `1`, return `1`.
- Otherwise, return the product of `num` and the factorial of `num - 1`.
- Throws an exception if `num` is a negative or a floating point number.

```py
def factorial(num):
  if not ((num >= 0) and (num % 1 == 0)):
    raise Exception("Number can't be floating point or negative.")
  return 1 if num == 0 else num * factorial(num - 1)
```

```py
factorial(6) # 720
```
