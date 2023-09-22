---
title: Remove non ASCII characters
type: snippet
language: javascript
tags: [string,regexp]
cover: blue-red-mountain
dateModified: 2020-10-22T20:24:30+03:00
---

Removes non-printable ASCII characters.

- Use `String.prototype.replace()` with a regular expression to remove non-printable ASCII characters.

```js
const removeNonASCII = str => str.replace(/[^\x20-\x7E]/g, '');
```

```js
removeNonASCII('äÄçÇéÉêlorem-ipsumöÖÐþúÚ'); // 'lorem-ipsum'
```
