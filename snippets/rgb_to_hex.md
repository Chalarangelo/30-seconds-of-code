---
title: rgb_to_hex
tags: string,math,intermediate
---

Converts the values of RGB components to a hexadecimal color code.

- Create a placeholder for a zero-padded hexadecimal value using `'{:02X}'` and copy it three times.
- Use `str.format()` on the resulting string to replace the placeholders with the given values.

```py
def rgb_to_hex(r, g, b):
  return ('{:02X}' * 3).format(r, g, b)
```

```py
rgb_to_hex(255, 165, 1) # 'FFA501'
```
