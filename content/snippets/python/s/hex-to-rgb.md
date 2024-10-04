---
title: Convert between hex and RGB
language: python
tags: [string,math]
cover: sleepy-cat
excerpt: Converts a hexadecimal color code to a tuple of integers corresponding to its RGB components and vice versa.
listed: false
dateModified: 2024-08-11
---

## Hex to RGB

Converting a hexadecimal color code to a tuple of integers corresponding to its RGB components is fairly simple, All you need to do is use a list comprehension in combination with `int()` and list slice notation to get the RGB components from the hexadecimal string, then use `tuple()` to convert the resulting list to a tuple.

```py
def hex_to_rgb(hex):
  return tuple(int(hex[i:i+2], 16) for i in (0, 2, 4))

hex_to_rgb('FFA501') # (255, 165, 1)
```

## RGB to hex

Converting the values of RGB components to a hexadecimal color code is also straightforward. You can create a placeholder for a zero-padded hexadecimal value using `'{:02X}'` and copy it three times. Then, use `str.format()` on the resulting string to replace the placeholders with the given values.

```py
def rgb_to_hex(r, g, b):
  return ('{:02X}' * 3).format(r, g, b)

rgb_to_hex(255, 165, 1) # 'FFA501'
```
