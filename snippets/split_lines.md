---
title: Split into lines
tags: string
expertise: beginner
firstSeen: 2019-08-20T16:15:15+03:00
lastUpdated: 2020-11-02T19:28:35+02:00
---

Splits a multiline string into a list of lines.

- Use `str.split()` and `'\n'` to match line breaks and create a list.
- [`str.splitlines()`](https://docs.python.org/3/library/stdtypes.html#str.splitlines) provides similar functionality to this snippet.

```py
def split_lines(s):
  return s.split('\n')
```

```py
split_lines('This\nis a\nmultiline\nstring.\n')
# ['This', 'is a', 'multiline', 'string.' , '']
```
