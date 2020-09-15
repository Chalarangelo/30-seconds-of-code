---
title: for_each_right
tags: list,beginner
---

Executes the provided function once for each list element, starting from the list's last element.

- Use a `for` loop in combination with slice notation to execute `fn` for each element in `itr`, starting from the last one.

```py
def for_each_right(itr, fn):
  for el in itr[::-1]:
    fn(el)
```

```py
for_each_right([1, 2, 3], print) # 3 2 1
```
