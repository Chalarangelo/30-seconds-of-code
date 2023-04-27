---
title: Sentencecase string
tags: string,regexp
cover: sofia-tram
author: chalarangelo
firstSeen: 2023-03-27T05:00:00-04:00
---

Converts a string to sentence case.

- Use `String.prototype.match()` to break the string into words using an appropriate regexp.
- Use `Array.prototype.slice()`, `Array.prototype.join()` and `String.prototype.toUpperCase()` to combine them, capitalizing the first letter of the first word and adding a whitespace between them.

```js
const toSentenceCase = str => {
  const s =
    str &&
    str
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      .join(' ');
  return s.slice(0, 1).toUpperCase() + s.slice(1);
};
```

```js
toSentenceCase('some_database_field_name'); // 'Some database field name'
toSentenceCase('Some label that needs to be title-cased');
// 'Some label that needs to be title cased'
toSentenceCase('some-package-name'); // 'Some package name'
toSentenceCase('some-mixed_string with spaces_underscores-and-hyphens');
// 'Some mixed string with spaces underscores and hyphens'
```
