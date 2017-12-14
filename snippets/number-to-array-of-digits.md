### Number to array of digits

Convert the number to a string, split the string using `split()`. 
use `parseInt()` to convert every element back to integer.

```js
const num2array = (n) =>{
	return (''+n).split('').map((i) =>{
		return parseInt(i);
	})
}

// num2array(2334) -> [2, 3, 3, 4]
```