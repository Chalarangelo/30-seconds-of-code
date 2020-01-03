---
title: every_nth
tags: list,beginner
---

Returns every nth element in a list.

Use `[nth-1::nth]` to create a new list that contains every nth element of the given list.

```py
def every_nth(lst, nth):
  return lst[nth - 1::nth]
```

```py
every_nth([1, 2, 3, 4, 5, 6], 2) # [ 2, 4, 6 ]
```
