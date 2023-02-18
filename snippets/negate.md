---
title: Negate predicate
tags: function
cover: blue-bird
firstSeen: 2017-12-24T08:28:52+02:00
lastUpdated: 2020-09-15T16:28:04+03:00
---

Negates a predicate function.

- Take a predicate function and apply the not operator (`!`) to it with its arguments.

```js
const negate = func => (...args) => !func(...args);
```

```js
[1, 2, 3, 4, 5, 6].filter(negate(n => n % 2 === 0)); // [ 1, 3, 5 ]
```
