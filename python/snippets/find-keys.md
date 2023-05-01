---
title: Find keys with value
type: snippet
tags: [dictionary]
cover: laptop-plants-2
dateModified: 2020-11-02T19:27:53+02:00
---

Finds all keys in the provided dictionary that have the given value.

- Use `dictionary.items()`, a generator and `list()` to return all keys that have a value equal to `val`.

```py
def find_keys(dict, val):
  return list(key for key, value in dict.items() if value == val)
```

```py
ages = {
  'Peter': 10,
  'Isabel': 11,
  'Anna': 10,
}
find_keys(ages, 10) # [ 'Peter', 'Anna' ]
```
