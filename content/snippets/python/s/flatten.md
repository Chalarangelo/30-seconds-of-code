---
title: Flatten list
type: snippet
language: python
tags: [list]
cover: jars-on-shelf
excerpt: Flattens a list of lists once.
listed: true
dateModified: 2020-11-02
---

Flattens a list of lists once.

- Use a list comprehension to extract each value from sub-lists in order.

```py
def flatten(lst):
  return [x for y in lst for x in y]

flatten([[1, 2, 3, 4], [5, 6, 7, 8]]) # [1, 2, 3, 4, 5, 6, 7, 8]
```
