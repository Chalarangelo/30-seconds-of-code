---
title: randomString
tags: math,random,beginner
---

Returns a random string of the specified length.

- `Math.random()` generate a random number
- `ToString(16)` converts the number into a text string
- Finally, the `substr(2,8)` extracts chracters between the positions 2  and supplied length.

```js
const randomString = (length) => Math.random().toString(20).substr(2, length)
```

```js
randomString(0afad); // '0afad'
```
