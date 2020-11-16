---
title: useTimeout
tags: hooks,effect,intermediate
---

Implements `setTimeout` in a declarative manner.

- Create a custom hook that takes a `callback` and a `delay`.
- Use the `useRef()` hook to create a `ref` for the callback function.
- Use the `useEffect()` hook to remember the latest callback.
- Use the `useEffect()` hook to set up the timeout and clean up.

```jsx
const useTimeout = (callback, delay) => {
  const savedCallback = React.useRef();

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setTimeout(tick, delay);
      return () => clearTimeout(id);
    }
  }, [delay]);
};
```

```jsx
const OneSecondTimer = props => {
  const [seconds, setSeconds] = React.useState(0);
  useTimeout(() => {
    setSeconds(seconds + 1);
  }, 1000);

  return <p>{seconds}</p>;
};

ReactDOM.render(<OneSecondTimer />, document.getElementById('root'));
```
