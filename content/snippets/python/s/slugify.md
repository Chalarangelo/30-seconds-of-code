---
title: String to slug
type: snippet
language: python
tags: [string,regexp]
cover: sliced-fruits
excerpt: Converts a string to a URL-friendly slug.
listed: true
dateModified: 2020-10-25
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

slugify('Hello World!') # 'hello-world'
```
