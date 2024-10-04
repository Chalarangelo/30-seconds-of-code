---
title: Capitalize the first letter of a JavaScript string
shortTitle: Capitalize string
language: javascript
tags: [string]
cover: digital-nomad-3
excerpt: Learn how to capitalize the first letter of a string in JavaScript using array destructuring and `String.prototype.toUpperCase()`.
listed: true
dateModified: 2023-12-13
---

As software engineers, we are often tasked with transforming data into presentable information. A common part of this process is **capitalizing the first letter of a string**.

In order to accomplish this task, we can use **array destructuring** in combination with `String.prototype.toUpperCase()` to capitalize the first letter of the string. We can then use `Array.prototype.join()` to combine the capitalized `first` with the `...rest` of the characters. Additionally, we might want to **transform the rest of the string into lowercase**, using `String.prototype.toLowerCase()` and a boolean argument.

```js
const capitalize = ([first, ...rest], lowerRest = false) =>
  first.toUpperCase() +
  (lowerRest ? rest.join('').toLowerCase() : rest.join(''));

capitalize('fooBar'); // 'FooBar'
capitalize('fooBar', true); // 'Foobar'
```

Conversely, we can also **decapitalize the first letter of a string** using the same technique, but using `String.prototype.toLowerCase()` instead.

```js
const decapitalize = ([first, ...rest], lowerRest = false) =>
  first.toLowerCase() +
  (lowerRest ? rest.join('').toLowerCase() : rest.join(''));

decapitalize('FooBar'); // 'fooBar'
decapitalize('FooBar', true); // 'foobar'
```
