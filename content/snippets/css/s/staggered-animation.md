---
title: Staggered list animation
shortTitle: Staggered animation
language: css
tags: [animation]
cover: aerial-view-port
excerpt: Staggered animations can be used to create a more dynamic user experience. Get creative with your lists!
listed: true
dateModified: 2024-09-01
---

The term **staggered animation** refers to an animation effect where elements are animated one after the other, with a slight delay between each element. This can be used to create a more dynamic user experience, especially when dealing with lists.

For this effect to work, we can leverage [CSS variables](/css/s/variables). Each child element will define a value for a custom property (e.g. `--i`), which will be used to calculate the **delay for the animation**. By setting the `transition-delay` property to a **multiple of this custom property**, we can create a staggered effect.

The rest of the process is pretty standard. We'll use a `transition` to animate the `opacity` and `transform` properties of the list elements. When the animation is toggled (e.g. by opening a menu), the list elements will transition from being transparent (`opacity: 0`) and off-screen (`transform: translateX(100%)`) to being visible (`opacity: 1`) and in their final position (`transform: translateX(0)`).

> [!NOTE]
>
> For this example, we'll use a **checkbox** to toggle the animation. You can use JavaScript or any other method to toggle the animation, based on your needs.

https://codepen.io/chalarangelo/pen/ExqjMBw

```html
<div class="container">
  <input type="checkbox" name="menu" id="menu" class="menu-toggler">
  <label for="menu" class="menu-toggler-label">Menu</label>
  <ul class="stagger-menu">
    <li style="--i: 0">Home</li>
    <li style="--i: 1">Pricing</li>
    <li style="--i: 2">Account</li>
    <li style="--i: 3">Support</li>
    <li style="--i: 4">About</li>
  </ul>
</div>
```

```css
.container {
  overflow-x: hidden;
  width: 100%;
}

.menu-toggler {
  display: none;
}

.stagger-menu li {
  opacity: 0;
  transform: translateX(100%);
  transition-property: opacity, transform;
  transition-duration: 0.3s;
  transition-timing-function: cubic-bezier(0.750, -0.015, 0.565, 1.055);
}

.menu-toggler:checked ~ .stagger-menu li {
  opacity: 1;
  transform: translateX(0);
  transition-delay: calc(0.055s * var(--i));
}
```
