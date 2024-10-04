---
title: Remove non ASCII characters from a JavaScript string
shortTitle: Remove non ASCII characters
language: javascript
tags: [string,regexp]
cover: blue-red-mountain
excerpt: Remove non-printable ASCII characters from a string in JavaScript.
listed: true
dateModified: 2024-05-18
---

If you're converting text from a different character set to ASCII, you might end up with characters that are **not ASCII compatible**. These characters can cause issues when processing or displaying text.

In order to remove them, you can use a **regular expression** to match all non-ASCII characters and replace them with an empty string. The regular expression `[^\x20-\x7E]` matches all characters outside the range of printable ASCII characters (from space to tilde). Then, using `String.prototype.replace()`, you can remove all matches from the string.

```js
const removeNonASCII = str => str.replace(/[^\x20-\x7E]/g, '');

removeNonASCII('äÄçÇéÉêlorem-ipsumöÖÐþúÚ'); // 'lorem-ipsum'
```
