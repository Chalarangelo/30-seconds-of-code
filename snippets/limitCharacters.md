---
title: limitCharacters
tags: math,intermediate
---

Limit characters in an element, such as a text input.

```
const limitCharaters = (element, maxLength) => {
  if (element.value.length >= maxLength) {
    element.value = element.value.substr(0, maxLength)
  }
}
```
```
let el = document.getElementById('#text-input')
el.addEventListener('input', function() {
  limitCharaters(el, 12)
} // limits input of element with id 'text-input' to a length of 12 characters
```
