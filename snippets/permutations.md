### permutations

Returns array of permutations of given array.

[See more](https://en.wikipedia.org/wiki/Fixed-point_combinator) combinators and Lambda calculus.

```js
const permutate = arr => arr.reduce(
  U(f => (acc, item, key, arr) =>
    acc.concat(arr.length > 1 &&
      arr.filter((e, i) => i !== key)
        .reduce(f(f), [])
        .map(perm => [item].concat(perm)) || item)
  ), [])
```

```js
permutate([1, 2, 3]) // [[ 1, 2, 3 ], [ 1, 3, 2 ], [ 2, 1, 3 ], [ 2, 3, 1 ], [ 3, 1, 2 ], [ 3, 2, 1 ]]
```
