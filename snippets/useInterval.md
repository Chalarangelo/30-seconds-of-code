---
title: React useInterval hook
tags: hooks,effect
author: chalarangelo
cover: blog_images/digital-nomad-13.jpg
firstSeen: 2019-08-21T13:18:52+03:00
lastUpdated: 2020-11-16T14:17:53+02:00
---

Implements `setInterval()` in a declarative manner.

- Create a custom hook that takes a `callback` and a `delay`.
- Use the `useRef()` hook to create a `ref` for the callback function.
- Use a `useEffect()` hook to remember the latest `callback` whenever it changes.
- Use a `useEffect()` hook dependent on `delay` to set up the interval and clean up.

```jsx
const useInterval = (callback, delay) => {
  const savedCallback = React.useRef();

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    const tick = () => {
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
const Timer = props => {
  const [seconds, setSeconds] = React.useState(0);
  useInterval(() => {
    setSeconds(seconds + 1);
  }, 1000);

  return <p>{seconds}</p>;
};

ReactDOM.render(<Timer />, document.getElementById('root'));
```
