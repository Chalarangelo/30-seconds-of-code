---
title: React useComponentDidUpdate hook
tags: hooks,effect
author: chalarangelo
cover: blog_images/flower-portrait-10.jpg
firstSeen: 2021-11-09T05:00:00-04:00
---

Executes a callback immediately after a component is updated.

- Use the `useRef()` hook to create a variable, `mounted`, that tracks if the component has been mounted.
- Use the `useEffect()` hook to set the value of `mounted` to `true` the first time the hook is executed.
- Run the provided `callback` on subsequent hook executions.
- Providing a dependency array for the second argument, `condition`, will only execute the hook if any of the dependencies change.
- Behaves like the `componentDidUpdate()` lifecycle method of class components.

```jsx
const useComponentDidUpdate = (callback, condition) => {
  const mounted = React.useRef(false);
  React.useEffect(() => {
    if (mounted.current) callback();
    else mounted.current = true;
  }, condition);
};
```

```jsx
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

ReactDOM.render(<App />, document.getElementById('root'));
```
