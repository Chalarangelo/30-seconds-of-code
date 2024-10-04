---
title: React useError hook
shortTitle: useError hook
language: react
tags: [hooks,state,effect]
cover: cloudy-mountaintop
excerpt: Use this little trick to create an error dispatcher in React.
listed: true
dateModified: 2024-06-25
---

Throwing errors is more or less unavoidable in any application. React provides some built-in error boundaries to catch these errors, but sometimes you might want to **throw an error from a component**. This is where a custom hook can come in handy.

Creating an error dispatcher hook is fairly straightforward. All you need is a state variable to hold the error and a function to update it.

That being said, you'll need to use the `useState()`, `useEffect()`, and `useCallback()` hooks to create the state variable, throw the error, and update the state, respectively.

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

const ErrorButton = () => {
  const dispatchError = useError();

  const clickHandler = () => {
    dispatchError(new Error('Error!'));
  };

  return <button onClick={clickHandler}>Throw error</button>;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <ErrorButton />
);
```
