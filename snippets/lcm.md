---
title: lcm 
tags: math,list,recursion,advanced 
---

Returns the least common multiple of two or more numbers.

Define a function, `spread`, that uses either `list.extend()` or `list.append()` on each element in a list to flatten it.
Use `math.gcd()` and `lcm(x,y) = x * y / gcd(x,y)` to determine the least common multiple.

```py
from functools import reduce
import math

def spread(arg):
  ret = []
  for i in arg:
    if isinstance(i, list):
      ret.extend(i)
    else:
      ret.append(i)
  return ret

def lcm(*args):
  numbers = []
  numbers.extend(spread(list(args)))

  def _lcm(x, y):
    return int(x * y / math.gcd(x, y))

  return reduce((lambda x, y: _lcm(x, y)), numbers)
```

```py
lcm(12, 7) # 84
lcm([1, 3, 4], 5) # 60
```