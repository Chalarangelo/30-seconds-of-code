---
title: Initialize list with values
type: snippet
language: python
tags: [list]
cover: dog-waiting
dateModified: 2020-11-02
---

Initializes and fills a list with the specified value.

- Use a list comprehension and `range()` to generate a list of length equal to `n`, filled with the desired values.
- Omit `val` to use the default value of `0`.

```py
def initialize_list_with_values(n, val = 0):
  return [val for x in range(n)]
```

```py
initialize_list_with_values(5, 2) # [2, 2, 2, 2, 2]
```
