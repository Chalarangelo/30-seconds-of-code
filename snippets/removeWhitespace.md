---
title: removeWhitespace
tags: string,regexp,beginner
---

Returns a string with whitespaces removed.

- Use `String.prototype.replace()` with a regular expression to replace all occurrences of whitespace characters with an empty string.

```js
const removeWhitespace = str => str.replace(/\s+/g,'');
```

```js
removeWhitespace('Lorem ipsum.\n Dolor sit amet. '); // 'Loremipsum.Dolorsitamet.'
```
