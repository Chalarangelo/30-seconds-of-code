---
title: collect_dictionary
tags: dictionary,intermediate
---

Inverts a dictionary with non-unique hashable values.

- Use `dictionary.items()` in combination with a loop to map the values of the dictionary to keys using `collections.defaultdict`, `list()` and `append()` to create a list for each one.

```py
from collections import defaultdict

def collect_dictionary(obj):
  inv_obj = defaultdict(list)
  for key, value in obj.items():
    inv_obj[value].append(key)
  return inv_obj
```

```py
ages = {
  "Peter": 10,
  "Isabel": 10,
  "Anna": 9,
}
collect_dictionary(ages) # { 10: ["Peter", "Isabel"], 9: ["Anna"] }
```
