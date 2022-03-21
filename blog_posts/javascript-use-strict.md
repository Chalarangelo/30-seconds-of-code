---
title: What does 'use strict' do and what are some of the key benefits to using it?
shortTitle: Strict mode introduction
type: question
tags: javascript,function,object
expertise: intermediate
author: chalarangelo
cover: blog_images/palm-tree-house.jpg
excerpt: JavaScript's strict mode can make your code faster, cleaner and more secure.
firstSeen: 2021-11-28T05:00:00-04:00
---

Strict mode can be applied to entire scripts or individual functions by including `'use strict'` before any other statements.

```js
// script.js
'use strict';
const x = "Hello from a strict mode script";

// other.js
function strict() {
  'use strict';
  const x = 'Hello from a strict mode function';
}
```

This enforces more strict parsing and error handling of JavaScript code, as described below.

### No accidental global variables

Strict mode makes it impossible to accidentally create global variables due to mistyped variable names. Assignments, which would accidentally create global variables, instead throw an error in strict mode:

```js
'use strict';
myVariable = 42;
// The above line will throw a ReferenceError, assuming no global
// variable named myVariable has been declared previously
```

### Elimination of silent errors

Strict mode changes some previously-accepted mistakes into errors. These include:

- Assignments which would otherwise silently fail
- Deleting undeletable properties or plain names
- Duplicated names in function arguments
- 0-prefixed octal literals
- Setting properties on primitives

```js
'use strict';

let undefined = 5; // TypeError (non-writable global)
let obj = {};
Object.defineProperty(obj1, 'x', { value: 1, writable: false });
obj.x = 2; // TypeError (non-writable property);

delete Object.prototype; // TypeError (undeletable property)
delete something; // SyntaxError (plain name)

const sum (a, b, b) { // SyntaxError (duplicated argument name)
  return a + b + b;
}

const x = 012; // SyntaxError (0-prefixed octal literal)

false.true = 10; // TypeError (property on primitive)
```

### Simplified `eval`

Strict mode makes `eval` more transparent by preventing the introduction of new variables in the surrounding scope. In strict mode, `eval` creates variables only for the code being evaluated.

```js
'use strict';
let x = 1;
eval('let x = 3; console.log(x);'); // LOGS: 3
console.log(x); // LOGS: 1
```

### Simplified `arguments`

Strict mode simplifies `arguments`, by removing some of their side effects. `arguments` aren't aliased, thus they always refer to the original arguments when the function was invoked. Moreover, `arguments.callee` and `arguments.caller` are no longer supported.

```js
'use strict';
function f(x) {
  x = 5;
  return x === arguments[0];
}

f(10); // false
```

### No `this` boxing

Strict mode makes JavaScript more secure, by restricting access the global object via `this`. In strict mode, `this` is not boxed (forced into being an object), meaning that if unspecified it will be `undefined` instead of the global object.

```js
'use strict';
function f() {
  return this;
}

f(); // undefined
```

### Other changes

Strict mode implements a few more, less commonly-mentioned changes. These include:

- `with` is prohibited, resulting in an error if used
- `Function.prototype.arguments` and `Function.prototype.caller` are non-deletable properties which throw when set or retrieved
- `implements`, `interface`, `let`, `package`, `private`, `protected`, `public`, `static`, and `yield` are reserved keywords
- Function statements are only allowed at the top level of a script of function
