---
title: Average
tags: math,list
expertise: beginner
firstSeen: 2018-01-27T07:16:41+02:00
lastUpdated: 2020-11-02T19:27:07+02:00
---

Calculates the average of two or more numbers.

- Use `sum()` to sum all of the `args` provided, divide by `len()`.

```py
def average(*args):
  return sum(args, 0.0) / len(args)
```

```py
average(*[1, 2, 3]) # 2.0
average(1, 2, 3) # 2.0
```
