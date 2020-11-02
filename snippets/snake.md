---
title: snake
tags: string,regexp,intermediate
---

Converts a string to snake case.

- Use `re.sub()` to match all words in the string, `str.lower()` to lowercase them.
- Use `re.sub()` to replace any `-` characters with spaces.
- Finally, use `str.join()` to combine all words using `-` as the separator.

```py
from re import sub

def snake(s):
  return '_'.join(
    sub('([A-Z][a-z]+)', r' \1',
    sub('([A-Z]+)', r' \1',
    s.replace('-', ' '))).split()).lower()
```

```py
snake('camelCase') # 'camel_case'
snake('some text') # 'some_text'
snake('some-mixed_string With spaces_underscores-and-hyphens')
# 'some_mixed_string_with_spaces_underscores_and_hyphens'
snake('AllThe-small Things') # 'all_the_small_things'
```
