---
title: Most frequent element
type: snippet
language: python
tags: [list]
cover: secret-tree
excerpt: Returns the most frequent element in a list.
listed: true
dateModified: 2020-11-02
---

Returns the most frequent element in a list.

- Use `set()` to get the unique values in `lst`.
- Use `max()` to find the element that has the most appearances.

```py
def most_frequent(lst):
  return max(set(lst), key = lst.count)

most_frequent([1, 2, 1, 2, 3, 2, 1, 4, 2]) #2
```
