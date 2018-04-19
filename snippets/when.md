### when

Tests a value, `x`, against a predicate function. If `true`, return `fn(x)`. Else, return `x`.
`when(pred, whenTrue)` returns another function expecting `x` for better composability.

```js
const when = (pred, whenTrue) => (x) => pred(x) ? whenTrue(x) : x;
```

```js
const doubleEvenNumbers = when(
  (x) => x % 2 === 0,
  (x) => x * 2
);

doubleEvenNumbers(2) // 4
doubleEvenNumbers(1) // 1
```
