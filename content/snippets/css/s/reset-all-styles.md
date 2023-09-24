---
title: Reset all styles
type: snippet
language: css
tags: [visual]
cover: rocky-beach-2
dateModified: 2020-12-30
---

Resets all styles to default values using only one property.

- Use the `all` property to reset all styles (inherited or not) to their default values.
- **Note:** This will not affect `direction` and `unicode-bidi` properties.

```html
<div class="reset-all-styles">
  <h5>Title</h5>
  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure id
    exercitationem nulla qui repellat laborum vitae, molestias tempora velit
    natus. Quas, assumenda nisi. Quisquam enim qui iure, consequatur velit sit?
  </p>
</div>
```

```css
.reset-all-styles {
  all: initial;
}
```
