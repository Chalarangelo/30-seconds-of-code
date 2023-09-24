---
title: Staggered animation
type: snippet
language: css
tags: [animation]
cover: aerial-view-port
dateModified: 2021-10-11
---

Creates a staggered animation for the elements of a list.

- Set `opacity: 0` and `transform: translateX(100%)` to make list elements transparent and move them all the way to the right.
- Specify the same `transition` properties for list elements, except `transition-delay`.
- Use inline styles to specify a value for `--i` for each list element. This will in turn be used for `transition-delay` to create the stagger effect.
- Use the `:checked` pseudo-class selector for the checkbox to style list elements. Set `opacity` to `1` and `transform` to `translateX(0)` to make them appear and slide into view.

```html
<div class="container">
  <input type="checkbox" name="menu" id="menu" class="menu-toggler">
  <label for="menu" class="menu-toggler-label">Menu</label>
  <ul class="stagger-menu">
    <li style="--i: 0">Home</li>
    <li style="--i: 1">Pricing</li>
    <li style="--i: 2">Account</li>
    <li style="--i: 3">Support</li>
    <li style="--i: 4">About</li>
  </ul>
</div>
```

```css
.container {
  overflow-x: hidden;
  width: 100%;
}

.menu-toggler {
  display: none;
}

.menu-toggler-label {
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
}

.stagger-menu {
  list-style-type: none;
  margin: 16px 0;
  padding: 0;
}

.stagger-menu li {
  margin-bottom: 8px;
  font-size: 18px;
  opacity: 0;
  transform: translateX(100%);
  transition-property: opacity, transform;
  transition-duration: 0.3s;
  transition-timing-function: cubic-bezier(0.750, -0.015, 0.565, 1.055);
}

.menu-toggler:checked ~ .stagger-menu li {
  opacity: 1;
  transform: translateX(0);
  transition-delay: calc(0.055s * var(--i));
}
```
