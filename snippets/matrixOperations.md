 ---
title: Matrix Operation
tags: Array,function,intermediate
---

Do simple matrix operations suuch as multiply, transpose and dotproduct.

- Use `Array.prototype.map()` creates a new array populated with the results of calling a provided function on every element in the calling array.
- Use `Array.prototype.reduce()` to create a new object with the same keys and mapped values using `fn`.

```js
let mmultiply  = (a, b) => a.map(x => transpose(b).map(y => dotproduct(x, y)));
let dotproduct = (a, b) => a.map((x, i) => a[i] * b[i]).reduce((m, n) => m + n);
let transpose  = a => a[0].map((x, i) => a.map(y => y[i]));
```

```js
a = [[1,2,3],[4,5,6]]
b = [[7,8],[9,10],[11,12]]

c = [[1,2,3],[4,5,6],[7,8,9]]
d = [[10,11,12],[13,14,15],[16,17,18]]

mmultiply(a,b)

```
