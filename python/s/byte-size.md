---
title: Byte size of string
type: snippet
language: python
tags: [string]
cover: river-house-lights
dateModified: 2020-11-02T19:27:07+02:00
---

Returns the length of a string in bytes.

- Use `str.encode()` to encode the given string and return its length.

```py
def byte_size(s):
  return len(s.encode('utf-8'))
```

```py
byte_size('😀') # 4
byte_size('Hello World') # 11
```
