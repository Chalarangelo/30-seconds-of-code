---
title: get
tags: dictionary,list,intermediate
---

Retrieves the value of the nested key indicated by the given selector list from a dictionary or list.

- Use `functools.reduce()` to iterate over the `selectors` list.
- Apply `operator.getitem()` for each key in `selectors`, retrieving the value to be used as the iteratee for the next iteration.

```py
from functools import reduce 
from operator import getitem

def get(d, selectors):
  return reduce(getitem, selectors, d)
```

```py
users = {
  'freddy': {
    'name': {
      'first': 'fred',
      'last': 'smith' 
    },
    'postIds': [1, 2, 3]
  }
}
get(users, ['freddy', 'name', 'last']) # 'smith'
get(users, ['freddy', 'postIds', 1]) # 2
```
