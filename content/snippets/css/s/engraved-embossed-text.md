---
title: Engraved and embossed text
language: css
tags: [visual]
cover: memories-of-pineapple-2
excerpt: Make the text appear engraved or embossed into the background, using CSS.
listed: true
dateModified: 2024-09-16
---

Engraved and embossed text effects are pretty similar to each other. The difference is that the engraved text appears to be carved into the background, while the embossed text appears to be raised from the background.

For both effects, you'll need to use `background-color` combined with `background-clip` to **clip the background to the text**. Then, you can use `color` to set the text color and `text-shadow` to add a shadow to the text.

For the **engraved text**, the `text-shadow` should be lighter than the background, while for the **embossed text**, it should be darker. Additionally, the placement of the shadow should be slightly different for each effect.

```css
.engraved-text {
  background-color: #666666;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  text-shadow: 3px 5px 1px rgba(245, 245, 245, 0.5);
}

.embossed-text {
  background-color: #666666;
  background-clip: text;
  -webkit-background-clip: text;
  color: #f0f0f0;
  text-shadow: 1px 4px 4px #555555;
}
```

https://codepen.io/chalarangelo/pen/dyxMzZd
