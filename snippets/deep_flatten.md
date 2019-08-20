---
title: deep_flatten
tags: list,recursion,intermediate
---

Deep flattens a list.

Use recursion. 
Define a function, `spread`, that uses either `list.extend()` or `list.append()` on each element in a list to flatten it.
Use `list.extend()` with an empty list and the `spread` function to flatten a list.
Recursively flatten each element that is a list.

```py
def spread(arg):
  ret = []
  for i in arg:
    if isinstance(i, list):
      ret.extend(i)
    else:
      ret.append(i)
  return ret

def deep_flatten(lst):
  result = []
  result.extend(
    spread(list(map(lambda x: deep_flatten(x) if type(x) == list else x, lst))))
  return result
```

```py
deep_flatten([1, [2], [[3], 4], 5]) # [1,2,3,4,5]
```
