---
title: Etched text
tags: visual,intermediate
---

Creates an effect where text appears to be "etched" or engraved into the background.

```html
<p class="etched-text">I appear etched into the background.</p>
```

```css
.etched-text {
  text-shadow: 0 2px white;
  font-size: 1.5rem;
  font-weight: bold;
  color: #b8bec5;
}
```

#### Explanation

- `text-shadow: 0 2px white` creates a white shadow offset `0px` horizontally and `2px` vertically from the origin position.
- The background must be darker than the shadow for the effect to work.
- The text color should be slightly faded to make it look like it's engraved/carved out of the background.

#### Browser support

- https://caniuse.com/#feat=css-textshadow



