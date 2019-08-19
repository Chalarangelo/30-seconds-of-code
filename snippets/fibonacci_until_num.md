---
title: fibonacci_until_num
tags: math
---
Returns the n-th term in a Fibonnaci sequence that starts with 1

A term in a Fibonnaci sequence is the sum of the two previous terms.
This function recursively calls the function to find the n-th term.

``` python
def fibonacci_until_num(n):
  if n < 3:
    return 1
  return fibonacci_until_num(n - 2) + fibonacci_until_num(n - 1)
```

``` python
fibonnaci_until_num(5) # 5
fibonnaci_until_num(15) # 610
```
