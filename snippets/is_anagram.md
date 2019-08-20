---
title: is_anagram
tags: string,intermediate
---

Checks if a string is an anagram of another string (case-insensitive, ignores spaces, punctuation and special characters).

Use `str.replace()` to remove spaces from both strings.
Compare the lengths of the two strings, return `False` if they are not equal.
Use `sorted()` on both strings and compare the results.

```py
def is_anagram(str1, str2):
  _str1, _str2 = str1.replace(" ", ""), str2.replace(" ", "")

  if len(_str1) != len(_str2):
    return False
  else:
    return sorted(_str1.lower()) == sorted(_str2.lower())
```

```py
is_anagram("anagram", "Nag a ram")  # True
```
