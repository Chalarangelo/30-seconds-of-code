---
title: when
tags: function,intermediate
---

Tests a value, `x`, against a testing function, conditionally applying a function. 

- Check if the value of `predicate(x)` is `True` and if so return `when_true(x)`, otherwise return `x`.

```py
def when(predicate, when_true):
  return lambda x: when_true(x) if predicate(x) else x
```

```py
double_even_numbers = when(lambda x: x % 2 == 0, lambda x : x * 2)
double_even_numbers(2) # 4
double_even_numbers(1) # 1
```
