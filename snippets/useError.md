---
title: React useError hook
tags: hooks,state,effect
author: chalarangelo
cover: blog_images/baloons-field.jpg
firstSeen: 2021-09-30T05:00:00-04:00
---

Creates an error dispatcher.

- Use the `useState()` hook to create a state variable that holds the error.
- Use the `useEffect()` hook to `throw` the error whenever it's  truthy.
- Use the `useCallback()` hook to update the state and return the cached function.

```jsx
const useError = err => {
  const [error, setError] = React.useState(err);

  React.useEffect(() => {
    if (error) throw error;
  }, [error]);

  const dispatchError = React.useCallback(err => {
    setError(err);
  }, []);

  return dispatchError;
};
```

```jsx
const ErrorButton = () => {
  const dispatchError = useError();

  const clickHandler = () => {
    dispatchError(new Error('Error!'));
  };

  return <button onClick={clickHandler}>Throw error</button>;
};

ReactDOM.render(<ErrorButton />, document.getElementById('root'));
```
