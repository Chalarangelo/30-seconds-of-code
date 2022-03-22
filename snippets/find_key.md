---
title: Find key of value
tags: dictionary
expertise: intermediate
author: maciv
firstSeen: 2020-04-16T19:13:20+03:00
lastUpdated: 2020-11-02T19:27:53+02:00
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
