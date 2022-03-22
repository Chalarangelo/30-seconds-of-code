---
title: Combine dictionary values
tags: dictionary
expertise: intermediate
author: maciv
firstSeen: 2021-03-07T12:30:47+02:00
lastUpdated: 2021-04-04T14:32:35+03:00
---

Combines two or more dictionaries, creating a list of values for each key.

- Create a new `collections.defaultdict` with `list` as the default value for each key and loop over `dicts`.
- Use `dict.append()` to map the values of the dictionary to keys.
- Use `dict()` to convert the `collections.defaultdict` to a regular dictionary.

```py
from collections import defaultdict

def combine_values(*dicts):
  res = defaultdict(list)
  for d in dicts:
    for key in d:
      res[key].append(d[key])
  return dict(res)
```

```py
d1 = {'a': 1, 'b': 'foo', 'c': 400}
d2 = {'a': 3, 'b': 200, 'd': 400}

combine_values(d1, d2) # {'a': [1, 3], 'b': ['foo', 200], 'c': [400], 'd': [400]}
```
