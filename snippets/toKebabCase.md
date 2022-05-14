---
title: Kebabcase string
tags: string,regexp
expertise: intermediate
cover: blog_images/old-consoles.jpg
firstSeen: 2017-12-22T19:14:51+02:00
lastUpdated: 2020-12-16T13:42:27+02:00
---

Converts a string to kebab case.

- Use `String.prototype.match()` to break the string into words using an appropriate regexp.
- Use `Array.prototype.map()`, `Array.prototype.join()` and `String.prototype.toLowerCase()` to combine them, adding `-` as a separator.

```js
const toKebabCase = str =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('-');
```

```js
toKebabCase('camelCase'); // 'camel-case'
toKebabCase('some text'); // 'some-text'
toKebabCase('some-mixed_string With spaces_underscores-and-hyphens');
// 'some-mixed-string-with-spaces-underscores-and-hyphens'
toKebabCase('AllThe-small Things'); // 'all-the-small-things'
toKebabCase('IAmEditingSomeXMLAndHTML');
// 'i-am-editing-some-xml-and-html'
```
