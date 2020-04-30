---
title: Overflow scroll gradient
tags: visual,intermediate
---

Adds a fading gradient to an overflowing element to better indicate there is more content to be scrolled.

- `position: relative` on the parent establishes a Cartesian positioning context for pseudo-elements.
- `:after` defines a pseudo element.
- `background-image: linear-gradient(...)` adds a linear gradient that fades from transparent to white (top to bottom).
- `position: absolute` takes the pseudo element out of the flow of the document and positions it in relation to the parent.
- `width: 240px` matches the size of the scrolling element (which is a child of the parent that has the pseudo element).
- `height: 25px` is the height of the fading gradient pseudo-element, which should be kept relatively small.
- `bottom: 0` positions the pseudo-element at the bottom of the parent.
- `pointer-events: none` specifies that the pseudo-element cannot be a target of mouse events, allowing text behind it to still be selectable/interactive.

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
