---
title: Alternating text
type: snippet
language: css
tags: [animation]
cover: italian-horizon
dateModified: 2023-05-25T15:04:40+03:00
---

Creates an alternating text animation.

- Create a `<span>` for the text that will be alternated.
- Define an animation `alternate-text` that makes the `<span>` disappear by setting `display: none`.
- Use JavaScript to define an array of the different words that will be alternated and use the first word to initialize the content of the `<span>`.
- Define an event listener that will be triggered when an iteration of the animation is completed.
- Every time the event is triggered, the next word from the array is set as content of the `<span>`.

```html
<p>
  I love coding in <span class="alternating" id="alternating-text"></span>.
</p>
```

```css
.alternating{
  animation-name: alternate-text;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: ease;
}

@keyframes alternate-text {
  90% {
    display: none;
  }
}
```

```js
const text = ['Java','Python','C','C++','C#','Javascript'];
const dynamicallyAlternatingText = document.getElementById('alternating-text');
dynamicallyAlternatingText.innerHTML = text[0];
dynamicallyAlternatingText.addEventListener("animationiteration", listener, false);

let i = 0;

function listener(event){
  if (i<text.length-1){
    i++;
  }else{
    i = 0;
  }
  dynamicallyAlternatingText.innerHTML = text[i];
}
```
