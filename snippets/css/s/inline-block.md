---
title: Inline-Block Elements
type: snippet
language: css
tags: Box Model
cover: building-blocks
dateModified: 2023‐09‐05T06:23:15−07:00
---

Creates an inline-block element.

- Set `display: inline-block` for the target element.
- Inline-block elements are useful as they possess both inline and block nature.
- Only occupies space required by content within an element.
- Doesn't cause line breaks.
- Allows to set a width and height on the element.
- Below code snippet shows how `<div>` elements' block-level nature alters.


```html
<div class="colors">
    <div class="color "></div>
    <div class="color color2"></div>
    <div class="color color3"></div>
  </div>
</div>
```

```css
.color{
  display:inline-block;
  height:22px;
  width:22px;
  background-color:black;
  margin-right:10px;
}
.color2{
  background-color:blue;
}
.color3{
  background-color:red;
}
}
```
