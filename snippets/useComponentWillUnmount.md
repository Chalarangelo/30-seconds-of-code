---
title: useComponentWillUnmount
tags: hooks,effect,beginner
---

A hook that executes a callback immediately before a component is unmounted and destroyed.

- Use `React.useEffect()` with an empty array as the second argument and return the provided callback to be executed only once before cleanup.

```jsx
const useComponentWillUnmount = onUnmountHandler => {
  React.useEffect(() => () => {
    onUnmountHandler()
  }, []);
}
```

```jsx
const Unmounter = () => {
  useComponentWillUnmount(() => console.log('Component will unmount'));

  return <div>Check the console!</div>;
}

ReactDOM.render(<Unmounter />, document.getElementById('root'));
```
