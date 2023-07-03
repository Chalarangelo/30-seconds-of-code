---
title: Cast to list
type: snippet
language: python
tags: [list]
cover: colorful-pots
dateModified: 2020-11-02T19:27:07+02:00
---

Casts the provided value as a list if it's not one.

- Use `isinstance()` to check if the given value is enumerable.
- Return it by using `list()` or encapsulated in a list accordingly.

```py
def cast_list(val):
  return list(val) if isinstance(val, (tuple, list, set, dict)) else [val]
```

```py
cast_list('foo') # ['foo']
cast_list([1]) # [1]
cast_list(('foo', 'bar')) # ['foo', 'bar']
```
