---
title: A user-friendly setup for number-only inputs with plain HTML
shortTitle: Number-only input
language: html
tags: [form]
cover: palm-sun
excerpt: Number-only inputs aren't as straightforward as you might expect. Here's a user-friendly way to set them up.
listed: true
dateModified: 2024-01-04
---

Number-only inputs aren't as straightforward as you might expect. Most people would instinctively reach for the `type="number"` attribute, but it might not be enough. Sure, it shows a numeric keyboard on mobile, but allows users to enter non-numeric characters. Plus, the up and down arrows on desktop are not particularly useful for entering, say, a PIN code or a credit card number.

Instead, we can use `inputmode="numeric"`. This ensures that the **mobile keyboard is numeric-only**, not even including some symbols that were available. We should also add `pattern="[0-9]+"` to **constrain the input value**. And, as far as the `type` attribute is concerned, that's up to you. Either `type="text"` or `type="number"` will work just fine.

```html
<label>
  PIN code
  <input type="text" inputmode="numeric" pattern="[0-9]+"" />
</label>
```

> [!IMPORTANT]
>
> Most browsers don't bother validating that the input is numeric-only, even for `type="number"`. This, in combination with numeric inputs often accepting scientific notation (e.g. `1e3`), means that you'll need to write some validation logic yourself.
