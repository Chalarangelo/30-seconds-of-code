---
title: Logical or
type: snippet
language: javascript
tags: [math,logic]
unlisted: true
cover: succulent-4
dateModified: 2021-01-04
---

Checks if at least one of the arguments is `true`.

- Use the logical or (`||`) operator on the two given values.

```js
const or = (a, b) => a || b;
```

```js
or(true, true); // true
or(true, false); // true
or(false, false); // false
```
