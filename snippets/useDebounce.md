---
title: useDebounce
tags: hooks,state,effect,intermediate
---

Debounces the given value.

- Create a custom hook that takes a `value` and a `delay`.
- Use the `useState()` hook to store the debounced value.
- Use the `useEffect()` hook to update the debounced value every time `value` is updated.
- Use `setTimeout()` to create a timeout that delays invoking the setter of the previous state variable by `delay` ms.
- Use `clearTimeout()` to clean up when dismounting the component.
- This is particularly useful when dealing with user input.

```jsx
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
};
```

```jsx
const Counter = () => {
  const [value, setValue] = React.useState(0);
  const lastValue = useDebounce(value, 500);

  return (
    <div>
      <p>
        Current: {value} - Debounced: {lastValue}
      </p>
      <button onClick={() => setValue(value + 1)}>Increment</button>
    </div>
  );
};

ReactDOM.render(<Counter />, document.getElementById('root'));
```
