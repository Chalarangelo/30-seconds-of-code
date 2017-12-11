### Curry

Use recursion.
If the number of provided arguments (`args`) is sufficient, call the passed function `f`.
Otherwise return a curried function `f` that expects the rest of the arguments.

```js
var curry = f =>
  (...args) =>
    args.length >= f.length ? f(...args) : (...otherArgs) => curry(f)(...args, ...otherArgs)
```
