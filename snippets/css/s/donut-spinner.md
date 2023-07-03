---
title: Donut spinner
type: snippet
language: css
tags: [animation]
cover: digital-nomad-3
dateModified: 2021-10-13T19:29:39+02:00
---

Creates a donut spinner that can be used to indicate the loading of content.

- Use a semi-transparent `border` for the whole element. Exclude one side that will serve as the loading indicator for the donut.
- Define and use an appropriate animation, using `transform: rotate()` to rotate the element.

```html
<div class="donut"></div>
```

```css
@keyframes donut-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.donut {
  display: inline-block;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #7983ff;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: donut-spin 1.2s linear infinite;
}
```
