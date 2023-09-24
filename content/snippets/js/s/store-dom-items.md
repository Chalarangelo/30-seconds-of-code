---
title: "Tip: Minimize DOM access"
shortTitle: Minimize DOM access
type: tip
language: javascript
tags: [browser]
author: chalarangelo
cover: armchair
excerpt: Increase your JavaScript code's performance when working with the DOM by leveraging this simple trick.
dateModified: 2021-06-12
---

DOM operations, including accessing the DOM, are generally slow. This is usually not a problem until you have to perform many DOM operations and your JavaScript application's performance starts to suffer. A very quick trick to increase performance is to store DOM elements or their values in local variables if you plan to access them multiple times.

```js
// This is slow, it accesses the DOM element multiple times
document.querySelector('#my-element').classList.add('my-class');
document.querySelector('#my-element').textContent = 'hello';
document.querySelector('#my-element').hidden = false;

// This is faster, it stores the DOM element in a variable
const myElement = document.querySelector('#my-element');
myElement.classList.add('my-class');
myElement.textContent = 'hello';
myElement.hidden = false;
```

Note that, while this trick may come in handy, it comes with the caveat that if you later remove the DOM element and you still have it stored in a variable, the variable should be set to `null` to avoid potential memory leaks.
