---
title: arrayToObject
tags: array,object,beginner
---

Create an object where the keys are the indexes

- Use reduce to populate the object

```js
const arrayToObject = (arr)=> {
	return arr.reduce(
		(acum, item, indx)=>
			{
				acum[indx] = item;
				return acum;
			},
			{}
	);
}
```

```js
arrayToObject(['a','b','c']);
	// {'0': 'a', '1': 'b', '2': 'c'}	
```
