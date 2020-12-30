---
title: Hover underline animation
tags: animation,advanced
---

Creates an animated underline effect when the text is hovered over.

- Use `display: inline-block` to prevent the underline from spanning the entire parent width rather than just the text content.
- Use the `:after` pseudo-element with a `width` of `100%` and `position: absolute`, placing it below the content.
- Use `transform: scaleX(0)` to initially hide the pseudo-element.
- Use the `:hover` pseudo-class selector to apply `transform: scaleX(1)` and display the pseudo-element on hover.
- Animate `transform` using `transform-origin: left` and an appropriate `transition`.

```html
<p class="hover-underline-animation">Hover this text to see the effect!</p>
```

```css
.hover-underline-animation {
  display: inline-block;
  position: relative;
  color: #0087ca;
}

.hover-underline-animation:after {
  content: '';
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #0087ca;
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}

.hover-underline-animation:hover:after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
```
