---
title: camel
tags: string,regexp,intermediate
---

Converts a string to camelcase.

Break the string into words and combine them capitalizing the first letter of each word, using a regexp, `title()` and `lower`.

```py
import re

def camel(s):
  s = re.sub(r"(\s|_|-)+", " ", s).title().replace(" ", "")
  return s[0].lower() + s[1:]
```

```py
camel('some_database_field_name'); # 'someDatabaseFieldName'
camel('Some label that needs to be camelized'); # 'someLabelThatNeedsToBeCamelized'
camel('some-javascript-property'); # 'someJavascriptProperty'
camel('some-mixed_string with spaces_underscores-and-hyphens'); # 'someMixedStringWithSpacesUnderscoresAndHyphens'
```
