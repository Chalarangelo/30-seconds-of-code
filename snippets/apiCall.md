---
title: apiCall
tags: api,promise,fetch
---

Makes Asynchronous Third party API calls using Frontend(Vanilla) JavaScript.

- CORS is what allows to make api calls.
- **fetch()** is a built-in JavaScript function that works with CORS to make API calls.
- fetch returns a promise that is first converted to text then to a JSON object using **JSON.Parse()**

```js
let cors = "https://cors-anywhere.herokuapp.com/";
let apiURL = "https://api.agify.io/?name=ahsan";

const ApiPromise = fetch(cors + apiURL);
```

```js
ApiPromise
	.then(data => data.text())
	.then(data => { 
		let obj = JSON.parse(data); 
		console.log("Name : " + obj.name + "\nGuessed Age : " + obj.age + "\n");
	});
```