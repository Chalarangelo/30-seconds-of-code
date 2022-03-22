---
title: Image text overlay
tags: visual
expertise: beginner
author: chalarangelo
firstSeen: 2020-08-18T15:07:32+03:00
lastUpdated: 2021-10-13T19:29:39+02:00
---

Displays a text on top of an image using an overlay.

- Use `backdrop-filter` to apply a `blur(14px)` and `brightness(80%)` effect. This makes text readable regardless of background image and color.

```html
<div>
  <h3 class="text-overlay">Hello, World</h3>
  <img src="https://picsum.photos/id/1050/1200/800">
</div>
```

```css
div {
  position: relative;
}

.text-overlay {
  position: absolute;
  top: 0;
  left: 0;
  padding: 1rem;
  font-size: 2rem;
  font-weight: 300;
  color: white;
  backdrop-filter: blur(14px) brightness(80%);
}
```
