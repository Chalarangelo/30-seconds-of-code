---
title: Every nth element in list
tags: list
expertise: beginner
firstSeen: 2019-08-20T13:10:12+03:00
lastUpdated: 2020-11-02T19:27:53+02:00
---

Returns every `nth` element in a list.

- Use slice notation to create a new list that contains every `nth` element of the given list.

```py
def every_nth(lst, nth):
  return lst[nth - 1::nth]
```

```py
every_nth([1, 2, 3, 4, 5, 6], 2) # [ 2, 4, 6 ]
```
