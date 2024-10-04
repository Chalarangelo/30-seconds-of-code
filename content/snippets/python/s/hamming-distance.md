---
title: Hamming distance
language: python
tags: [math]
cover: tulips-and-reeds
excerpt: Learn how to calculate the Hamming distance between two values.
listed: false
dateModified: 2024-05-11
---

The Hamming distance between two integers is the number of positions at which the corresponding bits are different.

To calculate the Hamming distance between two integers, you can use the XOR operator (`^`) to find the bit difference between the two numbers. Then, you can convert the result to a binary string using the `bin()` function.

Finally, you can convert the string to a list and use the `count()` method of the `str` class to count and return the number of `1`s in it.

```py
def hamming_distance(a, b):
  return bin(a ^ b).count('1')

hamming_distance(2, 3) # 1
```
