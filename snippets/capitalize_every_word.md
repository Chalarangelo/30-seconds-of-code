---
title: capitalize_every_word
tags: string
---
Capitalizes the first letter of every word in a string.

Uses `str.title` to capitalize first letter of every word in the string.

```python
def capitalize_every_word(string):
    return string.title()
```

```python
capitalize_every_word('hello world!') # 'Hello World!'
```