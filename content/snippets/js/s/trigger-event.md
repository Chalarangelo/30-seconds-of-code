---
title: Programmatically trigger event on HTML element using JavaScript
shortTitle: Trigger event on HTML element
language: javascript
tags: [browser,event]
cover: cloudy-mountaintop-2
excerpt: Learn how to trigger an event on an HTML element using JavaScript.
listed: true
dateModified: 2023-11-03
---

JavaScript's `EventTarget.dispatchEvent()` method allows you to **trigger an event programmatically**. This method accepts an `Event` object as its only argument, which can be created using either the regular [`Event`](https://developer.mozilla.org/en-US/docs/Web/API/Event) constructor or the [`CustomEvent`](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) constructor.

Usually, you'd want to use the [`CustomEvent` constructor](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent), as it allows you to **pass custom data to the event listener**. The constructor accepts two arguments: `eventType` and `detail`. The `eventType` argument is a string that specifies the **type of event** to be created (e.g. `'click'`). The `detail` argument is an object that contains the custom data you want to pass to the event listener.

Putting it all together, you can create a function that programmatically triggers an event on an HTML element:

```js
const triggerEvent = (el, eventType, detail) =>
  el.dispatchEvent(new CustomEvent(eventType, { detail }));

const myElement = document.getElementById('my-element');
myElement.addEventListener('click', e => console.log(e.detail));

triggerEvent(myElement, 'click');
// The event listener will log: null

triggerEvent(myElement, 'click', { username: 'bob' });
// The event listener will log: { username: 'bob' }
```
