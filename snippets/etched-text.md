---
title: Etched text
tags: visual
expertise: intermediate
firstSeen: 2018-02-25T15:14:39+02:00
lastUpdated: 2020-12-30T15:37:37+02:00
---

Creates an effect where text appears to be "etched" or engraved into the background.

- Use `text-shadow` to create a white shadow offset `0px` horizontally and `2px` vertically from the origin position.
- The background must be darker than the shadow for the effect to work.
- The text color should be slightly faded to make it look like it's engraved/carved out of the background.

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
