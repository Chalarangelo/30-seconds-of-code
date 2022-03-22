---
title: Pad string
tags: string
expertise: beginner
author: chalarangelo
firstSeen: 2020-10-04T01:53:05+03:00
lastUpdated: 2020-10-04T01:53:05+03:00
---

Pads a string on both sides with the specified character, if it's shorter than the specified length.

- Use `str.ljust()` and `str.rjust()` to pad both sides of the given string.
- Omit the third argument, `char`, to use the whitespace character as the default padding character.

```py
from math import floor

def pad(s, length, char = ' '):
  return s.rjust(floor((len(s) + length)/2), char).ljust(length, char)
```

```py
pad('cat', 8) # '  cat   '
pad('42', 6, '0') # '004200'
pad('foobar', 3) # 'foobar'
```
