---
title: Dictionary keys
type: snippet
language: python
tags: [dictionary,list]
cover: succulent-5
dateModified: 2020-11-02T19:28:05+02:00
---

Creates a flat list of all the keys in a flat dictionary.

- Use `dict.keys()` to return the keys in the given dictionary.
- Return a `list()` of the previous result.

```py
def keys_only(flat_dict):
  return list(flat_dict.keys())
```

```py
ages = {
  'Peter': 10,
  'Isabel': 11,
  'Anna': 9,
}
keys_only(ages) # ['Peter', 'Isabel', 'Anna']
```
