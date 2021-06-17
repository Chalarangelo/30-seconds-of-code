---
title: Understanding higher-order functions in JavaScript
type: story
tags: javascript,function
authors: chalarangelo
cover: blog_images/rock-climbing.jpg
excerpt: Learn everything you need to know about higher-order functions with this short guide and level up your programming skills.
firstSeen: 2020-09-24T12:54:08+03:00
lastUpdated: 2021-06-12T19:30:41+03:00
---

Higher-order functions are functions that operate on other functions, either by taking them as arguments or by returning them as their results. This allows us to create an abstraction layer over actions, not just values.

The reason we can write higher-order functions in JavaScript is due to the fact that functions are values, meaning they can be assigned to variables and passed as values. You might also often hear the term _callback_ when referring to a function that is passed as an argument, due to it being called by the higher-order function. This is particularly common in JavaScript, with event handling, asynchronous code and array operations relying heavily on the concept of callbacks.

The main advantages of this technique are, as mentioned before, the abstraction layers it allows us to create as well as composition and more reusable and readable code. Most of the 30 seconds of code snippets are based on the idea of higher-order functions, as they promote small, easily digestible functions that can be easily composed to create more complex logic and are highly reusable.

That being said, we can take a look at an example, utilizing some very simple functions:

```js
const add = (a, b) => a + b;
const isEven = num => num % 2 === 0;

const data = [2, 3, 1, 5, 4, 6];

const evenValues = data.filter(isEven); // [2, 4, 6]
const evenSum = data.filter(isEven).reduce(add); // 12
```

In the above example, we define two simple functions that we then use as callbacks in `Array.prototype.reduce()` and `Array.prototype.filter()` to get the result we want. Both of these functions are higher-order functions, allowing us to create an abstraction layer for any action we might want to perform without having to rewrite how the filtering or reduction algorithm is to be applied every single time.
