---
title: Persisting state in React
shortTitle: State persistence hooks
language: react
tags: [hooks,state,effect]
cover: red-berries
excerpt: Learn how to persist state in React using hooks and `localStorage` or `sessionStorage`.
listed: true
dateModified: 2024-07-01
---

Sometimes, you might want to **persist the state** of your React components across page reloads. You can achieve this by using the `localStorage` or `sessionStorage` APIs. But creating custom hooks for this use case might get a little tricky.

> [!CAUTION]
>
> These hook don't account for **changes** to the storage due to other code. This issue can be addressed by listening to the `'storage'` event on `Window` and updating the state accordingly.

## `useLocalStorage` hook

In order to persist a stateful value to `localStorage`, you can create a custom hook called `useLocalStorage`. This hook will return a stateful value and a function to update it.

Implementing the hook requires you to use the `useState()` hook with a function to initialize its value lazily. You can then use a `try...catch` block and `Storage.getItem()` to try and get the value from `Window.localStorage`. If no value is found, use `Storage.setItem()` to store the `defaultValue` and use it as the initial state. If an error occurs, use `defaultValue` as the initial state. Finally, define a function that will update the state variable with the passed value and use `Storage.setItem()` to store it.

```jsx
const useLocalStorage = (keyName, defaultValue) => {
  const [storedValue, setStoredValue] = React.useState(() => {
    try {
      const value = window.localStorage.getItem(keyName);

      if (value) {
        return JSON.parse(value);
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });

  const setValue = newValue => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {}
    setStoredValue(newValue);
  };

  return [storedValue, setValue];
};

const MyApp = () => {
  const [name, setName] = useLocalStorage('name', 'John');

  return <input value={name} onChange={e => setName(e.target.value)} />;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <MyApp />
);
```

## `useSessionStorage` hook

The exact same logic can be applied to persist a stateful value to `sessionStorage`. You can create a custom hook called `useSessionStorage` that returns a stateful value and a function to update it. The only difference is that you'll be using `Window.sessionStorage` instead of `Window.localStorage`.

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

const MyApp = () => {
  const [name, setName] = useSessionStorage('name', 'John');

  return <input value={name} onChange={e => setName(e.target.value)} />;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <MyApp />
);
```
