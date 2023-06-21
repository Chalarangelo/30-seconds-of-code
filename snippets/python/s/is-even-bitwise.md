---
title: Bitwise even number
type: snippet
language: python
tags: [bitwise]
cover: interior-4
dateModified: 2023‐06‐18T05:24:48+00:00
---

Check if the given number is even.

- Checks if the given number is even using the bitwise AND (`&`) operator.
- Actually compares the binary form of number with 1.
- In binary form, even numbers have 0 as last digit, whereas odd numbers have 1 as last digit.
- Returns **true** if the number is even. Otherwise, returns **false**.

```py
def is_even_bitwise(number):
# Check for negative number
if number < 0 :
  number = -number # To make sure the number is never negative.
  return (number & 1) == 0
```

```py
is_even_bitwise(2) # true
is_even_bitwise(3) # false
```
