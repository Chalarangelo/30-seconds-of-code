---
title: React useComponentDidMount hook
type: snippet
language: react
tags: [hooks,effect]
author: chalarangelo
cover: green-cabin-cow
dateModified: 2021-10-13T19:29:39+02:00
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

ReactDOM.createRoot(document.getElementById('root')).render(
  <Mounter />
);
```
