---
title: camel
tags: string,regexp,intermediate
---

Converts a string to camelcase.

Break the string into words and combine them capitalizing the first letter of each word, using `title`.

`(\s|_|-)+` matches one or more spaces (`\s`), underscores (`_`) or hyphens (`-`). `re.sub` replaces these matches with single spaces.  
`title` capitalizes the first letter of each word. `replace(" ", "")` removes the spaces between words.

```py
import re

def camel(s):
  pascal = re.sub(r"(\s|_|-)+", " ", s).title().replace(" ", "")
  return pascal[0].lower() + pascal[1:]
```

```py
camel('some_database_field_name'); # 'someDatabaseFieldName'
camel('Some label that needs to be camelized'); # 'someLabelThatNeedsToBeCamelized'
camel('some-javascript-property'); # 'someJavascriptProperty'
camel('some-mixed_string with spaces_underscores-and-hyphens'); # 'someMixedStringWithSpacesUnderscoresAndHyphens'
```
