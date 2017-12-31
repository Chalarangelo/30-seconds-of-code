### isValidJSON

Checks if the provided argument is an valid JSON.



```js
const sortedIndex = (arr,n) => {
    arr[0] > arr[1] ? (anarray = arr.reverse(),isReversed = true) : (anarray = arr,isReversed = false);  
	val = anarray.findIndex( el => {
	return n <= el
    })
	return val === -1 ? arr.length : isReversed ? arr.length - val : val
}
```

```js

```
