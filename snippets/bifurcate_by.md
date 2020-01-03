---
title: bifurcate_by
tags: list,function,intermediate
---

Splits values into two groups according to a function, which specifies which group an element in the input list belongs to. 
If the function returns `True`, the element belongs to the first group; otherwise, it belongs to the second group.

Use list comprehension to add elements to groups, based on `fn`.

```py
def bifurcate_by(lst, fn):
  return [
    [x for x in lst if fn(x)],
    [x for x in lst if not fn(x)]
  ]
```

```py
bifurcate_by(
  ['beep', 'boop', 'foo', 'bar'], 
  lambda x: x[0] == 'b'
) # [ ['beep', 'boop', 'bar'], ['foo'] ]
```
