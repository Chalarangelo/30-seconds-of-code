---
title: every
tags: list,function,intermediate
---

Returns `True` if the provided function returns `True` for every element in the list, `False` otherwise.

Iterate over the elements of the list to test if every element in the list returns `True` based on `fn`.
Omit the seconds argument, `fn`, to check if all elements are `True`.

```py
def every(lst, fn=lambda x: not not x):
  for el in lst:
    if not fn(el):
      return False
  return True
```

```py
every([4, 2, 3], lambda x: x > 1) # True
every([1, 2, 3]) # True
```
