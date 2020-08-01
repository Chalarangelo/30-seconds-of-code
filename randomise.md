---
title: Random argument
tags: function,greet,decoration,beginner-friendly
---

returns one of the arguments passed to function randomly.

```js
function randomise() {
  var n = arguments.length;
  const index = Math.floor(Math.random() * n);
  return arguments[index]
} ;//returns a random argument
```
USAGE EXAMPLE
```js
randomise("hi","Hello","greetings","welcome")//returns hi  or hello ....
```
