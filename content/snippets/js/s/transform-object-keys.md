---
title: Transform the keys of a JavaScript object
shortTitle: Transform object keys
language: javascript
tags: [object, recursion]
cover: symmetry-cloudy-mountain
excerpt: Learn how to perform various transformations on the keys of a JavaScript object.
listed: true
dateModified: 2024-02-19
---

JavaScript objects are a fundamental data structure in the language, and they are used to store collections of key-value pairs. Transforming object keys can come in handy in many different situations, but requires a little bit of work to get it right.

## Map object keys

Given an object and a function, you can generate a new object by mapping the keys of the original object using the provided function.

In order to do so, you can use `Object.keys()` to iterate over the object's keys and `Array.prototype.reduce()` to create a new object with the same values and **mapped keys** using the provided function, `fn`.

```js
const mapKeys = (obj, fn) =>
  Object.keys(obj).reduce((acc, k) => {
    acc[fn(obj[k], k, obj)] = obj[k];
    return acc;
  }, {});

mapKeys({ a: 1, b: 2 }, (val, key) => key + val); // { a1: 1, b2: 2 }
```

> [!NOTE]
>
> Similarly, you can transform the values of an object using the same approach. Simply use `Object.entries()` or `Object.values()` instead of `Object.keys()`.

### Deep map object keys

The previous snippet only works for the keys at the **first level** of the object. In order to transform nested keys, you'll have to use **recursion**.

Again, using `Object.keys()` to iterate over the object's keys, you can use `Array.prototype.reduce()` to create a new object with the same values and mapped keys using the provided function, `fn`. If the value of a key is an object, you can call the function recursively to transform its keys as well.

```js
const deepMapKeys = (obj, fn) =>
  Array.isArray(obj)
    ? obj.map(val => deepMapKeys(val, fn))
    : typeof obj === 'object'
    ? Object.keys(obj).reduce((acc, current) => {
        const key = fn(current);
        const val = obj[current];
        acc[key] =
          val !== null && typeof val === 'object' ? deepMapKeys(val, fn) : val;
        return acc;
      }, {})
    : obj;

const obj = {
  foo: '1',
  nested: {
    child: {
      withArray: [
        {
          grandChild: ['hello']
        }
      ]
    }
  }
};
const upperKeysObj = deepMapKeys(obj, key => key.toUpperCase());
/* {
  "FOO":"1",
  "NESTED":{
    "CHILD":{
      "WITHARRAY":[
        {
          "GRANDCHILD":[ 'hello' ]
        }
      ]
    }
  }
} */
```

## Rename object keys

one of the simplest transformations is **renaming the keys** of an object. You can use `Object.keys()` in combination with `Array.prototype.reduce()` and the spread operator (`...`) to get the object's keys and rename them according to a given **dictionary**, `keysMap`.

```js
const renameKeys = (keysMap, obj) =>
  Object.keys(obj).reduce(
    (acc, key) => ({
      ...acc,
      ...{ [keysMap[key] || key]: obj[key] }
    }),
    {}
  );

const obj = { name: 'Bobo', job: 'Front-End Master', shoeSize: 100 };
renameKeys({ name: 'firstName', job: 'passion' }, obj);
// { firstName: 'Bobo', passion: 'Front-End Master', shoeSize: 100 }
```

> [!NOTE]
>
> A very common key transformation is to convert all the keys of an object to upper or lower case. In the previous article, can find a more detailed explanation of how to [uppercase or lowercase object keys in JavaScript](/js/s/upperize-lowerize-object-keys).

## Symbolize object keys

**Symbols** are often underused in JavaScript, but they can be very useful for creating unique keys. In order to symbolize the keys of an object, you can use `Object.keys()` to get the keys of the object and `Array.prototype.reduce()` to create a new object where each key is converted to a `Symbol`.

```js
const symbolizeKeys = obj =>
  Object.keys(obj).reduce(
    (acc, key) => ({ ...acc, [Symbol(key)]: obj[key] }),
    {}
  );

symbolizeKeys({ id: 10, name: 'apple' });
// { [Symbol(id)]: 10, [Symbol(name)]: 'apple' }
```

## Transform object keys using a function

Subsequently, you might want to completely transform the keys of an object using a function. In that case, you can apply a function against an **accumulator** and each key in the object (from left to right) using `Object.keys()` and `Array.prototype.reduce()`.

```js
const transform = (obj, fn, acc) =>
  Object.keys(obj).reduce((a, k) => fn(a, obj[k], k, obj), acc);

transform(
  { a: 1, b: 2, c: 1 },
  (r, v, k) => {
    (r[v] || (r[v] = [])).push(k);
    return r;
  },
  {}
); // { '1': ['a', 'c'], '2': ['b'] }
```
