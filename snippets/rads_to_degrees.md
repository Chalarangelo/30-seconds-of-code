---
title: rads_to_degrees
tags: math,beginner
---

Converts an angle from radians to degrees.

- Use `math.pi` and the radian to degree formula to convert the angle from radians to degrees.

```py
from math import pi

def rads_to_degrees(rad):
  return (rad * 180.0) / pi
```

```py
from math import pi

rads_to_degrees(pi / 2) # 90.0
```
