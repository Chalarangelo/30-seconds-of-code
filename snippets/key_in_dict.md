---
title: Key in dictionary
tags: dictionary
expertise: beginner
author: maciv
firstSeen: 2020-10-16T21:30:49+03:00
lastUpdated: 2020-10-16T21:30:49+03:00
---

Checks if the given key exists in a dictionary.

- Use the `in` operator to check if `d` contains `key`.

```py
def key_in_dict(d, key):
  return (key in d)
```

```py
d = {'one': 1, 'three': 3, 'five': 5, 'two': 2, 'four': 4}
key_in_dict(d, 'three') # True
```
