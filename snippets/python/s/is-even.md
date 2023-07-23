---
title: Number is even
type: snippet
language: python
tags: [math]
unlisted: true
cover: interior-3
dateModified: 2021-01-04T12:47:04+02:00
---

Checks if the given number is even.

- Check whether a number is odd or even using the modulo (`%`) operator.
- Return `True` if the number is even, `False` if the number is odd.

```py
def is_even(num):
  return num % 2 == 0
```

```py
is_even(3) # False
```

- Check whether a number is odd or even using the bitwise `&` operator. An even number has 0 as its leftmost bit, and an odd number has 1 as its leftmost bit.
- Returns `True` if the number is even, `False` if the number is odd.

```py
def is_even(n):
    return not n & 1
```

```py
is_even(2) # True
is_even(3) # False
```
