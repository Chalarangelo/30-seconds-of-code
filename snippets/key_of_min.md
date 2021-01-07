---
title: key_of_min
tags: dictionary,beginner
---

Finds the key of the minimum value in a dictionary.

- Use `min()` with the `key` parameter set to `dict.get()` to find and return the key of the minimum value in the given dictionary.

```py
def key_of_min(d):
  return min(d, key = d.get)
```

```py
key_of_min({'a':4, 'b':0, 'c':13}) # b
```
