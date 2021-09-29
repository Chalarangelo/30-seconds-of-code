---
title: hexagon
tags: css, visual
firstSeen: 2021-09-29
---

Create hexagon using pure CSS. There are many ways to do it. One of them is below. 

- First, create a rectangle on the `hexagon` class.
- Then two more using CSS pseudo-elements `before` and `after`. 
- Then change the rotation of `before` and `after`.

```html
<div class='hexagon'></div>
```

```css
body {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hexagon {
  width: 300px;
  height: 175px;
  background-color: #1DA1F2;
  position: relative;
}

.hexagon::before,
.hexagon::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #1DA1F2;
}

.hexagon::before {
  transform: rotate(60deg); 
}

.hexagon::after {
  transform: rotate(-60deg)
}
```