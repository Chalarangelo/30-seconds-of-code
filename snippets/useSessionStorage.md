---
title: React useSessionStorage hook
tags: hooks,state
author: chalarangelo
cover: blog_images/white-laptop.jpg
firstSeen: 2021-09-15T05:00:00-04:00
---

Creates a stateful value that is persisted to `sessionStorage`, and a function to update it.

- Use the `useState()` hook with a function to initialize its value lazily.
- Use a `try...catch` block and `Storage.getItem()` to try and get the value from `Window.sessionStorage`. If no value is found, use `Storage.setItem()` to store the `defaultValue` and use it as the initial state. If an error occurs, use `defaultValue` as the initial state.
- Define a function that will update the state variable with the passed value and use `Storage.setItem()` to store it.

```jsx
const useSessionStorage = (keyName, defaultValue) => {
  const [storedValue, setStoredValue] = React.useState(() => {
    try {
      const value = window.sessionStorage.getItem(keyName);

      if (value) {
        return JSON.parse(value);
      } else {
        window.sessionStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });

  const setValue = newValue => {
    try {
      window.sessionStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {}
    setStoredValue(newValue);
  };

  return [storedValue, setValue];
};
```

```jsx
const MyApp = () => {
  const [name, setName] = useSessionStorage('name', 'John');

  return <input value={name} onChange={e => setName(e.target.value)} />;
};

ReactDOM.render(<MyApp />, document.getElementById('root'));
```
