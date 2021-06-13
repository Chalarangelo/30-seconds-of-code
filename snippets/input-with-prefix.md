---
title: Input with prefix
tags: interactivity,visual,intermediate
firstSeen: 2020-10-14T14:16:57+03:00
lastUpdated: 2020-12-30T15:37:37+02:00
---

Creates an input with a visual, non-editable prefix.

- Use `display: flex` to create a container element.
- Remove the border and outline from the `<input>` field and apply them to the parent element instead to make it look like an input box.
- Use the `:focus-within` pseudo-class selector to style the parent element accordingly, when the user interacts with the `<input>` field.

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
  max-width: 300px;
  background: #fff;
  border: 1px solid #a0a0a0;
  border-radius: 4px;
  padding-left: 0.5rem;
  overflow: hidden;
  font-family: sans-serif;
}

.input-box .prefix {
  font-weight: 300;
  font-size: 14px;
  color: #999;
}

.input-box input {
  flex-grow: 1;
  font-size: 14px;
  background: #fff;
  border: none;
  outline: none;
  padding: 0.5rem;
}

.input-box:focus-within {
  border-color: #777;
}
```
