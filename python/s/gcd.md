---
title: Greatest common divisor
type: snippet
language: python
tags: [math]
cover: digital-nomad-12
dateModified: 2020-09-15T16:13:06+03:00
---

Calculates the greatest common divisor of a list of numbers.

- Use `functools.reduce()` and `math.gcd()` over the given list.

```py
from functools import reduce
from math import gcd as _gcd

def gcd(numbers):
  return reduce(_gcd, numbers)
```

```py
gcd([8, 36, 28]) # 4
```
