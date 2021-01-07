---
title: key_of_max
tags: dictionary,beginner
---

Finds the key of the maximum value in a dictionary.

- Use `max()` with the `key` parameter set to `dict.get()` to find and return the key of the maximum value in the given dictionary.

```py
def key_of_max(d):
  return max(d, key = d.get)
```

```py
key_of_max({'a':4, 'b':0, 'c':13}) # c
```
