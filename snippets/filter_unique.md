---
title: filter_unique
tags: list,beginner
---

Filters out the unique values in a list.

Use `Counter` to get the count of each value in the list.
Use list comprehension to create a list containing only the non-unique values.

```py
from collections import Counter

def filter_unique(lst):
  counter = Counter(lst)
  return [item for item, count in counter.items() if count > 1]
```

```py
filter_unique([1, 2, 2, 3, 4, 4, 5]) # [2, 4]
```
