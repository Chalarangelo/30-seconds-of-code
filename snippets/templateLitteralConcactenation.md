---
title: templateLitteralConcactenation
tags: browser,beginner
---

How to concactenate String using Template Litteral?

ES6 introduces the template literals that allow you to perform string interpolation.

- Use the ` `` ` to concactenate multiple strings

```js
const firstname = value;
const lastname = value;

const fullname = `${firstname} ${lastname}`;
```

```js
let name = "Yves";
let favoriteColor = "red";

let phrase = `${name} favorite color is ${favoriteColor}`;

console.log(phrase); // Yves favorite color is red;
```
