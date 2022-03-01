---
title: Snakecase string
tags: string,regexp
expertise: intermediate
firstSeen: 2017-12-22T18:13:22+02:00
lastUpdated: 2021-06-28T15:27:44+03:00
---

Converts a string to snake case.

- Use `String.prototype.match()` to break the string into words using an appropriate regexp.
- Use `Array.prototype.map()`, `Array.prototype.slice()`, `Array.prototype.join()` and `String.prototype.toLowerCase()` to combine them, adding `_` as a separator.

```js
const toSnakeCase = str =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('_');
```

```js
toSnakeCase('camelCase'); // 'camel_case'
toSnakeCase('some text'); // 'some_text'
toSnakeCase('some-mixed_string With spaces_underscores-and-hyphens');
// 'some_mixed_string_with_spaces_underscores_and_hyphens'
toSnakeCase('AllThe-small Things'); // 'all_the_small_things'
toSnakeCase('IAmEditingSomeXMLAndHTML');
// 'i_am_editing_some_xml_and_html'
```
