---
title: How can I implement a singleton in JavaScript?
shortTitle: Singleton implementation
type: question
tags: javascript,object,function,proxy,pattern
expertise: advanced
author: chalarangelo
cover: blog_images/obelisk.jpg
excerpt: Learn how to implement the singleton design pattern in JavaScript, using the Proxy object.
firstSeen: 2020-02-25T16:02:03+02:00
lastUpdated: 2021-09-28T20:11:55+03:00
---

A singleton is an object-oriented software design pattern which ensures a given class is only ever instantiated once. It can be useful in many different situations, such as creating global objects shared across an application. While JavaScript supports object-oriented programming, it doesn't provide many simple options to implement this pattern.

The most flexible, albeit somewhat advanced, approach involves using the [Proxy object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy). The Proxy object is used to define so-called traps. Traps are methods that allow the definition of custom behavior for certain operations such as property lookup, assignment etc. The singleton pattern dictates that the given class can only have one instance. This means that the most useful trap is `handler.construct()`, the trap for the `new` operator.

Turns out the `handler` is itself just an object. Apart from `handler.constructor()`, we can use the handler to store the unique instance of the class we want and if it has been instantiated. In doing so, we can create a handler object that can be reused for any class we want to convert into a singleton, while also allowing us to provide additional traps for any other operations we might want to customize.

Here's the most basic version of a function that takes a `class` and converts it into a singleton, based on the above explanation:

```js
const singletonify = (className) => {
  return new Proxy(className.prototype.constructor, {
    instance: null,
    construct: (target, argumentsList) => {
      if (!this.instance)
        this.instance = new target(...argumentsList);
      return this.instance;
    }
  });
}
```

And here is a simple practical example to better understand what it does:

```js
class MyClass {
  constructor(msg) {
    this.msg = msg;
  }

  printMsg() {
    console.log(this.msg);
  }
}

MySingletonClass = singletonify(MyClass);

const myObj = new MySingletonClass('first');
myObj.printMsg();           // 'first'
const myObj2 = new MySingletonClass('second');
myObj2.printMsg();           // 'first'
```

In the above example, you can see that the second time `MySingletonClass` is instantiated, nothing happens. This is due to the fact that an instance already exists, so it is returned instead of a new object being created. As mentioned, this is a bare-bones implementation of a `singletonify` function. It can be extended to modify the behavior further or use some of the data passed to the constructor in later calls to update the `instance` it holds.
