---
title: Execute function for each list element
tags: list
expertise: beginner
author: maciv
firstSeen: 2020-03-15T12:54:08+02:00
lastUpdated: 2020-09-15T16:13:06+03:00
---

Executes the provided function once for each list element.

- Use a `for` loop to execute `fn` for each element in `itr`.

```py
def for_each(itr, fn):
  for el in itr:
    fn(el)
```

```py
for_each([1, 2, 3], print) # 1 2 3
```
