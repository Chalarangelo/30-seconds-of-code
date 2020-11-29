---
title: useUnload
tags: hooks,effect,event,intermediate
---

Handles the `beforeunload` window event.

- Use the `useRef()` hook to create a ref for the callback function, `fn`.
- Use the `useEffect()` hook and `EventTarget.addEventListener()` to handle the `'beforeunload'` (when the user is about to close the window).
- Use `EventTarget.removeEventListener()` to perform cleanup after the component is unmounted.

```jsx
const useUnload = fn => {
  const cb = React.useRef(fn);

  React.useEffect(() => {
    const onUnload = cb.current;
    window.addEventListener('beforeunload', onUnload);
    return () => {
      window.removeEventListener('beforeunload', onUnload);
    };
  }, [cb]);
};
```

```jsx
const App = () => {
  useUnload(e => {
    e.preventDefault();
    const exit = confirm('Are you sure you want to leave?');
    if (exit) window.close();
  });
  return <div>Try closing the window.</div>;
};
ReactDOM.render(<App />, document.getElementById('root'));
```
