---
title: Cast to list
type: snippet
language: python
tags: [list]
cover: colorful-pots
excerpt: Casts the provided value as a list if it's not one.
listed: true
dateModified: 2020-11-02
---

Casts the provided value as a list if it's not one.

- Use `isinstance()` to check if the given value is enumerable.
- Return it by using `list()` or encapsulated in a list accordingly.

```py
def cast_list(val):
  return list(val) if isinstance(val, (tuple, list, set, dict)) else [val]

cast_list('foo') # ['foo']
cast_list([1]) # [1]
cast_list(('foo', 'bar')) # ['foo', 'bar']
```
