---
title: Mouse cursor gradient tracking
tags: visual, interactivity
---

A hover effect where the gradient follows the mouse cursor.

<small class="snippet__credit">**Credit:** [Tobias Reich](https://codepen.io/electerious/pen/MQrRxX)</small>

```html
<button class="mouse-cursor-gradient-tracking"><span>Hover me</span></button>
```

```css
.mouse-cursor-gradient-tracking {
  position: relative;
  background: #7983ff;
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  border: none;
  color: white;
  cursor: pointer;
  outline: none;
  overflow: hidden;
}

.mouse-cursor-gradient-tracking span {
  position: relative;
}

.mouse-cursor-gradient-tracking::before {
  --size: 0;
  content: '';
  position: absolute;
  left: var(--x);
  top: var(--y);
  width: var(--size);
  height: var(--size);
  background: radial-gradient(circle closest-side, pink, transparent);
  transform: translate(-50%, -50%);
  transition: width 0.2s ease, height 0.2s ease;
}

.mouse-cursor-gradient-tracking:hover::before {
  --size: 200px;
}
```

```js
var btn = document.querySelector('.mouse-cursor-gradient-tracking')
btn.onmousemove = function(e) {
  var x = e.pageX - btn.offsetLeft - btn.offsetParent.offsetLeft
  var y = e.pageY - btn.offsetTop - btn.offsetParent.offsetTop
  btn.style.setProperty('--x', x + 'px')
  btn.style.setProperty('--y', y + 'px')
}
```

#### Explanation

1. `--x` and `--y` are used to track the position of the mouse on the button.
2. `--size` is used to keep modify of the gradient's dimensions.
3. `background: radial-gradient(circle closest-side, pink, transparent);` creates the gradient at the correct postion.

#### Browser support

<span class="snippet__support-note">⚠️ Requires JavaScript.</span>

- https://caniuse.com/#feat=css-variables
