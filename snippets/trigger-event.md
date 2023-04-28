---
title: Trigger event on HTML element
type: snippet
tags: [browser,event]
cover: cloudy-mountaintop-2
dateModified: 2020-10-22T20:24:44+03:00
---

Triggers a specific event on a given element, optionally passing custom data.

- Use the `CustomEvent` constructor to create an event from the specified `eventType` and details.
- Use `EventTarget.dispatchEvent()` to trigger the newly created event on the given element.
- Omit the third argument, `detail`, if you do not want to pass custom data to the triggered event.

```js
const triggerEvent = (el, eventType, detail) =>
  el.dispatchEvent(new CustomEvent(eventType, { detail }));
```

```js
triggerEvent(document.getElementById('myId'), 'click');
triggerEvent(document.getElementById('myId'), 'click', { username: 'bob' });
```
