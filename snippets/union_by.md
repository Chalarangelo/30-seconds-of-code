---
title: List union based on function
tags: list
expertise: intermediate
firstSeen: 2019-08-21T09:10:39+03:00
lastUpdated: 2020-11-02T19:28:35+02:00
---

Returns every element that exists in any of the two lists once, after applying the provided function to each element of both.

- Create a `set` by applying `fn` to each element in `a`.
- Use a list comprehension in combination with `fn` on `b` to only keep values not contained in the previously created set, `_a`.
- Finally, create a `set` from the previous result and `a` and transform it into a `list`

```py
def union_by(a, b, fn):
  _a = set(map(fn, a))
  return list(set(a + [item for item in b if fn(item) not in _a]))
```

```py
from math import floor

union_by([2.1], [1.2, 2.3], floor) # [2.1, 1.2]
```
