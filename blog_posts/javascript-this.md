---
title: Understanding the "this" keyword in JavaScript
type: story
tags: javascript,function,object
authors: chalarangelo
cover: blog_images/u-got-this.jpg
excerpt: JavaScript's `this` keyword is a source of confusion for many beginners and veterans alike. Learn how it works in different scenarios and start using it correctly.
---

### What is `this`?

In JavaScript, the `this` keyword refers to the object that is currently executing the code. The short version of what `this` evaluates to is as follows:

- By default, `this` refers to the global object.
- In a function, when not in strict mode, `this` refers to the global object.
- In a function, when in strict mode, `this` is `undefined`.
- In an arrow function, `this` retains the value of the enclosing lexical context's `this`.
- In an object method, `this` refers to the object the method was called on.
- In a constructor call, `this` is bound to the new object being constructed.
- In an event handler, `this` is bound to the element on which the listener is placed.

### Global context

In the global execution context, `this` refers to the global object.

```js
console.log(this === window); // true
```

### Function context

When not in strict mode, a function's `this` refers to the global object.

```js
function f() {
  return this;
}

console.log(f() === window); // true
```

When in strict mode, a function's `this` will be `undefined` if not set when entering the execution context.

```js
'use strict';

function f() {
  return this;
}

console.log(f()); // undefined
```

### Object context

When a function is called as a method of an object, `this` refers to the object the method is called on. This applies to methods defined anywhere in the object's prototype chain (i.e. own and inherited methods).

```js
const obj = {
  f: function() {
    return this;
  }
};

const myObj = Object.create(obj);
myObj.foo = 1;

console.log(myObj.f()); // { foo: 1 }
```

Similarly, when used inside a constructor, `this` refers to the object being constructed.

```js
class C {
  constructor() {
    this.x = 10;
  }
}

const obj = new C();
console.log(obj.x); // 10
```

### Arrow function context

In arrow functions, `this` retains the value of the enclosing lexical context's `this`.

```js
const f = () => this;

console.log(f() === window); // true

const obj = {
  foo: function() {
    const baz = () => this;
    return baz();
  },
  bar: () => this
};

console.log(obj.foo()); // { foo, bar }
console.log(obj.bar() === window); // true
```

Notice how in the second example, an arrow function's `this` refers to the global object unless wrapped inside a regular `function` call, whose `this` refers to the object it's called from and its lexical context is retained by the arrow function.

### Event handler context

When used in an event handler, `this` refers to the element on which the listener is placed.

```js
const el = document.getElementById('my-el');

el.addEventListener('click', function() {
  console.log(this === el); // true
});
```

### Binding `this`

Using `Function.prototype.bind()` returns a new function from an existing one, where `this` is permanently bound to the first argument of `bind()`.

```js
function f() {
  return this.foo;
}

var x = f.bind({foo: 'hello'});
console.log(x()); // 'hello'
```

Similarly, using `Function.prototype.call()` or `Function.prototype.apply()` will bind the called function's `this` to the first argument of either of these functions only for this call.

```js
function f() {
  return this.foo;
}

console.log(f.call({foo: 'hi'})); // 'hi'
```
