---
title: Image overlay on hover
tags: visual,animation,advanced
---

Displays an image overlay effect on hover.

- Use the `:before` and `:after` pseudo-elements for the top and bottom bars of the overlay respectively, setting their `opacity`, `transform` and `transition` to produce the desired effect.
- Use the `<figcaption>` for the text of the overlay, setting `display: flex`, `flex-direction: column` and `justify-content: center` to center the text into the image.
- Use the `:hover` pseudo-selector to update the `opacity` and `transform` of all the elements and produce the desired effect.

```html
<figure class="hover-img">
  <img src="https://picsum.photos/id/200/440/320.jpg"/>
  <figcaption>
    <h3>Lorem <br/>Ipsum</h3>
  </figcaption>
</figure>
```

```css
.hover-img {
  background-color: #000;
  color: #fff;
  display: inline-block;
  margin: 8px;
  max-width: 320px;
  min-width: 240px;
  overflow: hidden;
  position: relative;
  text-align: center;
  width: 100%;
}

.hover-img * {
  box-sizing: border-box;
  transition: all 0.45s ease;
}

.hover-img:before,
.hover-img:after {
  background-color: rgba(0, 0, 0, 0.5);
  border-top: 32px solid rgba(0, 0, 0, 0.5);
  border-bottom: 32px solid rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  content: '';
  transition: all 0.3s ease;
  z-index: 1;
  opacity: 0;
  transform: scaleY(2);
}

.hover-img img {
  vertical-align: top;
  max-width: 100%;
  backface-visibility: hidden;
}

.hover-img figcaption {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  align-items: center;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 1.1em;
  opacity: 0;
  z-index: 2;
  transition-delay: 0.1s;
  font-size: 24px;
  font-family: sans-serif;
  font-weight: 400;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.hover-img:hover:before,
.hover-img:hover:after {
  transform: scale(1);
  opacity: 1;
}

.hover-img:hover > img {
  opacity: 0.7;
}

.hover-img:hover figcaption {
  opacity: 1;
}
```
