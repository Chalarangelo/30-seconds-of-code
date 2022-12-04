---
title: React useRequestAnimationFrame hook
tags: hooks,effect
author: chalarangelo
cover: blog_images/aerial-view-port.jpg
firstSeen: 2021-12-29T05:00:00-04:00
---

Runs an animating function, calling it before every repaint.

- Use the `useRef()` hook to create two variables. `requestRef` will hold the last request id and `previousTimeRef` will hold the last timestamp.
- Define a function, `animate`, which handles updating these variables, runs the `callback` and calls `Window.requestAnimationFrame()` perpetually.
- Use the `useEffect()` hook with an empty array to initialize the value of `requestRef` using `Window.requestAnimationFrame()`. Use the returned value and `Window.cancelAnimationFrame()` to clean up when the component unmounts.

```jsx
const useRequestAnimationFrame = callback => {
  const requestRef = React.useRef();
  const previousTimeRef = React.useRef();

  const animate = time => {
    if (previousTimeRef.current) callback(time - previousTimeRef.current);
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  React.useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);
};
```

```jsx
const Counter = () => {
  const [count, setCount] = React.useState(0);

  useRequestAnimationFrame(deltaTime => {
    setCount(prevCount => (prevCount + deltaTime * 0.01) % 100);
  });

  return <p>{Math.round(count)}</p>;
};

ReactDOM.render(<Counter />, document.getElementById('root'));
```
