---
title: Typewriter effect
tags: animation,advanced
firstSeen: 2021-05-24T16:03:40+03:00
lastUpdated: 2021-05-24T16:03:40+03:00
---

Creates a typewriter effect animation.

- Define two animations, `typing` to animate the characters and `blink` to animate the caret.
- Use the `:after` pseudo-element to add the caret to the container element.
- Use JavaScript to set the text for the inner element and set the `--characters` variable containing the character count. This variable is used to animate the text.
- Use `white-space: nowrap` and `overflow: hidden` to make content invisible as necessary.

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

.typewriter-effect:after {
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
