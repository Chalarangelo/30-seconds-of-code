---
title: How can I implement React's lifecycle methods using hooks?
shortTitle: Lifecycle hooks
language: react
tags: [hooks,effect]
cover: green-cabin-cow
excerpt: If you're transitioning from class components to functional components, you can replicate the behavior of lifecycle methods using hooks.
listed: true
dateModified: 2024-07-02
---

If you're transitioning from **class components** to functional components, you might find yourself in need of replicating the behavior of **lifecycle methods**. Luckily, hooks can take care of that for you.

## `useComponentDidMount` hook

For the `componentDidMount` lifecycle method, you can use the `useEffect()` hook with an empty array as the second argument. This will execute the provided callback only once when the **component is mounted**.

```jsx
const useComponentDidMount = onMountHandler => {
  React.useEffect(() => {
    onMountHandler();
  }, []);
};

const Mounter = () => {
  useComponentDidMount(() => console.log('Component did mount'));

  return <div>Check the console!</div>;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <Mounter />
);
```

## `useComponentDidUpdate` hook

For the `componentDidUpdate` lifecycle method, you can use the `useEffect()` hook with a condition as the second argument. This will execute the provided callback **every time** the condition changes.

In order to replicate the behavior of `componentDidUpdate`, you can use the `useRef()` hook to create a variable, `mounted`, that tracks if the component has been mounted. Then, use the `useEffect()` hook to set the value of `mounted` to `true` the first time the hook is executed. Run the provided `callback` on subsequent hook executions.

Providing a dependency array for the second argument, `condition`, will only execute the hook if any of the dependencies change.

```jsx
const useComponentDidUpdate = (callback, condition) => {
  const mounted = React.useRef(false);
  React.useEffect(() => {
    if (mounted.current) callback();
    else mounted.current = true;
  }, condition);
};

const App = () => {
  const [value, setValue] = React.useState(0);
  const [otherValue, setOtherValue] = React.useState(1);

  useComponentDidUpdate(() => {
    console.log(`Current value is ${value}.`);
  }, [value]);

  return (
    <>
      <p>
        Value: {value}, other value: {otherValue}
      </p>
      <button onClick={() => setValue(value + 1)}>Increment value</button>
      <button onClick={() => setOtherValue(otherValue + 1)}>
        Increment other value
      </button>
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
);
```

## `useComponentWillUnmount` hook

Finally, for the `componentWillUnmount` lifecycle method, you can use the `useEffect()` hook with an empty array as the second argument. Return the provided callback to be executed only once **before cleanup**.

```jsx
const useComponentWillUnmount = onUnmountHandler => {
  React.useEffect(
    () => () => {
      onUnmountHandler();
    },
    []
  );
};

const Unmounter = () => {
  useComponentWillUnmount(() => console.log('Component will unmount'));

  return <div>Check the console!</div>;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <Unmounter />
);
```
