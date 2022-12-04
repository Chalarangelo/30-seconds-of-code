---
title: React useSearchParam hook
tags: hooks,state,effect
author: chalarangelo
cover: blog_images/coffee-phone-tray-3.jpg
firstSeen: 2021-10-13T05:00:00-04:00
---

Tracks the browser's location search param.

- Use the `useCallback()` hook to create a callback that uses the `URLSearchParams` constructor to get the current value of `param`.
- Use the `useState()` hook to create a state variable that holds the current value of the `param`.
- Use the `useEffect()` hook to set appropriate event listeners to update the state variable when mounting and clean them up when unmounting.

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
```

```jsx
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

ReactDOM.render(<MyApp />, document.getElementById('root'));
```
