---
title: Value frequencies
type: snippet
language: python
tags: [list]
cover: succulent-6
excerpt: Creates a dictionary with the unique values of a list as keys and their frequencies as the values.
listed: true
dateModified: 2020-11-02
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

frequencies(['a', 'b', 'a', 'c', 'a', 'a', 'b']) # { 'a': 4, 'b': 2, 'c': 1 }
```
