---
title: count_by
tags: list,intermediate
---

Groups the elements of a list based on the given function and returns the count of elements in each group.

Use `map()` to map the values of the given list using the given function.
Iterate over the map and increase the element count each time it occurs.

```py
def count_by(arr, fn=lambda x: x):
  key = {}
  for el in map(fn, arr):
    key[el] = 1 if el not in key else key[el] + 1
  return key
```

```py
from math import floor
count_by([6.1, 4.2, 6.3], floor) # {6: 2, 4: 1}
count_by(['one', 'two', 'three'], len) # {3: 2, 5: 1}
```
