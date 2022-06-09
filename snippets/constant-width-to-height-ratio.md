---
title: Constant width to height ratio
tags: layout
expertise: beginner
cover: blog_images/clutter.jpg
firstSeen: 2018-02-27T10:45:26+02:00
lastUpdated: 2020-12-30T15:37:37+02:00
---

Ensures that an element with variable `width` will retain a proportionate `height` value.

- Apply `padding-top` on the `:before` pseudo-element, making the `height` of the element equal to a percentage of its `width`.
- The proportion of `height` to `width` can be altered as necessary. For example a `padding-top` of `100%` will create a responsive square (1:1 ratio).

```html
<div class="constant-width-to-height-ratio"></div>
```

```css
.constant-width-to-height-ratio {
  background: #9C27B0;
  width: 50%;
}

.constant-width-to-height-ratio:before {
  content: '';
  padding-top: 100%;
  float: left;
}

.constant-width-to-height-ratio:after {
  content: '';
  display: block;
  clear: both;
}
```
