---
title: Curry function
tags: function
expertise: intermediate
firstSeen: 2020-01-02T16:14:50+02:00
lastUpdated: 2020-11-02T19:27:07+02:00
---

Curries a function.

- Use `functools.partial()` to return a new partial object which behaves like `fn` with the given arguments, `args`, partially applied.

```py
from functools import partial

def curry(fn, *args):
  return partial(fn, *args)
```

```py
add = lambda x, y: x + y
add10 = curry(add, 10)
add10(20) # 30
```
