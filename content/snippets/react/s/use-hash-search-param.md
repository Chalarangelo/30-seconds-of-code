---
title: React useHash and useSearchParam hooks
shortTitle: useHash and useSearchParam hooks
language: react
tags: [hooks,state,effect]
cover: capsule-coffee
excerpt: Track the browser's location hash value and search params with this pair of custom hooks.
listed: true
dateModified: 2024-06-30
---

If you want to track the browser's location hash value or search params in React, you can create a couple of custom hooks to handle this. While seemingly simple, listening for changes in these values can be a little tricky, but also quite useful.

## `useHash` hook

Tracking the browser's **location hash** value is the easier of the two tasks. All you need to do is create a custom hook that uses the `useState()` hook to lazily get the `hash` property of the `Location` object.

You can then use the `useCallback()` hook to create a handler that updates the state. Finally, use the `useEffect()` hook to add a listener for the `'hashchange'` event when mounting and clean it up when unmounting.

```jsx
const useHash = () => {
  const [hash, setHash] = React.useState(() => window.location.hash);

  const hashChangeHandler = React.useCallback(() => {
    setHash(window.location.hash);
  }, []);

  React.useEffect(() => {
    window.addEventListener('hashchange', hashChangeHandler);
    return () => {
      window.removeEventListener('hashchange', hashChangeHandler);
    };
  }, []);

  const updateHash = React.useCallback(
    newHash => {
      if (newHash !== hash) window.location.hash = newHash;
    },
    [hash]
  );

  return [hash, updateHash];
};

const MyApp = () => {
  const [hash, setHash] = useHash();

  React.useEffect(() => {
    setHash('#list');
  }, []);

  return (
    <>
      <p>window.location.href: {window.location.href}</p>
      <p>Edit hash: </p>
      <input value={hash} onChange={e => setHash(e.target.value)} />
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <MyApp />
);
```

## `useSearchParam` hook

For the **search params**, the process is similar but a little more involved. You can create a custom hook that uses the `useState()` hook to lazily get the value of a specific search param using the `URLSearchParams()` constructor.

Then, use the `useCallback()` hook to create a handler that updates the state. Finally, use the `useEffect()` hook to add listeners for the `'popstate'`, `'pushstate'`, and `'replacestate'` events when mounting and clean them up when unmounting.

```jsx
const useSearchParam = param => {
  const getValue = React.useCallback(
    () => new URLSearchParams(window.location.search).get(param),
    [param]
  );

  const [value, setValue] = React.useState(getValue);

  React.useEffect(() => {
    const onChange = () => {
      setValue(getValue());
    };

    window.addEventListener('popstate', onChange);
    window.addEventListener('pushstate', onChange);
    window.addEventListener('replacestate', onChange);

    return () => {
      window.removeEventListener('popstate', onChange);
      window.removeEventListener('pushstate', onChange);
      window.removeEventListener('replacestate', onChange);
    };
  }, []);

  return value;
};

const MyApp = () => {
  const post = useSearchParam('post');

  return (
    <>
      <p>Post param value: {post || 'null'}</p>
      <button
        onClick={() =>
          history.pushState({}, '', location.pathname + '?post=42')
        }
      >
        View post 42
      </button>
      <button onClick={() => history.pushState({}, '', location.pathname)}>
        Exit
      </button>
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <MyApp />
);
```
