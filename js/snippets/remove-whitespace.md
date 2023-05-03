---
title: Remove whitespaces
type: snippet
tags: [string,regexp]
cover: tropical-bike
dateModified: 2020-11-03T21:46:13+02:00
---

Returns a string with whitespaces removed.

- Use `String.prototype.replace()` with a regular expression to replace all occurrences of whitespace characters with an empty string.

```js
const removeWhitespace = str => str.replace(/\s+/g, '');
```

```js
removeWhitespace('Lorem ipsum.\n Dolor sit amet. ');
// 'Loremipsum.Dolorsitamet.'
```
