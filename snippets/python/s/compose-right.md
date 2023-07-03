---
title: Reverse compose functions
type: snippet
language: python
tags: [function]
cover: lavender-shelf
dateModified: 2020-11-02T19:27:07+02:00
---

Performs left-to-right function composition.

- Use `functools.reduce()` to perform left-to-right function composition.
- The first (leftmost) function can accept one or more arguments; the remaining functions must be unary.

```py
from functools import reduce

def compose_right(*fns):
  return reduce(lambda f, g: lambda *args: g(f(*args)), fns)
```

```py
add = lambda x, y: x + y
square = lambda x: x * x
add_and_square = compose_right(add, square)
add_and_square(1, 2) # 9
```
