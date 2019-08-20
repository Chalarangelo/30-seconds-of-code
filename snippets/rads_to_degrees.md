---
title: rads_to_degrees
tags: math,beginner
---

Converts an angle from radians to degrees.

Use `math.pi` and the radian to degree formula to convert the angle from radians to degrees.

```py
import math

def rads_to_degrees(rad):
  return (rad * 180.0) / math.pi
```

```py
import math
rads_to_degrees(math.pi / 2) # 90.0
```
