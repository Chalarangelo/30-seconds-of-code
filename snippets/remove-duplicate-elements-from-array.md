### Remove duplicate elements from an array

A simple snippet of code to remove all the duplicate elements from an array. 

```js
const removeDuplicate = (arr) =>{
	var newArr = [];
	arr.map((ele) =>{
		if(newArr.indexOf(ele) == -1) newArr.push(ele);
	});
	return newArr
};
```