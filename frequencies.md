---
title: frequencies
tags: list,intermediate
---

Returns a dictionary with the unique values of a list as keys and their frequencies as the values.

Use a `for` loop to populate a dictionary, `f`, with the unique values in `lst` as keys, adding to existing keys every time the same value is encountered.

```py
from functools import reduce

def frequencies(lst):
  f = {}
  for x in lst:
    f[x] = f[x] + 1 if x in f else 1
  return f
```

```py
frequencies(['a', 'b', 'a', 'c', 'a', 'a', 'b']) # { 'a': 4, 'b': 2, 'c': 1 }
```
