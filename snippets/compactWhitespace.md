---
title: Compact whitespaces
tags: string,regexp,beginner
firstSeen: 2018-12-12T19:11:33+02:00
lastUpdated: 2020-10-18T23:04:45+03:00
---

Compacts whitespaces in a string.

- Use `String.prototype.replace()` with a regular expression to replace all occurrences of 2 or more whitespace characters with a single space.

```js
const compactWhitespace = str => str.replace(/\s{2,}/g, ' ');
```

```js
compactWhitespace('Lorem    Ipsum'); // 'Lorem Ipsum'
compactWhitespace('Lorem \n Ipsum'); // 'Lorem Ipsum'
```
