---
title: Unique elements in list
type: snippet
language: python
tags: [list]
cover: cold-mountains
excerpt: Returns the unique elements in a given list.
listed: true
dateModified: 2020-09-15
---

Returns the unique elements in a given list.

- Create a `set` from the list to discard duplicated values, then return a `list` from it.

```py
def unique_elements(li):
  return list(set(li))

unique_elements([1, 2, 2, 3, 4, 3]) # [1, 2, 3, 4]
```
