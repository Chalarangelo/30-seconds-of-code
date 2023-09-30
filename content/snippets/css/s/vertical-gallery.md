---
title: Image gallery with vertical scroll
type: snippet
language: css
tags: [visual,interactivity]
cover: lake-loop
dateModified: 2022-05-05
---

Creates a horizontally scrollable image gallery.

- Use `display: flex` and `justify-content: center` to setup the layout for the container.
- Use `display: flex` and `flex-direction: column` to setup the layout for the slides.
- Use `scroll-snap-type: y mandatory` and `overscroll-behavior-y: contain` to create a snap effect on vertical scroll. Snap elements to the start of the container using `scroll-snap-align: start`.
- Hide scrollbars using `scrollbar-width: none` and styling the pseudo-element `::-webkit-scrollbar` to `display: none`.
- Use `Element.scrollTo()` to define a `scrollToElement` function, that scrolls the gallery to the given item.
- Use `Array.prototype.map()` and `Array.prototype.join()` to populate the `.thumbnails` element. Give each thumbnail a `data-id` attribute with the index of the image.
- Use `Document.querySelectorAll()` to get all the thumbnail elements. Use `Array.prototype.forEach()` to register a handler for the `'click'` event on each thumbnail, using `EventTarget.addEventListener()` and the `scrollToElement` function.
- Use `Document.querySelector()` and `EventTarget.addEventListener()` to register a handler for the `'scroll'` event. Update the `.thumbnails` and `.scrollbar` elements to match the current scroll position, using the `scrollThumb` function.

```html
<div class="gallery-container">
  <div class="thumbnails"></div>
  <div class="scrollbar">
    <div class="thumb"></div>
  </div>
  <div class="slides">
    <div><img src="https://picsum.photos/id/1067/540/720"></div>
    <div><img src="https://picsum.photos/id/122/540/720"></div>
    <div><img src="https://picsum.photos/id/188/540/720"></div>
    <div><img src="https://picsum.photos/id/249/540/720"></div>
    <div><img src="https://picsum.photos/id/257/540/720"></div>
    <div><img src="https://picsum.photos/id/259/540/720"></div>
    <div><img src="https://picsum.photos/id/283/540/720"></div>
    <div><img src="https://picsum.photos/id/288/540/720"></div>
    <div><img src="https://picsum.photos/id/299/540/720"></div>
  </div>
</div>
```

```css
.gallery-container {
  display: flex;
  justify-content: center;
}

.thumbnails {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.thumbnails img {
  width: 40px;
  height: 40px;
  cursor: pointer;
}

.scrollbar {
  width: 1px;
  height: 720px;
  background: #ccc;
  display: block;
  margin: 0 0 0 8px;
}

.thumb {
  width: 1px;
  position: absolute;
  height: 0;
  background: #000;
}

.slides {
  margin: 0 16px;
  display: grid;
  grid-auto-flow: row;
  gap: 1rem;
  width: calc(540px + 1rem);
  padding: 0 0.25rem;
  height: 720px;
  overflow-y: auto;
  overscroll-behavior-y: contain;
  scroll-snap-type: y mandatory;
  scrollbar-width: none;
}

.slides > div {
  scroll-snap-align: start;
}

.slides img {
  width: 540px;
  object-fit: contain;
}

.slides::-webkit-scrollbar {
  display: none;
}
```

```js
const slideGallery = document.querySelector('.slides');
const slides = slideGallery.querySelectorAll('div');
const scrollbarThumb = document.querySelector('.thumb');
const slideCount = slides.length;
const slideHeight = 720;
const marginTop = 16;

const scrollThumb = () => {
  const index = Math.floor(slideGallery.scrollTop / slideHeight);
  scrollbarThumb.style.height = `${((index + 1) / slideCount) * slideHeight}px`;
};

const scrollToElement = el => {
  const index = parseInt(el.dataset.id, 10);
  slideGallery.scrollTo(0, index * slideHeight + marginTop);
};

document.querySelector('.thumbnails').innerHTML += [...slides]
  .map(
    (slide, i) => `<img src="${slide.querySelector('img').src}" data-id="${i}">`
  )
  .join('');

document.querySelectorAll('.thumbnails img').forEach(el => {
  el.addEventListener('click', () => scrollToElement(el));
});

slideGallery.addEventListener('scroll', e => scrollThumb());

scrollThumb();
```
