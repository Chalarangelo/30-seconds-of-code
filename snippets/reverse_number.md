---
title: Reverse number
tags: math
expertise: intermediate
author: maciv
firstSeen: 2020-10-04T14:21:41+03:00
lastUpdated: 2020-11-02T19:28:27+02:00
---

Reverses a number.

- Use `str()` to convert the number to a string, slice notation to reverse it and `str.replace()` to remove the sign.
- Use `float()` to convert the result to a number and `math.copysign()` to copy the original sign.

```py
from math import copysign

def reverse_number(n):
  return copysign(float(str(n)[::-1].replace('-', '')), n)
```

```py
reverse_number(981) # 189
reverse_number(-500) # -5
reverse_number(73.6) # 6.37
reverse_number(-5.23) # -32.5
```
