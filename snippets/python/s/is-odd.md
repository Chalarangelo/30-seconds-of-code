---
title: Number is odd
type: snippet
language: python
tags: [math]
unlisted: true
cover: interior-6
dateModified: 2021-01-04T12:47:04+02:00
---

Checks if the given number is odd.

- Checks whether a number is even or odd using the modulo (`%`) operator.
- Returns `True` if the number is odd, `False` if the number is even.

```py
def is_odd(num):
  return num % 2 != 0
```

```py
is_odd(3) # True
```

- Check whether a number is odd using the bitwise `&` operator. An even number has 0 as its leftmost bit, and an odd number has 1 as its leftmost bit.
- Returns `True` if the number is odd, `False` if the number is even.

```py
def is_even(n):
    return n & 1
```

```py
is_even(2) # False
is_even(3) # True
```
