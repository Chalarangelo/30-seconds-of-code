---
title: "Tip: 2 ways to format a string in Python"
shortTitle: String formatting
type: tip
language: python
tags: [string]
cover: feathers
excerpt: Learn two ways to format a string in Python with this quick tip.
dateModified: 2021-06-12T19:30:41+03:00
---

### f-string

[Formatted string literals](https://docs.python.org/3/reference/lexical_analysis.html?highlight=lexical%20analysis#formatted-string-literals), commonly known as f-strings, are strings prefixed with `'f`' or `'F'`. These strings can contain replacement fields, enclosed in curly braces (`{}`).

```py
name = 'John'
age = 32

print(f'{name} is {age} years old') # 'John is 32 years old'
```

### str.format()

The [`str.format()`](https://docs.python.org/3/library/stdtypes.html?highlight=str%20format#str.format) method works very much alike f-strings, the main difference being that replacement fields are supplied as arguments instead of as part of the string.

```py
name = 'John'
age = 32

print('{0} is {1} years old'.format(name, age)) # 'John is 32 years old'
```
