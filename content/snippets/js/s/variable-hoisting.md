---
title: What is hoisting in JavaScript?
shortTitle: Hoisting introduction
type: question
language: javascript
tags: [type,variable]
cover: boat-port
excerpt: Hoisting comes up a lot during JavaScript interviews. It's a concept that may require some getting used to, so read our guide to learn more.
dateModified: 2023-09-28
---

Before your JavaScript code is executed, it is first parsed and compiled ([just in time compilation/JIT](https://en.wikipedia.org/wiki/Just-in-time_compilation)). During the _compile_ phase, variable and function declarations are put into memory, which is called **hoisting**.

It's essential to note that only declarations are hoisted, while initializations are not. This means that if you declare and initialize a variable after using it, its value will not be initialized. However, this is a simplified explanation, so let's take a look at the various scenarios:

### function

When using `function` declarations, the function can be called before it's defined and it will work as expected. For example:

```js
hello(); // logs 'Hello world!'

function hello() {
  console.log('Hello world!');
}

hello(); // logs 'Hello world!'
```

In the example above the `function` declaration is hoisted to the top of its scope and, due to the nature of function declarations, it's available before it's declared. However, this is the only case that behaves this way.

### var

`var` declarations on the other hand behave differently, returning `undefined` when accessed before initialization. For example:

```js
console.log(x); // logs 'undefined'
f(); // throws 'Uncaught TypeError: f is not a function'

var x = 1;
var f = () => 'Hi!';

console.log(x); // logs '1'
f(); // returns 'Hi!'
```

As you can see in this example, the `var` declarations are hoisted to the top of their scope, but their values are not initialized until the code that initializes them executes, thus being `undefined` up until that point.

### const and let

Finally, `const` and `let` declarations are hoisted, but they are not initialized to `undefined`. Instead, they will give you an error, which is also how `class` declarations behave. For example:

```js
console.log(y); // throws 'Uncaught ReferenceError: Cannot access "y" before initialization'
g();  // throws 'Uncaught ReferenceError: Cannot access "g" before initialization'

let y = 2;
const g = () => 'Hey!';

console.log(y); // logs '2'
f(); // returns 'Hey!'
```

Generally, `const` and `let` provide more of a headache-free experience for a variety of reasons and this is no exception. Where accessing variables declared with `var` before initialization fails silently, doing the same for `const` or `let` results in a clear, easy to debug error.

### Best practices

- Always define variables, functions, objects and classes before using them. ESLint can probably help you with that.
- If your environment/team allows it, prefer `const` and `let`over `var` to minimize headaches.
- If possible, use only arrow functions or `function` declarations. Consistency can help reduce confusion.
- Use [`'use strict'`](/js/s/use-strict) at the beginning of your files to prevent hoisting and enforce stricter code rules.
