---
title: Focus Within
tags: visual,interactivity,intermediate
---

Changes the appearance of a form if any of its children are focused.

- Use the pseudo-class `:focus-within` to apply styles to a parent element if any child element gets focused.

```html
<form>
  <label for="username">Username:</label>
  <input id="username" type="text" />
  <br />
  <label for="password">Password:</label>
  <input id="password" type="text" />
</form>
```

```css
form {
  border: 2px solid #52B882;
  padding: 8px;
  border-radius: 2px;
}

form:focus-within {
  background: #7CF0BD;
}

label {
  display: inline-block;
  width: 72px;
}

input {
  margin: 4px 12px;
}
```
