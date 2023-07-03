---
title: Apply function when true
type: snippet
language: python
tags: [function]
cover: interior-10
dateModified: 2020-11-09T23:56:11+02:00
---

Tests a value, `x`, against a testing function, conditionally applying a function.

- Check if the value of `predicate()` is `True` for `x` and if so call `when_true()`, otherwise return `x`.

```py
def when(predicate, when_true):
  return lambda x: when_true(x) if predicate(x) else x
```

```py
double_even_numbers = when(lambda x: x % 2 == 0, lambda x : x * 2)
double_even_numbers(2) # 4
double_even_numbers(1) # 1
```
