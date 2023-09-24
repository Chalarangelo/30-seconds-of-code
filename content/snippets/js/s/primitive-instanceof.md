---
title: Is there a way to use instanceof for primitive JavaScript values?
shortTitle: Using instanceof for primitive values
type: question
language: javascript
tags: [type]
author: chalarangelo
cover: wooden-bowl
excerpt: JavaScript's `instanceof` operator can't be used with primitive values, but there are a some tricks that you can leverage to your advantage.
dateModified: 2021-06-12
---

JavaScript provides two operators for typechecking:

- `typeof` is used to typecheck for primitive values
- `instanceof` is used to typecheck for class instances

Primitive values can't leverage the `instanceof` operator, which is a bit of a letdown. To make matters worse, JavaScript's built-in objects such as `Boolean`, `String` and `Number` can only be used with `instanceof` to check for instances created using the corresponding constructor. Moreover, `typeof` has a few quirks that further complicate matters, such as `typeof null` returning `'object'`.

Yet, there's still hope to use `instanceof` for primitive values. [`Symbol.hasInstance`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/hasInstance) allows us to customize the behavior of the `instanceof` operator. But, in order to do that, we need to define a `class` for each primitive type. Here's what this looks like:

```js
class PrimitiveNumber {
  static [Symbol.hasInstance] = x  => typeof x === 'number';
}
123 instanceof PrimitiveNumber; // true

class PrimitiveString {
  static [Symbol.hasInstance] = x => typeof x === 'string';
}
'abc' instanceof PrimitiveString; // true

class PrimitiveBoolean {
  static [Symbol.hasInstance] = x => typeof x === 'boolean';
}
false instanceof PrimitiveBoolean; // true

class PrimitiveSymbol {
  static [Symbol.hasInstance] = x => typeof x === 'symbol';
}
Symbol.iterator instanceof PrimitiveSymbol; // true

class PrimitiveNull {
  static [Symbol.hasInstance] = x => x === null;
}
null instanceof PrimitiveNull; // true

class PrimitiveUndefined {
  static [Symbol.hasInstance] = x => x === undefined;
}
undefined instanceof PrimitiveUndefined; // true
```
