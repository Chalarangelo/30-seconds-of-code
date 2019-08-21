---
title: useInterval
tags: hooks,effect,intermediate
---

A hook that implements `setInterval` in a declarative manner.

- Create a custom hook that takes a `callback` and a `delay`.
- Use the `React.useRef()` hook to create a `ref` for the callback function.
- Use the `React.useEffect()` hook to remember the latest callback.
- Use the `Rect.useEffect()` hook to set up the interval.


```jsx
const useInterval = (callback, delay) => {
  const savedCallback = React.useRef();

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    function tick () {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};
```

```jsx
const Timer = (props) => {
  const [seconds,setSeconds] = React.useState(0);
  useInterval(() => {
    setSeconds(seconds + 1);
  }, 1000);

  return (
    <p>{seconds}</p>
  );
}

ReactDOM.render(
  <Timer />,
  document.getElementById('root')
);
```
