---
title: Average
type: snippet
language: python
tags: [math,list]
cover: digital-nomad-15
excerpt: Calculates the average of two or more numbers.
listed: true
dateModified: 2020-11-02
---

Calculates the average of two or more numbers.

- Use `sum()` to sum all of the `args` provided, divide by `len()`.

```py
def average(*args):
  return sum(args, 0.0) / len(args)

average(*[1, 2, 3]) # 2.0
average(1, 2, 3) # 2.0
```
