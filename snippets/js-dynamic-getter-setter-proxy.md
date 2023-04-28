---
title: Can I create dynamic setters and getters in JavaScript?
shortTitle: Dynamic getters and setters
type: question
tags: [javascript,object,proxy]
author: chalarangelo
cover: green-cabin-cow
excerpt: Using the Proxy object, we can create dynamic getters and setters for objects in JavaScript.
dateModified: 2023-04-09T05:00:00-04:00
---

Sometimes, when working with objects, the shape of the data is not always known. It might also be inefficient to add special getters for each property of an object, especially if the object is very large. Moreover, if keys are expected to follow a pattern, there are infinite potential key names, the value of which is impossible to validate via the use of setters.

These are only some use-cases where **dynamic setters and getters** could be useful. Luckily, JavaScript's `Proxy` object can be used for this purpose. Using the `get` and `set` traps, we can manipulate the object's behavior when a property is accessed or set. In this post, we will look at two simple examples to give you an idea of how this works.

Note that, in contrast to these examples, a `Proxy` object can define multiple traps to intercept many different operations on the target object.

### Dynamic getters

A **dynamic getter** is a getter that is not explicitly defined for a property, but is instead created on the fly when the property is accessed. This is particularly useful when the shape of the data is not known in advance, or when the value of a property needs to be manipulated before it is returned.

In this example, we will be creating a proxy that will manipulate string values in the target object. The proxy will trim any string values that are accessed, and return the value as-is for any other type of value. Finally, non-existent properties will return `undefined`, as expected.

```js
const obj = { foo: 'bar  ', baz: '  qux ', quux: 1 };

const proxiedObj = new Proxy(obj, {
  get(target, prop) {
    if (prop in target && typeof target[prop] === 'string')
      return target[prop].trim();
    return target[prop];
  }
});

proxiedObj.foo; // 'bar'
proxiedObj.baz; // 'qux'
proxiedObj.quux; // 1
proxiedObj.quuz; // undefined
```

While this is a simple example, it highlights the power of the `Proxy` object. In this case, we are able to manipulate the behavior of the object without having to define a getter for each property. This will also apply to any new properties that are added to the object, as the proxy will be able to intercept the access and return the appropriate value.

### Dynamic setters

A **dynamic setter** is a setter that is not explicitly defined for a property, but is instead created on the fly when the property is set. This can be very useful if the object's keys follow a certain pattern or certain conditions apply to all values that are set.

In this example, we will be creating a proxy that will only allow setting of properties that correspond to a date in the format `yyyy-mm-dd`. Additionally, if a property is already set, its value should be impossible to change. This could be useful if, for example, you were creating something akin to a read-only log.

```js
const obj = {};

const proxiedObj = new Proxy(obj, {
  set(target, prop, value) {
    if (prop in target) return false;
    if (typeof prop === 'string' && prop.match(/^\d{4}-\d{2}-\d{2}$/)) {
      target[prop] = value;
      return true;
    }
    return false;
  }
});

proxiedObj['2023-01-01'] = 1;
proxiedObj['2023-01-01'] = 2; // This will fail, the property is already set
proxiedObj['2023-ab-cd'] = 1; // This will fail, the property name is not a date
proxiedObj; // { '2023-01-01': 1 }
```

As shown in this example, the `Proxy` object can be used to validate keys as well as values when setting properties. In this case, we were able to prevent the value of a property from being changed, as well as prevent the setting of properties that do not follow the expected pattern.

As a side note, remember that the regular expression used here is not a full date validation, but only checks for a simple pattern to demonstrate the concept. If you need to validate dates in a production environment, this is not the way to go.

### Conclusion

As shown in this post, the `Proxy` object provides a particularly powerful way to manipulate the behavior of objects. That being said, you might want to consider your specific use-case before reaching for this tool. Dynamic getters and setters can be very useful, but they can also cause a lot of headaches if used incorrectly.
