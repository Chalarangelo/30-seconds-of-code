---
title: "Tip: Optimize dynamically added object properties"
shortTitle: Dynamically added property optimization
type: tip
tags: javascript,object,performance
author: chalarangelo
cover: blog_images/mountain-lake-cottage.jpg
excerpt: Dynamically adding object properties can be pretty slow in some cases. Here's how to optimize it.
firstSeen: 2022-11-02T05:00:00-04:00
---

JavaScript is one of the most flexible languages out there, but sometimes this comes with performance costs attached. One such example is the use of dynamically added properties to objects. Oddly enough, this performance impact comes from JavaScript engines optimizing for static typing.

The V8 engine, which powers Chrome and Node.js, uses **shapes** and **transition chains** to optimize object property access. When two objects have the same properties, they are considered to have the same shape. Adding new properties to an object, creates a transition chain to add the new property. Without getting into further detail, it's obvious that a simple shape is faster to access than a transition chain.

```js
// Create an object with a single property
const obj = { a: 1 };
// Add a new property to the object
obj.b = 2;
// Access a property of the object
console.log(obj.a);
```

Circling back to dynamically added properties, the engine cannot know ahead of time what properties will be added to the object. Thus, it ends up creating a transition chain for each new property that is added. This is not a big deal for a few properties, but it can become a problem when adding a lot of properties to an object.

Luckily, this is easy to fix. The easiest solution is to **define all possible properties of an object ahead of time** and give them an empty value (i.e. `null` or `undefined`). This way, the engine can create a shape for the object and optimize property access. This is not always possible, but it's a good practice to follow.

```js
// Create an object with all possible properties
const obj = { a: 1, b: undefined };
// Add a new property to the object
obj.b = 2;
// Access a property of the object
console.log(obj.a);
```
