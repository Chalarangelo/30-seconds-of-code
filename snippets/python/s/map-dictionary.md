---
title: Map list to dictionary
type: snippet
language: python
tags: [list,dictionary]
excerpt: Maps the values of a list to a dictionary using a function.
cover: colors-mural
dateModified: 2020-11-02T19:28:27+02:00
---

Maps the values of a list to a dictionary using a function, where the key-value pairs consist of the original value as the key and the result of the function as the value.

- Use `map()` to apply `fn` to each value of the list.
- Use `zip()` to pair original values to the values produced by `fn`.
- Use `dict()` to return an appropriate dictionary.

```py
def map_dictionary(itr, fn):
  return dict(zip(itr, map(fn, itr)))
```

```py
map_dictionary([1, 2, 3], lambda x: x * x) # { 1: 1, 2: 4, 3: 9 }
```
