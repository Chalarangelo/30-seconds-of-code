---
title: Understanding JavaScript variables and scopes
shortTitle: Variables and scopes
type: story
tags: [javascript,type,variable]
author: chalarangelo
cover: periscope
excerpt: JavaScript developers often get confused by JavaScript's variables and scope. Here's a quick guide to understanding and remembering everything related to these concepts.
dateModified: 2021-06-12T19:30:41+03:00
---

I have seen many developers - my younger self included - struggle with JavaScript's variables and scopes, even if they have some experience with coding and/or the language itself. While there are dozens of great articles on this subject, I found it somewhat difficult to memorize or understand the way these concepts work when I was starting out, so here's a short and simple breakdown that might help you as much as it helped me.

### Variable definition

JavaScript provides two ways to define a variable (`var` and `let`) and one way to define a constant value (`const`).

`let` and `const` behave the same in terms of scope, both being block scoped (see below). On the other hand, `var` behaves differently by being function scoped (see below), meaning `var` declarations inside a block scope will also be available to the nearest outer function block.

It is generally preferred to use `let` and `const` to avoid confusion when it comes to scoping. However, it is important to note that `var` can be a useful JavaScript feature when used in the correct circumstances.

![Visualization of JavaScript variable scope](./illustrations/js-variable-scope.png)

### Scope

When we talk about scope, we mean the visibility of one or more entities (e.g variables) to certain parts of our code. There are two types of scopes: global and local. Local scope can in turn be separated into block, function and other types of more specific scopes.

**Global scope**: Variables defined globally (i.e. not inside a block or function) are part of the global scope and can be accessed from anywhere in the code. When declared in the global scope, `var`, `let` and `const` behave the same in terms of scope.

**Local scope**: Variables defined inside a block or function can only be accessed from the block or function where they were defined, as well as nested local scopes. When declared inside a block scope, `var` will be available but `undefined` in outer scopes, while `let` and `const` will not exist in outer scopes. When declared inside a function scope, `var`, `let` and `const` will all be non-existent in outer scopes.
