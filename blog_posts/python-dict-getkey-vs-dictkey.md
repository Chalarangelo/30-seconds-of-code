---
title: "Tip: You should use dict.get(key) instead of dict[key]"
type: tip
tags: python,dictionary
authors: maciv
cover: blog_images/fruit-feast.jpg
excerpt: Learn the difference between two common ways to access values in Python dictionaries and level up your code today.
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

**Image credit:** [Danielle MacInnes](https://unsplash.com/@dsmacinnes?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
