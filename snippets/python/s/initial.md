---
title: List without last element
type: snippet
language: python
tags: [list]
cover: pop-of-green
dateModified: 2020-11-02T19:28:05+02:00
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
