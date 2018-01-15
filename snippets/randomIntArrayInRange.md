### randomIntArrayInRange

Returns an array of n random integers in the specified range.

Use `Array.from()` to create an empty array of the specific length. `Math.random()` to generate a random number and map it to the desired range, using `Math.floor()` to make it an integer.

```js
const randomIntArrayInRange = (min, max, n = 1) =>
	Array.from({ length: n }, () => Math.floor(Math.random() * (max - min + 1)) + min);
```

```js
randomIntArrayInRange(10, 12, 35); // [ 15, 13, 25, 19, 13, 22, 19, 12, 27, 19 ]
```
