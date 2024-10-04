---
title: How can I listen for a click outside of an element in JavaScript?
shortTitle: Listen for click outside element
language: javascript
tags: [browser,event]
cover: interior-13
excerpt: Detect and handle click events outside of a specific element in just a few lines of JavaScript.
listed: true
dateModified: 2023-11-04
---

Adding event listeners to an element is simple, using `EventTarget.addEventListener()`. However, in some cases, you might want to **listen for clicks outside of a specific element**. While there's no way to do that directly, all it takes is a little clever thinking.

Event listeners don't necessarily need to be attached to the element you're listening for. You can attach them to any element you want, as long as you can check if the event target matches the target you're looking for. This is called [event delegation](/js/s/event-bubbling-capturing-delegation#event-delegation).

Using event delegation, you can **delegate the event listener to a parent element**. Then, you can use `Event.target` and `Node.contains()` to **check if the event target matches the target** you're looking for. If it doesn't, you can run your callback function.

```js
const onClickOutside = (element, callback) => {
  document.addEventListener('click', e => {
    if (!element.contains(e.target)) callback();
  });
};

onClickOutside('#my-element', () => console.log('Hello'));
// Will log 'Hello' whenever the user clicks outside of #my-element
```
