---
title: Squiggle link hover effect
language: css
tags: [animation,visual]
cover: dreamy-flowers
excerpt: Create the most whimsical link hover effect with a squiggle animation.
listed: true
dateModified: 2024-09-15
---

One of the tiniest details I see people get creative with is the hover effect on links. One of the most whimsical effects I've seen is the squiggle effect. It's a simple yet effective way to make your links stand out and give them a playful touch, making the experience more memorable.

https://codepen.io/chalarangelo/pen/eYqZRdx

## The SVG image

The technique once again hinges on the use of **SVG images** in CSS. This time around we're going to use them as the `background-image` of the link. The SVG will contain a squiggly path that we'll animate to create the squiggle effect. The animation will be a simple translation of the path along the x-axis, creating the illusion of a squiggle.

As we'll have to **data encode** our SVG, here's what it looks like in plain text:

```html
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 4'>
  <style type='text/css'>
    .squiggle {
      animation: shift .3s linear infinite;
    }
    @keyframes shift {
      from {
        transform: translateX(0);
      } to {
        transform: translateX(-15px);
      }
    }
  </style>
  <path
    fill='none'
    stroke='#0087ca'
    stroke-width='2'
    class='squiggle'
    d='M0,3.5 c 5,0,5,-3,10,-3 s 5,3,10,3 c 5,0,5,-3,10,-3 s 5,3,10,3'
  />
</svg>
```

## Putting it to use

As mentioned already, we'll use `background-image` with the `url()` function to animate the `:hover` state of the link. The SVG will be data encoded in the URL, and we'll set the `background-size` to `auto 4px` to ensure the squiggle path is visible.

However, we'll have to create a **repeating background** for the link to make the squiggle effect work. We'll use a `linear-gradient()` with a `background-size` of `2px 2px` to create a repeating pattern. The `background-position` will be set to `0 100%` to ensure the gradient starts at the bottom of the link.

This way, when not hovered, the link will technically use the gradient as its `background-image`. When hovered, the SVG will replace the gradient, creating the squiggle effect.

```html
<p>The <a class="squiggle" href="#">magnificent octopus</a> swam along gracefully.</p>
```

```css
a.squiggle {
  background-image: linear-gradient(to bottom, #0087ca 0%, #0087ca 100%);
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
