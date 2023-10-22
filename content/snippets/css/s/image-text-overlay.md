---
title: Image with text overlay
type: snippet
language: css
tags: [visual]
cover: icebreaker
dateModified: 2023-01-29
---

Displays an image with a text overlay.

- Use the `<figure>` and `<figcaption>` elements to display the image and the text overlay respectively.
- Use a `linear-gradient` to create the overlay effect over the image.

```html
<figure class="text-overlay-image">
  <img src="https://picsum.photos/id/971/400/400.jpg" />
  <figcaption>
    <h3>Business <br/>Pricing</h3>
  </figcaption>
</figure>
```

```css
.text-overlay-image {
  box-sizing: border-box;
  position: relative;
  margin: 8px;
  max-width: 400px;
  max-height: 400px;
  width: 100%;
}

.text-overlay-image figcaption {
  box-sizing: border-box;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background: linear-gradient(0deg, #00000088 30%, #ffffff44 100%);
  color: #fff;
  padding: 16px;
  font-family: sans-serif;
  font-weight: 700;
  line-height: 1.2;
  font-size: 28px;
}

.text-overlay-image figcaption h3 {
  margin: 0;
}
```
