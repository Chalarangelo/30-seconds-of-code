---
title: Degrees to radians
type: snippet
language: python
tags: [math]
cover: digital-nomad-6
dateModified: 2020-11-02T19:27:53+02:00
---

Converts an angle from degrees to radians.

- Use `math.pi` and the degrees to radians formula to convert the angle from degrees to radians.

```py
from math import pi

def degrees_to_rads(deg):
  return (deg * pi) / 180.0
```

```py
degrees_to_rads(180) # ~3.1416
```
