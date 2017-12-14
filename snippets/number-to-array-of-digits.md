### Number to array of digits

Convert the number to a string, use `split()` to convert build an array.
Use `Array.map()` and `parseInt()` to transform each value to an integer. 

```js
const digitize = n => (''+n).split('').map(i => parseInt(i));
// digitize(2334) -> [2, 3, 3, 4]
```
