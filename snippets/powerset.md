---
title: Powerset
tags: math,list
expertise: advanced
author: chalarangelo
firstSeen: 2020-10-04T13:14:01+03:00
lastUpdated: 2020-11-02T19:28:27+02:00
---

Returns the powerset of a given iterable.

- Use `list()` to convert the given value to a list.
- Use `range()` and `itertools.combinations()` to create a generator that returns all subsets.
- Use `itertools.chain.from_iterable()` and `list()` to consume the generator and return a list.

```py
from itertools import chain, combinations

def powerset(iterable):
  s = list(iterable)
  return list(chain.from_iterable(combinations(s, r) for r in range(len(s)+1)))
```

```py
powerset([1, 2]) # [(), (1,), (2,), (1, 2)]
```
