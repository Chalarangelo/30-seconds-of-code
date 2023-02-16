---
title: "Tip: You should use dict.get(key) instead of dict[key]"
shortTitle: dict.get(key) vs dict[key]
type: tip
tags: python,dictionary
cover: fruit-feast
excerpt: Learn the difference between two common ways to access values in Python dictionaries and level up your code today.
firstSeen: 2021-01-07T11:00:00+02:00
lastUpdated: 2021-06-12T19:30:41+03:00
---

A common debate among Python developers seems to stem from the retrieval of dictionary values, which can be accomplished using either `dict[key]` or `dict.get(key)`.

Although you can achieve the same result using either one, `dict.get()` is usually preferred, as it accepts a second argument which acts as the default value shall the key not exist in the given dictionary. Due to this property, `dict.get()` will always return a value, whereas `dict[key]` will raise a `KeyError` if the given key is missing.

```py
a = { 'max': 200 }
b = { 'min': 100, 'max': 250 }
c = { 'min': 50 }

a['min'] + b['min'] + c['min'] # throws KeyError
a.get('min', 0) + b.get('min', 0) + c.get('min', 0) # 150
```
