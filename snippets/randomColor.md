---
title: randomColor
tags: math,random,beginner
---

Generates a random background color code.

- Use `Math.random` to generate a random 24-bit(6x4bits) hexadecimal number.
- Use bit shifting and then convert it to an hexadecimal String using `toString(16)`.

```js
const setBg = ()=>{
	const randomColor = Math.floor(Math.random()*16777215).toString(16)
	document.body.style.backgroundcolor = “#”+randomcolor 
};
```


