---
title: List tail
type: snippet
language: python
tags: [list]
cover: meteora
excerpt: Returns all elements in a list except for the first one.
listed: true
dateModified: 2020-11-02
---

Returns all elements in a list except for the first one.

- Use slice notation to return the last element if the list's length is more than `1`.
- Otherwise, return the whole list.

```py
def tail(lst):
  return lst[1:] if len(lst) > 1 else lst

tail([1, 2, 3]) # [2, 3]
tail([1]) # [1]
```
