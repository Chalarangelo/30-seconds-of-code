---
title: Get a nested object property by key or path in JavaScript
shortTitle: Get nested object property
language: javascript
tags: [object,regexp,recursion]
cover: campfire
excerpt: Learn how to get a nested object property by key or a path string in JavaScript, and how to search for nested values in an object.
listed: true
dateModified: 2024-03-22
---

Working with objects, you'll often need to **retrieve nested properties**. It's not uncommon to have deeply nested objects and keys that are **calculated dynamically** and not known in advance. This means that you'll have to dynamically find the value of a nested property based on a key or a path string, or search for a property in an object.

## Use an array of keys to get a nested object property

The simplest scenario and by far the most common is having an **array of keys** that represent the path to the desired property in the object. In that case, all you need to do is use `Array.prototype.reduce()` to **iterate over the keys** and get the nested property. If the key doesn't exist, you can return `null`.

In order to keep the syntax concise, you can use the nullish coalescing operator (`??`) and the optional chaining operator (`?.`) to handle cases where **the property doesn't exist**.

```js
const deepGet = (obj, keys) => keys.reduce((xs, x) => xs?.[x] ?? null, obj);

const data = {
  foo: {
    foz: [1, 2, 3],
    bar: { baz: ['a', 'b', 'c'] },
  },
};

deepGet(data, ['foo', 'foz', 2]); // 3
deepGet(data, ['foo', 'bar', 'baz', 8, 'foz']); // null
```

## Use path strings to get nested object properties

A less common, yet more complex use-case is when you need to get a nested object property based on a **path string**. This is useful when you have a string that represents the path to the desired property, like `'foo.bar.baz'`.

In that case, you will have to normalize the path string and **split it** into an array of keys. The **normalization** process involves using `String.prototype.replace()` to replace square brackets with dots, and then splitting the string via `String.prototype.split()`. As this might produce empty strings, you should filter them out, using `Array.prototype.filter()`.

The resulting value is an array of keys that you can pass to the previous function. Additionally, you can use **rest parameters** in order to allow for **multiple path strings** to be passed to the function at once.

```js
const deepGet = (obj, keys) => keys.reduce((xs, x) => xs?.[x] ?? null, obj);

const deepGetByPaths = (obj, ...paths) =>
  paths.map(path =>
    deepGet(
      obj,
      path
        .replace(/\[([^\[\]]*)\]/g, '.$1.')
        .split('.')
        .filter(t => t !== '')
    )
  );

const data = {
  foo: {
    foz: [1, 2, 3],
    bar: { baz: ['a', 'b', 'c'] },
  },
};
deepGetByPaths(data, 'foo.foz[2]', 'foo.bar.baz.1', 'foo[8]');
// [3, 'b', null]
```

## Search for a deeply nested property in an object

Another unusual scenario is searching for a deeply nested property in an object. This is useful when you **don't know the exact path** to the property, but you know the key you're looking for. In this case, you can use a **recursive function** that will search for the key in the object and its nested properties.

For this scenario, you can use the `in` operator to check if the **target key exists** in the object. If it does, you can return the value of the key. If it doesn't, you can use `Object.values()` and `Array.prototype.reduce()` to recursively call the function on each nested object until the **first matching key/value pair** is found.

```js
const dig = (obj, target) =>
  target in obj
    ? obj[target]
    : Object.values(obj).reduce((acc, val) => {
        if (acc !== undefined) return acc;
        if (typeof val === 'object') return dig(val, target);
      }, undefined);

const data = {
  foo: {
    foz: [1, 2, 3],
    bar: { baz: ['a', 'b', 'c'] },
  },
};

dig(data, 'foz'); // [1, 2, 3]
dig(data, 'baz'); // ['a', 'b', 'c']
```

> [!NOTE]
>
> The behavior of `dig` when the target key is an integer is to return the value at the given array index. This, in turn, means that the **first array to be encountered** will be the one that contains the target value.
