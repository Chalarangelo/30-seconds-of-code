---
title: usePersistedState
tags: hooks,state,effect,advanced
---

Returns a stateful value, persisted in `localStorage`, and a function to update it.

- Use the `useState()` hook to initialize the `value` to `defaultValue`.
- Use the `useRef()` hook to create a ref that will hold the `name` of the value in `localStorage`.
- Use 3 instances of the `useEffect()` hook for initialization, `value` change and `name` change respectively.
- When the component is first mounted, use `Storage.getItem()` to update `value` if there's a stored value or `Storage.setItem()` to persist the current value.
- When `value` is updated, use `Storage.setItem()` to store the new value.
- When `name` is updated, use `Storage.setItem()` to create the new key, update the `nameRef` and use `Storage.removeItem()` to remove the previous key from `localStorage`.
- **NOTE:** The hook is meant for use with primitive values (i.e. not objects) and doesn't account for changes to `localStorage` due to other code. Both of these issues can be easily handled (e.g. JSON serialization and handling the `'storage'` event).

```jsx
const usePersistedState = (name, defaultValue) => {
  const [value, setValue] = React.useState(defaultValue);
  const nameRef = React.useRef(name);

  React.useEffect(() => {
    try {
      const storedValue = localStorage.getItem(name);
      if (storedValue !== null) setValue(storedValue);
      else localStorage.setItem(name, defaultValue);
    } catch {
      setValue(defaultValue);
    }
  }, []);

  React.useEffect(() => {
    try {
      localStorage.setItem(nameRef.current, value);
    } catch {}
  }, [value]);

  React.useEffect(() => {
    const lastName = nameRef.current;
    if (name !== lastName) {
      try {
        localStorage.setItem(name, value);
        nameRef.current = name;
        localStorage.removeItem(lastName);
      } catch {}
    }
  }, [name]);

  return [value, setValue];
};
```

```jsx
const MyComponent = ({ name }) => {
  const [val, setVal] = usePersistedState(name, 10);
  return (
    <input
      value={val}
      onChange={e => {
        setVal(e.target.value);
      }}
    />
  );
};

const MyApp = () => {
  const [name, setName] = React.useState('my-value');
  return (
    <>
      <MyComponent name={name} />
      <input
        value={name}
        onChange={e => {
          setName(e.target.value);
        }}
      />
    </>
  );
};

ReactDOM.render(<MyApp />, document.getElementById('root'));
```
