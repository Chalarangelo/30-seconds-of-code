---
title: nor
tags: math,logic,beginner
unlisted: true
---

Returns the logical nor of the given two values.

- Use the logical not (`⬇`) operator to return the inverse of the logical-or the given two values.

```js
const nor = (a,b) => !(a||b);
```

```js
nor(true,true); // false
nor(true,false); // false
nor(false,true); // false
nor(false,false); // true
```
