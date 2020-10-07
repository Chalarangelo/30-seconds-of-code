---
title: addMultipleEvents
tags: JavaScript, Browser, Events, beginner
---

Add multiple event listener to an element.

- Use <code>Array.prototype.forEach()</code> and <code>EventTarget.addEventListener()</code> to add multiples event listener with an assigned callback function to an element.

```js
const addMultipleEvents = (el, evts) => {
    evts.forEach(evt => el.addEventListener(evt.name, evt.fn, false));
}
```

```js
addMultipleEvents(document.querySelector('.textInput'),
    [
        {name: 'mousedown', fn: () => console.log('mousedown event')},
        {name: 'touchstart', fn: () => console.log('touchstart event')},
        {name: 'change', fn: () => console.log('change event')}
    ]
);
```
