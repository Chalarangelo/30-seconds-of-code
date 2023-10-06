---
title: Count Set Bits from 1 to N
type: snippet
language: python
tags: [math, algorithm, bitwise]
cover: binary-code
dateModified: 2023-10-05T10:00:00+00:00
---

Counts and returns the total number of set bits (1s) in the binary representation of numbers from 1 to N.

- If `n` is less than or equal to 1, return `n` itself.
- Calculate `k` as the floor of the base-2 logarithm of `n`.
- Use a recursive approach to calculate the count:
  - The total count for numbers from 1 to 2^k - 1 is `k * 2^(k-1)`.
  - Add `n - 2^k + 1` to account for the remaining bits in the range from 2^k to `n`.
  - Recursively call the function for the range from 1 to `n - 2^k`.

```py
import math

def count_set_bits(n):
    if n <= 1:
        return n
    k = math.floor(math.log2(n))
    return k * 2**(k-1) + (n - 2**k + 1) + count_set_bits(n - 2**k)
```

```py
count_set_bits(6)  # 9 (1 + 1 + 2 + 1 + 2 + 2)
count_set_bits(10) # 18 (1 + 1 + 2 + 1 + 2 + 2 + 3 + 1 + 2 + 2)
```

