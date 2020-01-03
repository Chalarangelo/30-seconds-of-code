---
title: function_name
tags: utility,intermediate
---

Given a predicate function, `fn`, and a `prop` string, this curried function will then take an object to inspect by calling the property and passing it to the predicate.

Return a `lambda` function that takes an object and applies the predicate function, `fn` to the specified property.

```py
def check_prop(fn, prop):
  return lambda obj: fn(obj[prop])
```

```py
check_age = check_prop(lambda x: x >= 18, 'age')
user = {'name': 'Mark', 'age': 18}

check_age(user) # True
```
