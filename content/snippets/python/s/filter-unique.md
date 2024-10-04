---
title: Filter unique list values
language: python
tags: [list]
cover: feathers
excerpt: Filter unique or non-unique values from a list using `collections.Counter`.
listed: false
dateModified: 2024-06-14
---

## Filter unique list values

Using `collections.Counter`, you can get the count of each value in the list. Then, you can use a list comprehension to filter out the unique values from a list.

```py
from collections import Counter

def filter_unique(lst):
  return [item for item, count in Counter(lst).items() if count > 1]

filter_unique([1, 2, 2, 3, 4, 4, 5]) # [2, 4]
```

## Filter non-unique list values

Similarly, you can create a list with the non-unique values filtered out. All you need to do is to change the condition in the list comprehension.

```py
from collections import Counter

def filter_non_unique(lst):
  return [item for item, count in Counter(lst).items() if count == 1]

filter_non_unique([1, 2, 2, 3, 4, 4, 5]) # [1, 3, 5]
```
