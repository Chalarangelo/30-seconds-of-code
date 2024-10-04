---
title: Map a number to a different range
shortTitle: Map number to range
language: python
tags: [math]
cover: round-leaves
excerpt: Map a number from one range to another range.
listed: false
dateModified: 2024-07-02
---

When working with numbers, you may need to map a number from one range to another range. This is particularly useful when you need to normalize values or convert between different units of measurement.

Luckily, all you really need is to use a simple mathematical formula to map a number from one range to another range.

You need to know the minimum and maximum values of both ranges, as well as the number you want to map. Then, calculate the difference from the minimum value of the input range, divide it by the difference between the maximum and minimum values of the input range, and multiply it by the difference between the maximum and minimum values of the output range.

Finally, add the minimum value of the output range to get the mapped value. In order to make sure the result is a floating-point number, you can use the `float()` function.

```py
def num_to_range(num, inMin, inMax, outMin, outMax):
  return outMin + (float(num - inMin) / float(inMax - inMin) * (outMax
                  - outMin))

num_to_range(5, 0, 10, 0, 100) # 50.0
```
