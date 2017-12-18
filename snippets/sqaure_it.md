### Square The Data

Using an anonymous inner function scope we declare an undefined memory space using closures for storing a return value. We then use a new Array to store the array with a map of the function over it's data set and a comma operator to return a second step without needing to move from one context to another thank to closures and order of operations.

Notice the need to declare an order of operations(parenthesis) around the anonymous inner function so we can call it immediately.

```js
const mapObject = (arr, fn) => (a => (a = [arr, arr.map(fn)], a[0].reduce( (acc,val,ind) => (acc[val] = a[1][ind], acc), {}) )) ( )
const squareIt = arr => mapObject(arr, a => a*a)
squareIt([1,2,3]) // { 1: 1, 2: 4, 3: 9 }
```
