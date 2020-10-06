---
title: toDolar
tags: math, string 
---

Parse double/string to dolar format

- Use Intl lib. to format money numbers
- This can be used with many currencies. 
- [See more in Mozila docs](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)

```js
const toDolar = (value) => {
	const moneyFormatter = Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	});

	return moneyFormatter.format(value);

	}
```

```js
toDolar('100.00'); // '$100.00'
```
