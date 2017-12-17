### Square The Data

Use mapObject to return a object from array passed as an argument which gets sqaured as math operation

```js
const mapObject = (arr, fn) => (a => (a = [arr, arr.map(fn)], a[0].reduce( (acc,val,ind) => (acc[val] = a[1][ind], acc), {}) )) ( )
const squareIt = arr => mapObject(arr, a => a*a)
squareIt([1,2,3]) // { 1: 1, 2: 4, 3: 9 }
```
