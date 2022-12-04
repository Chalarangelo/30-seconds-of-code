---
title: React useDelayedState hook
tags: hooks,state,effect
cover: blog_images/city-view.jpg
firstSeen: 2021-12-15T05:00:00-04:00
---

Delays creating a stateful value until some condition is met.

- Use the `useState()` hook to create a stateful value containing the actual `state` and a boolean, `loaded`.
- Use the `useEffect()` hook to update the stateful value if the `condition` or `loaded` changes.
- Create a function, `updateState`, that only updates the `state` value if `loaded` is truthy.

```jsx
const useDelayedState = (initialState, condition) => {
  const [{ state, loaded }, setState] = React.useState({
    state: null,
    loaded: false,
  });

  React.useEffect(() => {
    if (!loaded && condition) setState({ state: initialState, loaded: true });
  }, [condition, loaded]);

  const updateState = newState => {
    if (!loaded) return;
    setState({ state: newState, loaded });
  };

  return [state, updateState];
};
```

```jsx
const App = () => {
  const [branches, setBranches] = React.useState([]);
  const [selectedBranch, setSelectedBranch] = useDelayedState(
    branches[0],
    branches.length
  );

  React.useEffect(() => {
    const handle = setTimeout(() => {
      setBranches(['master', 'staging', 'test', 'dev']);
    }, 2000);
    return () => {
      handle && clearTimeout(handle);
    };
  }, []);

  return (
    <div>
      <p>Selected branch: {selectedBranch}</p>
      <select onChange={e => setSelectedBranch(e.target.value)}>
        {branches.map(branch => (
          <option key={branch} value={branch}>
            {branch}
          </option>
        ))}
      </select>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```
