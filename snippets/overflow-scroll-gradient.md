---
title: Overflow scroll gradient
tags: visual,intermediate
firstSeen: 2018-02-25T15:14:39+02:00
lastUpdated: 2021-10-13T19:29:39+02:00
---

Adds a fading gradient to an overflowing element to better indicate there is more content to be scrolled.

- Use the `:after` pseudo-element to create a `linear-gradient()` that fades from `transparent` to `white` (top to bottom).
- Use `position: absolute`, `width` and `height` to place and size the pseudo-element in its parent.
- Use `pointer-events: none` to exclude the pseudo-element from mouse events, allowing text behind it to still be selectable/interactive.

```html
<div class="overflow-scroll-gradient">
  <div class="overflow-scroll-gradient-scroller">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />
    Iure id exercitationem nulla qui repellat laborum vitae, <br />
    molestias tempora velit natus. Quas, assumenda nisi. <br />
    Quisquam enim qui iure, consequatur velit sit? <br />
    Lorem ipsum dolor sit amet consectetur adipisicing elit.<br />
    Iure id exercitationem nulla qui repellat laborum vitae, <br />
    molestias tempora velit natus. Quas, assumenda nisi. <br />
    Quisquam enim qui iure, consequatur velit sit?
  </div>
</div>
```

```css
.overflow-scroll-gradient {
  position: relative;
}

.overflow-scroll-gradient:after {
  content: '';
  position: absolute;
  bottom: 0;
  width: 250px;
  height: 25px;
  background: linear-gradient(transparent, white);
  pointer-events: none;
}

.overflow-scroll-gradient-scroller {
  overflow-y: scroll;
  background: white;
  width: 240px;
  height: 200px;
  padding: 15px;
  line-height: 1.2;
}
```
