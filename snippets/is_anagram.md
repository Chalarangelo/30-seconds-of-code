---
title: is_anagram
tags: string,intermediate
---

Checks if a string is an anagram of another string (case-insensitive, ignores spaces, punctuation and special characters).

Filter out non-alphanumeric characters and transform each character to its lowercase version.
Use a `collections.Counter` to count the resulting characters and compare the results.

```py
from collections import Counter

def is_anagram(s1, s2):
  return Counter(
    c.lower() for c in s1 if c.isalnum()
  ) == Counter(
    c.lower() for c in s2 if c.isalnum()
  )
```

```py
is_anagram("#anagram", "Nag a ram!")  # True
```
