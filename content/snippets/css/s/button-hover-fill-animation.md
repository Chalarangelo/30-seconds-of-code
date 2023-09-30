---
title: Button fill animation
type: snippet
language: css
tags: [animation]
cover: beach-pineapple
dateModified: 2021-04-02
---

Creates a fill animation on hover.

- Set a `color` and `background` and use an appropriate `transition` to animate changes to the element.
- Use the `:hover` pseudo-class to change the `background` and `color` of the element when the user hovers over it.

```html
<button class="animated-fill-button">Submit</button>
```

```css
.animated-fill-button {
  padding: 20px;
  background: #fff;
  color: #000;
  border: 1px solid #000;
  cursor: pointer;
  transition: 0.3s all ease-in-out;
}

.animated-fill-button:hover {
  background: #000;
  color: #fff;
}
```
