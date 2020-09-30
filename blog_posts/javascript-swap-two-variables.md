---
title: How can I swap two variables in JavaScript?
type: question
tags: javascript,array,variables
authors: chalarangelo
cover: blog_images/javascript-swap-two-variables.jpg
excerpt: Learn how to swap the values of two variables in JavaScript using a single line of ES6 code.
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

While this approach still works, there are more elegant and less verbose options available to us nowadays. For example, JavaScript ES6 introduced destructuring assignments, allowing individual array items to be assigned to variables in a single statement. Here's what that looks like:

```js
const [x, y] = [1, 2];
```

Destructuring assignments are extremely useful in a handful of situations, including swapping two variables. To accomplish this, we can create an array from the two variables, then use a destructuring assignment to reassign them to each other:

```js
let a = 10;
let b = 20;

[a , b] = [b, a];
```

**Image credit:** [roman manukyan](https://unsplash.com/@romanukyan?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
