---
title: none
tags: list,function,intermediate
---

Returns `False` if the provided function returns `True` for at least one element in the list, `True` otherwise.

Use `all()` and run `fn` to check if `fn` returns `False` for all the elements in the list.

```py
def none(lst, fn=lambda x: x):
  return all(not fn(x) for x in lst)
```

```py
none([0, 1, 2, 0], lambda x: x >= 2 ) # False
none([0, 0, 0]) # True
```
