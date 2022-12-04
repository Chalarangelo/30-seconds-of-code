---
title: Circle
tags: visual
cover: blog_images/oven-paddle.jpg
firstSeen: 2018-03-04T08:19:52+02:00
lastUpdated: 2020-12-30T15:37:37+02:00
---

Creates a circular shape with pure CSS.

- Use `border-radius: 50%` to curve the borders of the element to create a circle.
- Since a circle has the same radius at any given point, the `width` and `height` must be the same. Differing values will create an ellipse.

```html
<div class="circle"></div>
```

```css
.circle {
  border-radius: 50%;
  width: 32px;
  height: 32px;
  background: #9C27B0;
}
```
