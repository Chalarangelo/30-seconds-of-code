---
title: Flexbox centering
tags: layout,beginner
---

Horizontally and vertically centers a child element within a parent element using `flexbox`.

```html
<div class="flexbox-centering"><div class="child">Centered content.</div></div>
```

```css
.flexbox-centering {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}
```

#### Explanation

1. `display: flex` creates a flexbox layout.
2. `justify-content: center` centers the child horizontally.
3. `align-items: center` centers the child vertically.

#### Browser support

- https://caniuse.com/#feat=flexbox
