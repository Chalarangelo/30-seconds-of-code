---
title: cast_list
tags: list,intermediate
---

Casts the provided value as a list if it's not one.

- Use `isinstance()` to check if the given value is enumerable.
- Return it by using `list()` or encapsulated in a list accordingly.

```py
def cast_list(val):
  return list(val) if isinstance(val, (tuple, list, set, dict)) else [val]
```

```py
cast_list('foo') # ['foo']
cast_list([1]) # [1]
cast_list(('foo', 'bar')) # ['foo', 'bar']
```
