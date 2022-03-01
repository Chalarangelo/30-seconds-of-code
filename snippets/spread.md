---
title: Spread list
tags: list
expertise: intermediate
firstSeen: 2018-01-08T22:38:05+02:00
lastUpdated: 2020-09-15T16:13:06+03:00
---

Flattens a list, by spreading its elements into a new list.

- Loop over elements, use `list.extend()` if the element is a list, `list.append()` otherwise.

```py
def spread(arg):
  ret = []
  for i in arg:
    ret.extend(i) if isinstance(i, list) else ret.append(i)
  return ret
```

```py
spread([1, 2, 3, [4, 5, 6], [7], 8, 9]) # [1, 2, 3, 4, 5, 6, 7, 8, 9]
```
