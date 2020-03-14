---
title: for_each
tags: list,beginner
---

Executes the provided function once for each list element.

Use a `for` loop to execute `fn` for each element in `itr`.

```py
def for_each(itr, fn):
  for el in itr:
    fn(el)
```

```py
for_each([1, 2, 3], print) # 1 2 3
```
