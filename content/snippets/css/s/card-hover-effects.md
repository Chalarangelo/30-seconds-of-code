---
title: Card hover effects
language: css
tags: [animation]
cover: clouds-n-mountains
excerpt: Create cards with hover effects, such as rotating, shifting and perspective transforms.
listed: true
dateModified: 2024-09-11
---

Cards, one of the most common layout elements in modern web design, provide a ton of opportunities for creative hover effects. Here are a few examples of card hover effects that you can use to make your website more interactive and engaging.

https://codepen.io/chalarangelo/pen/NWQNxQG


## Rotating card

To create a **two-sided card** that rotates on hover, you first need a container element with two child elements, one for the front side and one for the back side of the card. You can then use the `rotateY()` function to rotate the card around the Y-axis, and the `backface-visibility` property to hide the back side of the card when it is not visible.

```html
<div class="rotating-card">
  <div class="card-side front"></div>
  <div class="card-side back"></div>
</div>
```

```css
.rotating-card {
  perspective: 150rem;
  position: relative;
  box-shadow: none;
  background: none;
}

.rotating-card .card-side {
  transition: all 0.8s ease;
  backface-visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.rotating-card .card-side.back {
  transform: rotateY(-180deg);
}

.rotating-card:hover .card-side.front {
  transform: rotateY(180deg);
}

.rotating-card:hover .card-side.back {
  transform: rotateY(0deg);
}
```

## Shifting card

For a shifting card, you will need to leverage [CSS variables](/css/s/variables) and a little bit of JavaScript to track the **position of the mouse cursor** and adjust the card's position accordingly. You'll use the `mousemove` event to track the cursor's position and calculate the relative distance between the cursor and the center of the card, using `Element.getBoundingClientRect()` to get the card's position and dimensions.

Then, using the CSS variables, you can apply a `transform` property to the card element that shifts it based on the cursor's position. To make the change smoother, use the `transition` property to animate the transformation.

```css
.shifting-card {
  transition: transform 0.2s ease-out;
  transform: rotateX(calc(10deg * var(--dx, 0)))
    rotateY(calc(10deg * var(--dy, 0)));
}
```

```js
const card = document.querySelector('.shifting-card');
const { x, y, width, height } = card.getBoundingClientRect();
const cx = x + width / 2;
const cy = y + height / 2;

const handleMove = e => {
  const { pageX, pageY } = e;
  const dx = (cx - pageX) / (width / 2);
  const dy = (cy - pageY) / (height / 2);
  e.target.style.setProperty('--dx', dx);
  e.target.style.setProperty('--dy', dy);
};

card.addEventListener('mousemove', handleMove);
```

## Perspective card

Finally, for the perspective card, you will only need a `transform` with a `perspective()` function and a `rotateY()` function to create the perspective effect. The `transition` property will animate the `transform` attribute on hover.

```css
.perspective-card {
  transform: perspective(1500px) rotateY(15deg);
  transition: transform 1s ease 0s;
}

.perspective-card:hover {
  transform: perspective(3000px) rotateY(5deg);
}
```
