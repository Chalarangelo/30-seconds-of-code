---
title: useToggler
tags: hooks,state,callback,beginner
---

Provides a boolean state variable that can be toggled between its two states.

- Use the `useState()` hook to create the `value` state variable and its setter.
- Create a function that toggles the value of the `value` state variable and memoize it, using the `useCallback()` hook.
- Return the `value` state variable and the memoized toggler function.

```jsx
const useToggler = initialState => {
  const [value, setValue] = React.useState(initialState);

  const toggleValue = React.useCallback(() => setValue(prev => !prev), []);

  return [value, toggleValue];
};
```

```jsx
const Switch = () => {
  const [val, toggleVal] = useToggler(false);
  return <button onClick={toggleVal}>{val ? 'ON' : 'OFF'}</button>;
};
ReactDOM.render(<Switch />, document.getElementById('root'));
```
