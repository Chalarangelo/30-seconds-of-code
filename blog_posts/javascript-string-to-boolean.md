---
title: "Tip: Convert a string to a boolean"
shortTitle: String to boolean
type: tip
tags: javascript,string,boolean,type
expertise: beginner
author: chalarangelo
cover: blog_images/two-cities.jpg
excerpt: Have you ever tried to convert the string represenation of a boolean to an actual boolean value? Here's a simple way to do it.
firstSeen: 2022-09-14T05:00:00-04:00
---

Sometimes, one might run into the problem of converting the string representation of a value into the value itself. This is often straightforward, such as with numeric values. However, string representations of boolean values can be a bit trickier.

This issue arises due to fact that any non-empty string is considered truthy in JavaScript. On top of that, strings can have different capitalization or whitespace, making it harder to compare them directly to a constant.

To counteract this, it's often a good idea to use a couple of transformations, namely `String.prototype.toLowerCase()` and `String.prototype.trim()`, to make the string representation of the value more consistent. Additionally, an array of acceptable values might make it easier to perform the conversion in certain cases.

```js
const toBoolean = (value, truthyValues = ['true']) => {
  const normalizedValue = String(value).toLowerCase().trim();
  return truthyValues.includes(normalizedValue);
};

toBoolean('true'); // true
toBoolean('TRUE'); // true
toBoolean('True'); // true
toBoolean('tRue '); // true
toBoolean('false'); // false
toBoolean('FALSE'); // false
toBoolean('False'); // false
toBoolean('fAlse '); // false
toBoolean('YES', ['yes']); // true
toBoolean('no', ['yes']); // false
```
