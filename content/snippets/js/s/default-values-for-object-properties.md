---
title: Assign default values for a JavaScript object's properties
shortTitle: Default values for object properties
language: javascript
tags: [object]
cover: filter-coffee-pot
excerpt: Assign default values for all properties in an object that are `undefined`.
listed: true
dateModified: 2024-07-17
---

If you have worked with classes for any length of time, you have probably encountered the need to **assign default values to object properties**. This is usually handled by the constructor function, but what if you want to assign default values to an object that is not a class instance?

Luckily, we can use `Object.assign()` for this task. Using this method, we can create a new **empty object** and **copy the original object** to maintain the key order. We can then use the spread operator (`...`) and `Array.prototype.reverse()` to **combine the default values from left to right**. If multiple default values are provided for the same property, the first one will take precedence.

Finally, we can use the original object again to **overwrite properties that originally had a value**. This way, we can assign default values to all properties in an object that are `undefined`.

```js
const defaults = (obj, ...defs) =>
  Object.assign({}, obj, ...defs.reverse(), obj);

defaults({ a: 1 }, { b: 2 }, { b: 6 }, { a: 3 }); // { a: 1, b: 2 }
```

> [!TIP]
>
> If you find yourself needing to assign the same default values to multiple objects, you can create a **factory function** that generates a new function with the default values already set. This way, you can reuse the same defaults across different objects and optimize your code.
