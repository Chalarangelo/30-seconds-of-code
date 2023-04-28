---
title: Random element in list
type: snippet
tags: [list,random]
cover: walking-on-top
dateModified: 2020-10-28T11:45:34+02:00
---

Returns a random element from a list.

- Use `random.choice()` to get a random element from `lst`.

```py
from random import choice

def sample(lst):
  return choice(lst)
```

```py
sample([3, 7, 9, 11]) # 9
```
