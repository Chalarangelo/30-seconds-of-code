---
title: removePrimitive
tags: array,advanced
---

Removes the first encountered primitive in an array.

This code extends the native array prototype using a type safe, ES6 compliant polyfill. If
Array.prototype.removePrimitive already exists the extension won't do anything.

- Checks if Array.prototype.removePrimitive is defined
- Throws a type error (type safe) if Array is undefined or removePrimitive() method is called on anything other than an array
- Uses Array.prototype.includes() and Array.prototype.indexOf() to check if primitive exists
- Handles all primitives
- Leaves the array unchanged if remove is unsuccessful (i.e if passing an object as parameter)
- Calling this method without a parameter will remove the first element that is undefined

Hint: run this code the same place you do prototype extensions or at the top of your globals/helper
file so that this method is guaranteed to exist during runtime (thus preventing race conditions).

```js
if (!Array.prototype.removePrimitive) {
  Array.prototype.removePrimitive = function remove (primitive) {
    if (!this || !Array.isArray(this)) {
      throw new TypeError()
    }
    if (this.includes(primitive) || this.indexOf(primitive) !== -1) {
      this.splice(this.indexOf(primitive), 1)
      return this
    }
  }
}
```

```js
const primitiveArray = ['shizzle', null, undefined, 0, 1, true, false]
const numberArray = [5, 3, 1, 9, 1]
const objectArray = [{ me: 1 }, { you: 'two' }, { us: true }]

// Read the output as consecutive calls to the same array
primitiveArray.removePrimitive('shizzle') // [null, undefined, 0, 1, true, false]
primitiveArray.removePrimitive(0) // [null, undefined, 1, true, false]
primitiveArray.removePrimitive(false) // [null, undefined, 1, true]
primitiveArray.removePrimitive() // [null, 1, true]

numberArray.removePrimitive(1) // [5, 3, 9, 1]
numberArray.removePrimitive(1) // [5, 3, 9]
numberArray.removePrimitive({ hello: 'world' }) // [5, 3, 9]

objectArray.removePrimitive('hello') // [{ me: 1 }, { you: 'two' }, { us: true }]
objectArray.removePrimitive({}) // [{ me: 1 }, { you: 'two' }, { us: true }]
```
