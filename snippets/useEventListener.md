---
title: React useEventListener hook
tags: hooks,effect,event
author: chalarangelo
cover: blog_images/beach-riders.jpg
firstSeen: 2021-09-01T05:00:00-04:00
---

Adds an event listener for the specified event type on the given element.

- Use the `useRef()` hook to create a ref that will hold the `handler`.
- Use the `useEffect()` hook to update the value of the `savedHandler` ref any time the `handler` changes.
- Use the `useEffect()` hook to add an event listener to the given element and clean up when unmounting.
- Omit the last argument, `el`, to use the `Window` by default.

```jsx
const useEventListener = (type, handler, el = window) => {
  const savedHandler = React.useRef();

  React.useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  React.useEffect(() => {
    const listener = e => savedHandler.current(e);

    el.addEventListener(type, listener);

    return () => {
      el.removeEventListener(type, listener);
    };
  }, [type, el]);
};
```

```jsx
const MyApp = () => {
  const [coords, setCoords] = React.useState({ x: 0, y: 0 });

  const updateCoords = React.useCallback(
    ({ clientX, clientY }) => {
      setCoords({ x: clientX, y: clientY });
    },
    [setCoords]
  );

  useEventListener('mousemove', updateCoords);

  return (
    <p>Mouse coordinates: {coords.x}, {coords.y}</p>
  );
};

ReactDOM.render(<MyApp />, document.getElementById('root'));
```
