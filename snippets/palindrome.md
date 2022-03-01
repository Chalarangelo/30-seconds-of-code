---
title: Palindrome
tags: string
expertise: intermediate
firstSeen: 2018-02-01T10:19:59+02:00
lastUpdated: 2020-11-02T19:28:27+02:00
---

Checks if the given string is a palindrome.

- Use `str.lower()` and `re.sub()` to convert to lowercase and remove non-alphanumeric characters from the given string.
- Then, compare the new string with its reverse, using slice notation.

```py
from re import sub

def palindrome(s):
  s = sub('[\W_]', '', s.lower())
  return s == s[::-1]
```

```py
palindrome('taco cat') # True
```
