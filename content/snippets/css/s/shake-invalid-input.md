---
title: Shake input field when invalid, using CSS
shortTitle: Shake on invalid input
language: css
tags: [animation]
cover: perfect-timing
excerpt: Inform your users of invalid input by shaking the input field.
listed: true
dateModified: 2024-08-31
---

One of the most common **feedback** animations is shaking an input field when the user enters invalid data. Luckily, HTML and CSS have just the right tools to help you create this effect.

Starting with the HTML, we'll need to use the [`pattern`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/pattern) attribute to define the **regular expression** which the input's value must match. This will trigger the `:invalid` pseudo-class when the input is invalid.

Then, using `@keyframes`, we can define a **shake animation** that uses the `margin-left` property to move the element back and forth. Finally, we can use the `:invalid` pseudo-class to apply the `animation` to the element, making it shake when the user enters invalid data.

```html
 <input type="text" placeholder="Letters only" pattern="[A-Za-z]*" />
```

```css
input:invalid {
  animation: shake 0.2s ease-in-out 0s 2;
}

@keyframes shake {
  0% {
    margin-left: 0rem;
  }
  25% {
    margin-left: 0.5rem;
  }
  75% {
    margin-left: -0.5rem;
  }
  100% {
    margin-left: 0rem;
  }
}
```

https://codepen.io/chalarangelo/pen/dyxorLK
