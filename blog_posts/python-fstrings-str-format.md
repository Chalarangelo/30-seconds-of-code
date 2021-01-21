---
title: "Tip: 2 ways to format a string in Python"
type: story
tags: python,string
authors: maciv
cover: blog_images/feathers.jpg
excerpt: Learn two ways to format a string in Python with this quick tip.
---

### f-string

[Formatted string literals](https://docs.python.org/3/reference/lexical_analysis.html?highlight=lexical%20analysis#formatted-string-literals), commonly known as f-strings, are strings prefixed with `'f`' or `'F'`. These strings can contain replacement fields, enclosed in curly braces (`{}`).

```python
name = 'John'
age = 32

print(f'{name} is {age} years old') # 'John is 32 years old'
```

### str.format()

The [`str.format()`](https://docs.python.org/3/library/stdtypes.html?highlight=str%20format#str.format) method works very much alike f-strings, the main difference being that replacement fields are supplied as arguments instead of as part of the string.

```python
name = 'John'
age = 32

print('{0} is {1} years old'.format(name, age)) # 'John is 32 years old'
```

**Image credit:** [Maksim Shutov](https://unsplash.com/@maksimshutov?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
