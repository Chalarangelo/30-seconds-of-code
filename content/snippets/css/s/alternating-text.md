---
title: Alternating text animations
language: css
tags: [animation]
cover: italian-horizon
excerpt: Ever wondered how those alternating text animations work? Here's a simple way to create one using CSS and JavaScript.
listed: true
dateModified: 2024-09-12
---

Alternating text animations are a great way to add some playfulness to your website. They can be used to display different words or phrases in a loop, often used to showcase a unique selling point or a list of features.

Luckily, with a little CSS and JavaScript, you can create your own. Starting with the CSS, you need an element to display the content and a simple `animation` to make the text disappear.

Then, in JavaScript, you can define an array of the different words or phrases you want to alternate between and use the first one to initialize the content. By using `EventTarget.addEventListener()` to listen for the `'animationiteration'` event, you can update the content of the element to the next word in the array each time the animation completes an iteration.

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
const element = document.querySelector('.alternating');

let i = 0;
const listener = e => {
  i = i < texts.length - 1 ? i + 1 : 0;
  element.innerHTML = texts[i];
};

element.innerHTML = texts[0];
element.addEventListener('animationiteration', listener, false);
```

https://codepen.io/chalarangelo/pen/MWNybVQ

> [!CAUTION]
>
> This implementation is **not accessible to screen readers**. If you want to make it accessible, consider using ARIA attributes or other techniques to ensure that the content is still readable by all users.
