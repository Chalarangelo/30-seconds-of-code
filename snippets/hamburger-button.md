---
title: Hamburger Button
tags: interactivity,beginner
---

Displays a hamburger menu which transitions to a cross on hover.

```html
<div class="hamburger-menu">
  <div class="bar top"></div>
  <div class="bar middle"></div>
  <div class="bar bottom"></div>
</div>
```

```css
.hamburger-menu {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  height: 2.5rem;
  width: 2.5rem;
  cursor: pointer;

  .bar {
    height: 5px;
    background: black;
    border-radius: 5px;
    margin: 3px 0px;
    transform-origin: left;
    transition: all 0.5s;
  }

  &:hover {
    .top {
      transform: rotate(45deg);
    }

    .middle {
      opacity: 0;
    }

    .bottom {
      transform: rotate(-45deg);
    }
  }
}
```

#### Explanation

- Use a `hamburger-menu` container div which contains the top, bottom, and middle bars.
- The container is set to be a flex container (`display: flex`) with `flex-direction` to be `column` and `flex-wrap` to be `wrap` (alternatively, you can set both properties by a shorthand `flex-flow: column wrap`).
- Add distance between the bars using `justify-content: space-between`.
- The animation has 3 parts: top and bottom bars transforming to 45 degree angles (`rotate(45deg)`), and the middle bar fading away by setting the `opacity: 0`.
- The `transform-origin` is set to `left` so the bars rotate around the left point.
- Set `transition all 0.5s` so that both `transform` and `opacity` are properties are animated for half a second.

#### Browser support

- Flexbox - https://caniuse.com/#feat=flexbox
- CSS Transitions - https://caniuse.com/#feat=css-transitions
