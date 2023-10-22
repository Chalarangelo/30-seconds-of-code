---
title: Card with image cutout
type: snippet
language: css
tags: [visual]
cover: radio-monstera
dateModified: 2022-12-11
---

Creates a card with an image cutout.

- Use `background` to add a colored background to a `.container` element.
- Create a `.card` containing a `figure` with the appropriate image for the cutout and any other content you want.
- Use the `::before` pseudo-element to add a `border` around the `figure` element, matching the `.container` element's `background` and creating the illusion of a cutout in the `.card`.

```html
<div class="container">
  <div class="card">
    <figure>
      <img alt="" src="https://picsum.photos/id/447/400/400"/>
    </figure>
    <p class="content">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
  </div>
</div>
```

```css
.container {
  display: flex;
  padding: 96px 24px 48px;
  justify-content: center;
  align-items: center;
  background: #f3f1fe;
}

.card {
  width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  border-radius: 10px;
  margin: 8px;
  box-shadow: 0 0 5px -2px rgba(0, 0, 0, 0.1);
}

.card figure {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-top: -60px;
  position: relative;
}

.card figure::before {
  content: "";
  border-radius: inherit;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  border: 1rem solid #f3f1fe;
  box-shadow: 0 1px rgba(0, 0, 0, 0.1);
}

.card figure img {
  border-radius: inherit;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card .content {
  text-align: center;
  margin: 2rem;
  line-height: 1.5;
  color: #101010;
}
```
