---
title: React useHash hook
tags: hooks,state,effect
author: chalarangelo
cover: blog_images/book-chair.jpg
firstSeen: 2021-10-02T05:00:00-04:00
---

Tracks the browser's location hash value, and allows changing it.

- Use the `useState()` hook to lazily get the `hash` property of the `Location` object.
- Use the `useCallback()` hook to create a handler that updates the state.
- Use the `useEffect()` hook to add a listener for the `'hashchange'` event when mounting and clean it up when unmounting.
- Use the `useCallback()` hook to create a function that updates the `hash` property of the `Location` object with the given value.

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
```

```jsx
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

ReactDOM.render(<MyApp />, document.getElementById('root'));
```
