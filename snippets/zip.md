---
title: zip
tags: list,math,intermediate
---

Creates a list of elements, grouped based on the position in the original lists.

Use `max` combined with `list comprehension` to get the length of the longest list in the arguments. 
Loop for `max_length` times grouping elements. 
If lengths of `lists` vary, use `fill_value` (defaults to `None`). 

[`zip()`](https://docs.python.org/3/library/functions.html#zip) and [`itertools.zip_longest()`](https://docs.python.org/3/library/itertools.html#itertools.zip_longest) provide similar functionality to this snippet.

```py
def zip(*args, fill_value=None):
  max_length = max([len(lst) for lst in args])
  result = []
  for i in range(max_length):
    result.append([
      args[k][i] if i < len(args[k]) else fillvalue for k in range(len(args))
    ])
  return result
```

```py
zip(['a', 'b'], [1, 2], [True, False]) # [['a', 1, True], ['b', 2, False]]
zip(['a'], [1, 2], [True, False]) # [['a', 1, True], [None, 2, False]]
zip(['a'], [1, 2], [True, False], fill_value = '_') # [['a', 1, True], ['_', 2, False]]
```
