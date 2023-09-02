---
title: Map number to range
type: snippet
language: python
tags: [math]
cover: round-leaves
dateModified: 2021-04-05T18:25:46+03:00
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
