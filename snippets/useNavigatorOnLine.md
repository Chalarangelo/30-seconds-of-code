---
title: useNavigatorOnLine
tags: hooks,state,effect,intermediate
---

Checks if the client is online or offline.

- Create a function, `getOnLineStatus`, that uses the `NavigatorOnLine` web API to get the online status of the client.
- Use the `useState()` hook to create an appropriate state variable, `status`, and setter.
- Use the `useEffect()` hook to add listeners for appropriate events, updating state, and cleanup those listeners when unmounting.
- Finally return the `status` state variable.

```jsx
const getOnLineStatus = () =>
  typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean'
    ? navigator.onLine
    : true;

const useNavigatorOnLine = () => {
  const [status, setStatus] = React.useState(getOnLineStatus());

  const setOnline = () => setStatus(true);
  const setOffline = () => setStatus(false);

  React.useEffect(() => {
    window.addEventListener('online', setOnline);
    window.addEventListener('offline', setOffline);

    return () => {
      window.removeEventListener('online', setOnline);
      window.removeEventListener('offline', setOffline);
    };
  }, []);

  return status;
};
```

```jsx
const StatusIndicator = () => {
  const isOnline = useNavigatorOnLine();

  return <span>You are {isOnline ? 'online' : 'offline'}.</span>;
};

ReactDOM.render(<StatusIndicator />, document.getElementById('root'));
```
