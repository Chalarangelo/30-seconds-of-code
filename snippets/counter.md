---
title: counter
tags: browser,advanced
---

Creates a counter with the specified range, step and duration for the specified selector.

- Check if `step` has the proper sign and change it accordingly.
- Use `setInterval()` in combination with `Math.abs()` and `Math.floor()` to calculate the time between each new text draw.
- Use `Document.querySelector()`, `Element.innerHTML` to update the value of the selected element.
- Omit the fourth argument, `step`, to use a default step of `1`.
- Omit the fifth argument, `duration`, to use a default duration of `2000`ms.

```js
const counter = (selector, start, end, step = 1, duration = 2000) => {
  let current = start,
    _step = (end - start) * step < 0 ? -step : step,
    timer = setInterval(() => {
      current += _step;
      document.querySelector(selector).innerHTML = current;
      if (current >= end) document.querySelector(selector).innerHTML = end;
      if (current >= end) clearInterval(timer);
    }, Math.abs(Math.floor(duration / (end - start))));
  return timer;
};
```

```js
counter('#my-id', 1, 1000, 5, 2000);
// Creates a 2-second timer for the element with id="my-id"
```
