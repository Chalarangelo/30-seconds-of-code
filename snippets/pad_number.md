---
title: pad_number
tags: string,math,beginner
---

Pads a given number to the specified length.

- Use `str.zfill()` to pad the number to the specified length, after converting it to a string.

```py
def pad_number(n, l):
  return str(n).zfill(l)
```

```py
pad_number(1234, 6); # '001234'
```
