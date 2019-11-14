---
title: Hamburger Button
tags: interactivity,beginner
---

This is a way to build simple hamburger button for menu bar.

```html
<button class="hb"></button>
```

```css
.hb,
.hb:before,
.hb:after {
  position: relative;
  width: 30px;
  height: 5px;
  border: none;
  outline: none;
  background-color: #333;
  border-radius: 3px;
  transition: 0.5s;
  cursor: pointer;
}

.hb:before,
.hb:after {
  content: '';
  position: absolute;
  top: -7.5px;
  left: 0;
}

.hb:after {
  top: 7.5px;
}

.hb:hover {
  background-color: transparent;
}

.hb:hover:before,
.hb:hover:after {
  top: 0;
}

.hb:hover::before {
  transform: rotate(45deg);
}

.hb:hover::after {
  transform: rotate(-45deg);
}
```

#### Explanation

- Use a `<button>` element for the middle bar of the hamburger icon.
- Use the `::before` and `::after` pseudo-elements to create the top and bottom bars of the icon.
- Use `position: relative` on the `<button>` and `position: absolute` on the pseudo-elements to place them appropriately.
- Use the `:hover` pseudo-selector to rotate `:before` to `45deg` and `:after` to `-45deg` and hide the center bar using`:background-color` transparent.

#### Browser support
