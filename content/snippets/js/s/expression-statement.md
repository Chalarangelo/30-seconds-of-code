---
title: What is the difference between an expression and a statement in JavaScript?
shortTitle: Expressions and statements
language: javascript
tags: [type]
cover: forest-balcony
excerpt: JavaScript distinguishes expressions and statements. Learn their differences in this short article.
listed: true
dateModified: 2021-11-07
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
