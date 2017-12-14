### Number to array to digits

use `parseInt()` to get only the integer part of the quotient.
use `Array.reverse()` to return the array in the same order as the number. 

```js
const num2array = (n) =>{
	let arr = [];
	while (n>0) { 
		arr.push(n%10); 
		n = parseInt(n/10); 
	}
	return arr.reverse();
}

// num2array(2334) -> [2, 3, 3, 4]
```