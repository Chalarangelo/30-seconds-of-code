---
title: Logical nor
type: snippet
language: javascript
tags: [math,logic]
unlisted: true
cover: succulent-8
dateModified: 2021-04-02
---

Checks if none of the arguments are `true`.

- Use the logical not (`!`) operator to return the inverse of the logical or (`||`) of the two given values.

```js
const nor = (a, b) => !(a||b);
```

```js
nor(true, true); // false
nor(true, false); // false
nor(false, false); // true
```
