### Square root of a number

Checking the square of all the numbers from 2 to half of the number. Half of the number because the square of anything more than that will always be greater than the number itself.

```js
const sqrt = (n) =>{
	for(var i=2;i<=n/2;i++){
		if(i*i == n) return i;
	}
	return "Not a perfect square";
};
```