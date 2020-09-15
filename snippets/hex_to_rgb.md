---
title: hex_to_rgb
tags: string,math,intermediate
---

Converts a hexadecimal color code to a tuple of integers corresponding to its RGB components.

- Use a list comprehension in combination with `int()` and list slice notation to get the RGB components from the hexadecimal string.
- Use `tuple()` to convert the resulting list to a tuple.

```py
def hex_to_rgb(hex):
  return tuple(int(hex[i:i+2], 16) for i in (0, 2, 4))
```

```py
hex_to_rgb('FFA501') # (255, 165, 1)
```
