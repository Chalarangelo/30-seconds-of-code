---
title: React useComponentDidMount hook
tags: hooks,effect
author: chalarangelo
cover: blog_images/highlands.jpg
firstSeen: 2020-01-03T15:56:54+02:00
lastUpdated: 2021-10-13T19:29:39+02:00
---

Executes a callback immediately after a component is mounted.

- Use the `useEffect()` hook with an empty array as the second argument. This will execute the provided callback only once when the component is mounted.
- Behaves like the `componentDidMount()` lifecycle method of class components.

```jsx
const useComponentDidMount = onMountHandler => {
  React.useEffect(() => {
    onMountHandler();
  }, []);
};
```

```jsx
const Mounter = () => {
  useComponentDidMount(() => console.log('Component did mount'));

  return <div>Check the console!</div>;
};

ReactDOM.render(<Mounter />, document.getElementById('root'));
```
