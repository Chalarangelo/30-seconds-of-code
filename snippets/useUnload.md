---
title: useUnload
tags: visual,ref,effect,beginner
---

A hook that listens to `beforeunload` event and trigger the default prompt when the user is leaving or closing the browser's session

- Create a custom hook that takes a function on what do you want to do when the event is triggered
- Use the `React.useRef()` hook to create a `ref` for your function
- Use the `React.useEffect()` hook to add the listener and clean up the `beforeunload` event.

```js
// unload.js
import { useRef, useEffect } from 'react'

const useUnload = (fn) => {
  const cb = useRef(fn)
  useEffect(() => {
    const onUnload = cb.current
      window.addEventListener('beforeunload', onUnload)
      return () => {
        window.removeEventListener('beforeunload', onUnload)
      }
  }, [cb])
}

export default useUnload

```
To use this in a global level, apply it in `App.js`

```js
// App.js
import useUnload from './unload'

function App {

  useUnload((e) => {
    e.preventDefault() // Required for Firefox
    e.returnValue = ''
    delete e.returnValue
  })

  return (
    // Your app
  )
}
```
