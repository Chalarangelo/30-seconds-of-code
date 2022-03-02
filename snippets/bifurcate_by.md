---
title: Bifurcate list based on function
tags: list
expertise: intermediate
firstSeen: 2019-08-20T12:41:21+03:00
lastUpdated: 2020-11-02T19:27:07+02:00
---

Splits values into two groups, based on the result of the given filtering function.

- Use a list comprehension to add elements to groups, based on the value returned by `fn` for each element.
- If `fn` returns a truthy value for any element, add it to the first group, otherwise add it to the second group.

```py
def bifurcate_by(lst, fn):
  return [
    [x for x in lst if fn(x)],
    [x for x in lst if not fn(x)]
  ]
```

```py
bifurcate_by(['beep', 'boop', 'foo', 'bar'], lambda x: x[0] == 'b')
# [ ['beep', 'boop', 'bar'], ['foo'] ]
```
