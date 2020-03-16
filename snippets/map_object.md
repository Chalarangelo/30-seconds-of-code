---
title: map_object
tags: list,intermediate
---

Maps the values of a list to a dictionary using a function, where the key-value pairs consist of the value as the key and the mapped value.

Use a `for` loop to iterate over the list's values, assigning the values produced by `fn` to each key of the dictionary.

```py
def map_object(itr, fn):
  ret = {}
  for x in itr:
    ret[x] = fn(x)
  return ret
```

```py
map_object([1,2,3], lambda x: x * x) # { 1: 1, 2: 4, 3: 9 }
```
