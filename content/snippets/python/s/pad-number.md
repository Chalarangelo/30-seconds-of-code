---
title: Pad number
type: snippet
language: python
tags: [string,math]
cover: umbrellas
excerpt: Pads a given number to the specified length.
listed: true
dateModified: 2020-11-02
---

Pads a given number to the specified length.

- Use `str.zfill()` to pad the number to the specified length, after converting it to a string.

```py
def pad_number(n, l):
  return str(n).zfill(l)

pad_number(1234, 6); # '001234'
```
