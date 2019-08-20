---
title: byte_size
tags: string
---
Returns the length of a string in bytes.

`utf-8` encodes a given string, then `len` finds the length of the encoded string.

```py
def byte_size(string):
    return(len(string.encode('utf-8')))
```

```py
byte_size('😀') # 4
byte_size('Hello World') # 11
```
