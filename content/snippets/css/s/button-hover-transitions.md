---
title: CSS Button Transitions
shortTitle: Button Transitions
language: css
tags: [animation]
cover: painters-desk
excerpt: Add some life to your buttons with these simple CSS transitions.
listed: true
dateModified: 2024-08-29
---

CSS transitions are a great way to add some life to your buttons. From growing and shrinking, to fill, swing and border animations, there are many ways to make your buttons more interactive.

https://codepen.io/chalarangelo/pen/qBedyER

## Button grow animation

To create a **grow animation** on hover, you can use an appropriate `transition` to animate changes to the element. Use the `:hover` pseudo-class to change the `transform` to `scale(1.1)`, growing the element when the user hovers over it.

> [!TIP]
>
> You can also use the new `scale` property to scale the element to a specific size. Simply replace `transform: scale(1.1)` with `scale: 110%`.

```css
.button-grow {
  transition: all 0.3s ease-in-out;
}

.button-grow:hover {
  transform: scale(1.1);
}
```

## Button shrink animation

Similarly, you can create a **shrink animation** on hover by using an appropriate `transition` to animate changes to the element. Use the `:hover` pseudo-class to change the `transform` to `scale(0.8)`, shrinking the element when the user hovers over it.

> [!TIP]
>
> Again, you can use the new `scale` property to scale the element to a specific size. Simply replace `transform: scale(0.8)` with `scale: 80%`.

```css
.button-shrink {
  transition: all 0.3s ease-in-out;
}

.button-shrink:hover {
  transform: scale(0.8);
}
```

## Button fill animation

To create a **fill animation** on hover, set a `color` and `background` and use an appropriate `transition` to animate changes to the element. Use the `:hover` pseudo-class to change the `background` and `color` of the element when the user hovers over it.

```css
.button-fill {
  background: #fff;
  color: #000;
  transition: all 0.3s ease-in-out;
}

.button-fill:hover {
  background: #000;
  color: #fff;
}
```

## Button swing animation

For a **swing effect**, you can create an animation, using `@keyframes` and an appropriate `transition` to animate changes to the element. Use the `:hover` pseudo-class to apply an `animation` that uses `transform` to make the element swing.

```css
.button-swing {
  transition: all 0.2s ease-in-out;
}

.button-swing:hover {
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

## Button border animation

Finally, for a **border animation**, you can create a border that changes color on hover. For this effect, you'll need to use the `::before` and `::after` pseudo-elements to create two boxes opposite each other above and below the box. Then, using the `:hover` pseudo-class, you can extend the `width` of those elements to `100%` on hover and animate the change using `transition`.

```css
.button-bordered {
  border: none;
  outline: none;
  position: relative;
}

.button-bordered::before,
.button-bordered::after {
  border: 0 solid transparent;
  transition: all 0.3s;
  content: '';
  height: 0;
  position: absolute;
  width: 24px;
}

.button-bordered::before {
  border-top: 2px solid #263059;
  right: 0;
  top: -4px;
}

.button-bordered::after {
  border-bottom: 2px solid #263059;
  bottom: -4px;
  left: 0;
}

.button-bordered:hover::before,
.button-bordered:hover::after {
  width: 100%;
}
```
