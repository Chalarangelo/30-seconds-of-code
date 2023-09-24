---
title: Immutable JavaScript objects using the Proxy object
shortTitle: Immutable objects using Proxy
type: story
language: javascript
tags: [object,proxy]
author: chalarangelo
cover: frozen-globe
excerpt: Freezing objects is not the only way to prevent mutations. Learn how you can leverage the Proxy object to your advantage.
dateModified: 2022-04-10
---

Object mutability and its relation to the `const` keyword is a very common headache for developers. More often than not, when looking for ways to make an object immutable, `Object.freeze()` will pop up as a solution. We’ve explored this approach previously, elaborating on deep freezing solutions. You can read more about it in [this article](/js/s/deep-freeze-object).

While `Object.freeze()` is the more straightforward approach, it might not always be the best solution. This may be especially true when dealing with extensive object nesting or when objects have a very short life. For such cases, a different approach using the [Proxy object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) might make more sense. Here’s what that looks like:

```js
const term = {
  id: 1,
  value: 'hello',
  properties: [{ type: 'usage', value: 'greeting' }],
};

const immutable = obj =>
  new Proxy(obj, {
    get(target, prop) {
      return typeof target[prop] === 'object'
        ? immutable(target[prop])
        : target[prop];
    },
    set() {
      throw new Error('This object is immutable.');
    },
  });

const immutableTerm = immutable(term);
const immutableProperty = immutableTerm.properties[0];

immutableTerm.name = 'hi';            // Error: This object is immutable.
immutableTerm.id = 2;                 // Error: This object is immutable.
immutableProperty.value = 'pronoun';  // Error: This object is immutable.
```

Even though proxies are not all that common, this code shouldn’t be hard to understand. The gist of the idea is that you use a handler to prevent mutations to the object via the `set()` trap. Additionally, you use the `get()` trap to enforce immutability on all nested values. This is done by checking the type of the value and applying the proxy to nested objects.

That’s pretty much all there is to it. With just a few lines of code, you now have a way to prevent mutation on an object, regardless of shape, nesting or complexity.
