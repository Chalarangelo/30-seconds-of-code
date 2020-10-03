---
title: frequencies
tags: list,intermediate
---

Returns a dictionary with the unique values of a list as keys and their frequencies as the values.

- Use `list.count()` to get the frequency of each unique element.
- Use `dict()` constructor to return a dictionary with the unique elements of the list as keys and their frequencies as the values.

```py
def frequencies(lst):
  return dict((k, lst.count(k)) for k in lst)
```

```py
frequencies(['a', 'b', 'a', 'c', 'a', 'a', 'b']) # { 'a': 4, 'b': 2, 'c': 1 }
```
