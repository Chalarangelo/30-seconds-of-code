---
title: All indexes of value
type: snippet
language: python
tags: [list]
cover: purple-flower-bunch
dateModified: 2020-10-11T13:45:19+03:00
---

Returns a list of indexes of all the occurrences of an element in a list.

- Use `enumerate()` and a list comprehension to check each element for equality with `value` and adding `i` to the result.

```py
def index_of_all(lst, value):
  return [i for i, x in enumerate(lst) if x == value]
```

```py
index_of_all([1, 2, 1, 4, 5, 1], 1) # [0, 2, 5]
index_of_all([1, 2, 3, 4], 6) # []
```
