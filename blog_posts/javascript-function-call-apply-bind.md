---
title: JavaScript function methods - call(), apply() and bind()
shortTitle: Function methods - call(), apply() and bind()
type: story
tags: javascript,function
expertise: intermediate
author: chalarangelo
cover: blog_images/canoe.jpg
excerpt: Learn everything you need to know about JavaScript's `Function.prototype.call()`, `Function.prototype.apply()` and `Function.prototype.bind()` with this short guide.
firstSeen: 2020-11-06T13:37:10+02:00
lastUpdated: 2021-06-12T19:30:41+03:00
---

### Function.prototype.call()

`Function.prototype.call()` is used to call a function with a given `this` context and any arguments provided individually. For example:

```js
function printThisAndData(...data) {
  console.log(this.data, ...data);
}

const obj = { data: 0 };
const data = [1, 2, 3];

printThisAndData.call(obj, data);       // logs: 0 [1, 2, 3]
printThisAndData.call(obj, ...data);    // logs: 0 1 2 3
```

### Function.prototype.apply()

`Function.prototype.apply()` is almost identical to `Function.prototype.call()` in the sense that it calls a function with a given `this` context, however it requires arguments to be provided as an array. For example:

```js
function printThisAndData(...data) {
  console.log(this.data, ...data);
}

const obj = { data: 0 };
const data = [1, 2, 3];

printThisAndData.apply(obj, data);      // logs: 0 1 2 3
printThisAndData.apply(obj, ...data);   // Throws a TypeError
```

### Function.prototype.bind()

`Function.prototype.bind()` is slightly different from the previous two methods. Instead of calling a function with the given `this` context and returning the result, it returns a function with its `this` context bound and any arguments provided individually prepended to the arguments at the time of calling the returned function. For example:

```js
function printThisAndData(...data) {
  console.log(this.data, ...data);
}

const obj = { data: 0 };
const data = [1, 2, 3];

const printObjAndData = printThisAndData.bind(obj);

printObjAndData(data);                  // logs: 0 [1, 2, 3]
printObjAndData(...data);               // logs: 0 1 2 3

const printObjTwoAndData = printThisAndData.bind(obj, 2);

printObjTwoAndData(data);               // logs: 0 2 [1, 2, 3]
printObjTwoAndData(...data);            // logs: 0 2 1 2 3
```
