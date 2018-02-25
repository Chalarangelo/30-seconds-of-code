### recordFrames

Invokes the provided callback on each animation frame.

Use recursion. Provided that `running` is `true`, continue invoking `window.requestAnimationFrame`. Return an object 
with two methods `start` and `stop` to allow manual control of the recording. Omit the second argument, `autoStart`,
to implicitly call start when the function is invoked.

```js
const recordFrames = (callback, autoStart = true) => {
  let running = true, raf
  const stop = () => {
    running = false
    cancelAnimationFrame(raf)
  }
  const start = () => {
    running = true
    run()
  }
  const run = () => {
    raf = requestAnimationFrame(() => {
      callback()
      if (running) run()
    })
  }
  if (autoStart) start()
  return { start, stop }
}
```

```js
const cb = () => console.log('Animation frame fired')
const recorder = recordFrames(cb) // logs 'Animation frame fired' on each animation frame
recorder.stop() // stops logging
recorder.start() // starts again
const recorder2 = recordFrames(cb, false) // `start` needs to be explicitly called to begin recording frames
```
