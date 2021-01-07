---
title: Mouse cursor gradient tracking
tags: visual,interactivity,advanced
---

A hover effect where the gradient follows the mouse cursor.

- Declare two CSS variables, `--x` and `--y`, used to track the position of the mouse on the button.
- Declare a CSS variable, `--size`, used to modify the gradient's dimensions.
- Use `background: radial-gradient(circle closest-side, pink, transparent);` to create the gradient at the correct position.
- Use `Document.querySelector()` and `EventTarget.addEventListener()` to register a handler for the `'mousemove'` event.
- Use `Element.getBoundingClientRect()` and `CSSStyleDeclaration.setProperty()` to update the values of the `--x` and `--y` CSS variables.

```html
<button class="mouse-cursor-gradient-tracking">
  <span>Hover me</span>
</button>
```

```css
.mouse-cursor-gradient-tracking {
  position: relative;
  background: #7983ff;
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  border: none;
  color: white;
  cursor: pointer;
  outline: none;
  overflow: hidden;
}

.mouse-cursor-gradient-tracking span {
  position: relative;
}

.mouse-cursor-gradient-tracking:before {
  --size: 0;
  content: '';
  position: absolute;
  left: var(--x);
  top: var(--y);
  width: var(--size);
  height: var(--size);
  background: radial-gradient(circle closest-side, pink, transparent);
  transform: translate(-50%, -50%);
  transition: width 0.2s ease, height 0.2s ease;
}

.mouse-cursor-gradient-tracking:hover:before {
  --size: 200px;
}
```

```js
let btn = document.querySelector('.mouse-cursor-gradient-tracking');
btn.addEventListener('mousemove', e => {
  let rect = e.target.getBoundingClientRect();
  let x = e.clientX - rect.left;
  let y = e.clientY - rect.top;
  btn.style.setProperty('--x', x + 'px');
  btn.style.setProperty('--y', y + 'px');
});
```
