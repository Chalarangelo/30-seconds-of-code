---
title: List without last element
type: snippet
language: python
tags: [list]
cover: pop-of-green
excerpt: Returns all the elements of a list except the last one.
listed: true
dateModified: 2020-11-02
---

Returns all the elements of a list except the last one.

- Use `lst[:-1]` to return all but the last element of the list.

```py
def initial(lst):
  return lst[:-1]

initial([1, 2, 3]) # [1, 2]
```
