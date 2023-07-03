---
title: Unique elements in list
type: snippet
language: python
tags: [list]
cover: cold-mountains
dateModified: 2020-09-15T16:13:06+03:00
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
