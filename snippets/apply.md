---
title: apply
tags: function,intermediate
---

Apply invokes the function immediately and allows you to pass in arguments as an array.

- The main concept behind `call, apply, bind` methods is Function borrowing.

- Apply method is same as the `call` method the only diff is that, the function arguments are passed in Array list

```js
let name = {
	firstname: "Dhruvit",
	lastname: "Galoriya",
};

printFullName = (hometown, company) => {
	console.log(
		this.firstname + " " + this.lastname + ", " + hometown + ", " + company
	);
};
```

```js
printFullName.apply(name, ["Mumbai", "Microsoft"]); //John Doe, Mumbai, Microsoft
```
