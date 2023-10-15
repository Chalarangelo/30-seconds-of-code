---
title: Check if email is valid
type: snippet
language: python
tags: [email, validation]
cover: colorful-rocks
dateModified: 2022-10-15
---

- **Function Purpose:**
  - The snippet provides a Python function named `is_valid_email` designed to validate whether a given string is a valid email address.

- **How the Snippet Works:**
    - Uses a regular expression pattern to match common email formats.
    - Parameters:
       - email (str): The email address to be checked.
    - Returns:
       - bool: True if the email is valid, False otherwise.

- **requirements:**
  - python: `>=3.6`
  - other_packages: `["re"]`

```py
import re

def is_valid_email(email):
    pattern = r'^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$'
    return bool(re.match(pattern, email))
```

```py
valid_email = 'example@email.com'
invalid_email = 'invalid_email@'

is_valid_email(valid_email)   # True
is_valid_email(invalid_email) # False
```
