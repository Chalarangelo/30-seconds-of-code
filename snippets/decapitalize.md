---
title: decapitalize
tags: string,intermediate
---

Decapitalizes the first letter of a string.

- Decapitalize the first letter of the string and then add it with rest of the string.
- Omit the `upper_rest` parameter to keep the rest of the string intact, or set it to `True` to convert to uppercase.

```py
def decapitalize(s, upper_rest=False):
  return s[:1].lower() + (s[1:].upper() if upper_rest else s[1:])
```

```py
decapitalize('FooBar') # 'fooBar'
decapitalize('FooBar', True) # 'fOOBAR'
```
