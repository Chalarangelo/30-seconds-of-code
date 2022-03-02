---
title: What are the differences between arrow functions and regular functions in JavaScript?
type: question
tags: javascript,function
expertise: intermediate
author: chalarangelo
cover: blog_images/fallen-leaves.jpg
excerpt: JavaScript's arrow functions are seemingly the same as regular functions, but there are some important differences you need to know.
firstSeen: 2021-10-17T05:00:00-04:00
---

JavaScript's arrow functions might seem the same as regular functions on the surface, but they have some very important differences:

- Syntactical differences
- `this` value (execution context)
- Usage as methods
- Usage as constructors
- `arguments` binding

### Syntax

The first and most obvious difference between arrow functions and regular functions is their syntax. Not only do they look different, but arrow functions also provide an implicit return shorthand and allow parenthesis around a single argument to be omitted.

```js
const square = a => a * a;

// Equivalent regular function
function square(a) {
  return a * a;
}
```

### Execution context

Inside a regular function, execution context (i.e. the value of `this`) is dynamic. This means that the value of `this` depends on how the function was invoked (simple invocation, method invocation, indirect invocation or constructor invocation). On the other hand, an arrow function does not define its own execution context. This results in an arrow function's `this` being resolved lexically (i.e. the scope in which the arrow function was defined).

```js
function logThis() {
  console.log(this);
}
document.addEventListener('click', logThis);
// `this` refers to the document

const logThisArrow = () => {
  console.log(this);
};
document.addEventListener('click', logThisArrow);
// `this` refers to the global object
```

`Function.prototype.call()`, `Function.prototype.bind()` and `Function.prototype.apply()` do not work correctly with arrow functions either. Their purpose is to allow methods to execute within different scopes, but the `this` value of an arrow function cannot be changed, as it's resolved lexically.

```js
function logThis() {
  console.log(this);
}
logThis.call(42);       // Logs: 42

const logThisArrow = () => {
  console.log(this);
};
logThisArrow.call(42);  // Logs the global object
```

### Methods

Due to arrow functions not defining their own execution context, they're not well-suited for usage as methods. However, thanks to the [Class fields proposal](https://github.com/tc39/proposal-class-fields), arrow functions can be used as methods inside classes, if your environment supports it.

```js
const obj = {
  x: 42,
  logThisX: function() {
    console.log(this.x, this);
  },
  logThisXArrow: () => {
    console.log(this.x, this);
  }
};

obj.logThisX();       // Logs: 42, Object {...}
obj.logThisXArrow();  // Logs: undefined, the global object
```

### Constructors

Regular functions can be used as constructors, using the `new` keyword. Yet another consequence of the lexical resolution of `this` inside arrow functions is that they cannot be used as constructors. Using `new` with an arrow function results in a `TypeError`.

```js
function Foo(bar) {
  this.bar = bar;
}
const a = new Foo(42);  // Foo {bar: 42}

const Bar = foo => {
  this.foo = foo;
};
const b = new Bar(42);  // TypeError: Bar is not a constructor
```

### Arguments

Another difference is the binding of the `arguments` object. Unlike regular functions, arrow functions don't have their own `arguments` object. A modern alternative that circumvents this limitation is the usage of rest parameters.

```js
function sum() {
  return arguments[0] + arguments[1];
};
sum(4, 6);        // 10

const arguments = [1, 2, 3];
const sumArrow = () => {
  return arguments[0] + arguments[1];
};
sumArrow(4, 6);   // 3 (resolves to 1 + 2)

const sumRest = (...arguments) => {
  return arguments[0] + arguments[1];
}
sumRest(4, 6);    // 10
```

### Other differences

Finally, there are a couple of other differences that are not as important, but worth mentioning. These include the lack of a `prototype` property in arrow functions, as well as the fact that the `yield` keyword may not be used in an arrow function's body. A consequence of the latter is that arrow functions cannot be used as generators.
