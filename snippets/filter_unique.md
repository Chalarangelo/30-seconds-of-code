---
title: filter_unique
tags: list,beginner
---

Creates a list with the unique values filtered out.

- Use `collections.Counter` to get the count of each value in the list.
- Use a list comprehension to create a list containing only the non-unique values.

```py
from collections import Counter

def filter_unique(lst):
  return [item for item, count in Counter(lst).items() if count > 1]
```

```py
filter_unique([1, 2, 2, 3, 4, 4, 5]) # [2, 4]
```
