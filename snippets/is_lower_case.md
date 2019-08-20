---
title: is_lower_case
tags: string,utility,beginner
---

Checks if a string is lower case.

Convert the given string to lower case, using `str.lower()` and compare it to the original.

```py
def is_lower_case(string):
  return string == string.lower()
```

```py
is_lower_case('abc') # True
is_lower_case('a3@$') # True
is_lower_case('Ab4') # False
```