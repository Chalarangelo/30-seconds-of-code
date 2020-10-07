---
title: spread
tags: array,intermediate
---

The spread operator allows you to quite literally “spread” out an array. This can be used to transform an array into a list of arguments or even combine two arrays together. You could also use it to form a list of arguments to a function too


```js
let data = [1,2,3,4,5];
console.log(…data);		//1 2 3 4 5
```

```js
let data2 = [6,7,8,9,10];
let combined = […data,…data2];
console.log(…combined);	//1 2 3 4 5 6 7 8 9 10
```
