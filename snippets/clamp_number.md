---
title: clamp_number
tags: math,beginner
---

Clamps `num` within the inclusive range specified by the boundary values.

- If `num` falls within the range (`a`, `b`), return `num`.
- Otherwise, return the nearest number in the range.

```py
def clamp_number(num, a, b):
  return max(min(num, max(a, b)), min(a, b))
```

```py
clamp_number(2, 3, 5) # 3
clamp_number(1, -1, -5) # -1
```
