---
title: What is hoisting in JavaScript?
type: question
tags: javascript,type,variable
authors: chalarangelo
cover: blog_images/javascript-variable-hoisting.jpg
except: One of the most commonly asked JavaScript interview questions is about hoisting. It's also a concept that might require some getting used to, so read our guide to learn more.
---

Before your JavaScript code is executed, it is first parsed and compiled. During the _compile_ phase, variable and function declarations are put into memory, which is called **hoisting**.

Note that only declarations are hoisted, not initializations, meaning that if a variable is declared and initialized after using it, its value will not be initialized. This is an oversimplificatin of the situation, so let's take a look at the different cases:

**function**

When using `function` declarations, the function can be called before it's defined and it will work as expected. For example:

```js
hello(); // logs 'Hello world!'

function hello() {
  console.log('Hello world!');
}

hello(); // logs 'Hello world!'
```

In the example above the `function` declaration is hoisted to the top of its scope and, due to the nature of function declarations, it's available before it's declared. However, this is the only case that behaves this way.

**var**

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

**const and let**

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

**Best practices**

- Always define variables, functions, objects and classes before using them. ESLint can probably help you with that.
- If your environment/team allows it, prefer `const` and `let`over `var` to minimize headaches.
- If possible, use only arrow functions or `function` declarations. Consistency can help reduce confusion.

**Image credit:** [Drew Dau](https://unsplash.com/@daunation?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/code?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
