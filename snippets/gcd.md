---
title: gcd
tags: math,beginner
---

Calculates the greatest common divisor of a list of numbers.

Use `reduce()` and `math.gcd` over the given list.

```py
from functools import reduce
import math

def gcd(numbers):
  return reduce(math.gcd, numbers)
```

```py
gcd([8,36,28]) # 4
```