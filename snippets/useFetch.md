---
title: useFetch
tags: hooks,effect,state,intermediate
---

Implements `fetch` in a declarative manner.

- Create a custom hook that takes a `url` and `options`.
- Use the `useState()` hook to initialize the `response` and `error` state variables.
- Use the `useEffect()` hook to asynchronously call `fetch()` and update the state variables accordingly.
- Return an object containing the `response` and `error` state variables.

```jsx
const useFetch = (url, options) => {
  const [response, setResponse] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url, options);
        const json = await res.json();
        setResponse(json);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);

  return { response, error };
};
```

```jsx
const ImageFetch = props => {
  const res = useFetch('https://dog.ceo/api/breeds/image/random', {});
  if (!res.response) {
    return <div>Loading...</div>;
  }
  const imageUrl = res.response.message;
  return (
    <div>
      <img src={imageUrl} alt="avatar" width={400} height="auto" />
    </div>
  );
};

ReactDOM.render(<ImageFetch />, document.getElementById('root'));
```
