---
title: xor
tags: math,logic,beginner
---

Returns `true` if only one of the arguments is `true`, `false` otherwise.

- Using basic or (`||`), and (`&&`), and not (`!`) operators Logical xor. 
- You can use the Bitwise xor (`^`) operator also on the two given values.

```js
const xor = (a, b) => ( ( a || b ) && !( a && b ) );
```

```js
xor(true, true); // false
xor(true, false); // true
xor(false, true); // true
xor(false, false); // false
```