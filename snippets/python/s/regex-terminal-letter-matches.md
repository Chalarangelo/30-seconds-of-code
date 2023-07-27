---
title: regex-terminal-letter-matches
type: snippet
language: python
tags: [utility]
cover: image
dateModified: 2021-06-13T05:00:00-04:00
---

Explain briefly what the snippet does.

- Explain briefly how the snippet works.
- Use bullet points for your snippet's explanation.
- Try to explain everything briefly but clearly.

```py
import re

def terminal_letter_matches(string, char1, char2=None):
    # code
    pattern = ""
    if char2:
        pattern = rf'\b{char1}\w*{char2}\b'
    else:
        pattern = rf'\b{char1}\w+'
    
    return re.findall(pattern, string, re.IGNORECASE)
```

```py
terminal_letter_matches("Elephants love to dance, but puffins prefer to eat waffles.", 'e', 's') # ['Elephants']
```
