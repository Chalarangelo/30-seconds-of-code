---
title: toPascalCase
tags: string,regexp,intermediate
firstSeen: 2021-09-08T19:21:13+00:00
---

Converts a string to pascalcase.

- Use `String.prototype.match()` to break the string into words using an appropriate regexp.
- Use `Array.prototype.map()`, `Array.prototype.slice()`, `Array.prototype.join()`, `String.prototype.toLowerCase()` and `String.prototype.toUpperCase()` to combine them, capitalizing the first letter of each one.

```js
const toPascalCase = str => {
  const s =
    str &&
    str
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      .map(x => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
      .join('');
  return s;
};
```

```js
toPascalCase('some_database_field_name'); // 'SomeDatabaseFieldName'
toPascalCase('Some label that needs to be pascalized');
// 'SomeLabelThatNeedsToBePascalized'
toPascalCase('some-javascript-property'); // 'SomeJavascriptProperty'
toPascalCase('some-mixed_string with spaces_underscores-and-hyphens');
// 'SomeMixedStringWithSpacesUnderscoresAndHyphens'
```