---
title: Hamburger Button
tags: interactivity,intermediate
---

Displays a hamburger menu which transitions to a cross button on hover.

- Use a `.hamburger-menu` container `div` which contains the top, bottom, and middle bars.
- Set the container to `display: flex` with `flex-flow: column wrap`.
- Add distance between the bars using `justify-content: space-between`.
- Use `transform: rotate()` to rotate the top and bottom bars by 45 degrees and `opacity: 0` to fade the middle bar on hover.
- Use `transform-origin: left` so that the bars rotate around the left point.

```html
<div class="hamburger-menu">
  <div class="bar top"></div>
  <div class="bar middle"></div>
  <div class="bar bottom"></div>
</div>
```

```css
.hamburger-menu {
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
  height: 2.5rem;
  width: 2.5rem;
  cursor: pointer;
}

.hamburger-menu .bar {
  height: 5px;
  background: black;
  border-radius: 5px;
  margin: 3px 0px;
  transform-origin: left;
  transition: all 0.5s;
}

.hamburger-menu:hover .top {
  transform: rotate(45deg);
}

.hamburger-menu:hover .middle {
  opacity: 0;
}

.hamburger-menu:hover .bottom {
  transform: rotate(-45deg);
}
```
