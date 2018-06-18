### compose

Performs right-to-left function composition.

Use the `...rest` operator to gather all function arguments into an array. Return a function which takes
a single argument and uses `Array.reduceRight()` to return the result of applying each function.

```js
const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));
```

```js
const add5 = x => x + 5;
const multiply = (x, y) => x * y;
const multiplyAndAdd5 = compose(
  add5,
  multiply
);
multiplyAndAdd5(5, 2); // 15
```
