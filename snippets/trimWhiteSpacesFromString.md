---
title: removeExcessWhiteSpacesFromString
tags: string,trim,beginner
---

Removes excess white spaces that are appended to a string from both ends.

- Use `String.prototype.trim()` method on a string you want to remove the white spaces.
- Here, whitespace refers to all the whitespace characters like space, tab, etc.

```js
const trimWhiteSpaces = (text) => text.trim();
```

```js
trimWhiteSpaces('  Lorem Ipsum  '); // 'Lorem Ipsum'
trimWhiteSpaces('  Lorem Ipsum'); // 'Lorem Ipsum'
trimWhiteSpaces('Lorem Ipsum  '); // 'Lorem Ipsum'
```
