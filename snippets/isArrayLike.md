### isArrayLike

Checks if the provided argument is array-like (i.e. is iterable).

Use `Array.from()` and a `try... catch` block to check if the provided argument is array-like.

```js
const isArrayLike = arr => {
  try{
    Array.from(arr);
    return true;
  }
  catch(e){
    return false;
  }
}
```

```js
isArrayLike(document.querySelector('.className')) // true
isArrayLike('abc') // true
isArrayLike(null) // false
```
