---
title: some
tags: list,function,intermediate
---

Returns `True` if the provided function returns `True` for at least one element in the list, `False` otherwise.

Iterate over the elements of the list to test if every element in the list returns `True` based on `fn`.
Omit the seconds argument, `fn`, to check if all elements are `True`.

```py
def some(lst, fn=lambda x: not not x):
  for el in lst:
    if fn(el):
      return True
  return False
```

```py
some([0, 1, 2, 0], lambda x: x >= 2 ) # True
some([0, 0, 1, 0]) # True
```
