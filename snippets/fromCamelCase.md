---
title: fromCamelCase
tags: string,intermediate
---

Converts a string from camelcase.

- Use `String.prototype.replace()` to break the string into words and add a `separator` between them.
- Omit the second argument to use a default `separator` of `_`.

```js
const fromCamelCase = (str, separator = '_') =>
  str
    .replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2')
    .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2')
    .toLowerCase();
```

```js
fromCamelCase('someDatabaseFieldName', ' '); // 'some database field name'
fromCamelCase('someLabelThatNeedsToBeDecamelized', '-'); 
// 'some-label-that-needs-to-be-decamelized'
fromCamelCase('someJavascriptProperty', '_'); // 'some_javascript_property'
fromCamelCase('JSONToCSV', '.'); // 'json.to.csv'
```
