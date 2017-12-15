### Is function

Use `typeof` to check if a value is classified as a function primitive.

```js
const isFunction = val => val && typeof val === 'function';
// isFunction('x') -> false
// isFunction(x => x) -> true
```
