---
title: List without last element
tags: list
expertise: beginner
firstSeen: 2019-08-20T14:08:52+03:00
lastUpdated: 2020-11-02T19:28:05+02:00
---

Returns all the elements of a list except the last one.

- Use `lst[:-1]` to return all but the last element of the list.

```py
def initial(lst):
  return lst[:-1]
```

```py
initial([1, 2, 3]) # [1, 2]
```
