---
title: React useTimeout hook
shortTitle: useTimeout hook
language: react
tags: [hooks,effect]
cover: interior-10
excerpt: Implement `setTimeout()` in a declarative manner, using a custom hook.
listed: true
dateModified: 2024-06-23
---

Have you ever wanted to use `setTimeout()` in a declarative manner in React but found it difficult to manage? You can create a custom hook to make it easier to use `setTimeout()` in React components.

> [!NOTE]
>
> It's highly suggested that you start by reading [how to implement a `useInterval` hook](/react/s/use-interval), as this implementation is very similar.

In order to create a custom hook for `setTimeout()`, you'll first need to use `useRef()` to create a `ref` for the **callback function**. You'll then use `useEffect()` to remember the latest callback and set up the timeout, as well as clean up when the component unmounts.

A second `useEffect()` hook will be used to **set up the timeout** and clean up. The `useEffect()` hook will call the `setTimeout()` function with the given `delay` and `callback`. If the `delay` is `null`, the timeout will be cleared.

```jsx
const useTimeout = (callback, delay) => {
  const savedCallback = React.useRef();

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    const tick = () => {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setTimeout(tick, delay);
      return () => clearTimeout(id);
    }
  }, [delay]);
};

const OneSecondTimer = props => {
  const [seconds, setSeconds] = React.useState(0);
  useTimeout(() => {
    setSeconds(seconds + 1);
  }, 1000);

  return <p>{seconds}</p>;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <OneSecondTimer />
);
```
