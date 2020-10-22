---
title: pluck
tags: list,dictionary,intemediary
---

Extracts a list of values from a dict given a key

- Given an `array` of `dict`s, returns the list of values of the `key` passed from each dict record.
- When a dict does not have the `key` passed, returns `None`

```py
def pluck(array, key):
  return list(map(lambda entry: dict.get(entry, key), array))
```

```py
simpsons = [
  { "name": "lisa", "age": 8 },
  { "name": "homer", "age": 36 },
  { "name": "marge", "age": 34 },
  { "name": "bart", "age": 10 },
];

pluck(simpsons, "age") # [8, 36, 34, 10]
```