---
title: How can I check if a string is empty in Python?
shortTitle: String is empty
type: question
tags: python,string
author: chalarangelo
cover: blog_images/tea-laptop-table.jpg
excerpt: Here are two quick and elegant ways to check if a string is empty in Python.
firstSeen: 2022-08-05T05:00:00-04:00
---

When working with Python strings, a pretty common question is how does one check if a string is empty. There's a straightforward answer to this that takes advantage of the truth value of strings.

In Python, any object can be tested for truth value, including strings. In this context, **strings are considered truthy if they are non-empty**, meaning they contain at least one character. Thus, simply using the `not` operator, you can check if a string is empty.

```py
empty_string = ''
non_empty_string = 'Hello'

not empty_string # True
not non_empty_string # False
```

While this method works in most cases, you may also need to check if the actual value is a string. In this case, you can compare your string to the empty string using the `==` operator.

```py
empty_string = ''
non_empty_string = 'Hello'
non_string = 0

empty_string == '' # True
non_empty_string == '' # False
non_string == '' # False
```
