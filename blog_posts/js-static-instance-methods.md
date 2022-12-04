---
title: What is the difference between static and instance methods?
shortTitle: Static  Instance Methods
type: question
tags: javascript,object,function,class
author: chalarangelo
cover: blog_images/lake-runner.jpg
excerpt: Static and instance methods are pretty easy to distinguish and serve different purposes. Learn all about them in this article.
firstSeen: 2022-01-30T05:00:00-04:00
---

Static methods belong to a class and don’t act on its instances. This means that they can’t be called on instances of the class. Instead, they're called on the class itself. They are often utility functions, such as functions to create or clone objects.

Instance methods belong to the class prototype, which is inherited by all instances of the class. As such, they act on class instances and can be called on them.

```jsx
const arr = [1, 2, 3];  // An Array instance

Array.isArray(arr);     // Static method of Array
arr.push(4);            // Instance method of Array
```

In the context of ES6 classes, the `static` keyword is used to define static methods for a class. Conversely, methods not defined as `static` are instance methods.
