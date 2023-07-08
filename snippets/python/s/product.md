---
title: Product
type: snippet
language: python
tags: [math,list]
cover: hiking
dateModified: 2023-07-08T11:47:07+02:00
---

Calculates the product of two or more numbers.

- Initialize a variable `result` to `1`.
- Use a loop to iterate over `args` and multiply each number with `result`.
- Return the final `result`.

```py
def calculate_product(*args):
    result = 1
    for num in args:
        result *= num
    return result

```

```py
calculate_product(2, 3, 4)  # 24
calculate_product(5, 10, 2)  # 100
```