---
title: Every nth element in list
type: snippet
language: python
tags: [list]
cover: cherry-trees
dateModified: 2020-11-02T19:27:53+02:00
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
