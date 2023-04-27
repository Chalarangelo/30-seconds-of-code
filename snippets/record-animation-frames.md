---
title: Record animation frames
tags: browser,recursion
cover: curve
firstSeen: 2018-02-28T08:19:07+02:00
lastUpdated: 2020-10-22T20:24:04+03:00
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
