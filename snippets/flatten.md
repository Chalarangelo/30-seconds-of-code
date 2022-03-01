---
title: Flatten list
tags: list
expertise: intermediate
firstSeen: 2019-09-19T15:46:10+03:00
lastUpdated: 2020-11-02T19:27:53+02:00
---

Flattens a list of lists once.

- Use a list comprehension to extract each value from sub-lists in order.

```py
def flatten(lst):
  return [x for y in lst for x in y]
```

```py
flatten([[1, 2, 3, 4], [5, 6, 7, 8]]) # [1, 2, 3, 4, 5, 6, 7, 8]
```
