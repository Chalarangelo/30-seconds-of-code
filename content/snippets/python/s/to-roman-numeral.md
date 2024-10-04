---
title: Convert an integer to a roman numeral
shortTitle: Integer to roman numeral
language: python
tags: [math,string]
cover: tram-car
excerpt: Convert an integer to its roman numeral representation.
listed: false
dateModified: 2024-05-13
---

Roman numerals can only represent numbers between `1` and `3999`. However, they're often used in various contexts, such as movie titles, book chapters, and outlines.

To convert an integer to its roman numeral representation, you can use a lookup list containing tuples of roman values and integers. Then, you can iterate over the values in the lookup list and use `divmod()` to update the number with the remainder, adding the roman numeral representation to the result.

```py
def to_roman_numeral(num):
  lookup = [
    (1000, 'M'),
    (900, 'CM'),
    (500, 'D'),
    (400, 'CD'),
    (100, 'C'),
    (90, 'XC'),
    (50, 'L'),
    (40, 'XL'),
    (10, 'X'),
    (9, 'IX'),
    (5, 'V'),
    (4, 'IV'),
    (1, 'I'),
  ]
  res = ''
  for (n, roman) in lookup:
    (d, num) = divmod(num, n)
    res += roman * d
  return res

to_roman_numeral(3) # 'III'
to_roman_numeral(11) # 'XI'
to_roman_numeral(1998) # 'MCMXCVIII'
```
