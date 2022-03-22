---
title: Find parity outliers
tags: list,math
expertise: intermediate
author: maciv
firstSeen: 2020-01-08T18:54:35+02:00
lastUpdated: 2020-11-02T19:27:53+02:00
---

Finds the items that are parity outliers in a given list.

- Use `collections.Counter` with a list comprehension to count even and odd values in the list.
- Use `collections.Counter.most_common()` to get the most common parity.
- Use a list comprehension to find all elements that do not match the most common parity.

```py
from collections import Counter

def find_parity_outliers(nums):
  return [
    x for x in nums
    if x % 2 != Counter([n % 2 for n in nums]).most_common()[0][0]
  ]
```

```py
find_parity_outliers([1, 2, 3, 4, 6]) # [1, 3]
```
