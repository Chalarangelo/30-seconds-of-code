---
title: Sort dictionary by value
tags: dictionary
expertise: intermediate
author: maciv
firstSeen: 2020-10-16T21:25:19+03:00
lastUpdated: 2021-01-08T00:56:50+02:00
---

Sorts the given dictionary by value.

- Use `dict.items()` to get a list of tuple pairs from `d` and sort it using a lambda function and `sorted()`.
- Use `dict()` to convert the sorted list back to a dictionary.
- Use the `reverse` parameter in `sorted()` to sort the dictionary in reverse order, based on the second argument.
- **⚠️ NOTICE:** Dictionary values must be of the same type.

```py
def sort_dict_by_value(d, reverse = False):
  return dict(sorted(d.items(), key = lambda x: x[1], reverse = reverse))
```

```py
d = {'one': 1, 'three': 3, 'five': 5, 'two': 2, 'four': 4}
sort_dict_by_value(d) # {'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5}
sort_dict_by_value(d, True)
# {'five': 5, 'four': 4, 'three': 3, 'two': 2, 'one': 1}
```
