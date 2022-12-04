---
title: React useFetch hook
tags: hooks,effect,state
author: chalarangelo
cover: blog_images/coworking-space.jpg
firstSeen: 2019-08-21T14:23:57+03:00
lastUpdated: 2022-05-01T12:50:38+02:00
---

Implements `fetch()` in a declarative manner.

- Create a custom hook that takes a `url` and `options`.
- Use the `useState()` hook to initialize the `response`, `error` and `abort` state variables.
- Use the `useEffect()` hook to asynchronously call `fetch()` and update the state variables accordingly.
- Create and use an `AbortController` to allow aborting the request. Use it to cancel the request when the component unmounts.
- Return an object containing the `response`, `error` and `abort` state variables.

```jsx
const useFetch = (url, options) => {
  const [response, setResponse] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [abort, setAbort] = React.useState(() => {});

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const abortController = new AbortController();
        const signal = abortController.signal;
        setAbort(abortController.abort);
        const res = await fetch(url, {...options, signal});
        const json = await res.json();
        setResponse(json);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
    return () => {
      abort();
    }
  }, []);

  return { response, error, abort };
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
