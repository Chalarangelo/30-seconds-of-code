---
title: num_to_range
tags: math,beginner
---

Maps a number from one range to another range.

- Return `num` mapped between `outMin`-`outMax` from `inMin`-`inMax`.

```py
def num_to_range(num, inMin, inMax, outMin, outMax):
  return outMin + (float(num - inMin) / float(inMax - inMin) * (outMax
                  - outMin))
```

```py
num_to_range(5, 0, 10, 0, 100) # 50.0
```
