---
title: React useMergeState hook
tags: hooks,state
author: chalarangelo
cover: blog_images/digital-nomad-6.jpg
firstSeen: 2021-09-23T05:00:00-04:00
---

Creates a stateful value, and a function to update it by merging the new state provided.

- Use the `useState()` hook to create a state variable, initializing it to `initialState`.
- Create a function that will update the state variable by merging the new state provided with the existing one. If the new state is a function, call it with the previous state as the argument and use the result.
- Omit the argument, to initialize the state variable with an empty object (`{}`).

```jsx
const useMergeState = (initialState = {}) => {
  const [value, setValue] = React.useState(initialState);

  const mergeState = newState => {
    if (typeof newState === 'function') newState = newState(value);
    setValue({ ...value, ...newState });
  };

  return [value, mergeState];
};
```

```jsx
const MyApp = () => {
  const [data, setData] = useMergeState({ name: 'John', age: 20 });

  return (
    <>
      <input
        value={data.name}
        onChange={e => setData({ name: e.target.value })}
      />
      <button onClick={() => setData(({ age }) => ({ age: age - 1 }))}>
        -
      </button>
      {data.age}
      <button onClick={() => setData(({ age }) => ({ age: age + 1 }))}>
        +
      </button>
    </>
  );
};

ReactDOM.render(<MyApp />, document.getElementById('root'));
```
