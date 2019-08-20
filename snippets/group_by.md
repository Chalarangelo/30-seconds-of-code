---
title: group_by
tags: list,object,beginner
---

Groups the elements of a list based on the given function.

Use `list()` in combination with `map()` and `fn` to map the values of the list to the keys of an object.
Use list comprehension to map each element to the appropriate `key`.

```py
def group_by(lst, fn):
  groups = {}
  for key in list(map(fn,lst)):
    groups[key] = [item for item in lst if fn(item) == key]
  return groups
```

```py
import math
group_by([6.1, 4.2, 6.3], math.floor); # {4: [4.2], 6: [6.1, 6.3]}
group_by(['one', 'two', 'three'], 'length'); # {3: ['one', 'two'], 5: ['three']}
```
