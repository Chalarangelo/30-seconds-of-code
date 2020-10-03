---
title: words
tags: string,regexp,beginnner
---

Converts a given string into an array of words.

- Use `re.split()` with a supplied pattern (defaults to non-alpha as a regexp) to convert to an array of strings.
- Use `filter()` in combination with `None` to remove any empty strings.
- Omit the second argument to use the default regexp.

```py
import re

def words(str, pattern = '[^a-zA-Z-]+'):
  return list(filter(None, re.split(pattern, str)))
```

```py
words('I love Python!!') # ['I', 'love', 'Python']
words('python, javaScript & coffee') # ['python', 'javaScript', 'coffee']
```
