---
title: Check property
type: snippet
language: python
tags: [function]
cover: lake-trees
dateModified: 2020-11-02T19:27:07+02:00
---

Creates a function that will invoke a predicate function for the specified property on a given dictionary.

- Return a `lambda` function that takes a dictionary and applies the predicate function, `fn` to the specified property.

```py
def check_prop(fn, prop):
  return lambda obj: fn(obj[prop])
```

```py
check_age = check_prop(lambda x: x >= 18, 'age')
user = {'name': 'Mark', 'age': 18}
check_age(user) # True
```
