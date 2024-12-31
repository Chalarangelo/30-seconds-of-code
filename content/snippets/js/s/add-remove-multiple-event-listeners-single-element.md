---
title: Add or remove multiple event listeners from a single element
shortTitle: Add or remove multiple event listeners
language: javascript
tags: [browser,event]
cover: compass-1
excerpt: Ever wanted to listen for multiple events on an element and handle them with the same function? Here's how!
listed: true
dateModified: 2024-07-11
---

Have you ever wanted to listen for **multiple event types** on a **single element** and handle them with the **same function**? Instead of repeating the same handler for each event type, you can add or remove multiple event listeners at once.

> [!NOTE]
>
> If you're looking to add or remove the **same handler for a single event** to **multiple elements**, take a look at the article on [adding or removing event listeners from multiple elements](/js/s/add-remove-event-listener-multiple-elements).

## Add multiple event listeners to an element

All you need is a helper function that adds multiple event listeners with the same handler to an element. Using `Array.prototype.forEach()` and `EventTarget.addEventListener()`, you can attach multiple event listeners with an assigned callback function to an element.

You will need to provide the element, an array of event `types`, the `listener` function, and any additional `options` you want to pass to `addEventListener()`.

```js
const addMultipleListeners = (
  el,
  types,
  listener,
  options,
  useCapture
) => {
  types.forEach(type =>
    el.addEventListener(type, listener, options, useCapture)
  );
};

const myListener = () =>  console.log('hello!');
addMultipleListeners(
  document.querySelector('.my-element'),
  ['click', 'mousedown'],
  myListener
);
// Logs 'hello!' when the element is clicked or the mouse button is pressed
```

## Remove multiple event listeners from an element

Similarly, you can create a helper function that removes multiple event listeners with the same handler from an element, using the same approach as before. The only difference is that you'll use `EventTarget.removeEventListener()` to detach the listeners.

Again, you will need to provide the element, an array of event `types`, the `listener` function, and any additional `options` you want to pass to `removeEventListener()`.

```js
const removeMultipleListeners = (
  el,
  types,
  listener,
  options,
  useCapture
) => {
  types.forEach(type =>
    el.removeEventListener(type, listener, options, useCapture)
  );
};

const myListener = () =>  console.log('hello!');
removeMultipleListeners(
  document.querySelector('.my-element'),
  ['click', 'mousedown'],
  myListener
);
// The 'click' and 'mousedown' event listeners are removed from the element
```
