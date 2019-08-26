---
title: Gradient text
tags: visual
---

Gives text a gradient color.

```html
<p class="gradient-text">Gradient text</p>
```

```css
.gradient-text {
  background: -webkit-linear-gradient(pink, red);
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
}
```

#### Explanation

1. `background: -webkit-linear-gradient(...)` gives the text element a gradient background.
2. `webkit-text-fill-color: transparent` fills the text with a transparent color.
3. `webkit-background-clip: text` clips the background with the text, filling the text with the gradient background as the color.

#### Browser support

<span class="snippet__support-note">⚠️ Uses non-standard properties.</span>

- https://caniuse.com/#feat=text-stroke
