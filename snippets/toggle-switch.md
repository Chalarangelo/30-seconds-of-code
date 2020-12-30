---
title: Toggle switch
tags: visual,interactivity,beginner
---

Creates a toggle switch with CSS only.

- Use the `for` attribute to associate the `<label>` with the checkbox `<input>` element.
- Use the `:after` pseudo-element of the `<label>` to create a circular knob for the switch.
- Use the `:checked` pseudo-class selector to change the position of the knob, using `transform: translateX(20px)` and the `background-color` of the switch.
- Use `position: absolute` and `left: -9999px` to visually hide the `<input>` element.

```html
<input type="checkbox" id="toggle" class="offscreen" />
<label for="toggle" class="switch"></label>
```

```css
.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
  background-color: rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  transition: all 0.3s;
}

.switch:after {
  content: '';
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 18px;
  background-color: white;
  top: 1px;
  left: 1px;
  transition: all 0.3s;
}

input[type='checkbox']:checked + .switch:after {
  transform: translateX(20px);
}

input[type='checkbox']:checked + .switch {
  background-color: #7983ff;
}

.offscreen {
  position: absolute;
  left: -9999px;
}
```
