---
title: Mouse cursor gradient tracking
language: css
tags: [visual,interactivity]
cover: tram-car
excerpt: Create a hover effect where the gradient follows the mouse cursor, with CSS and a little bit of JavaScript.
listed: true
dateModified: 2024-08-23
---

Cursor tracking effects are cool, but they're generally tricky to implement. Luckily, [CSS custom properties](/css/s/variables) make implementation much easier, especially when combined with some simple JavaScript for DOM manipulation.

## HTML structure

For this example, we'll use a `<button>` element with a `<span>` child. The `<span>` will contain the **text** that will be hovered over. The `<span>` is necessary, as we will be applying the gradient to the button's `::before` **pseudo-element**. Without the `<span>`, the gradient would be applied on top of the button's text, making it hard to read.

```html
<button class="mouse-cursor-gradient-tracking">
  <span>Hover me</span>
</button>
```

## The gradient's CSS

As mentioned previously, we'll use the `::before` pseudo-element to create the gradient. For this to work, we'll have to use `position: absolute` on the pseudo-element, which means the `<button>` itself needs to have `position: relative`.

We'll also need to declare two **CSS variables**, `--x` and `--y`, to track the position of the mouse on the button. We'll make sure to update these with JavaScript a little bit later.

Finally, we'll use a third CSS variable, `--size`, to modify the gradient's dimensions. This variable, will start at `0`, and will be updated to `200px` when the button is hovered over.

```css
.mouse-cursor-gradient-tracking {
  position: relative;
  background: #7983ff;
  overflow: hidden;
}

.mouse-cursor-gradient-tracking span {
  position: relative;
  pointer-events: none;
}

.mouse-cursor-gradient-tracking::before {
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

.mouse-cursor-gradient-tracking:hover::before {
  --size: 200px;
}
```

## Tracking the mouse with JavaScript

Tracking the mouse is relatively simple. We'll first use `Document.querySelector()` to select the button, and then use `EventTarget.addEventListener()` to register a handler for the `'mousemove'` event.

Every time the **listener is triggered**, we'll use `Element.getBoundingClientRect()` to get the button's position on the screen, and then use `CSSStyleDeclaration.setProperty()` to update the values of the `--x` and `--y` CSS variables.

When these two values change, **the gradient will update its position**, making it look like it's following the mouse cursor.

```js
const btn = document.querySelector('.mouse-cursor-gradient-tracking');

btn.addEventListener('mousemove', e => {
  const rect = e.target.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  btn.style.setProperty('--x', x + 'px');
  btn.style.setProperty('--y', y + 'px');
});
```

Putting everything together gives us a nice hover effect where the gradient follows the mouse cursor. You can see the final result in the CodePen below:

https://codepen.io/chalarangelo/pen/MWMdMaX
