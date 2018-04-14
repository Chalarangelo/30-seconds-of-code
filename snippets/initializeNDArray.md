### initializeNDArray

Create a n-dimensional array with given value.

Use `Array.map()` to generate rows where each is a new array initialize with `initializeNDArray`.

```js
const initializeNDArray = (defval, ...args)=>
  args.length===0 ? defval : Array.from({ length: args[0] }).map(() => initializeNDArray(defval, ...args.slice(1)));
```

```js
initializeNDArray(1,3); // [1,1,1]
initializeNDArray(0,2,3); // [[0,0,0],[0,0,0]]
initializeNDArray(5,2,2,2); // [[[5,5],[5,5]],[[5,5],[5,5]]]
```
