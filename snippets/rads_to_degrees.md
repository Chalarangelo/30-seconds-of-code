---
title: Radians to degrees
tags: math
expertise: beginner
firstSeen: 2019-08-20T15:58:57+03:00
lastUpdated: 2020-11-02T19:28:27+02:00
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
