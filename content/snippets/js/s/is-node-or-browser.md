---
title: Check if the current JavaScript environment is Node.js or a browser
shortTitle: Check if Node.js or browser
language: javascript
tags: [browser,node]
cover: cloudy-rock-formation
excerpt: Determine if the current JavaScript environment is Node.js or a browser.
listed: true
dateModified: 2024-01-10
---

It's no secret that **JavaScript environments** are not created equal, with differences in the available APIs, global objects, and even the language itself. This is why it's important to know the current environment in order to avoid errors and unexpected behavior.

## Check if the current environment is Node.js

In order to determine if the current environment is Node.js, we can use the `process` global object that provides information about the current Node.js process. We can check if `process`, `process.versions` and `process.versions.node` are defined.

```js
const isNode = () =>
  typeof process !== 'undefined' &&
  !!process.versions &&
  !!process.versions.node;

isNode(); // true (Node)
isNode(); // false (browser)
```

> [!NOTE]
>
> As I'm not particularly familiar with runtimes such as Deno or Bun, this check might also return `true` in **other server environments**. Make sure to check the documentation of the runtime you're using to see if this is the case.

## Check if the current environment is a browser

Browsers environments, on the other hand, are known to always contain the `window` and `document` global objects. We can use this fact to determine if the current environment is a browser. The preferred way to check for the existence of a global object is to use the `typeof` operator, as it allows us to check for the existence of a global object without throwing a `ReferenceError`.

```js
const isBrowser = () =>
  ![typeof window, typeof document].includes('undefined');

isBrowser(); // true (browser)
isBrowser(); // false (Node)
```

> [!WARNING]
>
> Certain tools or libraries (e.g. DOM testing utilities) **may explicitly define these globals** in Node.js. In this case, the above check will return `true` even though the current environment is Node.js.
