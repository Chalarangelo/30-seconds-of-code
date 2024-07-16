---
title: Random element in list
type: snippet
language: python
tags: [list,random]
cover: walking-on-top
excerpt: Returns a random element from a list.
listed: true
dateModified: 2020-10-28
---

Returns a random element from a list.

- Use `random.choice()` to get a random element from `lst`.

```py
from random import choice

def sample(lst):
  return choice(lst)

sample([3, 7, 9, 11]) # 9
```
