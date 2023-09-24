---
title: What is an IIFE in JavaScript?
shortTitle: IIFE introduction
type: question
language: javascript
tags: [function]
author: chalarangelo
cover: tropical-waterfall
excerpt: An Immediately Invoked Function Expression (IIFE) is a JavaScript trick that trips up many developers. Here's what you need to know.
dateModified: 2021-06-14
---

An **Immediately Invoked Function Expression** (IIFE for short) is a JavaScript function that is immediately invoked as soon as it's evaluated by the JavaScript runtime. Here's what it looks like alongside a roughly equivalent piece of code:

```js
// IIFE
(function (message) {
  console.log(message);
})('Hello World');
// LOGS: 'Hello World'

// Equivalent code using named function
function logMessage(message) {
  console.log(message);
}

logMessage('Hello World'); // LOGS: 'Hello World'
```

Remember the "roughly equivalent" part? The only difference is the use of a named function instead of an anonymous one. From this example, it should be easy to deduce the anatomy of an IIFE, breaking it down into its parts:

- Optional leading semicolon to avoid `TypeError`s in cases of minification etc.
- An anonymous function, containing all the code that we want to invoke.
- Opening and closing parentheses to wrap the anonymous function.
- Parentheses to call the function and any arguments to invoke it with.

Note that you can also use arrow functions for IIFEs, if you like. Just make sure to remember the differences between regular and arrow functions in that case. Our previous articles on [arrow functions](/blog/s/javascript-arrow-functions) and [the `this` keyword](/blog/s/javascript-this) should just about cover them.

```js
// All of these are equivalent, leading semicolon is optional
;(() => console.log('Hello'))();
;(function(){ console.log('Hello'); })();
;(function(){ console.log('Hello'); })();
;(function(){ console.log('Hello'); }());
```

IIFEs are often used to run some code, while keeping it and its variables out of the global scope. They are often criticized for lack of readability and how they are confusing to beginners. Additionally, they started going out of fashion with the rise of JavaScript modules and transpilers, so they might be less and less common as time goes by.
