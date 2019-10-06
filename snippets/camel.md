---
title: camel
tags: string,regexp,intermediate
---

Converts a string to camelcase.

Break the string into words and combine them capitalizing the first letter of each word, using a regexp, `title()` and `lower`.

```py
import re

def camel(input_string):
  input_string = re.sub(r"(\s|_|-)+", " ", input_string).title().replace(" ", "")
  return input_string[0].lower() + s[1:]
```

```py
camel('some_database_field_name'); # 'someDatabaseFieldName'
camel('Some label that needs to be camelized'); # 'someLabelThatNeedsToBeCamelized'
camel('some-javascript-property'); # 'someJavascriptProperty'
camel('some-mixed_string with spaces_underscores-and-hyphens'); # 'someMixedStringWithSpacesUnderscoresAndHyphens'
```
