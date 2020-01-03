---
title: useComponentDidMount
tags: hooks,effect,beginner
---

A hook that executes a callback immediately after a component is mounted.

- Use `React.useEffect()` with an empty array as the second argument to execute the provided callback only once when the component is mounted.

```jsx
const useComponentDidMount = onMountHandler => {
  React.useEffect(() => {
    onMountHandler()
  }, []);
}
```

```jsx
const Mounter = () => {
  useComponentDidMount(() => console.log('Component did mount'));

  return <div>Check the console!</div>;
}

ReactDOM.render(<Mounter />, document.getElementById('root'));
```
