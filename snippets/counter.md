---
title: counter
tags: browser,advanced
firstSeen: 2018-05-06T17:55:46+03:00
lastUpdated: 2020-11-01T20:50:57+02:00
---

Creates a counter with the specified range, step and duration for the specified selector.

- Check if `step` has the proper sign and change it accordingly.
- Use `setInterval()` in combination with `Math.abs()` and `Math.floor()` to calculate the time between each new text draw.
- Use `Document.querySelector()`, `Element.innerHTML` to update the value of the selected element.
- Omit the fourth argument, `step`, to use a default step of `1`.
- Omit the fifth argument, `duration`, to use a default duration of `2000`ms.

```js
const counter = (selector, startElement, endElement, step = 1, duration = 2000) => {
  let currentElement = startElement,
    _step = (endElement - startElement) * step < 0 ? -step : step,
    timer = setInterval(() => {
      currentElement += _step;
      document.querySelector(selector).innerHTML = currentElement;
      if (currentElement >= endElement) document.querySelector(selector).innerHTML = endElement;
      if (currentElement >= endElement) clearInterval(timer);
    }, Math.abs(Math.floor(duration / (endElement - startElement))));
  return timer;
};
```

```js
counter('#my-id', 1, 1000, 5, 2000);
// Creates a 2-second timer for the element with id="my-id"
```
