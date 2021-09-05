---
title: useIsomporphicEffect
tags: hooks,effect,beginner
firstSeen: 2021-09-29T05:00:00-04:00
---

Eesolves to `useEffect()` on the server and `useLayoutEffect()` on the client.

- Use `typeof` to check if the `window` object is defined and return the `useLayoutEffect()` if it is, or `useEffect()` otherwise.

```jsx
const useIsomorphicEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;
```

```jsx
const MyApp = () => {
  useIsomorphicEffect(() => {
    window.console.log('Hello');
  }, []);

  return null;
};

ReactDOM.render(<MyApp />, document.getElementById('root'));
```
