---
title: Typewriter effect
language: css
tags: [animation]
cover: italian-horizon
excerpt: Create a typewriter effect animation with CSS variables and just a sprinkle of JavaScript.
listed: true
dateModified: 2024-09-06
---

Aren't typewriter effects cool? They can be used to create a sense of suspense or to make your content more engaging. You can easily create a typewriter effect using [CSS variables](/css/s/variables) and just a sprinkle of JavaScript.

You'll first need to define **two animations**, `typing` to animate the **characters** and `blink` to animate the **caret**. You can use the `::after` pseudo-element to add the caret to the container element. Then, you can use JavaScript to set the text for the inner element and set the `--characters` variable containing the character count. This variable is used to animate the text.

Finally, use `white-space: nowrap` and `overflow: hidden` to make content invisible as necessary.

https://codepen.io/chalarangelo/pen/wvVKZML

```html
<div class="typewriter-effect">
  <div class="text" id="typewriter-text"></div>
</div>
```

```css
.typewriter-effect {
  display: flex;
  justify-content: center;
  font-family: monospace;
}

.typewriter-effect > .text {
  max-width: 0;
  animation: typing 3s steps(var(--characters)) infinite;
  white-space: nowrap;
  overflow: hidden;
}

.typewriter-effect::after {
  content: " |";
  animation: blink 1s infinite;
  animation-timing-function: step-end;
}

@keyframes typing {
  75%,
  100% {
    max-width: calc(var(--characters) * 1ch);
  }
}

@keyframes blink {
  0%,
  75%,
  100% {
    opacity: 1;
  }
  25% {
    opacity: 0;
  }
}
```

```js
const typeWriter = document.getElementById('typewriter-text');
const text = 'Lorem ipsum dolor sit amet.';

typeWriter.innerHTML = text;
typeWriter.style.setProperty('--characters', text.length);
```
