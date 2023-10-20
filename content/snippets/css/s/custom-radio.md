---
title: Custom radio button
type: snippet
language: css
tags: [visual,animation]
cover: messy-computer
dateModified: 2022-11-16
---

Creates a styled radio button with animation on state change.

- Create a `.radio-container` and use flexbox to create the appropriate layout for the radio buttons.
- Reset the styles on the `<input>` and use it to create the outline and background of the radio button.
- Use the `::before` element to create the inner circle of the radio button.
- Use `transform: scale(1)` and a CSS transition to create an animation effect on state change.

```html
<div class="radio-container">
  <input class="radio-input" id="apples" type="radio" name="fruit" />
  <label class="radio" for="apples">Apples</label>
  <input class="radio-input" id="oranges" type="radio" name="fruit" />
  <label class="radio" for="oranges">Oranges</label>
</div>
```

```css
.radio-container {
  box-sizing: border-box;
  background: #ffffff;
  color: #222;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: row wrap;
}

.radio-container * {
  box-sizing: border-box;
}

.radio-input {
  appearance: none;
  background-color: #ffffff;
  width: 16px;
  height: 16px;
  border: 1px solid #cccfdb;
  margin: 0;
  border-radius: 50%;
  display: grid;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.radio-input::before {
  content: "";
  width: 6px;
  height: 6px;
  border-radius: 50%;
  transform: scale(0);
  transition: 0.3s transform ease-in-out;
  box-shadow: inset 6px 6px #ffffff;
}

.radio-input:checked {
  background: #0077ff;
  border-color: #0077ff;
}

.radio-input:checked::before {
  transform: scale(1);
}

.radio {
  cursor: pointer;
  padding: 6px 8px;
}

.radio:not(:last-child) {
  margin-right: 6px;
}
```
