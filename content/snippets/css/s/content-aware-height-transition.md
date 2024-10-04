---
title: Content-aware height transition
language: css
tags: [animation]
cover: washed-ashore
excerpt: Dynamically transition an element's height, based on its content.
listed: true
dateModified: 2024-08-24
---

As you may be aware, the `height` property cannot be transitioned from `0` to `auto` directly. Instead, we usually rely on `max-height` to transition an element's height from `0` to a known value. However, when **the height of the element is unknown**, we can use a combination of JavaScript and CSS variables to transition the height from `0` to `auto`.

The trick here is to leverage [CSS custom properties](/css/s/variables) to alter the `max-height`. Then, using JavaScript, we can change the value of the custom property to the actual **height of the element's content**.

So, how do we do that, exactly? Provided we've defined a `--max-height` CSS variable with, we can use `Element.scrollHeight` and `CSSStyleDeclaration.setProperty()` to set the value of the custom property to the **current height of the element**. This way, we can essentially transition the height of the element from `0` to `auto`.

In order to complete the effect and apply it on hover, we'll use the `:hover` pseudo-class to change the `max-height` to the value of the `--max-height` variable set by JavaScript. We'll also add a `transition` for the `max-height` property to **animate the height change**.

And voilà! You've got yourself a content-aware height transition.

https://codepen.io/chalarangelo/pen/OJeKKBZ

> [!CAUTION]
>
> This trick causes a **reflow on each animation frame**, which will be laggy if there are a large number of elements beneath the element that is transitioning in height.

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
const el = document.querySelector('.el');
const height = el.scrollHeight;

el.style.setProperty('--max-height', height + 'px');
```
