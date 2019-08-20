---
title: count_vowels
tags: string
---
Retuns `number` of vowels in provided `string`.

Use a regular expression to count the number of vowels `(A, E, I, O, U)` in a string.

```py
import re


def count_vowels (str):
    return len (re.findall (r '[aeiou]', str, re.IGNORECASE))
`` `

`` `python
print(count_vowels('foobar')) # 3
print(count_vowels('gym'))# 0
```
