---
title: bifurcate
tags: list,intermediate
---

Splits values into two groups. 
If an element in `filter` is `True`, the corresponding element in the collection belongs to the first group; otherwise, it belongs to the second group.

- Use list comprehension and `zip()` to add elements to groups, based on `filter`.

```py
def bifurcate(lst, filter):
  return [
    [x for x, flag in zip(lst, filter) if flag],
    [x for x, flag in zip(lst, filter) if not flag]
  ]
```

```py
bifurcate(['beep', 'boop', 'foo', 'bar'], [True, True, False, True]) # [ ['beep', 'boop', 'bar'], ['foo'] ]
```
