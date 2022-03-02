---
title: Decapitalize string
tags: string
expertise: intermediate
firstSeen: 2018-02-01T10:19:59+02:00
lastUpdated: 2020-11-02T19:27:53+02:00
---

Decapitalizes the first letter of a string.

- Use list slicing and `str.lower()` to decapitalize the first letter of the string.
- Use `str.join()` to combine the lowercase first letter with the rest of the characters.
- Omit the `upper_rest` parameter to keep the rest of the string intact, or set it to `True` to convert to uppercase.

```py
def decapitalize(s, upper_rest = False):
  return ''.join([s[:1].lower(), (s[1:].upper() if upper_rest else s[1:])])
```

```py
decapitalize('FooBar') # 'fooBar'
decapitalize('FooBar', True) # 'fOOBAR'
```
