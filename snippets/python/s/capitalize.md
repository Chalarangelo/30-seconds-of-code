---
title: Capitalize string
type: snippet
language: python
tags: [string]
cover: palm-tree-house
dateModified: 2020-11-02T19:27:07+02:00
---

Capitalizes the first letter of a string.

- Use list slicing and `str.upper()` to capitalize the first letter of the string.
- Use `str.join()` to combine the capitalized first letter with the rest of the characters.
- Omit the `lower_rest` parameter to keep the rest of the string intact, or set it to `True` to convert to lowercase.

```py
def capitalize(s, lower_rest = False):
  return ''.join([s[:1].upper(), (s[1:].lower() if lower_rest else s[1:])])
```

```py
capitalize('fooBar') # 'FooBar'
capitalize('fooBar', True) # 'Foobar'
```
