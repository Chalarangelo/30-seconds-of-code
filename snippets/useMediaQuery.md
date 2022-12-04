---
title: React useMediaQuery hook
tags: hooks,state,effect
author: chalarangelo
cover: blog_images/clay-pot-horizon.jpg
firstSeen: 2020-01-03T14:39:46+02:00
lastUpdated: 2021-10-13T19:29:39+02:00
---

Checks if the current environment matches a given media query and returns the appropriate value.

- Check if `Window` and `Window.matchMedia()` exist. Return `whenFalse` if not (e.g. SSR environment or unsupported browser).
- Use `Window.matchMedia()` to match the given `query`. Cast its `matches` property to a boolean and store in a state variable, `match`, using the `useState()` hook.
- Use the `useEffect()` hook to add a listener for changes and to clean up the listeners after the hook is destroyed.
- Return either `whenTrue` or `whenFalse` based on the value of `match`.

```jsx
const useMediaQuery = (query, whenTrue, whenFalse) => {
  if (typeof window === 'undefined' || typeof window.matchMedia === 'undefined')
    return whenFalse;

  const mediaQuery = window.matchMedia(query);
  const [match, setMatch] = React.useState(!!mediaQuery.matches);

  React.useEffect(() => {
    const handler = () => setMatch(!!mediaQuery.matches);
    mediaQuery.addListener(handler);
    return () => mediaQuery.removeListener(handler);
  }, []);

  return match ? whenTrue : whenFalse;
};
```

```jsx
const ResponsiveText = () => {
  const text = useMediaQuery(
    '(max-width: 400px)',
    'Less than 400px wide',
    'More than 400px wide'
  );

  return <span>{text}</span>;
};

ReactDOM.render(<ResponsiveText />, document.getElementById('root'));
```
