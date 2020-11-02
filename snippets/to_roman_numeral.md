---
title: to_roman_numeral
tags: math,string,intermediate
---

Converts an integer to its roman numeral representation. 
Accepts value between `1` and `3999` (both inclusive).

- Create a lookup list containing tuples in the form of (roman value, integer).
- Use a `for` loop to iterate over the values in `lookup`.
- Use `divmod()` to update `num` with the remainder, adding the roman numeral representation to the result.

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
```

```py
to_roman_numeral(3) # 'III'
to_roman_numeral(11) # 'XI'
to_roman_numeral(1998) # 'MCMXCVIII'
```
