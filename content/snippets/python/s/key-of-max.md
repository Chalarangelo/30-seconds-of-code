---
title: Key of max value
type: snippet
language: python
tags: [dictionary]
cover: succulent-7
dateModified: 2021-01-07T23:15:48+02:00
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
