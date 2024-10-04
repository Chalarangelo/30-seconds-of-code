---
title: Image overlay on hover
language: css
tags: [visual,animation]
cover: architectural
excerpt: Learn how to display an image overlay effect on hover using CSS.
listed: true
dateModified: 2024-09-20
---

Creating an image overlay effect on hover is a great way to add a touch of interactivity to your website. This effect can be achieved using pseudo-elements and pseudo-selectors. For the **structure**, you'll use a `<figure>` element containing an `<img>` and a `<figcaption>`.

Using the `::before` and `::after` pseudo-elements, you can create the top and bottom **bars of your overlay**. Set their `opacity`, `transform`, and `transition` to produce the desired effect.

The `<figcaption>` element can be used for the **text of the overlay**. By setting `display: flex`, `flex-direction: column`, and `justify-content: center`, you can center the text into the image.

Finally, by using the `:hover` pseudo-selector, you can update the `opacity` and `transform` of all the elements and display the overlay.

https://codepen.io/chalarangelo/pen/bGXpmJq

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

.hover-img::before,
.hover-img::after {
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

.hover-img:hover::before,
.hover-img:hover::after {
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
