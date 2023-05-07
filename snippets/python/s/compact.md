---
title: Compact list
type: snippet
language: python
tags: [list]
cover: new-plant
dateModified: 2020-11-02T19:27:07+02:00
---

Removes falsy values from a list.

- Use `filter()` to filter out falsy values (`False`, `None`, `0`, and `""`).

```py
def compact(lst):
  return list(filter(None, lst))
```

```py
compact([0, 1, False, 2, '', 3, 'a', 's', 34]) # [ 1, 2, 3, 'a', 's', 34 ]
```
