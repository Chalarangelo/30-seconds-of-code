---
title: Reverse list
type: snippet
language: python
tags: [list,string]
cover: industrial-tokyo
dateModified: 2020-11-02T19:28:27+02:00
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
