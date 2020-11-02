---
title: find_key
tags: dictionary,intermediate
---

Finds the first key in the provided dictionary that has the given value.

- Use `dictionary.items()` and `next()` to return the first key that has a value equal to `val`.

```py
def find_key(dict, val):
  return next(key for key, value in dict.items() if value == val)
```

```py
ages = {
  'Peter': 10,
  'Isabel': 11,
  'Anna': 9,
}
find_key(ages, 11) # 'Isabel'
```
