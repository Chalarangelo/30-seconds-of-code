---
title: Invert a dictionary
language: python
tags: [dictionary]
cover: working-bee
excerpt: Invert a dictionary with non-unique hashable values.
listed: false
dateModified: 2024-05-08
---

You can invert a dictionary with non-unique hashable values, using some simple Python code. First, you need to use a `collections.defaultdict` with `list` as the default value for each key.

Then, you can map the values of the dictionary to keys using `dict.append()`. Finally, you can convert the `collections.defaultdict` to a regular dictionary using `dict()`.

```py
from collections import defaultdict

def collect_dictionary(obj):
  inv_obj = defaultdict(list)
  for key, value in obj.items():
    inv_obj[value].append(key)
  return dict(inv_obj)

ages = {
  'Peter': 10,
  'Isabel': 10,
  'Anna': 9,
}
collect_dictionary(ages) # { 10: ['Peter', 'Isabel'], 9: ['Anna'] }
```
