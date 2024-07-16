---
title: React useIsomporphicEffect hook
type: snippet
language: react
tags: [hooks,effect]
cover: jars-on-shelf-2
excerpt: Resolves to `useEffect()` on the server and `useLayoutEffect()` on the client.
listed: true
dateModified: 2021-10-13
---

Resolves to `useEffect()` on the server and `useLayoutEffect()` on the client.

- Use `typeof` to check if the `Window` object is defined. If it is, return the `useLayoutEffect()`. Otherwise return `useEffect()`.

```jsx
const useIsomorphicEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

const MyApp = () => {
  useIsomorphicEffect(() => {
    window.console.log('Hello');
  }, []);

  return null;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <MyApp />
);
```
