---
title: Validate a number in JavaScript
shortTitle: Validate number
language: javascript
tags: [math]
cover: flower-portrait-9
excerpt: Check if a value can be safely converted to a number in JavaScript.
listed: true
dateModified: 2024-05-17
---

Number validation is probably one of the hardest things to do even for intermediate developers. However, it's a necessary evil, especially when working with **user input**. It's even more so in JavaScript, due to the language's quirks and the fact that it's loosely typed.

While, a simple check that `parseFloat()` produces a sensible **numeric value** might seem enough, it's a little more involved than that. You also need to check for `NaN`, using `Number.isNaN()`, and for `Infinity`, using `Number.isFinite()`.

And, as if that wasn't already enough, you also need to check if the **coercion** of the value to a number is correct, using `Number()` and the loose equality operator (`==`). Putting everything together, you get a pretty robust number validation function.

```js
const validateNumber = n => {
  const num = parseFloat(n);
  return !Number.isNaN(num) && Number.isFinite(num) && Number(n) == n;
}

validateNumber('10'); // true
validateNumber('a'); // false
```
