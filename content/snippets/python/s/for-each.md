---
title: Execute function for each list element
type: snippet
language: python
tags: [list]
cover: green-plant
excerpt: Executes the provided function once for each list element.
listed: true
dateModified: 2020-09-15
---

Executes the provided function once for each list element.

- Use a `for` loop to execute `fn` for each element in `itr`.

```py
def for_each(itr, fn):
  for el in itr:
    fn(el)

for_each([1, 2, 3], print) # 1 2 3
```
