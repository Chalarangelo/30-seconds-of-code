---
title: How can I add or remove an event listener from multiple elements?
shortTitle: Add or remove event listener from multiple elements
language: javascript
tags: [browser,event]
cover: duck-plants
excerpt: Level up your event handling skills by learning how to attach or detach event listeners from multiple elements at once.
listed: true
dateModified: 2024-07-12
---

Adding or removing the **same event listener** from **multiple elements** can get pretty tedious and repetitive. However, bundling up the logic into a couple of helper functions can make the process much more manageable.

> [!NOTE]
>
> If you're looking to add or remove the **same handler for multiple event listeners** to a **single element**, take a look at the article on [adding multiple listeners to a single element](/js/s/add-remove-multiple-event-listeners-single-element).

## Add event listener to multiple elements

If all you need to do is add the same event listener to multiple elements, you can use `Array.prototype.forEach()` to iterate over the elements and attach the listener using `EventTarget.addEventListener()`.

You will need to provide the list of `targets`, the event `type`, the `listener` function, and any additional `options` you want to pass to `addEventListener()`.

```js
const addEventListenerAll = (
  targets,
  type,
  listener,
  options,
  useCapture
) => {
  targets.forEach(target =>
    target.addEventListener(type, listener, options, useCapture)
  );
};

const linkListener = () => console.log('Clicked a link');
addEventListenerAll(document.querySelectorAll('a'), 'click', linkListener);
// Logs 'Clicked a link' whenever any anchor element is clicked
```

## Remove event listener from multiple elements

Similarly, removing the same event listener from multiple elements can be done by iterating over the elements with `Array.prototype.forEach()` and detaching the listener using `EventTarget.removeEventListener()`.

Again, you will need to provide all the same arguments as when adding the event listener.

```js
const removeEventListenerAll = (
  targets,
  type,
  listener,
  options,
  useCapture
) => {
  targets.forEach(target =>
    target.removeEventListener(type, listener, options, useCapture)
  );
};

const linkListener = () => console.log('Clicked a link');
document.querySelector('a').addEventListener('click', linkListener);
removeEventListenerAll(document.querySelectorAll('a'), 'click', linkListener);
// The 'click' event listener is removed from all anchor elements
```
