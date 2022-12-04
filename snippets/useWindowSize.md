---
title: React useWindowSize hook
tags: hooks,state,effect
author: chalarangelo
cover: blog_images/polar-bear.jpg
firstSeen: 2021-10-18T05:00:00-04:00
---

Tracks the dimensions of the browser window.

- Use the `useState()` hook to initialize a state variable that will hold the window's dimensions. Initialize with both values set to `undefined` to avoid mismatch between server and client renders.
- Create a function that uses `Window.innerWidth` and `Window.innerHeight` to update the state variable.
- Use the `useEffect()` hook to set an appropriate listener for the `'resize'` event on mount and clean it up when unmounting.

```jsx
const useWindowSize = () => {
  const [windowSize, setWindowSize] = React.useState({
    width: undefined,
    height: undefined,
  });

  React.useEffect(() => {
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowSize;
};
```

```jsx
const MyApp = () => {
  const { width, height } = useWindowSize();

  return (
    <p>
      Window size: ({width} x {height})
    </p>
  );
};

ReactDOM.render(<MyApp />, document.getElementById('root'));
```
