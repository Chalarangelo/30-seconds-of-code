---
title: Record animation frames
type: snippet
language: javascript
tags: [browser,recursion]
cover: mac-and-coffee
dateModified: 2020-10-22
---

Invokes the provided callback on each animation frame.

- Use recursion.
- Provided that `running` is `true`, continue invoking `Window.requestAnimationFrame()` which invokes the provided callback.
- Return an object with two methods `start` and `stop` to allow manual control of the recording.
- Omit the second argument, `autoStart`, to implicitly call `start` when the function is invoked.

```js
const recordAnimationFrames = (callback, autoStart = true) => {
  let running = false,
    raf;
  const stop = () => {
    if (!running) return;
    running = false;
    cancelAnimationFrame(raf);
  };
  const start = () => {
    if (running) return;
    running = true;
    run();
  };
  const run = () => {
    raf = requestAnimationFrame(() => {
      callback();
      if (running) run();
    });
  };
  if (autoStart) start();
  return { start, stop };
};
```

```js
const cb = () => console.log('Animation frame fired');
const recorder = recordAnimationFrames(cb);
// logs 'Animation frame fired' on each animation frame
recorder.stop(); // stops logging
recorder.start(); // starts again
const recorder2 = recordAnimationFrames(cb, false);
// `start` needs to be explicitly called to begin recording frames
```
