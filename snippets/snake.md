---
title: snake
tags: string,regexp,intermediate
---

Converts a string to snake case.

Break the string into words and combine them adding `_-_` as a separator, using a regexp.

```py
import re

def snake(str):
    return '-'.join(re.sub('([A-Z][a-z]+)', r' \1',
                      re.sub('([A-Z]+)', r' \1', str)).split()).lower()
```

```py
snake('camelCase'); # 'camel-case'
snake('some text'); # 'some-text'
snake('some-mixed_string With spaces_underscores-and-hyphens'); # 'some-mixed-string-with-spaces-underscores-and-hyphens'
snake('AllThe-small Things'); # "all-the-smal-things"
```
