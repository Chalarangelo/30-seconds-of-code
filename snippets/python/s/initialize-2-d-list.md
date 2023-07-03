---
title: Initialize 2D list
type: snippet
language: python
tags: [list]
cover: succulent-7
dateModified: 2020-11-02T19:28:05+02:00
---

Initializes a 2D list of given width and height and value.

- Use a list comprehension and `range()` to generate `h` rows where each is a list with length `h`, initialized with `val`.
- Omit the last argument, `val`, to set the default value to `None`.

```py
def initialize_2d_list(w, h, val = None):
  return [[val for x in range(w)] for y in range(h)]
```

```py
initialize_2d_list(2, 2, 0) # [[0, 0], [0, 0]]
```
