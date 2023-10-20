---
title: Shifting Card
type: snippet
language: css
tags: [animation]
cover: clouds-n-mountains
dateModified: 2022-12-14
---

Creates a card that shifts on hover.

- Set the appropriate `perspective` on the `.container` element to allow for the shifting effect.
- Add a `transition` for the `transform` property of the `.card` element.
- Use `Document.querySelector()` to select the `.card` element and add event listeners for the `mousemove` and `mouseout` events.
- Use `Element.getBoundingClientRect()` to get the `x`, `y`, `width`, and `height` of the `.card` element.
- Calculate the relative distance as a value between `-1` and `1` for the `x` and `y` axes and apply it through the `transform` property.

```html
<div class="container">
  <div class="shifting-card">
    <div class="content">
      <h3>Card</h3>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti repellat, consequuntur doloribus voluptate esse iure?</p>
    </div>
  </div>
</div>
```

```css
.container {
  display: flex;
  padding: 24px;
  justify-content: center;
  align-items: center;
  background: #f3f1fe;
}

.shifting-card {
  width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  border-radius: 10px;
  margin: 0.5rem;
  transition: transform 0.2s ease-out;
  box-shadow: 0 0 5px -2px rgba(0, 0, 0, 0.1);
}

.shifting-card .content {
  text-align: center;
  margin: 2rem;
  line-height: 1.5;
  color: #101010;
}
```

```js
const card = document.querySelector('.shifting-card');
const { x, y, width, height } = card.getBoundingClientRect();
const cx = x + width / 2;
const cy = y + height / 2;

const handleMove = e => {
  const { pageX, pageY } = e;
  const dx = (cx - pageX) / (width / 2);
  const dy = (cy - pageY) / (height / 2);
  e.target.style.transform =
    `rotateX(${10 * dy * -1}deg) rotateY(${10 * dx}deg)`;
};

const handleOut = e => {
  e.target.style.transform = 'initial';
};

card.addEventListener('mousemove', handleMove);
card.addEventListener('mouseout', handleOut);
```
