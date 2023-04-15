---
title: Chaining dynamic getters using the Proxy object
shortTitle: Dynamic getter chaining
type: story
tags: javascript,object,proxy
author: chalarangelo
cover: colorful-rocks
excerpt: Using the Proxy object, we can create chainable dynamic getters for objects in JavaScript.
firstSeen: 2023-05-28T05:00:00-04:00
---

The dawn of ES6 brought about jQuery's fall from grace, as a lot of the conveniences it afforded developers were now available in the language itself. However, jQuery's API design was convenient in many ways that native JavaScript often isn't. One of the most practical things jQuery offered was its ability to chain methods together, minimizing duplication and making code more readable.

Looking at the use case at hand, I thought that I could stitch together a general-purpose solution using JavaScript's `Proxy` object. In fact, I think that the concept of dynamic getters and setters that I described in [my previous post](/articles/s/js-dynamic-getter-setter-proxy) is a great place to start.

To recap, intercepting the behavior of the `get` and `set` traps of a `Proxy` object allows us to create dynamic accessors for objects. This is particularly useful when the shape of the data is not known in advance, or when the value of a property needs to be manipulated before it is returned.

In our scenario, we want each property to be accessed as a function. The function should do one of two things, depending on the argument it receives:

- If the argument is `undefined`, then the property should be returned as-is.
- If the argument is any other value, the property should be set to the value of the argument and a proxy of the object should be returned.

Given these requirements, we can define the handler's behavior for the `get` trap. All we need to do is check if the argument is `undefined` and choose which behavior to perform. Here's what the code looks like:

```js
const getHandler = {
  get: (target, prop) => {
    return value => {
      if (typeof value !== 'undefined') {
        target[prop] = value;
        return new Proxy(target, getHandler);
      }
      return target[prop];
    };
  }
};

const styles = {};
const proxiedStyles = new Proxy(styles, getHandler);

proxiedStyles.color('#101010').background('#fefefe').margin('4px 8px');

proxiedStyles.color(); // #101010
proxiedStyles.background(); // #fefefe
proxiedStyles.margin(); // 4px 8px
```

As you can see the handler is pretty short and straightforward. The only confusing step is the creation of a new `Proxy` inside the trap. As we don't have a reference to the proxy object itself inside the trap, we need to create a new one. This is necessary because we want to return a new proxy to allow for chaining. If we didn't do this, the proxy would only be able to be used once.
