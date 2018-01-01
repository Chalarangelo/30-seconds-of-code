### isArrayLike

Checks if the provided argument is array-like (i.e. is iterable).

Use the spread operator (`...`) to check if the provided argument is iterable inside a `try... catch` block and the comma operator (`,`) to return the appropriate value.

```js



const isArrayLike = val =>
  try {return [...val], true; }
  catch (e)  { return false; }
};
```

```js
isArrayLike(document.querySelectorAll('.className')); // true
isArrayLike('abc'); // true
isArrayLike(null); // false
```
