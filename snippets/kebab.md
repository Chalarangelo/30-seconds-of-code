---
title: kebab
tags: string,regexp,intermediate
---

Converts a string to kebab case.

Break the string into words and combine them adding `-` as a separator, using a regexp.

```py
from re import sub

def kebab(s):
  return sub(
    r"(\s|_|-)+","-",
    sub(
      r"[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+",
      lambda mo: mo.group(0).lower(), s))
```

```py
kebab('camelCase') # 'camel-case'
kebab('some text') # 'some-text'
kebab('some-mixed_string With spaces_underscores-and-hyphens') # 'some-mixed-string-with-spaces-underscores-and-hyphens'
kebab('AllThe-small Things') # "all-the-small-things"
```
