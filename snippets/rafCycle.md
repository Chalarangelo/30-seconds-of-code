---
title: rafCycle
tags: function,intermediate
---

Starts an async loop based on requestAnimationFrame (or RAF, for short) call-chain.
The `renderFunction` is called every time the browser requests another animation frame (usually with a frequency of 60 FPS).
Optionally, `renderFunction` accepts one parameter: the `time` in milliseconds (from `performance.now()`) when the call was issued.

- Create a local function (`loop`) that registers itself for the next animation frame and calls the `renderFunction`.
- Register this function to the next animation frame, in order to start the loop.

```js
const rafCycle = (renderFunction) => {
  const loop = (time) => {
    requestAnimationFrame(loop);
    renderFunction(time);
  }
  requestAnimationFrame(loop);
}
```

```js
function onRender(time) {
  // Render something (on a canvas, for example).
}

rafCycle(onRender);
```
