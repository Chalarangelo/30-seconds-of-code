---
title: Split into lines
type: snippet
language: python
tags: [string]
cover: succulent-4
excerpt: Splits a multiline string into a list of lines.
listed: true
dateModified: 2020-11-02
---

Splits a multiline string into a list of lines.

- Use `str.split()` and `'\n'` to match line breaks and create a list.
- [`str.splitlines()`](https://docs.python.org/3/library/stdtypes.html#str.splitlines) provides similar functionality to this snippet.

```py
def split_lines(s):
  return s.split('\n')

split_lines('This\nis a\nmultiline\nstring.\n')
# ['This', 'is a', 'multiline', 'string.' , '']
```
