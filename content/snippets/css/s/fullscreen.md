---
title: Fullscreen
type: snippet
language: css
tags: [visual]
cover: flower-portrait-3
dateModified: 2021-10-13
---

Applies styles to an element when in fullscreen mode.

- Use the `:fullscreen` CSS pseudo-element selector to select and style an element that is displayed in fullscreen mode.
- Use a `<button>` and `Element.requestFullscreen()` to create a button that makes the element fullscreen for the purposes of previewing the style.

```html
<div class="container">
  <p><em>Click the button below to enter the element into fullscreen mode. </em></p>
  <div class="element" id="element"><p>I change color in fullscreen mode!</p></div>
  <br />
  <button onclick="var el = document.getElementById('element'); el.requestFullscreen();">
    Go Full Screen!
  </button>
</div>
```

```css
.container {
  margin: 40px auto;
  max-width: 700px;
}

.element {
  padding: 20px;
  height: 300px;
  width: 100%;
  background-color: skyblue;
  box-sizing: border-box;
}

.element p {
  text-align: center;
  color: white;
  font-size: 3em;
}

.element:-ms-fullscreen p {
  visibility: visible;
}

.element:fullscreen {
  background-color: #e4708a;
  width: 100vw;
  height: 100vh;
}
```
