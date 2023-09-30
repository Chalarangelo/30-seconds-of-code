---
title: Shake on invalid input
type: snippet
language: css
tags: [animation]
cover: perfect-timing
dateModified: 2022-07-31
---

Creates a shake animation on invalid input.

- Use the `pattern` attribute to define the regular expression which the input's value must match.
- Use `@keyframes` to define a shake animation, using the `margin-left` property.
- Use the `:invalid` pseudo-class to apply an `animation` to make the element shake.

```html
 <input type="text" placeholder="Letters only" pattern="[A-Za-z]*" />
```

```css
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

input:invalid {
  animation: shake 0.2s ease-in-out 0s 2;
  box-shadow: 0 0 0.6rem #ff0000;
}
```
