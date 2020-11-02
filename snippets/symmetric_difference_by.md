---
title: symmetric_difference_by
tags: list,intermediate
---

Returns the symmetric difference between two lists, after applying the provided function to each list element of both.

- Create a `set` by applying `fn` to each element in every list.
- Use a list comprehension in combination with `fn` on each of them to only keep values not contained in the previously created set of the other.

```py
def symmetric_difference_by(a, b, fn):
  (_a, _b) = (set(map(fn, a)), set(map(fn, b)))
  return [item for item in a if fn(item) not in _b] + [item
          for item in b if fn(item) not in _a]
```

```py
from math import floor

symmetric_difference_by([2.1, 1.2], [2.3, 3.4], floor) # [1.2, 3.4]
```
