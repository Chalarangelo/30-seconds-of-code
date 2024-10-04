---
title: Styling checkboxes and radio buttons
language: css
tags: [visual,animation]
cover: interior-8
excerpt: Learn how to create customized and animated checkboxes and radio buttons with CSS.
listed: true
dateModified: 2024-09-14
---

One of the most common pain points in web development is styling checkboxes and radio buttons. They are notoriously difficult to style consistently across browsers and platforms. However, with a little CSS magic, you can create custom checkboxes and radio buttons that look great and are easy to use.

https://codepen.io/chalarangelo/pen/QWeNvea

## Custom checkboxes

For a custom checkbox, the best solution I've found is to use an `<svg>` element to create the checkmark symbol and insert it via the `<use>` element to create a **reusable SVG icon**.

You can then create a container and use flexbox to create the appropriate layout for the checkboxes. Hide the `<input>` element and use the `<label>` associated with it to display a checkbox and the provided text.

Then, using `stroke-dashoffset`, you can animate the check symbol on state change. Finally, use `transform: scale(0.9)` via a CSS animation to create a zoom animation effect.

```html
<svg class="checkbox-symbol">
  <symbol id="check" viewbox="0 0 12 10">
    <polyline
      points="1.5 6 4.5 9 10.5 1"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
    ></polyline>
  </symbol>
</svg>

<div class="checkbox-container">
  <input class="checkbox-input" id="apples" type="checkbox" />
  <label class="checkbox" for="apples">
    <span>
      <svg width="12px" height="10px">
        <use xlink:href="#check"></use>
      </svg>
    </span>
    <span>Apples</span>
  </label>
  <input class="checkbox-input" id="oranges" type="checkbox" />
  <label class="checkbox" for="oranges">
    <span>
      <svg width="12px" height="10px">
        <use xlink:href="#check"></use>
      </svg>
    </span>
    <span>Oranges</span>
  </label>
</div>
```

```css
.checkbox-symbol {
  position: absolute;
  width: 0;
  height: 0;
  pointer-events: none;
  user-select: none;
}

.checkbox-container {
  box-sizing: border-box;
  background: #ffffff;
  color: #222;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: row wrap;
}

.checkbox-container * {
  box-sizing: border-box;
}

.checkbox-input {
  position: absolute;
  visibility: hidden;
}

.checkbox {
  user-select: none;
  cursor: pointer;
  padding: 6px 8px;
  border-radius: 6px;
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
}

.checkbox:not(:last-child) {
  margin-right: 6px;
}

.checkbox:hover {
  background: rgba(0, 119, 255, 0.06);
}

.checkbox span {
  vertical-align: middle;
  transform: translate3d(0, 0, 0);
}

.checkbox span:first-child {
  position: relative;
  flex: 0 0 18px;
  width: 18px;
  height: 18px;
  border-radius: 4px;
  transform: scale(1);
  border: 1px solid #cccfdb;
  transition: all 0.3s ease;
}

.checkbox span:first-child svg {
  position: absolute;
  top: 3px;
  left: 2px;
  fill: none;
  stroke: #fff;
  stroke-dasharray: 16px;
  stroke-dashoffset: 16px;
  transition: all 0.3s ease;
  transform: translate3d(0, 0, 0);
}

.checkbox span:last-child {
  padding-left: 8px;
  line-height: 18px;
}

.checkbox:hover span:first-child {
  border-color: #0077ff;
}

.checkbox-input:checked + .checkbox span:first-child {
  background: #0077ff;
  border-color: #0077ff;
  animation: zoom-in-out 0.3s ease;
}

.checkbox-input:checked + .checkbox span:first-child svg {
  stroke-dashoffset: 0;
}

@keyframes zoom-in-out {
  50% {
    transform: scale(0.9);
  }
}
```

## Custom radio buttons

For a custom radio button, you can use **pseudo-elements** to do the heavy lifting. Same as before, create a container and use flexbox to create the appropriate layout for the radio buttons. Reset the styles on the `<input>` element and use it to create the outline and background of the radio button.

Then, use the `::before` pseudo-element to create the inner circle of the radio button. Use `transform: scale(1)` and a CSS transition to create an animation effect on state change.

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
