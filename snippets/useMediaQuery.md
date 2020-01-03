---
title: useMediaQuery
tags: hooks,state,effect,intermediate
---

A hook that returns a value based on a media query.

- Check if `window` and `window.matchMedia` exist, return `whenFalse` if not.
- Use `window.matchMedia()` to match the given `query`, cast its `matches` property to a boolean and store in a state variable, `match`, using `React.useState()`.
- Use `React.useEffect()` to add a listener for changes and to clean up the listeners after the hook is destroyed.
- Return either `whenTrue` or `whenFalse` based on the value of `match`.

```jsx
const useMediaQuery = (query, whenTrue, whenFalse) => {
  if (typeof window === 'undefined' || typeof window.matchMedia === 'undefined') return whenFalse;
  
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
    '(max-width: 400px)', 'Less than 400px wide', 'More than 400px wide'
  );
  
  return <span>{text}</span>;
}

ReactDOM.render(<ResponsiveText />, document.getElementById('root'));
```
