---
title: Ever wanted to ensure ultimate immutability? Dive into the future of object protection with this Proxy-powered deep freeze snippet
shortTitle: Deep Freeze Object with Proxies
type: snippet
language: javascript
tags: [object]
author: jayanth-kumar-morem
cover: frozen-globe
excerpt: Deep freeze an object and its nested properties using Proxies and Object.freeze(), ensuring comprehensive immutability and preventing modifications.
dateModified: 2023-08-21T19:30:41+03:00
---

Deep freeze an object, making all properties and nested properties immutable using a Proxy.

- Utilizes the Object.freeze() method.
- Leverages Proxies for deep freezing nested properties.
- Prevents any modifications, including property additions and deletions.

```js
const deepFreeze = (obj) => {
  const freezeHandler = {
    get(target, prop, receiver) {
      const value = Reflect.get(target, prop, receiver);
      if (value && typeof value === 'object') {
        return deepFreeze(value);
      }
      return value;
    },
    set() {
      throw new Error("Cannot modify a frozen object.");
    },
    deleteProperty() {
      throw new Error("Cannot delete properties of a frozen object.");
    },
  };

  return new Proxy(obj, freezeHandler);
};

// Example object
const mutableObj = {
  a: 1,
  b: {
    c: 2,
    d: {
      e: 3,
    },
  },
};

const immutableObj = deepFreeze(mutableObj);

// Trying to modify properties
try {
  immutableObj.a = 10; // Throws an error
  immutableObj.b.c = 20; // Throws an error
} catch (error) {
  console.error(error.message);
}

// Trying to delete properties
try {
  delete immutableObj.a; // Throws an error
  delete immutableObj.b.c; // Throws an error
} catch (error) {
  console.error(error.message);
}
```
This code snippet showcases an advanced concept involving Proxies and object immutability. It provides a powerful mechanism to ensure that objects remain deeply frozen, thereby preventing unintentional modifications. Remember to exercise caution when using such techniques, as they can have performance implications in certain scenarios.

**Practical Usage:**
- Ensure that your object remains immutable throughout its usage in complex systems.
- Useful for maintaining the integrity of shared data structures.
