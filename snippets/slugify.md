---
title: slugify
tags: string,regexp,intermediate
---

Converts a string to a URL-friendly slug.

- Use `str.lower()` and `str.strip()` to normalize the input string.
- Use `re.sub()` to to replace spaces, dashes and underscores with `-` and remove special characters.

```py
import re

def slugify(s):
  s = s.lower().strip()
  s = re.sub(r'[^\w\s-]', '', s)
  s = re.sub(r'[\s_-]+', '-', s)
  s = re.sub(r'^-+|-+$', '', s)
  return s
```

```py
slugify('Hello World!') # 'hello-world'
```
