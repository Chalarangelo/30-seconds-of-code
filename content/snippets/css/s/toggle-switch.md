---
title: Create a toggle switch using HTML & CSS
shortTitle: Toggle switch
language: css
tags: [visual,interactivity]
cover: interior-5
excerpt: A toggle switch is little more than a checkbox with a custom appearance. This article shows you how to create one without using JavaScript.
listed: true
dateModified: 2024-09-04
---

A toggle switch is little more than a checkbox with a custom appearance. Given that, some HTML and CSS should be enough to create and style one.

Structurally, you can create a toggle switch the same way as you would a checkbox. The only difference is that you'll need to **visually hide the checkbox** `<input>` and style the `<label>` element to look like a switch.

After hiding the `<input>` element offscreen, you can style the `<label>` element to look like a switch. The `::after` pseudo-element is used to create a circular knob for the switch. The `:checked` pseudo-class selector is used to change the position of the knob and the background color of the switch when the checkbox is checked.

https://codepen.io/chalarangelo/pen/wvVKoyP

```html
<input type="checkbox" id="toggle" class="offscreen" />
<label for="toggle" class="switch"></label>
```

```css
.switch {
  position: relative;
  display: inline-block;
  width: 46px;
  height: 24px;
  background-color: rgba(0, 0, 0, 0.25);
  border-radius: 22px;
  transition: all 0.3s;
}

.switch::after {
  content: '';
  position: absolute;
  width: 22px;
  height: 22px;
  border-radius: 22px;
  background-color: white;
  top: 1px;
  left: 1px;
  transition: all 0.3s;
}

input[type='checkbox']:checked + .switch::after {
  transform: translateX(22px);
}

input[type='checkbox']:checked + .switch {
  background-color: #7983ff;
}

.offscreen {
  position: absolute;
  left: -9999px;
}
```

> [!TIP]
>
> For **accessibility** reasons, it's important to keep the `<input>` element in the DOM. This way, screen readers can still interact with it, even if it's visually hidden. You might also want to add some `aria-*` attributes to the `<input>` and `<label>` elements to improve accessibility further.
