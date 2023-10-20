---
title: Button grow animation
type: snippet
language: css
tags: [animation]
cover: white-laptop
dateModified: 2021-05-24
---

Creates a grow animation on hover.

- Use an appropriate `transition` to animate changes to the element.
- Use the `:hover` pseudo-class to change the `transform` to `scale(1.1)`, growing the element when the user hovers over it.

```html
<button class="button-grow">Submit</button>
```

```css
.button-grow {
  color: #65b5f6;
  background-color: transparent;
  border: 1px solid #65b5f6;
  border-radius: 4px;
  padding: 0 16px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.button-grow:hover {
  transform: scale(1.1);
}
```
