---
title: Unique elements in list
tags: list
expertise: beginner
firstSeen: 2018-10-09T20:01:19+03:00
lastUpdated: 2020-09-15T16:13:06+03:00
---

Returns the unique elements in a given list.

- Create a `set` from the list to discard duplicated values, then return a `list` from it.

```py
def unique_elements(li):
  return list(set(li))
```

```py
unique_elements([1, 2, 2, 3, 4, 3]) # [1, 2, 3, 4]
```
