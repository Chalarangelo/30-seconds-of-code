---
title: List difference based on function
tags: list,function
expertise: intermediate
firstSeen: 2018-02-08T15:59:27+02:00
lastUpdated: 2020-11-02T19:27:53+02:00
---

Returns the difference between two lists, after applying the provided function to each list element of both.

- Create a `set`, using `map()` to apply `fn` to each element in `b`.
- Use a list comprehension in combination with `fn` on `a` to only keep values not contained in the previously created set, `_b`.

```py
def difference_by(a, b, fn):
  _b = set(map(fn, b))
  return [item for item in a if fn(item) not in _b]
```

```py
from math import floor

difference_by([2.1, 1.2], [2.3, 3.4], floor) # [1.2]
difference_by([{ 'x': 2 }, { 'x': 1 }], [{ 'x': 1 }], lambda v : v['x'])
# [ { x: 2 } ]
```
