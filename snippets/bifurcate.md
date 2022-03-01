---
title: Bifurcate list based on values
tags: list
expertise: intermediate
firstSeen: 2019-08-20T12:37:06+03:00
lastUpdated: 2020-11-02T19:27:07+02:00
---

Splits values into two groups, based on the result of the given `filter` list.

- Use a list comprehension and `zip()` to add elements to groups, based on `filter`.
- If `filter` has a truthy value for any element, add it to the first group, otherwise add it to the second group.

```py
def bifurcate(lst, filter):
  return [
    [x for x, flag in zip(lst, filter) if flag],
    [x for x, flag in zip(lst, filter) if not flag]
  ]
```

```py
bifurcate(['beep', 'boop', 'foo', 'bar'], [True, True, False, True])
# [ ['beep', 'boop', 'bar'], ['foo'] ]
```
