---
title: Group list elements
tags: list,dictionary
expertise: intermediate
firstSeen: 2019-08-20T13:29:00+03:00
lastUpdated: 2020-11-02T19:28:05+02:00
---

Groups the elements of a list based on the given function.

- Use `collections.defaultdict` to initialize a dictionary.
- Use `fn` in combination with a `for` loop and `dict.append()` to populate the dictionary.
- Use `dict()` to convert it to a regular dictionary.

```py
from collections import defaultdict

def group_by(lst, fn):
  d = defaultdict(list)
  for el in lst:
    d[fn(el)].append(el)
  return dict(d)
```

```py
from math import floor

group_by([6.1, 4.2, 6.3], floor) # {4: [4.2], 6: [6.1, 6.3]}
group_by(['one', 'two', 'three'], len) # {3: ['one', 'two'], 5: ['three']}
```
