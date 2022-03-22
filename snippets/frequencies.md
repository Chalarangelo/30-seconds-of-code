---
title: Value frequencies
tags: list
expertise: intermediate
author: maciv
firstSeen: 2020-03-15T12:54:08+02:00
lastUpdated: 2020-11-02T19:27:53+02:00
---

Creates a dictionary with the unique values of a list as keys and their frequencies as the values.

- Use `collections.defaultdict` to store the frequencies of each unique element.
- Use `dict()` to return a dictionary with the unique elements of the list as keys and their frequencies as the values.

```py
from collections import defaultdict

def frequencies(lst):
  freq = defaultdict(int)
  for val in lst:
    freq[val] += 1
  return dict(freq)
```

```py
frequencies(['a', 'b', 'a', 'c', 'a', 'a', 'b']) # { 'a': 4, 'b': 2, 'c': 1 }
```
