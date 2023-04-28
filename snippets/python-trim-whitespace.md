---
title: How do I trim whitespace from a string in Python?
shortTitle: Trim whitespace
type: question
tags: [python,string]
cover: organizer
excerpt: Oftentimes you might need to trim whitespace from a string in Python. Learn of three different way to do this in this short guide.
dateModified: 2021-12-13T05:00:00-04:00
---

When working with Python strings, a pretty common question is how to trim whitespace from a string. Whitespace characters are the space (` `), tab (`\t`), newline (`\n`), and carriage return characters (`\r`). Here are 3 different methods to trim whitespace from a string in Python.

### Remove leading and trailing whitespace characters

Use the `str.strip()` method to remove whitespace characters from both the beginning and end of a string.

```py
'  Hello  '.strip()    # 'Hello'
```

### Remove leading whitespace characters

Leading whitespace characters are the whitespace characters at the start of a string. To remove them, use the `str.lstrip()` method.

```py
'  Hello  '.lstrip()   # 'Hello  '
```

### Remove trailing whitespace characters

Trailing whitespace characters are the whitespace characters at the end of a string. To remove them, use the `str.rstrip()` method.

```py
'  Hello  '.rstrip()   # '  Hello'
```
