---
title: Dictionary to list
tags: dictionary,list
expertise: intermediate
author: maciv
firstSeen: 2020-10-16T21:24:14+03:00
lastUpdated: 2020-11-02T19:27:53+02:00
---

Converts a dictionary to a list of tuples.

- Use `dict.items()` and `list()` to get a list of tuples from the given dictionary.

```py
def dict_to_list(d):
  return list(d.items())
```

```py
d = {'one': 1, 'three': 3, 'five': 5, 'two': 2, 'four': 4}
dict_to_list(d)
# [('one', 1), ('three', 3), ('five', 5), ('two', 2), ('four', 4)]
```
