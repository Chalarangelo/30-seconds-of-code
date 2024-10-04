---
title: Input with prefix
language: css
tags: [interactivity,visual]
cover: flower-portrait-4
excerpt: Ever wanted to create an input with a visual, non-editable prefix? CSS can help you with that!
listed: true
dateModified: 2024-08-30
---

Ever wanted to create an input with a visual, **non-editable prefix**? HTML, CSS and some ingenuity can help you with that!

All you really need is **two elements**: a `<span>` for the prefix and an `<input>` for the actual input field. By styling them accordingly, you can create a visually appealing input box that looks like it has a prefix.

For starters, you can create a **container element** with `display: flex` to align the prefix and the input field. You can then remove the border and outline from the `<input>` field. Apply them to the parent element instead to make it look like an input box.

Finally, you can use the `:focus-within` pseudo-class selector to style the parent element accordingly, when the user interacts with the `<input>` field.

```html
<div class="input-box">
  <span class="prefix">+30</span>
  <input type="tel" placeholder="210 123 4567"/>
</div>
```

```css
.input-box {
  display: flex;
  align-items: center;
  border: 1px solid #a0a0a0;
  border-radius: 4px;
}

.input-box input {
  border: none;
  outline: none;
}

.input-box:focus-within {
  border-color: #4f7df3;
}
```

https://codepen.io/chalarangelo/pen/gOVpEMK

> [!CAUTION]
>
> Make sure to include your prefix when **submitting the form**. You can use JavaScript to append it to the input value before sending it to the server.
