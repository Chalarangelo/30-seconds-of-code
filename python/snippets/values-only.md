---
title: Dictionary values
type: snippet
tags: [dictionary,list]
cover: colorful-lounge
dateModified: 2020-11-02T19:28:35+02:00
---

Returns a flat list of all the values in a flat dictionary.

- Use `dict.values()` to return the values in the given dictionary.
- Return a `list()` of the previous result.

```py
def values_only(flat_dict):
  return list(flat_dict.values())
```

```py
ages = {
  'Peter': 10,
  'Isabel': 11,
  'Anna': 9,
}
values_only(ages) # [10, 11, 9]
```
