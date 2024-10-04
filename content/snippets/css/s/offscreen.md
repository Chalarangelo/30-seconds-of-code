---
title: Hide element offscreen
shortTitle: Offscreen
language: css
tags: [layout,visual]
cover: succulent-2
excerpt: Hide an element completely (visually and positionally) in the DOM while still allowing it to be accessible.
listed: true
dateModified: 2024-09-02
---

Hiding an element with `display: none` comes with the drawback of making it inaccessible to screen readers. On the other hand, **hiding an element offscreen** allows you to keep it **accessible** while removing it from the visual and positional flow of the page. This is useful for elements that are not meant to be seen but are still required for accessibility purposes (e.g. skip links).

In order to achieve this, you will need to create your own **utility class** that will hide the element offscreen. This class will remove any `border` and `padding`, hide the element's `overflow`, and make the `height` and `width` of the element `1px` while negating them using `margin`. The element will also be positioned absolutely so that it does not take up space in the DOM.

> [!TIP]
>
> This technique provides an **accessible** and layout-friendly alternative to `display: none` (not readable by screen readers) and `visibility: hidden` (takes up physical space in the DOM).

```html
<a class="button" href="https://google.com">
  Learn More <span class="offscreen"> about pants</span>
</a>
```

```css
.offscreen {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}
```
