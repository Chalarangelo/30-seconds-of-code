---
title: Typechecking objects with Proxy in JavaScript
shortTitle: Object typechecking with Proxy
type: story
tags: javascript,object,type,proxy
author: chalarangelo
cover: customs
excerpt: A simple way to typecheck objects at runtime using the Proxy object.
firstSeen: 2023-04-23T05:00:00-04:00
---

A while back, I was working on a project where some objects had **rigid structure requirements**. As I was really not in the mood to use TypeScript, I decided to create a typechecking mechanism for objects using the `Proxy` object.

Drawing inspiration from React's `PropTypes`, I created a handful of **type checking functions** for the most common types.

```js
const bool = v => typeof v === 'boolean';
const num = v => typeof v === 'number' && v === v;
const str = v => typeof v === 'string';
const date = v => v instanceof Date;
```

The next step was to decide on how an **object's shape** would be defined. This proved an easy task, as I could simply use the names of the type checking functions as values for the keys of the object.

```js
const shape = { name: 'str', age: 'num', active: 'bool', birthday: 'date' };
```

Having decided how to define shapes, I needed to convert this shape definition into a function that would take an object and wrap it with a `Proxy`. The `Proxy` would in turn **intercept any attempts to set a property** and check if the value being set is of the correct type. If it is, the value is set as expected. If not, the trap returns `false`, which means the operation was not a success. Similarly, properties not in the shape definition should not be set, so the trap returns `false` for those as well.

```js
const createShapeCheckerProxy = (types, shape) => {
  const validProps = Object.keys(shape);
  const handler = {
    set(target, prop, value) {
      if (!validProps.includes(prop)) return false;
      const validator = types[shape[prop]];
      if (!validator || typeof validator !== 'function') return false;
      if (!validator(value)) return false;
      target[prop] = value;
    }
  };
  return obj => new Proxy(obj, handler);
};
```

Having set everything up, it was time to test it out. Here's an example of the whole thing put together:

```js
const createShapeCheckerProxy = shape => {
  const types = {
    bool: v => typeof v === 'boolean',
    num: v => typeof v === 'number' && v === v,
    str: v => typeof v === 'string',
    date: v => v instanceof Date
  };
  const validProps = Object.keys(shape);

  const handler = {
    set(target, prop, value) {
      if (!validProps.includes(prop)) return false;
      const validator = types[shape[prop]];
      if (!validator || typeof validator !== 'function') return false;
      if (!validator(value)) return false;
      target[prop] = value;
    }
  };

  return obj => new Proxy(obj, handler);
};

const shapeCheckerProxy = createShapeCheckerProxy({
  name: 'str', age: 'num', active: 'bool', birthday: 'date'
});

const obj = {};
const proxiedObj = shapeCheckerProxy(obj);

// These are valid
proxiedObj.name = 'John';
proxiedObj.age = 34;
proxiedObj.active = false;
proxiedObj.birthday = new Date('1989-04-01');

// These will fail
proxiedObj.name = 404;
proxiedObj.age = false;
proxiedObj.active = 'no';
proxiedObj.birthday = null;
proxiedObj.whatever = 'something';
```

As you can see, `createShapeCheckerProxy` can be used with a plain object to create a reusable function that wraps an object with a typechecking `Proxy`. The defined `types` are used to typecheck individual properties and could be extended to support more complex types and special rules. Overall, this can be a pretty useful tool for **typechecking objects at runtime**, without having to use TypeScript or similar tools.
