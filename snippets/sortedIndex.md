### sortedIndex

Returns the lowest index at which value should be inserted into array in order to maintain its sort order

```js
const sortedIndex = (arr,n) => {
    arr[0] > arr[1] ? (let anarray = arr.reverse(),let isReversed = true) : (let anarray = arr, let isReversed = false);  
	val = anarray.findIndex( el => {
	return n <= el
    })
	return val === -1 ? arr.length : isReversed ? arr.length - val : val
}
```

```js
sortedIndex([5,3,2,1], 4); // 1
sortedIndex([30,50],40); // 1
```
