---
title: Check property
tags: function
expertise: intermediate
firstSeen: 2020-01-02T16:49:25+02:00
lastUpdated: 2020-11-02T19:27:07+02:00
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
