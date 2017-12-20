### isArmstrongNumber

Checks if the given number is an armstrong number or not.

Convert the given number into array of digits. Use `Math.pow()` to get the appropriate power for each digit and sum them up. If the sum is equal to the number itself, return `true` otherwise `false`.

```js
const isArmstrongNumber = digits => {
	let total = 0, arr = (digits+"").split("");
	arr.map(d => total += Math.pow(parseInt(d), arr.length))
	if(total === digits) return true; return false;
}

// isArmstrongNumber(1634) -> true
// isArmstrongNumber(371) -> true
// isArmstrongNumber(56) -> false
```
