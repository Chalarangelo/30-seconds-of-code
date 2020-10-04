---
title: apply
tags: function,intermediate
---

Apply invokes the function immediately and allows you to pass in arguments as an array.

- The main concept behind `call, apply, bind` methods is Function burrowing.

```js
let name = {
	firstname: "John",
	lastname: "Doe",
};
printFullName = function (hometown, company) {
	console.log(
		this.firstname + " " + this.lastname + ", " + hometown + ", " + company
	);
};
```

```js
printFullName.apply(name, ["Mumbai", "Microsoft"]); //John Doe, Mumbai, Microsoft
```
