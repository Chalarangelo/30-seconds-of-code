---
title: cast_list
tags: utility,list,beginner
---

Casts the provided value as an array if it's not one.

Use `isinstance()` to check if the given value is a list and return it as-is or encapsulated in a list accordingly.

```py
def cast_list(val):
  return val if isinstance(val, list) else [val]
```

```py
cast_list('foo'); # ['foo']
cast_list([1]); # [1]
```
