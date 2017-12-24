### negate

Negates a predicate function.

Take a predicate and apply `not` to it with its arguments.

```js
const negate = predicate => (...args) => !predicate(...args)

// filter([1, 2, 3, 4, 5, 6], negate(isEven));
// => [1, 3, 5]
```
