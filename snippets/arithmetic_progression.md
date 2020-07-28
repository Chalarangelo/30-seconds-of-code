---
title: arithmetic_progression
tags: math, beginner
---

Find all the multiples between a number and a limit.

Use the `range` function and step up the same integer to find multiples. 

```py
def find_multiples(integer, limit):
  return list(range(integer,limit+1, integer))
```

```py
find_multiples(5,25) 
```
