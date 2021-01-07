---
title: useAsync
tags: hooks,state,reducer,advanced
---

Handles asynchronous calls.

- Create a custom hook that takes a handler function, `fn`.
- Define a reducer function and an initial state for the custom hook's state.
- Use the `useReducer()` hook to initialize the `state` variable and the `dispatch` function.
- Define an asynchronous `run` function that will run the provided callback, `fn`, while using `dispatch` to update `state` as necessary.
- Return an object containing the properties of `state` (`value`, `error` and `loading`) and the `run` function.

```jsx
const useAsync = fn => {
  const initialState = { loading: false, error: null, value: null };
  const stateReducer = (_, action) => {
    switch (action.type) {
      case 'start':
        return { loading: true, error: null, value: null };
      case 'finish':
        return { loading: false, error: null, value: action.value };
      case 'error':
        return { loading: false, error: action.error, value: null };
    }
  };

  const [state, dispatch] = React.useReducer(stateReducer, initialState);

  const run = async (args = null) => {
    try {
      dispatch({ type: 'start' });
      const value = await fn(args);
      dispatch({ type: 'finish', value });
    } catch (error) {
      dispatch({ type: 'error', error });
    }
  };

  return { ...state, run };
};
```

```jsx
const RandomImage = props => {
  const imgFetch = useAsync(url =>
    fetch(url).then(response => response.json())
  );

  return (
    <div>
      <button
        onClick={() => imgFetch.run('https://dog.ceo/api/breeds/image/random')}
        disabled={imgFetch.isLoading}
      >
        Load image
      </button>
      <br />
      {imgFetch.loading && <div>Loading...</div>}
      {imgFetch.error && <div>Error {imgFetch.error}</div>}
      {imgFetch.value && (
        <img
          src={imgFetch.value.message}
          alt="avatar"
          width={400}
          height="auto"
        />
      )}
    </div>
  );
};

ReactDOM.render(<RandomImage />, document.getElementById('root'));
```
