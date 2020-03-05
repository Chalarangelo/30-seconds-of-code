---
title: Reset all styles
tags: visual,beginner
---

Resets all styles to default values with one property. This will not affect `direction` and `unicode-bidi` properties.

```html
<div class="reset-all-styles">
  <h5>Title</h5>
  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure id exercitationem nulla qui
    repellat laborum vitae, molestias tempora velit natus. Quas, assumenda nisi. Quisquam enim qui
    iure, consequatur velit sit?
  </p>
</div>
```

```css
.reset-all-styles {
  all: initial;
}
```

#### Explanation

- The `all` property allows you to reset all styles (inherited or not) to default values.

#### Browser support

<span class="snippet__support-note">⚠️ MS Edge status is under consideration.</span>

- https://caniuse.com/#feat=css-all
