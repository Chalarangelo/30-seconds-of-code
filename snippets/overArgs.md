### overArgs

Creates a function that invokes the provided function with its arguments transformed.

Use `Array.map()` to apply `transforms` to `args` in combination with the spread operator (`...`) to pass the transformed arguments to `fn`.

```js
const overArgs = (fn, transforms) => (...args) => fn(...args.map((val, i) => transforms[i](val)));
```

```js
var func = overArgs(
  function(x, y) {
    return [x, y];
  },
  [square, doubled]
);
func(9, 3); // [81, 6]
```
