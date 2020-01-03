---
title: sample
tags: list,random,beginner
---

Returns a random element from a list.

Use `random.randint()` to generate a random number that corresponds to an index in the list, return the element at that index.

```py
from random import randint

def sample(lst):
  return lst[randint(0, len(lst) - 1)]
```

```py
sample([3, 7, 9, 11]) # 9
```
