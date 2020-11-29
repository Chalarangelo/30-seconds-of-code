---
title: multiply_list
tags: list,beginner
---

Multiplies all the elements of the list

- The function takes as parameter a list of numbers.
- Initialize a placeholder equal to 1.
- Iterate over the numbers of the list by multiplying the previous placeholder with each number

```py
def multiply_list(numbers):
  result = 1
  for nbr in numbers:
    result *= nbr
  return result
```

```py
multiply_list((2, 4, 7, 5)) #280
multiply_list((-1, 8, 9, 10, 3)) #-2160
```