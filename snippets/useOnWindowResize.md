---
title: React useOnWindowResize hook
tags: hooks,effect,event
author: chalarangelo
cover: blog_images/flower-camera.jpg
firstSeen: 2021-12-01T05:00:00-04:00
---

Executes a callback whenever the window is resized.

- Use the `useRef()` hook to create a variable, `listener`, which will hold the listener reference.
- Use the `useEffect()` hook and `EventTarget.addEventListener()` to listen to the `'resize'` event of the `Window` global object.
- Use `EventTarget.removeEventListener()` to remove any existing listeners and clean up when the component unmounts.

```jsx
const useOnWindowResize = callback => {
  const listener = React.useRef(null);

  React.useEffect(() => {
    if (listener.current)
      window.removeEventListener('resize', listener.current);
    listener.current = window.addEventListener('resize', callback);
    return () => {
      window.removeEventListener('resize', listener.current);
    };
  }, [callback]);
};
```

```jsx
const App = () => {
  useOnWindowResize(() =>
    console.log(`window size: (${window.innerWidth}, ${window.innerHeight})`)
  );
  return <p>Resize the window and check the console</p>;
};

ReactDOM.render(<App />, document.getElementById('root'));
```
