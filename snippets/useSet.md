---
title: React useSet hook
tags: hooks,state
author: chalarangelo
cover: blog_images/engine.jpg
firstSeen: 2021-11-01T05:00:00-04:00
---

Creates a stateful `Set` object, and a set of functions to manipulate it.

- Use the `useState()` hook and the `Set` constructor to create a new `Set` from the `initialValue`.
- Use the `useMemo()` hook to create a set of non-mutating actions that manipulate the `set` state variable, using the state setter to create a new `Set` every time.
- Return the `set` state variable and the created `actions`.

```jsx
const useSet = initialValue => {
  const [set, setSet] = React.useState(new Set(initialValue));

  const actions = React.useMemo(
    () => ({
      add: item => setSet(prevSet => new Set([...prevSet, item])),
      remove: item =>
        setSet(prevSet => new Set([...prevSet].filter(i => i !== item))),
      clear: () => setSet(new Set()),
    }),
    [setSet]
  );

  return [set, actions];
};
```

```jsx
const MyApp = () => {
  const [set, { add, remove, clear }] = useSet(new Set(['apples']));

  return (
    <div>
      <button onClick={() => add(String(Date.now()))}>Add</button>
      <button onClick={() => clear()}>Reset</button>
      <button onClick={() => remove('apples')} disabled={!set.has('apples')}>
        Remove apples
      </button>
      <pre>{JSON.stringify([...set], null, 2)}</pre>
    </div>
  );
};

ReactDOM.render(<MyApp />, document.getElementById('root'));
```
