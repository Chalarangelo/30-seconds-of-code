---
title: Can I use an arrow function as the callback for an event listener in JavaScript?
shortTitle: Arrow function as callback for event listener
type: question
tags: javascript,browser,event,function
author: chalarangelo
cover: coffee-float
excerpt: Learn the differences between JavaScript ES6 arrow functions and regular functions and how they affect event listener callbacks.
firstSeen: 2020-08-04T15:29:43+03:00
lastUpdated: 2021-06-12T19:30:41+03:00
---

### Arrow functions

JavaScript ES6 introduced the concept of arrow functions, a new way to define and write functions. While they might seem like a syntactic sugar on top of regular functions, they have a key difference which lies in the way the `this` context is bound. I strongly suggest you read [Understanding the "this" keyword in JavaScript](/blog/s/javascript-this), as I will not go into detail about the topic in this article. To summarize:

> Arrow functions do not have their own bindings for `this`, resulting in `this` retaining the value of the enclosing lexical context's `this`.

### Event listener callbacks

A common task when writing browser-side JavaScript is creating event listeners. For example:

```js
const toggleElements = document.querySelectorAll('.toggle');
toggleElements.forEach(el => {
  el.addEventListener('click', function() {
    this.classList.toggle('active');
  });
});
```

In the example above, we use `NodeList.prototype.forEach()` to iterate over matching nodes and `EventTarget.addEventListener()` with a regular function as the callback for the `'click'` event to swap between an active and inactive state for the clicked element. We are using a regular function, so the `this` context inside the callback will be bound to the event target.

### Arrow functions as callbacks

As we have already explained, arrow functions do not have their own bindings for `this`. So what happens if we convert the previous code snippet's callback to an arrow function? Its `this` context refers to the global one, which in this case is the `Window` object.

```js
const toggleElements = document.querySelectorAll('.toggle');
toggleElements.forEach(el => {
  el.addEventListener('click', () => {
    this.classList.toggle('active'); // `this` refers to `Window`
    // Error: Cannot read property 'toggle' of undefined
  });
});
```

This code will fire the event listener and execute the callback anytime the matching element is clicked. It will, however, throw an error, due to the `Window` object not having a `classList` property. Oftentimes, the code could even fail silently. An example would be a condition that always evaluates to `false` for `Window`, but could evaluate to `true` for a given element. Issues like that result in many headaches and wasted hours until you can uncover and fix them.

To deal with this, one could simply use the first argument of the callback function and `Event.target` or `Event.currentTarget` depending on their needs:

```js
const toggleElements = document.querySelectorAll('.toggle');
toggleElements.forEach(el => {
  el.addEventListener('click', (e) => {
    e.currentTarget.classList.toggle('active'); // works correctly
  });
});
```
