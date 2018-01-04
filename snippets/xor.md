### xor

Used `Array.reduce` create an array of unique values that is the symmetric difference of the given arrays.

The order of result values is determined by the order they occur in the arrays. 

Used `Array.indexOf` and `Array.includes` for checking index and duplicates.

```js
const xor = (...args) => {
	const merged = [].concat.apply([], args);
	const result = merged.reduce((acc, val, i) => {
		if (merged.indexOf(val, i+1)>-1){
			if (acc.indexOf(val) === -1){
				acc[0].push(val);
			}
		} else{
			if (!acc[0].includes(val)){
				acc[1].push(val);
			}
		}
		return acc;
	}, [[], []])
	return result[1];
}
// xor([2, 1], [2, 3], [3, 4, 5]) -> [1, 4, 5];
// xor([2, 1], [2, 3]) -> [1, 3]
```
