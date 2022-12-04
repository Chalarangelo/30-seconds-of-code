---
title: Is JavaScript pass-by-value or pass-by-reference?
shortTitle: Pass-by-value or pass-by-reference
type: question
tags: javascript,function,object
author: chalarangelo
cover: blog_images/baloons-field.jpg
excerpt: How JavaScript handles passing data is a source of confusion and bugs for many developers, especially when it comes to object types.
firstSeen: 2021-12-05T05:00:00-04:00
---

JavaScript is always **pass-by-value**. This means everything in JavaScript is a value type and function arguments are always passed by value. That being said, object types are a bit more confusing.

The confusion lies in the fact that **object types are reference types** which are passed by value. As weird as this sounds, a reference to an object is passed to a function by value. The subtle difference here lies in the fact that an object reference passed by value is not the same as passing an object by reference.

Simply put, changes to the object inside the function will affect the original object, as they both refer to the same object. However, reassigning the value of the variable holding the object originally will not affect the object referenced by the function. Let me demonstrate this with an example:

```js
let myObj = { a: 1 };
const myFunc = obj => {
  obj.a++;
  return obj;
}
let otherObj = myFunc(myObj);

myObj;                  // { a: 2 }
otherObj;               // { a: 2 }
myObj === otherObj;     // true

myObj = { a: 4, b: 0 };

myObj;                  // { a: 4, b: 0 }
otherObj;               // { a: 2 }
myObj === otherObj;     // false
```

In this example, `myObj` is a plain JavaScript object, passed as an argument to `myFunc`. The `obj` argument inside `myFunc` is a reference to the same object, `myObj`. Any changes made to `obj` affect `myObj`, as they are the exact same object. This means that assigning the result (`obj`) of the function call to another variable, `otherObj`, will pass the same reference to the variable. The result is that both `myObj` and `otherObj` reference the same object value.

Reassigning `myObj` to a new object value does not affect `otherObj` at all. `otherObj` still references the original object. If JavaScript was pass-by-reference, reassigning `myObj` would affect `otherObj`, which is clearly not the case.
