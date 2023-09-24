---
title: JavaScript function methods - call(), apply() and bind()
shortTitle: Function methods - call(), apply() and bind()
type: story
language: javascript
tags: [function]
author: chalarangelo
cover: canoe
excerpt: Learn everything you need to know about JavaScript's `call()`, `apply()` and `bind()` in this short guide.
dateModified: 2021-06-12
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
