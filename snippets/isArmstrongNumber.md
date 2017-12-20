### isArmstrongNumber

Checks if the given number is an armstrong number or not.

Convert the given number into array of digits. Use `Math.pow()` to get the appropriate power for each digit and sum them up. If the sum is equal to the number itself, return `true` otherwise `false`.

```js
const isArmstrongNumber = num => {
	let arr = (num+"").split("");
	return arr.reduce((a, d) => parseInt(a) + Math.pow(parseInt( d ), arr.length), 0) == num ? true : false
}

// isArmstrongNumber(1634) -> true
// isArmstrongNumber(371) -> true
// isArmstrongNumber(56) -> false
```
