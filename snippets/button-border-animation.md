---
title: Button border animation
tags: animation,intermediate
---

Creates a border animation on hover.

- Use the `:before` and `:after` pseudo-elements to create two boxes `24px` wide opposite each other above and below the box.
- Use the `:hover` pseudo-class to extend the `width` of those elements to `100%` on hover and animate the change using `transition`.

```html
<button class="animated-border-button">Submit</button>
```

```css
.animated-border-button {
  background-color: #141414;
  border: none;
  color: #ffffff;
  outline: none;
  padding: 12px 40px 10px;
  position: relative;
}

.animated-border-button:before,
.animated-border-button:after {
  border: 0 solid transparent;
  transition: all 0.3s;
  content: '';
  height: 0;
  position: absolute;
  width: 24px;
}

.animated-border-button:before {
  border-top: 2px solid #141414;
  right: 0;
  top: -4px;
}

.animated-border-button:after {
  border-bottom: 2px solid #141414;
  bottom: -4px;
  left: 0;
}

.animated-border-button:hover:before,
.animated-border-button:hover:after {
  width: 100%;
}
```
