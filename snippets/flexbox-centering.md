---
title: Flexbox centering
tags: layout,beginner
---

Horizontally and vertically centers a child element within a parent element using `flexbox`.

```html
<div class="flexbox-centering">
  <div>Centered content.</div>
</div>
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

- `display: flex` creates a flexbox layout.
- `justify-content: center` centers the child horizontally.
- `align-items: center` centers the child vertically.
