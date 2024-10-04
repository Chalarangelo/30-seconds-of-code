---
title: Image gallery with horizontal or vertical scroll
shortTitle: Image gallery
language: css
tags: [visual,interactivity]
cover: flower-portrait-5
excerpt: Create a horizontally or vertically scrollable image gallery.
listed: true
dateModified: 2024-09-05
---

<style>
/* Style CodePen embeds to fit the demos */
.codepen-wrapper > div { height: 820px; }
</style>

Image galleries are useful in various contexts, from showcasing products to displaying a collection of images. Depending on your needs, you may want to create a horizontally or vertically scrollable gallery. While CSS has come a long way, unfortunately, you'll have to get your hands dirty with JavaScript to achieve this effect.

> [!NOTE]
>
> You may first want to get caught up with [scroll snapping](/css/s/scroll-snap) to understand how it works, if you haven't already.

## Image gallery with vertical scroll

To create a **vertically scrollable image gallery**, you will need to create a container with `display: flex` and `justify-content: center` and a set of slides with `display: flex` and `flex-direction: column`.

You will also need to use `scroll-snap-type: y mandatory` and `overscroll-behavior-y: contain` to create a snap effect on vertical scroll. Snap elements to the start of the container using `scroll-snap-align: start`. In order to hide the scrollbars, you can use `scrollbar-width: none` and style the pseudo-element `::-webkit-scrollbar` to `display: none`.

Then, you can use `Element.scrollTo()` to define a `scrollToElement` function that scrolls the gallery to the given item. You can use `Array.prototype.map()` and `Array.prototype.join()` to populate the `.thumbnails` element. Give each thumbnail a `data-id` attribute with the index of the image.

Using the `Document.querySelectorAll()` method, you can get all the thumbnail elements. Use `Array.prototype.forEach()` to register a handler for the `'click'` event on each thumbnail, using `EventTarget.addEventListener()` and the `scrollToElement` function.

Finally, use `Document.querySelector()` and `EventTarget.addEventListener()` to register a handler for the `'scroll'` event. Update the `.thumbnails` and `.scrollbar` elements to match the current scroll position, using the `scrollThumb` function.

https://codepen.io/chalarangelo/pen/ExqVMzW

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

## Image gallery with horizontal scroll

To create a **horizontally scrollable image gallery**, you will need to position its `.thumbnails` container at the bottom of the gallery, using `position: absolute`. Then, use `scroll-snap-type: x mandatory` and `overscroll-behavior-x: contain` to create a snap effect on horizontal scroll. Snap elements to the start of the container using `scroll-snap-align: start`.

Hide the scrollbars the same way as before. Use `Element.scrollTo()` to define a `scrollToElement` function that scrolls the gallery to the given item. Populate the `.thumbnails` element using `Array.prototype.map()` and `Array.prototype.join()`, giving each thumbnail a `data-id` attribute with the index of the image.

Use `Document.querySelectorAll()` to get all the thumbnail elements and register `'click'` event handlers on each thumbnail, using the `highlightThumbnail` function. Finally, register a handler for the `'scroll'` event the same as before and update the `.thumbnails` element to match the current scroll position using the `highlightThumbnail` function.

https://codepen.io/chalarangelo/pen/RwXWObY

```html
<div class="gallery-container">
  <div class="thumbnails"></div>
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
  position: relative;
  display: flex;
  justify-content: center;
}

.thumbnails {
  position: absolute;
  bottom: 8px;
  display: flex;
  flex-direction: row;
  gap: 6px;
}

.thumbnails div {
  width: 8px;
  height: 8px;
  cursor: pointer;
  background: #aaa;
  border-radius: 100%;
}

.thumbnails div.highlighted {
  background-color: #777;
}

.slides {
  margin: 0 16px;
  display: grid;
  grid-auto-flow: column;
  gap: 1rem;
  width: 540px;
  padding: 0 0.25rem;
  height: 720px;
  overflow-y: auto;
  overscroll-behavior-x: contain;
  scroll-snap-type: x mandatory;
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
const thumbnailContainer = document.querySelector('.thumbnails');
const slideCount = slides.length;
const slideWidth = 540;

const highlightThumbnail = () => {
  thumbnailContainer
    .querySelectorAll('div.highlighted')
    .forEach(el => el.classList.remove('highlighted'));
  const index = Math.floor(slideGallery.scrollLeft / slideWidth);
  thumbnailContainer
    .querySelector(`div[data-id="${index}"]`)
    .classList.add('highlighted');
};

const scrollToElement = el => {
  const index = parseInt(el.dataset.id, 10);
  slideGallery.scrollTo(index * slideWidth, 0);
};

thumbnailContainer.innerHTML += [...slides]
  .map((slide, i) => `<div data-id="${i}"></div>`)
  .join('');

thumbnailContainer.querySelectorAll('div').forEach(el => {
  el.addEventListener('click', () => scrollToElement(el));
});

slideGallery.addEventListener('scroll', e => highlightThumbnail());

highlightThumbnail();
```
