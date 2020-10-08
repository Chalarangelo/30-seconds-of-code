---
title: Button Hover Fill Animation
tags: animation,beginner
---

Creates a fill animation in a button on hover.

- ` transition: 0.3s ease-in-out;` gives the ease into the hover/active state.
- Change the background color to work with the font color in both states.
- Elongate the transition by increasing the seconds.
- Edit `padding: 20px;` to make the button feel larger or thinner.

```html
<button class="animated-fill-button">Click</button>
```

```css
button.animated-fill-button {
  transition: 0.3s ease-in-out;
  color: black;
  border: black 2px solid;
  background-color: white;
  font-size: 14px;
  text-transform: uppercase;
  cursor: pointer;
  padding: 20px;
  font-weight: bold;
}
button.animated-fill-button:hover,
button.animated-fill-button:focus,
button.animated-fill-button:active
{
  background-color: black;
  color: white;
}
```
