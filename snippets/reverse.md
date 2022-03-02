---
title: Reverse list
tags: list,string
expertise: beginner
firstSeen: 2020-10-06T19:02:30+03:00
lastUpdated: 2020-11-02T19:28:27+02:00
---

Reverses a list or a string.

- Use slice notation to reverse the list or string.

```py
def reverse(itr):
  return itr[::-1]
```

```py
reverse([1, 2, 3]) # [3, 2, 1]
reverse('snippet') # 'teppins'
```
