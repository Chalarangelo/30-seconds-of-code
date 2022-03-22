---
title: Sort dictionary by key
tags: dictionary
expertise: intermediate
author: maciv
firstSeen: 2020-10-16T21:24:33+03:00
lastUpdated: 2020-11-02T19:28:35+02:00
---

Sorts the given dictionary by key.

- Use `dict.items()` to get a list of tuple pairs from `d` and sort it using `sorted()`.
- Use `dict()` to convert the sorted list back to a dictionary.
- Use the `reverse` parameter in `sorted()` to sort the dictionary in reverse order, based on the second argument.

```py
def sort_dict_by_key(d, reverse = False):
  return dict(sorted(d.items(), reverse = reverse))
```

```py
d = {'one': 1, 'three': 3, 'five': 5, 'two': 2, 'four': 4}
sort_dict_by_key(d) # {'five': 5, 'four': 4, 'one': 1, 'three': 3, 'two': 2}
sort_dict_by_key(d, True)
# {'two': 2, 'three': 3, 'one': 1, 'four': 4, 'five': 5}
```
