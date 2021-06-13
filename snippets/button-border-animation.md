---
title: Button border animation
tags: animation,intermediate
firstSeen: 2019-01-21T18:52:46+02:00
lastUpdated: 2021-05-24T15:28:52+03:00
---

Creates a border animation on hover.

- Use the `:before` and `:after` pseudo-elements to create two boxes `24px` wide opposite each other above and below the box.
- Use the `:hover` pseudo-class to extend the `width` of those elements to `100%` on hover and animate the change using `transition`.

```html
<button class="animated-border-button">Submit</button>
```

```css
.animated-border-button {
  background-color: #263059;
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
  border-top: 2px solid #263059;
  right: 0;
  top: -4px;
}

.animated-border-button:after {
  border-bottom: 2px solid #263059;
  bottom: -4px;
  left: 0;
}

.animated-border-button:hover:before,
.animated-border-button:hover:after {
  width: 100%;
}
```
