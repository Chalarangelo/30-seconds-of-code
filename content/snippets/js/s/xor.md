---
title: Logical xor
type: snippet
language: javascript
tags: [math,logic]
unlisted: true
cover: succulent-11
dateModified: 2021-01-04
---

Checks if only one of the arguments is `true`.

- Use the logical or (`||`), and (`&&`) and not (`!`) operators on the two given values to create the logical xor.

```js
const xor = (a, b) => (( a || b ) && !( a && b ));
```

```js
xor(true, true); // false
xor(true, false); // true
xor(false, true); // true
xor(false, false); // false
```
