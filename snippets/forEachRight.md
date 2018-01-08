### forEachRight

Executes a provided function once for each array element, starting from the array's last element.

Use `Array.slice(0)` to clone the given array, `Array.reverse()` to reverse it and `Array.forEach()` to iterate over the reversed array.

```js
const forEachRight = (arr,callback) => arr.slice(0).reverse().forEach(callback);
```

```js
forEachRight([1,2,3,4], val => console.log(val)); // '4', '3', '2', '1'
```
