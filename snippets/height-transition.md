---
title: Height transition
tags: animation,intermediate
---

Transitions an element's height from `0` to `auto` when its height is unknown.

- Use `transition` to specify that changes to `max-height` should be transitioned over.
- Use `overflow: hidden` to prevent the contents of the hidden element from overflowing its container.
- Use `max-height` to specify an initial height of `0`.
- Use the `:hover` pseudo-class to change the `max-height` to the value of the `--max-height` variable set by JavaScript.
- Use `Element.scrollHeight` and `CSSStyleDeclaration.setProperty()` to set the value of `--max-height` to the current height of the element.
- **Note:** Causes reflow on each animation frame, which will be laggy if there are a large number of elements beneath the element that is transitioning in height.

```html
<div class="trigger">
  Hover me to see a height transition.
  <div class="el">Additional content</div>
</div>
```

```css
.el {
  transition: max-height 0.3s;
  overflow: hidden;
  max-height: 0;
}

.trigger:hover > .el {
  max-height: var(--max-height);
}
```

```js
let el = document.querySelector('.el');
let height = el.scrollHeight;
el.style.setProperty('--max-height', height + 'px');
```
