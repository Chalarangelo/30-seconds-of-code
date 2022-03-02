---
title: How can I clone an array in JavaScript?
type: question
tags: javascript,array
expertise: beginner
author: chalarangelo
cover: blog_images/colorful-plastic.jpg
excerpt: Pick up a few new tricks which you can use to clone arrays in JavaScript.
firstSeen: 2021-03-15T11:00:00+02:00
lastUpdated: 2021-06-12T19:30:41+03:00
---

JavaScript provides quite a few ways to clone an array, most of which are pretty similar in terms of performance and results. Here's a quick rundown of some of the available options.

#### The spread operator

ES6 introduced the spread operator (`...`), which provides probably the easiest and most common way to create a shallow clone of an array.

```js
let x = [1, 2, 3, 4];
let y = [...x];
```

#### Array.from()

`Array.from()` has a very powerful API that can be used for many different things, including creating a copy of an array.

```js
let x = [1, 2, 3, 4];
let y = Array.from(x);
```

#### Array.prototype.slice()

Similarly to the spread operator, `Array.prototype.slice()` can be used to create a shallow copy of an array.

```js
let x = [1, 2, 3, 4];
let y = x.slice();
```

#### Array.prototype.map()

Looking into one of the more unorthodox options, `Array.prototype.map()` can be used to map each element of an array to itself to create a new array.

```js
let x = [1, 2, 3, 4];
let y = x.map(i => i);
```

#### Array.prototype.filter()

Similarly, `Array.prototype.filter()` can be used to return `true` for each and every element, resulting in a new array with all of the original array's elements.

```js
let x = [1, 2, 3, 4];
let y = x.filter(() => true);
```

#### Object.assign()

Finally, `Object.assign()` can be used in the exact same way as it's used to create a clone of an object, but for an array instead.

```js
let x = [1, 2, 3, 4];
let y = Object.assign([], x);
```
