### Number to array of digits

use `parseInt()` to get only the integer part of the quotient.
use `Array.reverse()` to return the array in the same order as the number. 

```js
const num2array = (n) =>{
	return (''+n).split('').map((i) =>{
		return parseInt(i);
	})
}

// num2array(2334) -> [2, 3, 3, 4]
```