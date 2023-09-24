---
title: "Tip: How to swap two variables in JavaScript"
shortTitle: Swap two variables
type: tip
language: javascript
tags: [variables]
author: chalarangelo
cover: mountain-lake-2
excerpt: Learn how to swap the values of two variables in JavaScript using a single line of ES6 code.
dateModified: 2021-06-12
---

In the past, swapping the values of two variables in JavaScript required an intermediate variable to store one of the values while swapping, which would result in something similar to this:

```js
let a = 10;
let b = 20;

let tmp;
tmp = a;
a = b;
b = tmp;
```

While this approach still works, there are more elegant and less verbose options available to us nowadays. For example, JavaScript ES6 introduced **destructuring assignments**, allowing individual array items to be assigned to variables in a single statement. Here's what that looks like:

```js
const [x, y] = [1, 2];
```

Destructuring assignments are extremely useful in a handful of situations, including swapping two variables. To accomplish this, we can create an array from the two variables, then use a destructuring assignment to reassign them to each other:

```js
let a = 10;
let b = 20;

[a , b] = [b, a];
```
