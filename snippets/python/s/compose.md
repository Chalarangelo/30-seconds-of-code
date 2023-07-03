---
title: Compose functions
type: snippet
language: python
tags: [function]
cover: tram-car-2
dateModified: 2020-11-02T19:27:07+02:00
---

Performs right-to-left function composition.

- Use `functools.reduce()` to perform right-to-left function composition.
- The last (rightmost) function can accept one or more arguments; the remaining functions must be unary.

```py
from functools import reduce

def compose(*fns):
  return reduce(lambda f, g: lambda *args: f(g(*args)), fns)
```

```py
add5 = lambda x: x + 5
multiply = lambda x, y: x * y
multiply_and_add_5 = compose(add5, multiply)
multiply_and_add_5(5, 2) # 15
```
