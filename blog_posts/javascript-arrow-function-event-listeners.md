---
title: Can I use an arrow function as the callback for an event listener in JavaScript?
type: question
tags: javascript,browser,event,function
authors: chalarangelo
cover: blog_images/arrow-functions.jpg
excerpt: Learn the differences between JavaScript ES6 arrow functions and regular functions and how they affect event listener callbacks.
---

**Arrow functions**

JavaScript ES6 introduced the concept of arrow functions, a new way to define and write functions. While they might seem like a syntactic sugar on top of regular functions, they have a key difference which lies in the way the `this` context is bound. I will not go into a lot of detail in this article, however I strongly suggest you read [Understanding the "this" keyword in JavaScript](/blog/s/javascript-this) before continuing. To summarize what the afforementioned blog post explains in more detail:

> Arrow functions do not have their own bindings for `this`, resulting in `this` retaining the value of the enclosing lexical context's `this`.

**Event listener callbacks**

One task that we often perform when writing browser-side JavaScript is creating event listeners. For example:

```js
const toggleElements = document.querySelectorAll('.toggle');
toggleElements.forEach(el => {
  el.addEventListener('click', function() {
    this.classList.toggle('active');
  });
});
```

In the example above, we use `NodeList.prototype.forEach()` to iterate over the nodes matching a given selector and `EventTarget.addEventListener()` with a regular function as the callback for the `'click'` event to swap between an active and inactive state for the clicked element. As we are using a regular function, the `this` context inside the callback will be bound to the element on which the event was fired.

**Arrow functions as callbacks**

As we have already explained, arrow functions do not have their own bindings for `this`. So what happens if we convert the previous code snippet's callback to an arrow function? Its `this` context refers to the global one, which in this case is the `window` object.

```js
const toggleElements = document.querySelectorAll('.toggle');
toggleElements.forEach(el => {
  el.addEventListener('click', () => {
    this.classList.toggle('active'); // `this` refers to `window`
    // Error: Cannot read property 'toggle' of undefined
  });
});
```

This code will throw an error anytime the matching element is clicked, firing the event listener and executing the callback, due to the `window` object not having a `classList` property. Oftentimes, however, the code could fail silently as it might for example check for a condition that always evaluates to `false` for `window` while it should evaluate to `true` for a given element, resulting in many headaches and wasted hours until the issue is discovered and fixed.

To deal with this, one could simply use the first argument of the callback function and `Event.target` or `Event.currentTarget` depending on their needs:

```js
const toggleElements = document.querySelectorAll('.toggle');
toggleElements.forEach(el => {
  el.addEventListener('click', (e) => {
    e.currentTarget.classList.toggle('active'); // works correctly
  });
});
```

**Image credit:** [Matthew Smith](https://unsplash.com/@whale?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/code?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
