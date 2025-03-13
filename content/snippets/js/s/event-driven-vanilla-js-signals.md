---
title: Implementing signals and reactivity with vanilla JavaScript
shortTitle: Signals and reactivity
language: javascript
tags: [object,event,class]
cover: metro-tunnel
excerpt: Let's demystify signals and reactivity, one of the most popular patterns in modern JavaScript, using event-driven programming!
listed: true
dateModified: 2025-04-02
---

In a [past article](/js/s/observable-proxy), I took a look at how to use the `Proxy` object to implement the Observer pattern in JavaScript. This time, I want to explore a different approach to the popular **signals** pattern (hint: it's another name for the same pattern), using just event-driven programming.

> [!NOTE]
>
> This approach is very similar to the one in the previous article, using the `EventTarget` interface, which is **common between the browser and Node.js** environments. It just does away with the `Proxy` part and focuses more on events, using familiar naming conventions, such as signal and effect.

## Signals

In most reactive-programming libraries nowadays, there's a concept of **signals**. A signal is a fancy name for an **observable**, a stream of values that can be listened to. When a signal changes, it notifies all its listeners, which can then react to the change.

We can implement a very simple `Signal` class, by extending `EventTarget`. We'll use a [private class property](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_properties) to store the current value of the signal, which can then be accessed via `get` and `set` methods. The `get` method will return the value, while the `set` method will update the value and dispatch a `CustomEvent` to **notify all listeners**.

We'll also make sure that the `set` method only updates the value and notifies the listeners if the new value is different from the old one. Finally, we'll allow the `set` method to accept a function, which will be called with the current value and should return the new value.

```js
class Signal extends EventTarget {
  #value;

  constructor(value) {
    super();
    this.#value = value;
  }

  get value() {
    return this.#value;
  }

  set value(newValue) {
    const nextValue =
      typeof newValue === 'function' ? newValue(this.#value) : newValue;
    if (nextValue === this.#value) return;
    this.#value = nextValue;
    this.dispatchEvent(new CustomEvent('notify', { detail: nextValue }));
  }
}

const signal = new Signal(42);
signal.addEventListener('notify', event => {
  console.log(`Signal changed to ${event.detail}`);
});

signal.value = 42;
// No change, no event
signal.value = 43;
// LOGS: Signal changed to 43
signal.value = value => value + 1;
// LOGS: Signal changed to 44
```

## Effect

Most reactive libraries, also provide a way to create **effects**, a fancier name for **observers**. An effect is a function that is called whenever any signal it depends on changes. This is a very powerful concept, as it allows us to **react to changes** in the system in a very declarative way.

To implement an `Effect` class, we need to store its **subscriptions** in a private class property, which we'll have to populate by creating **listeners** for the signals it depends on, passed as constructor arguments. If we ever need to **clean up the effect**, we can call the `dispose` method, which will remove all the listeners.

```js
class Effect {
  #subscriptions = new Set();

  constructor(callback, dependencies = []) {
    dependencies.forEach(dependency => {
      dependency.addEventListener('notify', callback);
      this.#subscriptions.add(() => {
        dependency.removeEventListener('notify', callback);
      });
    });
    callback();
  }

  dispose() {
    this.#subscriptions.forEach(unsubscribe => unsubscribe());
  }
}

const signal = new Signal(42);
const effect = new Effect(() => {
  console.log(`Effect triggered with value ${signal.value}`);
}, [signal]);
// LOGS: Effect triggered with value 42

signal.value = 43;
// LOGS: Effect triggered with value 43
effect.dispose();
signal.value = 44;
// No effect
```

## Computed values

A problematic situation arises when we want to **compute a value from a signal**, then create an effect that reacts to it changing. Computed values are essentially signals that depend on other signals, but they don't have a direct value. Instead, they compute their value based on the values of the signals they depend on.

To implement this concept, we can create a `ComputedValue` class that also extends `EventTarget`. It will contain a `Signal` and an `Effect`, allowing it to use **both patterns** in a single class. We'll override the `addEventListener` and `removeEventListener` methods to **delegate** to the signal, allowing it to handle the event dispatching. Similarly, the private effect will take care of listening for changes in the dependencies and **updating** the signal's value.

Finally, we'll have to implement a `get` method for the value, so that it's accessible, similar to the `Signal` class. And we'll and a `dispose` method to clean up the subscriptions, similar to the `Effect` class.

```js
class ComputedValue extends EventTarget {
  #signal;
  #effect;

  constructor(callback, dependencies = []) {
    super();
    this.#signal = new Signal(callback());
    this.#effect = new Effect(() => {
      this.#signal.value = callback();
    }, dependencies);
  }

  get value() {
    return this.#signal.value;
  }

  addEventListener(type, listener) {
    this.#signal.addEventListener(type, listener);
  }

  removeEventListener(type, listener) {
    this.#signal.removeEventListener(type, listener);
  }

  dispose() {
    this.#effect.dispose();
  }
}

const signal = new Signal(42);
const signalEffect = new Effect(() => {
  console.log(`Signal changed to ${signal.value}`);
}, [signal]);
// LOGS: Signal changed to 42
const computed = new ComputedValue(() => signal.value * 2, [signal]);
const computedEffect = new Effect(() => {
  console.log(`Computed value changed to ${computed.value}`);
}, [computed]);
// LOGS: Computed value changed to 84

signal.value = 43;
// LOGS: Signal changed to 43
// LOGS: Computed value changed to 86
```

## Conclusion

In just **under 70 lines of code**, we've demystified signals and reactivity, one of the most popular patterns in modern JavaScript. We've seen how to implement signals, effects, and computed values, using simple concepts and familiar APIs. This is a great exercise to understand how reactive libraries work under the hood and to appreciate the power of event-driven programming.
