### randomIntWithLengthInRange

Returns a random integer in the specified range and length.

Use `Array.from()` to create an empty array of the specific length. `Math.random()` to generate a random number and map it to the desired range, using `Math.floor()` to make it an integer.

```js
const randomIntWithLengthInRange = (len, min, max) =>
	Array.from({ length: len }, () =>
		Math.floor(Math.random() * (max - min) + min)
	);
```

<details>
<summary>Examples</summary>

```js
randomIntWithLengthInRange(10, 12, 35); // [ 14, 20, 12, 29, 23, 16, 26, 22, 15, 24 ]
```

</details>

<br>[⬆ Back to top](#table-of-contents)
