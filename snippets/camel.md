---
title: camel
tags: string,regexp,intermediate
---

Converts a string to camelcase.

Break the string into words and combine them capitalizing the first letter of each word, using a regexp.

```py
import re

def camel(str):
  s = re.sub(r"(\s|_|-)+","",
    re.sub(r"[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+",
    lambda mo: mo.group(0)[0].upper() + mo.group(0)[1:].lower(),str)
  )
  return s[0].lower() + s[1:]
```

```py
camel('some_database_field_name'); # 'someDatabaseFieldName'
camel('Some label that needs to be camelized'); # 'someLabelThatNeedsToBeCamelized'
camel('some-javascript-property'); # 'someJavascriptProperty'
camel('some-mixed_string with spaces_underscores-and-hyphens'); # 'someMixedStringWithSpacesUnderscoresAndHyphens'
```
