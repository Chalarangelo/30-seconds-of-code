---
title: React useRequestAnimationFrame hook
shortTitle: useRequestAnimationFrame hook
language: react
tags: [hooks,effect]
cover: aerial-view-port
excerpt: Turn `requestAnimationFrame()` into a custom hook to animate your React components.
listed: true
dateModified: 2024-06-24
---

The `requestAnimationFrame()` method tells the browser that you wish to perform an animation and requests that the browser calls a specified function to update an animation before the next repaint. This method provides a more efficient way to perform animations in JavaScript. But what about using it in React?

As usual, a custom hook is the answer. Using the `useRef()` hook, you can create two variables to hold the **last request id** and the **last timestamp**. You can then define a function, `animate`, which updates these variables, runs the `callback`, and calls `Window.requestAnimationFrame()` perpetually.

Finally, you can use the `useEffect()` hook to initialize the value of `requestRef` using `Window.requestAnimationFrame()` and clean up when the component unmounts.

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

const Counter = () => {
  const [count, setCount] = React.useState(0);

  useRequestAnimationFrame(deltaTime => {
    setCount(prevCount => (prevCount + deltaTime * 0.01) % 100);
  });

  return <p>{Math.round(count)}</p>;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <Counter />
);
```
