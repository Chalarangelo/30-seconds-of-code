---
title: Popout menu
tags: interactivity,intermediate
---

Reveals an interactive popout menu on hover/focus.

- Use `left: 100%` to move the popout menu to the right of the parent.
- Use `visibility: hidden` to hide the popout menu initially, allowing for transitions to be applied (unlike `display: none`).
- Use the `:hover`, `:focus` and `:focus-within` pseudo-class selectors to apply `visibility: visible` to the popout menu, displaying it when the parent element is hovered/focused.

```html
<div class="reference" tabindex="0">
  <div class="popout-menu">Popout menu</div>
</div>
```

```css
.reference {
  position: relative;
  background: tomato;
  width: 100px;
  height: 80px;
}

.popout-menu {
  position: absolute;
  visibility: hidden;
  left: 100%;
  background: #9C27B0;
  color: white;
  padding: 16px;
}

.reference:hover > .popout-menu,
.reference:focus > .popout-menu,
.reference:focus-within > .popout-menu {
  visibility: visible;
}
```
