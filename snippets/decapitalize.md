---
title: decapitalize
tags: string
---
Decapitalizes the first letter of a string.

Decapitalizes the first letter of the string and then adds it with rest of the string. Omit the `upper_rest` parameter to keep the rest of the string intact, or set it to `true` to convert to uppercase.

```python
def decapitalize(string, upper_rest=False):
    return str[:1].lower() + (str[1:].upper() if upper_rest else str[1:])
```

```python
decapitalize('FooBar') # 'fooBar'
decapitalize('FooBar', True) # 'fOOBAR'
```