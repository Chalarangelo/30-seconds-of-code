---
title: camel
tags: string,regexp,intermediate
---

Converts a string to camelcase.

Identify one or more groups containing the pattern with `-` or `_` using regexp `r"(_|-)+"` and replace the pattern with a `" "` (space literal) using `re.sub` method. Apply `title()` method on the obtained string to Capitalize the starting letter and lower the other letters of every word in the string. Finally, remove the spaces in the string using `replace()` method

```py
import re

def camel(s):
  s = re.sub(r"(_|-)+", " ", s).title().replace(" ", "")
  return s[0].lower() + s[1:]
```

```py
camel('some_database_field_name'); # 'someDatabaseFieldName'
camel('Some label that needs to be camelized'); # 'someLabelThatNeedsToBeCamelized'
camel('some-javascript-property'); # 'someJavascriptProperty'
camel('some-mixed_string with spaces_underscores-and-hyphens'); # 'someMixedStringWithSpacesUnderscoresAndHyphens'
```
