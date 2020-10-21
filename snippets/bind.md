---
title: bind
tags: function,object,advanced
---

Creates a function that invokes `fn` with a given context, optionally prepending any additional supplied parameters to the arguments.

- Return a `function` that uses `Function.prototype.apply()` to apply the given `context` to `fn`.
- Use the spread operator (`...`) to prepend any additional supplied parameters to the arguments.

```js
const bind = (fn, context, ...boundArgs) => (...args) =>
  fn.apply(context, [...boundArgs, ...args]);
```

```js
function greet(greeting, punctuation) {
  return greeting + ' ' + this.user + punctuation;
}

const freddy = { user: 'fred' };
const freddyBound = bind(greet, freddy);
console.log(freddyBound('hi', '!')); // 'hi fred!'
```
- The language also includes this feature on Function.prototype.bind() with the same results

```js
Function.protoype.bind = (context, ...boundArgs) => (..args) =>
  fn.apply(context, [.. boundArgs, ...args])
```

```js
function greet(greeting, punctuation) {
  return greeting + ' ' + this.user + punctuation;
}

const bob = { user: 'bob' };
const bobBound = greet.bind(bob)
console.log(bobBound('hi', '!')); // 'hi bob!'
```
