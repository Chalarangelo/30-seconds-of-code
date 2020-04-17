---
title: Gradient border
tags: visual,intermediate
---

Creates a gradient border.

```html
<div class="gradient-border">
  <p>Gradient border!</P>
</div>
```

```css
.gradient-border {
  position: relative;
  border: solid 1px transparent;
  border-radius: 10px;
  background-color: #f7f7fe;
  background-clip: padding-box;
  margin: 8px;
  padding: 8px 16px;
}

.gradient-border:before {
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

- Create a block with a transparent border, relative position and a background.
- Absolute position the `:before` pseudo-element with a gradient background and `z-index: -1`.
- Use `top: 0`, `right: 0`, `bottom: 0`, `left: 0` to make the pseudo-element equal size to its parent element, `margin: -1px` to make it larger.
- Use `background-clip: padding-box` to not draw the parent element's background below the border.

#### Browser support

- https://caniuse.com/#feat=mdn-css_properties_background_background-clip
