---
title: Filter non-unique list values
tags: list
expertise: beginner
firstSeen: 2019-08-20T13:13:51+03:00
lastUpdated: 2020-11-02T19:27:53+02:00
---

Creates a list with the non-unique values filtered out.

- Use `collections.Counter` to get the count of each value in the list.
- Use a list comprehension to create a list containing only the unique values.

```py
from collections import Counter

def filter_non_unique(lst):
  return [item for item, count in Counter(lst).items() if count == 1]
```

```py
filter_non_unique([1, 2, 2, 3, 4, 4, 5]) # [1, 3, 5]
```
