---
title: List tail
type: snippet
tags: [list]
cover: meteora
dateModified: 2020-11-02T19:28:35+02:00
---

Returns all elements in a list except for the first one.

- Use slice notation to return the last element if the list's length is more than `1`.
- Otherwise, return the whole list.

```py
def tail(lst):
  return lst[1:] if len(lst) > 1 else lst
```

```py
tail([1, 2, 3]) # [2, 3]
tail([1]) # [1]
```
