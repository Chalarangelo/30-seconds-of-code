### Curry

Use recursion.
If the number of provided arguments (`args`) is sufficient, call the passed function `f`.
Otherwise return a curried function `f` that expects the rest of the arguments.

```js
const curry = (f, arity = f.length, next) => 
  (next = prevArgs => 
    nextArg => {
      const args = [ ...prevArgs, nextArg ]
      return args.length >= arity 
        ? f(...args)
        : next(args);
    }
  )([]);
// curry(Math.pow)(2)(10) -> 1024
// curry(Math.min, 3)(10)(50)(2) -> 2
```
