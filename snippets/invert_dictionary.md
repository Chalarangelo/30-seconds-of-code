---
title: invert_dictionary
tags: dictionary,intermediate
---

Inverts a dictionary with unique hashable values.

- Use `dictionary.items()` in combination with a list comprehension to create a new dictionary with the values and keys inverted.

```py
def invert_dictionary(obj):
  return { value: key for key, value in obj.items() }
```

```py
ages = {
  'Peter': 10,
  'Isabel': 11,
  'Anna': 9,
}
invert_dictionary(ages) # { 10: 'Peter', 11: 'Isabel', 9: 'Anna' }
```
