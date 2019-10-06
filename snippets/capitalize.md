---
title: capitalize
tags: string,intermediate
---

Capitalizes the first letter of a string.

Capitalize the first letter of the string and then add it with rest of the string. 
Omit the `lower_rest` parameter to keep the rest of the string intact, or set it to `True` to convert to lowercase.

```py
def capitalize(input_string, lower_rest=False):
  return input_string[:1].upper() + (input_string[1:].lower() if lower_rest else input_string[1:])
```

```py
capitalize('fooBar') # 'FooBar'
capitalize('fooBar', True) # 'Foobar'
```