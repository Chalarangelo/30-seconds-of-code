---
title: useSSR
tags: hooks,effect,state,memo,intermediate
---

Checks if the code is running on the browser or the server.

- Create a custom hook that returns an appropriate object.
- Use `typeof window`, `window.document` and `Document.createElement()` to check if the code is running on the browser.
- Use the `useState()` hook to define the `inBrowser` state variable.
- Use the `useEffect()` hook to update the `inBrowser` state variable and clean up at the end.
- Use the `useMemo()` hook to memoize the return values of the custom hook.

```jsx
const isDOMavailable = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

const useSSR = () => {
  const [inBrowser, setInBrowser] = React.useState(isDOMavailable);

  React.useEffect(() => {
    setInBrowser(isDOMavailable);
    return () => {
      setInBrowser(false);
    };
  }, []);

  const useSSRObject = React.useMemo(
    () => ({
      isBrowser: inBrowser,
      isServer: !inBrowser,
      canUseWorkers: typeof Worker !== 'undefined',
      canUseEventListeners: inBrowser && !!window.addEventListener,
      canUseViewport: inBrowser && !!window.screen
    }),
    [inBrowser]
  );

  return React.useMemo(
    () => Object.assign(Object.values(useSSRObject), useSSRObject),
    [inBrowser]
  );
};
```

```jsx
const SSRChecker = props => {
  let { isBrowser, isServer } = useSSR();

  return <p>{isBrowser ? 'Running on browser' : 'Running on server'}</p>;
};

ReactDOM.render(<SSRChecker />, document.getElementById('root'));
```
