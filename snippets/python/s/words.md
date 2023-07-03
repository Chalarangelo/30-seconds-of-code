---
title: String to words
type: snippet
language: python
tags: [string,regexp]
cover: rocky-lake
dateModified: 2020-11-02T19:28:35+02:00
---

Converts a given string into a list of words.

- Use `re.findall()` with the supplied `pattern` to find all matching substrings.
- Omit the second argument to use the default regexp, which matches alphanumeric and hyphens.

```py
import re

def words(s, pattern = '[a-zA-Z-]+'):
  return re.findall(pattern, s)
```

```py
words('I love Python!!') # ['I', 'love', 'Python']
words('python, javaScript & coffee') # ['python', 'javaScript', 'coffee']
words('build -q --out one-item', r'\b[a-zA-Z-]+\b')
# ['build', 'q', 'out', 'one-item']
```
