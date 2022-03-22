---
title: Hamming distance
tags: math
expertise: intermediate
author: maciv
firstSeen: 2021-01-17T13:04:06+02:00
lastUpdated: 2021-02-18T14:22:25+02:00
---

Calculates the Hamming distance between two values.

- Use the XOR operator (`^`) to find the bit difference between the two numbers.
- Use `bin()` to convert the result to a binary string.
- Convert the string to a list and use `count()` of `str` class to count and return the number of `1`s in it.

```py
def hamming_distance(a, b):
  return bin(a ^ b).count('1')
```

```py
hamming_distance(2, 3) # 1
```
