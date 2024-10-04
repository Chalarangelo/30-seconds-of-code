---
title: React useFetch hook
shortTitle: useFetch hook
language: react
tags: [hooks,effect,state]
cover: coworking-space
excerpt: Implement `fetch()` in a declarative manner using React hooks.
listed: true
dateModified: 2024-06-28
---

JavaScript's `fetch()` API is a modern way to make **network requests**. However, its promise-based nature can make it difficult to use in a declarative manner. You can create a custom hook to make it easier to use `fetch()` in React components.

For starters, we need to account for for the **state of the request**. Using the `useState()` hook, we can initialize the `response`, `error`, and `abort` state variables. We can then use the `useEffect()` hook to asynchronously call `fetch()` and update the state variables accordingly.

In order to allow the user to **abort the request**, we can create and use an `AbortController`. We can use it to cancel the request when the component unmounts. Finally, we can return an object containing the `response`, `error`, and `abort` state variables.

Depending on the state of the object returned by the `useFetch` hook, we can render different components. If there is no `response` and no `error`, we can render a loading message. If there is a `response`, we can render the image. If there is an `error`, we can render an error message. If an abort is requested, we can cancel the request.

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

ReactDOM.createRoot(document.getElementById('root')).render(
  <ImageFetch />
);
```
