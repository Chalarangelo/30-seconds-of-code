---
title: Understanding event bubbling, capturing and delegation in JavaScript
type: story
tags: javascript,browser,event
authors: chalarangelo
cover: blog_images/fishermen.jpg
excerpt: Understand how events work in JavaScript and learn when to use event bubbling, event capturing and event delegation with this short guide.
---

### Event bubbling

Bubbling means that the event propagates from the target element (i.e. the `button` the user clicked) up through its ancestor tree, starting from the nearest one. By default, all events bubble.

To better understand event bubbling, consider the following HTML example, which we will be referring to for most of this article:

```html
<html>
  <body>
    <div id="btn-container">
      <button class="btn">Click me</button>
    </div>
  </body>
</html>
```

```js
const ancestors = [
  window, document, document.documentElement,
  document.body, document.getElementById('btn-container')
];

// Target phase
document.querySelector('.btn').addEventListener('click', e => {
  console.log(`Hello from ${e.target}`);
});
// Bubble phase
ancestors.forEach(a => {
  a.addEventListener('click', e => {
    console.log(`Hello from ${e.currentTarget}`);
  });
});
```

If we add an event listener to each element in the tree, as shown above, we would see a listener fired by the `button` first, then each one of the others firing from the nearest ancestor all the way up to `window`.

### Event capturing

Capturing is the exact opposite of bubbling, meaning that the outer event handlers are fired before the most specific handler (i.e. the one on the `button`). Note that all capturing event handlers are run first, then all the bubbling event handlers.

You can use event capturing by applying a third argument to [`EventTarget.addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener), setting it to `true`. For example:

```js
// Capture phase
ancestors.forEach(a => {
  a.addEventListener('click', event => {
    console.log(`Hello from ${e.currentTarget}`);
  }, true);
});
```

Given this code, we would see a listener fired for each ancestor of the `button` first and then the listener of the `button` would fire.

### Event propagation

Having explained event bubbling and capturing, we can now explain the three phases of event propagation:

- During the **capture phase**, the event starts from `window` and moves down to `document`, the root element and through ancestors of the target element.
- During the **target phase**, the event gets triggered on the event target (e.g. the `button` the user clicked).
- During the **bubble phase**, the event bubbles up through ancestors of the target element until the root element, `document` and, finally, `window`.

### Event delegation

Event delegation refers to the idea of delegating event listening to parent elements instead of adding event listeners directly to the event targets. Using this technique, the parent can catch and handle the bubbling events as necessary.

```js
window.addEventListener('click', e => {
  if (e.target.className === 'btn') console.log('Hello there!');
});
```

In the above example, we delegate event handling from the `button` to `window` and use `event.target` to get the original event's target.

Using the event delegation pattern is advantageous for two reasons:

- By using event delegation, we can listen for events on a large amount of elements without having to attach event listeners individually, which can provide performance benefits.
- By using event delegation, dynamic elements (i.e. added or removed from the DOM over the course of time) can have their events captured and handled without requiring listeners to be registered or removed.
