---
title: triggerEvent
tags: browser,event,intermediate
---

Triggers a specific event on a given element, optionally passing custom data.

- Use `new CustomEvent()` to create an event from the specified `eventType` and details.
- Use `el.dispatchEvent()` to trigger the newly created event on the given element.
- Omit the third argument, `detail`, if you do not want to pass custom data to the triggered event.

```js
const triggerEvent = (el, eventType, detail) =>
  el.dispatchEvent(new CustomEvent(eventType, { detail }));
```

```js
triggerEvent(document.getElementById('myId'), 'click');
triggerEvent(document.getElementById('myId'), 'click', { username: 'bob' });
```
