---
title: Convert a Python string to a slug
shortTitle: String to slug
language: python
tags: [string,regexp]
cover: sliced-fruits
excerpt: Convert a string to a URL-friendly slug, using Python and regular expressions.
listed: false
dateModified: 2024-07-13
---

A slug is a URL-friendly version of a string, typically used in URLs to identify a resource. Slugs use only lowercase letters, numbers, and hyphens, and are often used to generate human-readable URLs.

In order to convert any string to a slug, you first need to use `str.lower()` and `str.strip()` to normalize the input string. Then, you can use `re.sub()` and regular expressions to replace spaces, dashes, and underscores with hyphens, and remove any special characters.

```py
from re import sub

def slugify(s):
  s = s.lower().strip()
  s = re.sub(r'[^\w\s-]', '', s)
  s = re.sub(r'[\s_-]+', '-', s)
  s = re.sub(r'^-+|-+$', '', s)
  return s

slugify('Hello World!') # 'hello-world'
```
