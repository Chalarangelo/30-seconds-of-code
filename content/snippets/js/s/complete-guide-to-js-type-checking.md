---
title: A complete guide to JavaScript typechecking
shortTitle: Typechecking guide
language: javascript
tags: [type]
cover: overgrown
excerpt: Learn all you need to know to effectively and efficiently typecheck values in JavaScript.
listed: true
dateModified: 2023-12-22
---

JavaScript's **dynamic typing** is one of its most powerful features. Nonetheless, it's often the source of issues and confusion, especially for inexperienced developers. Thus, **typechecking** is a crucial skill for any JavaScript developer.

## Value types

Before we dive into the different ways to typecheck values in JavaScript, let's take a look at the different **types of values** we can encounter in JavaScript.

| Type | Description | Example |
| ---- | ----------- | ------- |
| `undefined` | The value of a variable that has not been assigned a value. | `let x;` |
| `null` | The intentional absence of any object value. | `const x = null;` |
| `boolean` | A logical value, either `true` or `false`. | `const x = true;` |
| `number` | A numeric value. | `const x = 50;` |
| `bigint` | An integer with arbitrary precision. | `const x = 9007199254740991n;` |
| `string` | A sequence of characters. | `const x = 'Hello!';` |
| `symbol` | A unique value that may be used as the key of an object property. | `const x = Symbol();` |
| `object` | A collection of properties. | `const x = { a: 1, b: 2 };` |
| `function` | A callable object. | `const x = () => {};` |

Apart from the last two types, all other types are considered **primitive types**. Primitive types are **immutable**, meaning that their values cannot be changed. Objects and functions, on the other hand, are **mutable**, meaning that their values can be changed.

## Typechecking primitives

Primitives are generally easier to typecheck than objects and functions. This is because primitives are immutable, meaning that their values cannot be changed. Thus, we can simply compare the type of a value to the type we want to check for. This is where the `typeof` operator comes in handy.

### Value is undefined

Checking for an `undefined` value is as simple as comparing the value to `undefined`. This yields the exact same result as using the `typeof` operator.

```js
const isUndefined = val => val === undefined;

isUndefined(undefined); // true
```

### Value is null

Checking for a `null` value can only be done by comparing the value to `null` itself. This is because `typeof null` returns `'object'`, which is not what we want.

```js
const isNull = val => val === null;

isNull(null); // true
```

### Value is nil

In some other languages, a value of `nil` is used to represent the absence of a value. In JavaScript, however, `null` and `undefined` are used for this purpose. Thus, checking for a `nil` value is the same as checking for a `null` or `undefined` value.

```js
const isNil = val => val === undefined || val === null;

isNil(null); // true
isNil(undefined); // true
isNil(''); // false
```

### Value is boolean

Boolean values are either `true` or `false`. Checking for either value is relatively inefficient, so `typeof` is generally preferred.

```js
const isBoolean = val => typeof val === 'boolean';

isBoolean(true); // true
isBoolean(false); // true
isBoolean('true'); // false
isBoolean(null); // false
```

### Value is number

Numbers can also be typechecked using `typeof`. However, this will also return `true` for `NaN`, which is a special numeric value that represents the result of an operation that cannot produce a normal result.

You can [read more about `NaN`](/js/s/value-not-equal-to-itself) and why it can be tricky to work with, but using `Number.isNaN()` to add an additional check for `NaN` is generally a good idea.

```js
const isNumber = val => typeof val === 'number' && !Number.isNaN(val);

isNumber(1); // true
isNumber('1'); // false
isNumber(NaN); // false
```

### Value is bigint

BigInts are a relatively new addition to JavaScript. They are integers with arbitrary precision. BigInts are typechecked using `typeof`.

```js
const isBigInt = val => typeof val === 'bigint';

isBigInt(1n); // true
isBigInt(1); // false
```

### Value is string

String primitives, like most other primitives, can be typechecked using `typeof`.

```js
const isString = val => typeof val === 'string';

isString('Hello!'); // true
isString(1); // false
```

### Value is symbol

Symbols are unique values that can be used as the key of an object property. They are also typechecked using `typeof`.

```js
const isSymbol = val => typeof val === 'symbol';

isSymbol(Symbol('x')); // true
isSymbol('x'); // false
```

### Value is primitive

Checking if a value is of any primitive type is a bit more tricky. We can't simply use `typeof` for this, as it won't work for `null`.

Instead, we can **create an object** from the value and **compare** it with the value itself. If the value is primitive, the object will not be equal to the value.

```js
const isPrimitive = val => Object(val) !== val;

isPrimitive(null); // true
isPrimitive(undefined); // true
isPrimitive(50); // true
isPrimitive('Hello!'); // true
isPrimitive(false); // true
isPrimitive(Symbol()); // true
isPrimitive([]); // false
isPrimitive({}); // false
```

## Typechecking non-primitives

Objects and functions behave slightly differently than primitives. While `typeof` can get us part of the way there, we might want to employ some other methods, especially for objects.


### Value is object

As we've seen before `typeof` returns `'object'` for `null`. This is not what we want, when typechecking for objects. Instead, we can use the `Object` constructor to create an **object wrapper** for the given value. If the value is `null` or `undefined`, the returned value will be an empty object. Otherwise, the returned object will be the same as the input object.

```js
const isObject = obj => obj === Object(obj);

isObject([1, 2, 3, 4]); // true
isObject([]); // true
isObject(['Hello!']); // true
isObject({ a: 1 }); // true
isObject({}); // true
isObject(true); // false
isObject(null); // false
isObject(undefined); // false
```

> [!TIP]
>
> **Arrays** are also considered objects in JavaScript. It is recommended to use `Array.isArray()` to [check if a value is an array](/js/s/typecheck-array).

### Value is function

Luckily, functions are not as tricky as objects. We can simply use `typeof` to check if a value is a function.

```js
const isFunction = val => typeof val === 'function';

isFunction(x => x); // true
isFunction('x'); // false
```

> [!NOTE]
>
> **Classes** are also considered functions in JavaScript. You might want to use the `instanceof` operator to check if a value is an instance of a class.

### Value is plain object

An object is considered **plain** when it is created by the `Object` constructor. This is in comparison to other objects like arrays, functions, or instances of classes, such as `Map`.

In order to check if a value is a plain object, we need to make sure that the value is truthy (not `null` or `undefined`), that it is an object, and that its **constructor** is equal to `Object`, using `Object.prototype.constructor`.

```js
const isPlainObject = val =>
  !!val && typeof val === 'object' && val.constructor === Object;

isPlainObject({ a: 1 }); // true
isPlainObject(new Map()); // false
```

#### Value is async function

A function declared with the `async` keyword is considered asynchronous. Typechecking for async functions requires the use of `Object.prototype.toString()` and `Function.prototype.call()` to check if the result is `'[object AsyncFunction]'`.

```js
const isAsyncFunction = val =>
  Object.prototype.toString.call(val) === '[object AsyncFunction]';

isAsyncFunction(function() {}); // false
isAsyncFunction(async function() {}); // true
```

#### Value is generator function

Generator functions can be typechecked in the same manner as async functions. The expected value for them is `'[object GeneratorFunction]'`.

```js
const isGeneratorFunction = val =>
  Object.prototype.toString.call(val) === '[object GeneratorFunction]';

isGeneratorFunction(function() {}); // false
isGeneratorFunction(function*() {}); // true
```

### Type of value

If all else fails, or if you are working with classes and other custom types, you might want to get a string representation of the type of a value. This can be done using `Object.prototype.constructor` and `Function.prototype.name`.

```js
const getType = v =>
  v === undefined ? 'undefined' : v === null ? 'null' : v.constructor.name;

getType(undefined); // 'undefined'
getType(null); // 'null'
getType(true); // 'Boolean'
getType(1); // 'Number'
getType(1n); // 'BigInt'
getType('Hello!'); // 'String'
getType(Symbol()); // 'Symbol'
getType([]); // 'Array'
getType({}); // 'Object'
getType(() => {}); // 'Function'
getType(new Set([1, 2, 3])); // 'Set'
```

#### Check if value is of type

Flipping the previous code snippet around, we can also check if a value is of a specific type. Same as before, special care needs to be taken for `undefined` and `null`, as the do not have a `constructor` property.

```js
const isOfType = (type, val) =>
  ([undefined, null].includes(val) && val === type) ||
  v.constructor.name === type;

isOfType(undefined, undefined); // true
isOfType(null, null); // true
isOfType('Boolean', true); // true
isOfType('Number', 1); // true
isOfType('BigInt', 1n); // true
isOfType('String', 'Hello!'); // true
isOfType('Symbol', Symbol()); // true
isOfType('Array', []); // true
isOfType('Object', {}); // true
isOfType('Function', () => {}); // true
isOfType('Set', new Set([1, 2, 3])); // true
```
