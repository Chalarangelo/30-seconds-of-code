---
title: Flexbox centering
tags: layout
expertise: beginner
firstSeen: 2018-03-03T11:57:27+02:00
lastUpdated: 2020-12-30T15:37:37+02:00
---

Horizontally and vertically centers a child element within a parent element using flexbox.

- Use `display: flex` to create a flexbox layout.
- Use `justify-content: center` to center the child horizontally.
- Use `align-items: center` to center the child vertically.

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
