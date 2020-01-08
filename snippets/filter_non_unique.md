---
title: filter_non_unique
tags: list,beginner
---

Filters out the non-unique values in a list.

Use a `collections.Counter` to get the count of each value in the list.
Use list comprehension to create a list containing only the unique values.

```py
from collections import Counter

def filter_non_unique(lst):
  return [item for item, count in counter = Counter(lst).items() if count == 1]
```

```py
filter_non_unique([1, 2, 2, 3, 4, 4, 5]) # [1, 3, 5]
```
