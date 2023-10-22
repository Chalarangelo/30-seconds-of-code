---
title: Squiggle link hover effect
type: snippet
language: css
tags: [animation,visual]
cover: dreamy-flowers
dateModified: 2023-01-10
---

Creates a squiggle effect when hovering over a link.

- Create a repeating background for the link using a `linear-gradient`.
- Create a `:hover` state for the link with a `background-image` of a data URL containing an SVG with a squiggly path and an animation.

```html
<p>The <a class="squiggle" href="#">magnificent octopus</a> swam along gracefully.</p>
```

```css
a.squiggle {
  background: linear-gradient(to bottom, #0087ca 0%, #0087ca 100%);
  background-position: 0 100%;
  background-repeat: repeat-x;
  background-size: 2px 2px;
  color: inherit;
  text-decoration: none;
}

a.squiggle:hover {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 4'%3E%3Cstyle type='text/css'%3E.squiggle{animation:shift .3s linear infinite;}@keyframes shift {from {transform:translateX(0);}to {transform:translateX(-15px);}}%3C/style%3E%3Cpath fill='none' stroke='%230087ca' stroke-width='2' class='squiggle' d='M0,3.5 c 5,0,5,-3,10,-3 s 5,3,10,3 c 5,0,5,-3,10,-3 s 5,3,10,3'/%3E%3C/svg%3E");
  background-size: auto 4px;
}
```
