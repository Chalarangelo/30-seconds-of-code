---
title: Button swing animation
type: snippet
language: css
tags: [animation]
cover: painters-desk
dateModified: 2021-05-24
---

Creates a swing animation on focus.

- Use an appropriate `transition` to animate changes to the element.
- Use the `:focus` pseudo-class to apply an `animation` that uses `transform` to make the element swing.
- Use `animation-iteration-count` to only play the animation once.

```html
<button class="button-swing">Submit</button>
```

```css
.button-swing {
  color: #65b5f6;
  background-color: transparent;
  border: 1px solid #65b5f6;
  border-radius: 4px;
  padding: 0 16px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.button-swing:focus {
  animation: swing 1s ease;
  animation-iteration-count: 1;
}

@keyframes swing {
  15% {
    transform: translateX(5px);
  }
  30% {
    transform: translateX(-5px);
  }
  50% {
    transform: translateX(3px);
  }
  65% {
    transform: translateX(-3px);
  }
  80% {
    transform: translateX(2px);
  }
  100% {
    transform: translateX(0);
  }
}
```
