---
title: Stripes background pattern
tags: visual,beginner
firstSeen: 2021-01-11T09:51:43+02:00
lastUpdated: 2021-01-11T09:51:43+02:00
---

Creates a stripes background pattern.

- Use `background-color` to set a white background.
- Use `background-image` with a `radial-gradient()` value to create a vertical stripe.
- Use `background-size` to specify the pattern's size.
- **Note:** The fixed `height` and `width` of the element is for demonstration purposes only.

```html
<div class="stripes"></div>
```

```css
.stripes {
  width: 240px;
  height: 240px;
  background-color: #fff;
  background-image: linear-gradient(90deg, transparent 50%, #000 50%);
  background-size: 60px 60px;
  background-repeat: repeat;
}
```
