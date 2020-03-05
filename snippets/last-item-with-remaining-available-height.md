---
title: Last item with remaining available height
tags: layout,intermediate
---

Take advantage of available viewport space by giving the last element the remaining available space in current viewport, even when resizing the window.

```html
<div class="container">
  <div>Div 1</div>
  <div>Div 2</div>
  <div>Div 3</div>
</div>
```

```css
html,
body {
  height: 100%;
  margin: 0;
}

.container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.container > div:last-child {
  background-color: tomato;
  flex: 1;
}
```

#### Explanation

1. `height: 100%` sets the height of container as viewport height.
2. `display: flex` creates a flexbox layout.
3. `flex-direction: column` set the direction of flex items' order from top to down.
4. `flex-grow: 1` the flexbox will apply remaining available space of container to last child element.

- The parent must have a viewport height. `flex-grow: 1` could be applied to the first or second element, which will occupy all available space.

#### Browser support

- https://caniuse.com/#feat=flexbox
