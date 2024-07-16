---
title: Count grouped elements
type: snippet
language: python
tags: [list]
cover: rabbit-call
excerpt: Groups the elements of a list based on the given function and returns the count of elements in each group.
listed: true
dateModified: 2020-11-02
---

Groups the elements of a list based on the given function and returns the count of elements in each group.

- Use `collections.defaultdict` to initialize a dictionary.
- Use `map()` to map the values of the given list using the given function.
- Iterate over the map and increase the element count each time it occurs.

```py
from collections import defaultdict
from math import floor

def count_by(lst, fn = lambda x: x):
  count = defaultdict(int)
  for val in map(fn, lst):
    count[val] += 1
  return dict(count)

count_by([6.1, 4.2, 6.3], floor) # {6: 2, 4: 1}
count_by(['one', 'two', 'three'], len) # {3: 2, 5: 1}
```
