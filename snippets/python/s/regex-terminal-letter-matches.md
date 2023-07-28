---
title: Use regex to find all words with given start and stop characters
short title: Regex terminal character matches
type: snippet
language: python
tags: [regex, string]
cover: dog-waiting
dateModified: 2023-07-28T01:46:20+0000
---

Regex (Regular Expression) is a powerful tool for pattern matching and text manipulation in strings.
The following function uses regex to return all words in a string beginning with a given character and ending with another given character.

- Initialize a variable `pattern` whose value is determined in the conditional block.
- Use `re.findall()` alongside `pattern` to extract all words with the desired terminal characters `char1` and `char2` from `string`.
- If `char2` is passed as a parameter in the function call, then `pattern = rf'\b{char1}\w*{char2}\b'`.
-  Else, `pattern = rf'\b{char1}\w+'`.
-  `re.IGNORECASE` is used for case-insensitive matching, treating uppercase and lowercase letters as the same. For example, `e` is treated the same as `E`.

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

#### Passing both starting and ending characters
```py
terminal_letter_matches("Elephants love to dance, but puffins prefer to eat waffles.", 'e', 's') # ['Elephants']
```

#### Passing only starting character
```py
terminal_letter_matches("Elephants love to dance, but puffins prefer to eat waffles.", 'e') # ['Elephants', 'eat']
```
