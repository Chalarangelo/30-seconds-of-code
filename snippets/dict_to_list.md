---
title: dict_to_list
tags: dictionary,list,intermediate
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
