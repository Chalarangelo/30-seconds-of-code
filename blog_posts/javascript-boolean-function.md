---
title: Where and how can I use the Boolean function in JavaScript?
shortTitle: Boolean function use-cases
type: question
tags: javascript,function,type
author: chalarangelo
cover: rocky-lake
excerpt: JavaScript's built-in Boolean function can be very useful for truth-checking data among other things. Learn how to use it and level up your code today.
firstSeen: 2020-09-18T16:28:30+03:00
lastUpdated: 2021-06-12T19:30:41+03:00
---

JavaScript's built-in [`Boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) is one of those things I find myself suggesting in code reviews quite often as of late, so I thought I could share some tips about it with the world.

### Using Boolean for truth-checking

The `Boolean()` function is particularly useful when truth-checking data and probably significantly more readable than the double negation (`!!`) operation:

```js
let x = 'some-value';

// This doesn't look too nice
if (!!x) {
  // ...
}

// This is a lot more readable
if (Boolean(x)) {
  // ...
}
```

As you can see in the example above, it serves the exact same purpose and is pretty straightforward to use. Similarly, as `Boolean()` is itself a function returning a boolean value, you can use it for truth-checking collections, filtering arrays etc.:

```js
const values = [0, 0, 2, 0, 3];
// Use as the callback for Array.prototype.some()
const hasValidValue = values.some(Boolean);
// Use as the callback for Array.prototype.filter()
const nonEmptyValues = values.filter(Boolean);
```

### Handle Boolean objects with care

While the `Boolean()` function is pretty useful, you might run into some issues with the `Boolean` object and the `Boolean` constructor. The `Boolean` object is an object wrapper for a boolean value, but the tricky part is that, as an object, it's always truthy even if the contained value is `false`!

```js
let x = new Boolean(false);

if (x) {
  // This code is executed
}
```

For example, the above code will consider `x` truthy, even if it clearly contains `false` as its value. This might some confusing, but you can easily avoid it if you generally avoid using `Boolean` objects and the `Boolean` constructor, unless you are entirely certain that you need to use it for some reason. I cannot find any scenarios where I would need to use this, to be honest, so it might not be all that common to begin with.
