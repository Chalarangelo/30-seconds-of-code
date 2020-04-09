---
title: Gradient border with radius
tags: visual,intermediate
---

Makes a gradient border with radius.

```html
<div class="gradient-border"></div>
```

```css
.gradient-border {
  width: 300px;
  height: 300px;
  position: relative;
  border: solid 1px transparent;
  border-radius: 10px;
  background-color: #f7f7fe;
  background-clip: padding-box;
}
.gradient-border::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  margin: -1px;
  border-radius: inherit;
  background: linear-gradient(to bottom, #d3e7ec, #fff);
}
```

#### Explanation

- Create a block with a transparent border, relative position and some background.
- Make a absolutely positioned substrate with `::before` pseudo-element with gradient background and `z-index: -1`.
- Use `top: 0`, `right: 0`, `bottom: 0`, `left: 0` to make the substrate equal to block.
- Negate the substrate height and width using `margin: -1px` to make substrate bigger then block.
- Use `background-clip: padding-box` to not draw block's background below the border.

#### Browser support

- https://caniuse.com/#feat=mdn-css_properties_background_background-clip
