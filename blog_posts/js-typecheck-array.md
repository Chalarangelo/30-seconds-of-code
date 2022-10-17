---
title: "Tip: Typechecking arrays with Array.isArray()"
shortTitle: Array typechecking
type: tip
tags: javascript,type,array
expertise: beginner
author: chalarangelo
cover: blog_images/purple-flower-field.jpg
excerpt: Make sure to use the correct method when checking if a JavaScript object is an array.
firstSeen: 2022-11-06T05:00:00-04:00
---

To determine if a JavaScript object is an array, you can either use `Array.isArray()` or the `instanceof` operator. While both methods work for arrays created either using the array literal syntax or the `Array` constructor, there's a key difference. `Array.isArray()` is more reliable, as it works with cross-realm-objects, such as those created in an `iframe`.

```js
var iframeEl = document.createElement('iframe');
document.body.appendChild(iframeEl);
iframeArray = window.frames[window.frames.length - 1].Array;

var array1 = new Array(1,1,1,1);
var array2 = new iframeArray(1,1,1,1);

console.log(array1 instanceof Array);   // true
console.log(Array.isArray(array1));     // true

console.log(array2 instanceof Array);   // false
console.log(Array.isArray(array2));     // true
```

As illustrated in the previous example, `instanceof` breaks when working with an `iframe`. However, `Array.isArray()` produces the correct result regardless of the way the array was instantiated.

If you are interested in knowing why `instanceof Array` doesn't work across different globals (i.e. `iframe` or `window`), you can read more about it [here](http://web.mit.edu/jwalden/www/isArray.html).
