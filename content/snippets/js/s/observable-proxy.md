---
title: Using a Proxy to implement the Observable pattern
shortTitle: Observable Proxy
language: javascript
tags: [object,proxy]
cover: city-view
excerpt: Use the Proxy object to implement the Observable pattern in JavaScript.
listed: true
dateModified: 2024-05-27
---

The **Observer pattern** is a design pattern where an object (known as the subject) maintains a list of **dependents** (observers) that are notified of any changes in the object's state. With a little ingenuity, we can leverage the `EventTarget` interface and the `Proxy` object to implement the Observer pattern in JavaScript.

> [!NOTE]
>
> I'm using the `EventTarget` interface, as it's **common between the browser and Node.js** environments. If you're only working with Node.js, the `EventEmitter` offers a more robust solution, but you'll have to make a few tweaks.

At its heart the Observer pattern is a simple pub/sub ([publish–subscribe](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern)) system. We can create a `Observable` class that extends the `EventTarget` interface and use a `Proxy` object to **intercept property changes**, via the `set` trap.

When a property changes, a `CustomEvent` is created to notify any observers, carrying the **name of the property** as its `type` and the **new value** as its `detail`. Finally, the event will be **dispatched** via `EventTarget.dispatchEvent()`, **notifying all registered listeners**.

```js
class Observable extends EventTarget {
  constructor() {
    super();
    return new Proxy(this, {
      set: (target, property, value) => {
        target[property] = value;
        this.dispatchEvent(new CustomEvent(property, { detail: value }));
        return true;
      },
    });
  }
}

const subject = new Observable();

subject.addEventListener('name', event => {
  console.log(`Name changed to ${event.detail}`);
});

subject.name = 'Alice'; // Name changed to Alice
```

While this code is pretty simple, it can be easily extend to handle more complex use cases, such as **nested objects** or **arrays**. It can be even used to create an observable store, similar to Redux. Give it a try and see how far you can take it!
