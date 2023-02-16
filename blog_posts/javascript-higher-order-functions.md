---
title: Understanding higher-order functions in JavaScript
shortTitle: Higher-order functions
type: story
tags: javascript,function
author: chalarangelo
cover: rock-climbing
excerpt: Learn everything you need to know about higher-order functions with this short guide and level up your programming skills.
firstSeen: 2020-09-24T12:54:08+03:00
lastUpdated: 2021-11-07T16:34:37+03:00
---

Higher-order functions are **functions that operate on other functions**, either by accepting them as arguments or by returning them as their results. This allows us to create an abstraction layer over actions, not just values.

The reason we can write higher-order functions in JavaScript is due to the fact that functions are values. This means they can be assigned to variables and passed as values. You might also often hear the term _callback_ when referring to a function that is passed as an argument. This is due to it being called by the higher-order function. Callbacks are particularly common in JavaScript, with event handling, asynchronous code and array operations relying heavily on them.

The main advantages of this technique are abstraction, composition, code reusability and readability. Most of the 30 seconds of code snippets are built with higher-order functions in mind. They are small, easily digestible functions that are **highly reusable** and **can be composed** to create more complex logic.

That being said, we can take a look at an example, utilizing some very simple functions:

```js
const add = (a, b) => a + b;
const isEven = num => num % 2 === 0;

const data = [2, 3, 1, 5, 4, 6];

const evenValues = data.filter(isEven); // [2, 4, 6]
const evenSum = data.filter(isEven).reduce(add); // 12
```

In this example, we define two simple functions that we then use as callbacks in `Array.prototype.reduce()` and `Array.prototype.filter()` to get the result we want. Both of these functions are higher-order functions. This allows us to create an **abstraction layer for any action** we might want to perform without having to rewrite how the filtering or reduction algorithm is to be applied every single time.
