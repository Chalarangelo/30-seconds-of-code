---
title: check_prop
tags: function,intermediate
---

Creates a function that will invoke a predicate function for the specified property on a given object.

- Return a `lambda` function that takes an object and applies the predicate function, `fn` to the specified property.

```py
def check_prop(fn, prop):
  return lambda obj: fn(obj[prop])
```

```py
check_age = check_prop(lambda x: x >= 18, 'age')
user = {'name': 'Mark', 'age': 18}
check_age(user) # True
```
