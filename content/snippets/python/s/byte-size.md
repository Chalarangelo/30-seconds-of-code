---
title: Byte size of a Python string
shortTitle: Byte size
language: python
tags: [string]
cover: river-house-lights
excerpt: Find the byte size of a Python string, containing special characters or not.
listed: false
dateModified: 2024-08-16
---

The byte size of a string is the number of bytes required to encode it. This is particularly useful when working with strings that contain special characters or emojis, as they may require more than one byte to encode.

While the `len()` function returns the number of characters in a string, it doesn't account for the number of bytes required to encode it. To get the byte size of a string, you can use the `str.encode()` method to encode the string and then return the length of the encoded string.

```py
def byte_size(s):
  return len(s.encode('utf-8'))

byte_size('😀') # 4
byte_size('Hello World') # 11
```
