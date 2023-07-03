---
title: React useDefault hook
type: snippet
language: react
tags: [hooks,state]
author: chalarangelo
cover: flower-portrait-8
dateModified: 2021-10-23T05:00:00-04:00
---

Creates a stateful value with a default fallback if it's `null` or `undefined`, and a function to update it.

- Use the `useState()` hook to create stateful value.
- Check if the value is either `null` or `undefined`.
- Return the `defaultState` if it is, otherwise return the actual `value` state, alongside the `setValue` function.

```jsx
const useDefault = (defaultState, initialState) => {
  const [value, setValue] = React.useState(initialState);
  const isValueEmpty = value === undefined || value === null;
  return [isValueEmpty ? defaultState : value, setValue];
};
```

```jsx
const UserCard = () => {
  const [user, setUser] = useDefault({ name: 'Adam' }, { name: 'John' });

  return (
    <>
      <div>User: {user.name}</div>
      <input onChange={e => setUser({ name: e.target.value })} />
      <button onClick={() => setUser(null)}>Clear</button>
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserCard />
);
```
