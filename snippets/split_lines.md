---
title: split_lines
tags: string,beginner
---

Splits a multiline string into a list of lines.

Use `input_string.split()` and `'\n'` to match line breaks and create a list.

```py
def split_lines(input_string):
  return input_string.split('\n')
```

```py
split_lines('This\nis a\nmultiline\nstring.\n') # 'This\nis a\nmultiline\nstring.\n'
```
