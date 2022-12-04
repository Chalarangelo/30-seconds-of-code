---
title: What is the difference between an expression and a statement in JavaScript?
shortTitle: Expressions and statements
type: question
tags: javascript,type
author: chalarangelo
cover: blog_images/forest-balcony.jpg
excerpt: JavaScript distinguishes expressions and statements. Learn their differences in this short article.
firstSeen: 2021-11-07T05:00:00-04:00
---

JavaScript distinguishes expressions and statements. An **expression** is any valid unit of code that resolves to a value. A **statement** is a unit of code that performs an action. Some examples:

```js
// Statements
let x = 0;
function add(a, b) { return a + b; }
if (true) { console.log('Hi'); }

// Expressions
x;          // Resolves to 0
3 + x;      // Resolves to 3
add(1, 2);  // Resolves to 3
```

Anywhere JavaScript expects a statement, you can also write an expression. This kind of statement is called an **expression statement**. Conversely, you cannot write a statement where JavaScript expects an expression.
