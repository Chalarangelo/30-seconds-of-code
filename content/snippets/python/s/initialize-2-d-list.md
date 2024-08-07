---
title: Initialize 2D list
type: snippet
language: python
tags: [list]
cover: succulent-7
excerpt: Initializes a 2D list of given width and height and value.
listed: true
dateModified: 2020-11-02
---

Initializes a 2D list of given width and height and value.

- Use a list comprehension and `range()` to generate `h` rows where each is a list with length `h`, initialized with `val`.
- Omit the last argument, `val`, to set the default value to `None`.

```py
def initialize_2d_list(w, h, val = None):
  return [[val for x in range(w)] for y in range(h)]

initialize_2d_list(2, 2, 0) # [[0, 0], [0, 0]]
```
