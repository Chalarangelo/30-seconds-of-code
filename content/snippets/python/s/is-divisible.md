---
title: Number is divisible
type: snippet
language: python
tags: [math]
cover: interior-9
excerpt: Checks if the first numeric argument is divisible by the second one.
listed: false
dateModified: 2021-01-04
---

Checks if the first numeric argument is divisible by the second one.

- Use the modulo operator (`%`) to check if the remainder is equal to `0`.

```py
def is_divisible(dividend, divisor):
  return dividend % divisor == 0

is_divisible(6, 3) # True
```
