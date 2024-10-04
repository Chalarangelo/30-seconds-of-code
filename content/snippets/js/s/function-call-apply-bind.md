---
title: JavaScript function methods - call(), apply() and bind()
shortTitle: Function methods - call, apply, bind
language: javascript
tags: [function]
cover: canoe
excerpt: Learn everything you need to know about JavaScript's `call()`, `apply()` and `bind()` in this short guide.
listed: true
dateModified: 2024-02-20
---

Developers often confuse `Function.prototype.call()`, `Function.prototype.apply()` and `Function.prototype.bind()`. While these three methods are similar, they have different use cases and behaviors. Apart from learning how they work and when to use each one, we'll also look at some practical examples to help you understand them better.

## Function methods

JavaScript functions are **first-class objects**, which means they can be passed around like any other object. They can also have properties and methods, and can be passed as arguments to other functions. The `Function` object has several methods, including `call()`, `apply()` and `bind()`, which are used to set the `this` value and pass arguments to a function.

## Function.prototype.call()

`Function.prototype.call()` is used to call a function with a given `this` context and any arguments provided **individually**. For example:

```js
function printThisAndData(...data) {
  console.log(this.data, ...data);
}

const obj = { data: 0 };
const data = [1, 2, 3];

printThisAndData.call(obj, data);       // logs: 0 [1, 2, 3]
printThisAndData.call(obj, ...data);    // logs: 0 1 2 3
```

## Function.prototype.apply()

`Function.prototype.apply()` is almost identical to `Function.prototype.call()` in the sense that it calls a function with a given `this` context, however it requires arguments to be provided as an **array**. For example:

```js
function printThisAndData(...data) {
  console.log(this.data, ...data);
}

const obj = { data: 0 };
const data = [1, 2, 3];

printThisAndData.apply(obj, data);      // logs: 0 1 2 3
printThisAndData.apply(obj, ...data);   // Throws a TypeError
```

## Function.prototype.bind()

`Function.prototype.bind()` is slightly different from the previous two methods. Instead of calling a function with the given `this` context and returning the result, it returns a function with its `this` context bound and any arguments provided individually **prepended** to the arguments at the time of calling the returned function. For example:

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

## Using function methods in practice

Knowing how these methods work is fine, but where would you use them in real life? Some examples include binding a method to an object, calling a function with a specific context, or calling a function with a specific set of arguments.

### Bind a method to an object

You can use `Function.prototype.apply()` to create a function that invokes the method at a **given key** of an object, optionally prepending any additional supplied parameters to the arguments.

```js
const bindKey = (context, fn, ...boundArgs) => (...args) =>
  context[fn].apply(context, [...boundArgs, ...args]);

const freddy = {
  user: 'fred',
  greet: function(greeting, punctuation) {
    return greeting + ' ' + this.user + punctuation;
  }
};
const freddyBound = bindKey(freddy, 'greet');
console.log(freddyBound('hi', '!')); // 'hi fred!'
```

### Bind all object methods

Similarly, you can bind **all methods** of an object to the object itself, overwriting the existing method. The technique is the same as before, but you need to use `Array.prototype.forEach()` to iterate over the given methods.

```js
const bindAll = (obj, ...fns) =>
  fns.forEach(
    fn => (
      (f = obj[fn]),
      (obj[fn] = function() {
        return f.apply(obj);
      })
    )
  );

let view = {
  label: 'docs',
  click: function() {
    console.log('clicked ' + this.label);
  }
};
bindAll(view, 'click');
document.body.addEventListener('click', view.click);
// Log 'clicked docs' when clicked.
```

### Bind function context

You can also create a function that invokes a given function with a **specific context**, optionally prepending any additional supplied parameters to the arguments. Same as before, use `Function.prototype.apply()` to apply the given context to the function.

```js
const bind = (fn, context, ...boundArgs) => (...args) =>
  fn.apply(context, [...boundArgs, ...args]);

function greet(greeting, punctuation) {
  return greeting + ' ' + this.user + punctuation;
}
const freddy = { user: 'fred' };
const freddyBound = bind(greet, freddy);
console.log(freddyBound('hi', '!')); // 'hi fred!'
```
