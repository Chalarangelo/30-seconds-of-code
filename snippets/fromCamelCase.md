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
    .replace(/([A-Z])/g, `${separator}$1`)
    .toLowerCase()
```

```js
fromCamelCase('someDatabaseFieldName', ' '); // 'some database field name'
fromCamelCase('someLabelThatNeedsToBeDecamelized', '-'); // 'some-label-that-needs-to-be-decamelized'
fromCamelCase('someJavascriptProperty', '_'); // 'some_javascript_property'
fromCamelCase('actuallyIAmJack', '_'); // 'actually_i_am_jack'
```
