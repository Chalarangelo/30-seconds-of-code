---
title: React useGetSet hook
type: snippet
language: react
tags: [hooks,state]
author: chalarangelo
cover: interior-12
dateModified: 2021-10-27T05:00:00-04:00
---

Creates a stateful value, returning a getter and a setter function.

- Use the `useRef()` hook to create a ref that holds the stateful value, initializing it with `initialState`.
- Use the `useReducer()` hook that creates a new object every time it's updated and return its dispatch.
- Use the `useMemo()` hook to memoize a pair of functions. The first one will return the current value of the `state` ref and the second one will update it and force a re-render.

```jsx
const useGetSet = initialState => {
  const state = React.useRef(initialState);
  const [, update] = React.useReducer(() => ({}));

  return React.useMemo(
    () => [
      () => state.current,
      newState => {
        state.current = newState;
        update();
      },
    ],
    []
  );
};
```

```jsx
const Counter = () => {
  const [getCount, setCount] = useGetSet(0);
  const onClick = () => {
    setTimeout(() => {
      setCount(getCount() + 1);
    }, 1_000);
  };

  return <button onClick={onClick}>Count: {getCount()}</button>;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <Counter />
);
```
