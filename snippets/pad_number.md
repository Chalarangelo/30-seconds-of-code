---
title: Pad number
tags: string,math
expertise: beginner
firstSeen: 2020-10-04T01:42:19+03:00
lastUpdated: 2020-11-02T19:28:27+02:00
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
