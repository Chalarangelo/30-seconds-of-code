---
title: Alternating text
type: snippet
language: css
tags: [animation]
cover: italian-horizon
dateModified: 2023-05-25
---

Creates an alternating text animation.

- Create a `<span>` for the text that will be alternated.
- Define an animation, `alternating-text`, that makes the `<span>` disappear by setting `display: none`.
- In JavaScript, define an array of the different words that will be alternated and use the first word to initialize the content of the `<span>`.
- Use `EventTarget.addEventListener()` to define an event listener for the `'animationiteration'` event. This will run the event handler whenever an iteration of the animation is completed.
- Use `Element.innerHTML` to display the next element in the array as the content of the `<span>`.

```html
<p>I love coding in <span class="alternating" id="alternating-text"></span>.</p>
```

```css
.alternating {
  animation-name: alternating-text;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: ease;
}

@keyframes alternating-text {
  90% {
    display: none;
  }
}
```

```js
const texts = ['Java', 'Python', 'C', 'C++', 'C#', 'Javascript'];
const element = document.getElementById('alternating-text');

let i = 0;
const listener = e => {
  i = i < texts.length - 1 ? i + 1 : 0;
  element.innerHTML = texts[i];
};

element.innerHTML = texts[0];
element.addEventListener('animationiteration', listener, false);

```
