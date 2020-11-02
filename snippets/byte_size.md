---
title: byte_size
tags: string,beginner
---

Returns the length of a string in bytes.

- Use `str.encode('utf-8')` to encode the given string and return its length.

```py
def byte_size(s):
  return len(s.encode('utf-8'))
```

```py
byte_size('😀') # 4
byte_size('Hello World') # 11
```
