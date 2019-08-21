---
title: snake
tags: string,regexp,intermediate
---

Converts a string to snake case.

Break the string into words and combine them adding `_-_` as a separator, using a regexp.

```py
import re

def snake(str):
  return re.sub(r"(\s|_|-)+","-",
    re.sub(r"[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+",
    lambda mo: mo.group(0).lower(),str)
  )
```

```py
snake('camelCase'); # 'camel_case'
snake('some text'); # 'some_text'
snake('some-mixed_string With spaces_underscores-and-hyphens'); # 'some_mixed_string_with_spaces_underscores_and_hyphens'
snake('AllThe-small Things'); # "all_the_smal_things"
```
