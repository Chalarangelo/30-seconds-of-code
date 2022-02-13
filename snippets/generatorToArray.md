---
title: Generator to array
tags: function,array,generator,beginner
firstSeen: 2020-12-31T13:22:18+02:00
lastUpdated: 2020-12-31T13:22:18+02:00
---

Converts the output of a generator function to an array.

- Use the spread operator (`...`) to convert the output of the generator function to an array.

```js
const generatorToArray = gen => [...gen];
```

```js
const s = new Set([1, 2, 1, 3, 1, 4]);
generatorToArray(s.entries()); // [[ 1, 1 ], [ 2, 2 ], [ 3, 3 ], [ 4, 4 ]]
```
