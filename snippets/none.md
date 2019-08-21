---
title: none
tags: list,function,intermediate
---

Returns `False` if the provided function returns `True` for at least one element in the list, `True` otherwise.

Iterate over the elements of the list to test if every element in the list returns `False` based on `fn`.
Omit the seconds argument, `fn`, to check if all elements are `False`.

```py
def none(lst, fn=lambda x: not not x):
  for el in lst:
    if fn(el):
      return False
  return True
```

```py
none([0, 1, 2, 0], lambda x: x >= 2 ) # False
none([0, 0, 0]) # True
```
