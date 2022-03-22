---
title: Geometric progression
tags: math,list
expertise: intermediate
author: maciv
firstSeen: 2020-10-04T12:19:28+03:00
lastUpdated: 2020-11-02T19:28:05+02:00
---

Initializes a list containing the numbers in the specified range where `start` and `end` are inclusive and the ratio between two terms is `step`.

- Use `range()`, `math.log()` and `math.floor()` and a list comprehension to create a list of the appropriate length, applying the step for each element.
- Returns an error if `step` equals `1`.
- Omit the second argument, `start`, to use a default value of `1`.
- Omit the third argument, `step`, to use a default value of `2`.

```py
from math import floor, log

def geometric_progression(end, start=1, step=2):
  return [start * step ** i for i in range(floor(log(end / start)
          / log(step)) + 1)]
```

```py
geometric_progression(256) # [1, 2, 4, 8, 16, 32, 64, 128, 256]
geometric_progression(256, 3) # [3, 6, 12, 24, 48, 96, 192]
geometric_progression(256, 1, 4) # [1, 4, 16, 64, 256]
```
