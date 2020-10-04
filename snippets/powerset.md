---
title: powerset
tags: math,list,advanced
---

Returns the powerset of a given iterable.

- Use the `list()` constructor to convert the given value to a `list`.
- Use `range()` and `combinations()` to create a generator the returns all subsets.
- Use `chain.from_iterable()` and the `list()` constructor to consume the generator and return a list.

```py
from itertools import chain, combinations

def powerset(iterable):
  s = list(iterable)
  return list(chain.from_iterable(combinations(s, r) for r in range(len(s)+1)))
```

```py
powerset([1, 2]) # [(), (1,), (2,), (1, 2)]
```
