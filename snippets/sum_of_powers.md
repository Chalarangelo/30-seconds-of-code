---
title: sum_of_powers
tags: math,intermediate
---

Returns the sum of the powers of all the numbers from `start` to `end` (both inclusive).

- Use `range()` in combination with a list comprehension to create a list of elements in the desired range raised to the given `power`.
- Use `sum()` to add the values together.
- Omit the second argument, `power`, to use a default power of `2`.
- Omit the third argument, `start`, to use a default starting value of `1`.

```py
def sum_of_powers(end, power = 2, start = 1):
  return sum([(i) ** power for i in range(start, end + 1)])
```

```py
sum_of_powers(10) # 385
sum_of_powers(10, 3) # 3025
sum_of_powers(10, 3, 5) # 2925
```
