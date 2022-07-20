---
title: What does the double negation operator do in JavaScript?
shortTitle: Double negation operator
type: question
tags: javascript,function
expertise: beginner
author: chalarangelo
cover: blog_images/memories-of-pineapple-2.jpg
excerpt: You've probably come across the double negation operator (`!!`) before, but do you know what it does?
firstSeen: 2022-07-26T05:00:00-04:00
---

JavaScript's negation operator (`!`) is a unary operator, used to invert the truth value of its operand. When used twice, known as the double negation operator (`!!`), it can be used to convert a value to a boolean.

```js
const x = 1;
const y = null;

!!x; // true
!!y; // false
```

Using the double negation operator is functionally equivalent to using the `Boolean()` function, which we explored in depth in a [previous article](/articles/s/javascript-boolean-function). In terms of readability and usability, I would still suggest using the `Boolean()` function. It conveys the intent of the operation more clearly, and it's easier to understand at a glance.

```js
const x = 1;
const y = null;

Boolean(x); // true
Boolean(y); // false

const values = [0, 0, 2, 0, 3];
// Kinda readable, but not great
values.filter(x => !!x); // [2, 3]
// Arguably more readable
values.filter(Boolean); // [2, 3]
```
