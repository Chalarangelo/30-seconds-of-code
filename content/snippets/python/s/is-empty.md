---
title: Collection is empty
type: snippet
language: python
tags: [list,dictionary,string]
author: chalarangelo
cover: salad-1
dateModified: 2023-01-12T05:00:00-04:00
---

Checks if the a value is an empty sequence or collection.

- Use `not` to test the truth value of the provided sequence or collection.

```py
def is_empty(val):
  return not val
```

```py
is_empty([]) # True
is_empty({}) # True
is_empty('') # True
is_empty(set()) # True
is_empty(range(0)) # True
is_empty([1, 2]) # False
is_empty({ 'a': 1, 'b': 2 }) # False
is_empty('text') # False
is_empty(set([1, 2])) # False
is_empty(range(2)) # False
```
