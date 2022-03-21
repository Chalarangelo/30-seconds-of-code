---
title: What are the differences between var, let and const in JavaScript?
shortTitle: Var, let and const
type: question
tags: javascript,type,variable
expertise: beginner
author: chalarangelo
cover: blog_images/highlands.jpg
excerpt: JavaScript variables can be declared a handful of ways. However, they're not all created equal and understanding their differences can drastically change the way you code.
firstSeen: 2021-09-19T05:00:00-04:00
lastUpdated: 2021-12-02T09:50:42-04:00
---

JavaScript has three variable declaration statements: `var`, `let` and `const`. The latter two were added in ES6, whereas `var` existed since previous versions. One of the first things to notice is that `const` defines constants (i.e. values that will not be reassigned), whereas `var` and `let` define variables. Yet, `var` behaves differently from both `let` and `const` in various other ways.

### Scope

Variables declared with `var` are function scoped, in contrast to variables declared with `let` or `const` which are block scoped.

```js
const scopeExample = () => {
  var a = 'var';
  let b = 'let';
  console.log(a, b); // 'var', 'let'

  {
    var c = 'var';
    let d = 'let';
    console.log(c, d); // 'var', 'let'
  }

  console.log(c); // 'var'
  console.log(d); // Throws a ReferenceError
};
```

If you want to learn more, we have [an article covering JavaScript variables and scopes in more depth](/articles/s/javascript-variable-scope).

### Hoisting

While variables declared with `var` are hoisted to the enclosing scope, variables declared with `let` or `const` are not initialized until their definition is evaluated.

```js
const hoistingExample = () => {
  console.log(a); // undefined
  var a = 'var';
  console.log(a); // 'var'

  console.log(b); // ReferenceError
  let b = 'let';
  console.log(b); // 'let'
};
```

If you want to learn more, we have [an article covering JavaScript hoisting in more depth](/articles/s/javascript-variable-hoisting).

### Global object property

At the top level, variables declared with `var`, unlike ones declared with `let` or `const`, create a property on the global object.

```js
var a = 'var';
let b = 'let';

console.log(window.a); // 'var'
console.log(window.b); // undefined
```

### Redeclaration

In strict mode, variables declared with `var` can be re-declared in the same scope, whereas this is not allowed for variables declared with `let` or `const`.

```js
'use strict';
var a = 'var1';
var a = 'var2';

let b = 'let1';
let b = 'let2'; // SyntaxError
```

If you want to learn more, we have [an article covering JavaScript's strict mode in more depth](/articles/s/javascript-use-strict).
