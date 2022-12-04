---
title: React useMap hook
tags: hooks,state
author: chalarangelo
cover: blog_images/work-hard-computer.jpg
firstSeen: 2021-11-06T05:00:00-04:00
---

Creates a stateful `Map` object, and a set of functions to manipulate it.

- Use the `useState()` hook and the `Map` constructor to create a new `Map` from the `initialValue`.
- Use the `useMemo()` hook to create a set of non-mutating actions that manipulate the `map` state variable, using the state setter to create a new `Map` every time.
- Return the `map` state variable and the created `actions`.

```jsx
const useMap = initialValue => {
  const [map, setMap] = React.useState(new Map(initialValue));

  const actions = React.useMemo(
    () => ({
      set: (key, value) =>
        setMap(prevMap => {
          const nextMap = new Map(prevMap);
          nextMap.set(key, value);
          return nextMap;
        }),
      remove: (key, value) =>
        setMap(prevMap => {
          const nextMap = new Map(prevMap);
          nextMap.delete(key, value);
          return nextMap;
        }),
      clear: () => setMap(new Map()),
    }),
    [setMap]
  );

  return [map, actions];
};
```

```jsx
const MyApp = () => {
  const [map, { set, remove, clear }] = useMap([['apples', 10]]);

  return (
    <div>
      <button onClick={() => set(Date.now(), new Date().toJSON())}>Add</button>
      <button onClick={() => clear()}>Reset</button>
      <button onClick={() => remove('apples')} disabled={!map.has('apples')}>
        Remove apples
      </button>
      <pre>
        {JSON.stringify(
          [...map.entries()].reduce(
            (acc, [key, value]) => ({ ...acc, [key]: value }),
            {}
          ),
          null,
          2
        )}
      </pre>
    </div>
  );
};

ReactDOM.render(<MyApp />, document.getElementById('root'));
```
