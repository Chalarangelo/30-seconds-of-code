### isArrayLike

Checks if the provided argument is `arrayLike` i.e. is iterable.

```js
const arr = (arr) => {
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
