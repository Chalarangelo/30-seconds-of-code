---
title: What does a JavaScript constructor return?
shortTitle: Constructor return value
type: question
tags: javascript,function,class,object
expertise: intermediate
author: chalarangelo
cover: blog_images/architectural.jpg
excerpt: The constructor is arguably the most crucial part of any JavaScript class, which is why you might want to take a closer look at what they return.
firstSeen: 2020-09-30T19:35:32+03:00
lastUpdated: 2021-06-12T19:30:41+03:00
---

The `constructor` method is a special method of a class for creating and initializing an object of that class. However, there is a little bit of magic involved around it, especially when it comes to its return value. This magic is nothing really complicated, but it seems to often confuse developers.

Typically, when your constructor is invoked with `new`, an object is created, its constructor is assigned to the invoked constructor and the object is then assigned to `this` before executing any operations specified in your constructor method. Once the code is executed, the constructor will return:

- Any valid `return` value, valid being only `object` values.
- The `this` object if there is no `return` statement executed with a valid value.

Let's look at some examples to better understand what's going on:

```js
class SimpleClass {
  constructor() {
    this.val = 0;
  }
}
new SimpleClass(); // { val: 0 }

class MyClass {
  constructor() {
    this.val = 0;
    return { a: 1, b: 2 };
  }
}
new MyClass(); // { a: 1, b : 2 }
```

The first example above shows the default behavior of a constructor, returning its `this` object if nothing else is specified. And the second one shows how a constructor can return an object different from `this`, using `return`. Note here that the use-case for such a constructor is usually a class which is implemented as a singleton or manages the number of its instances or similar.

```js
class VerboseClass {
  constructor() {
    this.val = 0;
    return this;
  }
}
new VerboseClass(); // { val: 0 }

class PrimClass {
  constructor() {
    this.val = 0;
    return 20;
  }
}
new PrimitiveClass();  // { val: 0 }
```

The two examples above are not optimal, each for a different reason. The first one is too verbose, as the `this` object is returned implicitly by the constructor anyways, so there is no reason to explicitly write `return this`. On the other hand, the second example doesn't return the `return` statement's value, as it isn't an `object`, therefore resulting in the constructor returning the `this` object instead. This might lead to a lot of confusion, so you should definitely avoid it.
