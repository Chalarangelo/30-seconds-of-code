---
title: palindrome
tags: string,intermediate
---

Returns `True` if the given string is a palindrome, `False` otherwise.

Use `input_string.lower()` and `re.sub()` to convert to lowercase and  remove non-alphanumeric characters from the given string. 
Then, compare the new string with its reverse.

```py
from re import sub

def palindrome(input_string):
  s = sub('[\W_]', '', input_string.lower())
  return s == s[::-1]
```

```py
palindrome('taco cat') # True
```