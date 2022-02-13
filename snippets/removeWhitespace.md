---
title: Remove whitespaces
tags: string,regexp,beginner
firstSeen: 2020-10-13T09:37:17+03:00
lastUpdated: 2020-11-03T21:46:13+02:00
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
