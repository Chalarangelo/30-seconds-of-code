---
title: collect_dictionary
tags: dictionary,intermediate
---

Inverts a dictionary with non-unique hashable values.

- Create a `collections.defaultdict` with `list` as the default value for each key. 
- Use `dictionary.items()` in combination with a loop to map the values of the dictionary to keys using `dict.append()`.
- Use `dict()` to convert the `collections.defaultdict` to a regular dictionary.

```py
from collections import defaultdict

def collect_dictionary(obj):
  inv_obj = defaultdict(list)
  for key, value in obj.items():
    inv_obj[value].append(key)
  return dict(inv_obj)
```

```py
ages = {
  'Peter': 10,
  'Isabel': 10,
  'Anna': 9,
}
collect_dictionary(ages) # { 10: ['Peter', 'Isabel'], 9: ['Anna'] }
```
