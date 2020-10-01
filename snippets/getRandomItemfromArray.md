---
title: How to get Random Item from an Array
tags: object,array,intermediate
---
This snippet helps you to get a random item from an array of items.
This is how it works.

- Adding an Array which consist of different items.
- Putting `Math.floor()` inside the array by `myArray[Math.floor()]`
- This property which we should put inside the `Math.floor()` generates a random item from the array `Math.random() *  myArray.length`

```js
var myArray =  [  
	"Apples",
	"Bananas",
	"Grapes",
	"Pears",
	"Mangoes"
];
```

```js
var  randomItem  =  myArray[Math.floor(Math.random() *  myArray.length)];
console.log(randomItem)

// This snippet return
// Pears ( a random item from the list)
```