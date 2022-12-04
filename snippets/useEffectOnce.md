---
title: React useEffectOnce hook
tags: hooks,effect
author: chalarangelo
cover: blog_images/pop-of-green.jpg
firstSeen: 2021-11-16T05:00:00-04:00
---

Runs a callback at most once when a condition becomes true.

- Use the `useRef()` hook to create a variable, `hasRunOnce`, to keep track of the execution status of the effect.
- Use the `useEffect()` that runs only when the `when` condition changes.
- Check if `when` is `true` and the effect has not executed before. If both are `true`, run `callback` and set `hasRunOnce` to `true`.

```jsx
const useEffectOnce = (callback, when) => {
  const hasRunOnce = React.useRef(false);
  React.useEffect(() => {
    if (when && !hasRunOnce.current) {
      callback();
      hasRunOnce.current = true;
    }
  }, [when]);
};
```

```jsx
const App = () => {
  const [clicked, setClicked] = React.useState(false);
  useEffectOnce(() => {
    console.log('mounted');
  }, clicked);
  return <button onClick={() => setClicked(true)}>Click me</button>;
};

ReactDOM.render(<App />, document.getElementById('root'));
```
