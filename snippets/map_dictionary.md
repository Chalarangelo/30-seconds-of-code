---
title: map_dictionary
tags: list,intermediate
---

Maps the values of a list to a dictionary using a function, where the key-value pairs consist of the original value as the key and the result of the function as the value.

- Use a `for` loop to iterate over the list's values, assigning the values produced by `fn` to each key of the dictionary.

```py
def map_dictionary(itr, fn):
  ret = {}
  for x in itr:
    ret[x] = fn(x)
  return ret
```

```py
map_dictionary([1,2,3], lambda x: x * x) # { 1: 1, 2: 4, 3: 9 }
```
