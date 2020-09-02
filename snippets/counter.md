---
title: counter
tags: browser,advanced
---

Creates a counter with the specified range, step and duration for the specified selector.

Inscrease and reduce.
Base the duration and browser property,step may change.
Use `setInterval()` in combination with `Math.abs()` and `Math.floor()` to calculate the time between each new text draw.
Use `document.querySelector().innerHTML` to update the value of the selected element.
Omit the fourth parameter, `step`, to use a default step of `1`.
Omit the fifth parameter, `duration`, to use a default duration of `2000`ms.

```js
const counter = ({selector, start, end, step, duration = 2000} = options) => {
  let current = start;
  const startTime = Date.now();
  let _step = step > 0 ? step : 1;
  const needStepCount = Math.abs(end - start) / _step;
  const DOM_MIN_TIMEOUT_VALUE = 4;
  const maxCount = duration / DOM_MIN_TIMEOUT_VALUE;
  const ActuallyCount = Math.min(needStepCount, maxCount);
  const timeLength = duration / ActuallyCount;
  _step = Math.abs(end - start) / ActuallyCount;
  const flag = end - start > 0 ? 1 : -1;
  const dom = document.querySelector(selector);
  const timer = setInterval(() => {
    current += flag * _step;
    dom.innerHTML = current;
    const ifEnd = (flag === 1 && current >= end) || (flag === -1 && current <= end);
    if (ifEnd){
      dom.innerHTML = end;
      clearInterval(timer);
    };
  }, timeLength);
  return timer;
};
```

```js
counter({
  selector: '#my-id',
  start: 1,
  end: 1000,
  step: 5,
  duration: 2000
}); // Creates a 2-second timer for the element with id="my-id"
```