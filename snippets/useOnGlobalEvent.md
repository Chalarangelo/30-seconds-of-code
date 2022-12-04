---
title: React useOnGlobalEvent hook
tags: hooks,effect,event
author: chalarangelo
cover: blog_images/tropical-bike.jpg
firstSeen: 2021-12-22T05:00:00-04:00
---

Executes a callback whenever an event occurs on the global object.

- Use the `useRef()` hook to create a variable, `listener`, which will hold the listener reference.
- Use the `useRef()` hook to create a variable that will hold the previous values of the `type` and `options` arguments.
- Use the `useEffect()` hook and `EventTarget.addEventListener()` to listen to the given event `type` on the `Window` global object.
- Use `EventTarget.removeEventListener()` to remove any existing listeners and clean up when the component unmounts.

```jsx
const useOnGlobalEvent = (type, callback, options) => {
  const listener = React.useRef(null);
  const previousProps = React.useRef({ type, options });

  React.useEffect(() => {
    const { type: previousType, options: previousOptions } = previousProps;

    if (listener.current) {
      window.removeEventListener(
        previousType,
        listener.current,
        previousOptions
      );
    }

    listener.current = window.addEventListener(type, callback, options);
    previousProps.current = { type, options };

    return () => {
      window.removeEventListener(type, listener.current, options);
    };
  }, [callback, type, options]);
};
```

```jsx
const App = () => {
  useOnGlobalEvent('mousemove', e => {
    console.log(`(${e.x}, ${e.y})`);
  });

  return <p>Move your mouse around</p>;
};

ReactDOM.render(<App />, document.getElementById('root'));
```
