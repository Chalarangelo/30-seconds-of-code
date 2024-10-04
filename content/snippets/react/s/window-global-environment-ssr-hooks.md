---
title: React hooks to handle window and environment events
shortTitle: Window and environment hooks
language: react
tags: [hooks,state,effect,event,memo]
cover: jars-on-shelf-2
excerpt: Learn how to use React hooks to handle window events, media queries, server-side rendering and more.
listed: true
dateModified: 2024-06-29
---

Handling **window** and **environment** events and changes in React components is definitely not a one-size-fits-all solution. However, React hooks can make it easier to manage these events and changes in a more organized way.

## `useUnload` hook

The `useUnload` hook is used to handle the `beforeunload` window event. This event is triggered when the user is **about to close the window**.

In order to implement this hook, you'll need to use the `useRef()` and `useEffect()` hooks. The `useRef()` hook is used to create a ref for the callback function, `fn`. The `useEffect()` hook is used to handle the `'beforeunload'` event by using `EventTarget.addEventListener()`. Finally, `EventTarget.removeEventListener()` is used to perform cleanup after the component is unmounted.

```jsx
const useUnload = fn => {
  const cb = React.useRef(fn);

  React.useEffect(() => {
    const onUnload = cb.current;
    window.addEventListener('beforeunload', onUnload);
    return () => {
      window.removeEventListener('beforeunload', onUnload);
    };
  }, [cb]);
};

const App = () => {
  useUnload(e => {
    e.preventDefault();
    const exit = confirm('Are you sure you want to leave?');
    if (exit) window.close();
  });
  return <div>Try closing the window.</div>;
};
ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
);
```

## `useOnline` hook

To check if a client is **online or offline**, you can use the `useOnline` hook. This hook uses the `Navigator.onLine` web API to get the online status of the client.

Implementation-wise, you'll need to create a function, `getOnLineStatus`, that uses the `Navigator.onLine` web API to get the online status of the client. You'll also need to use the `useState()` hook to create an appropriate state variable, `status`, and setter.

The `useEffect()` hook is used to add listeners for appropriate events, updating state, and cleanup those listeners when unmounting. Finally, the `status` state variable is returned.

```jsx
const getOnLineStatus = () =>
  typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean'
    ? navigator.onLine
    : true;

const useOnline = () => {
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

const StatusIndicator = () => {
  const isOnline = useOnline();

  return <span>You are {isOnline ? 'online' : 'offline'}.</span>;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <StatusIndicator />
);
```

## `useWindowSize` hook

Tracking the **browser window's dimensions** can be useful for responsive design. The `useWindowSize` hook can be used to track the dimensions of the browser window.

Using the `useState()` hook, you can initialize a state variable that will hold the window's dimensions. Initialize with both values set to `undefined` to avoid mismatch between server and client renders.

Then, create a function that uses `Window.innerWidth` and `Window.innerHeight` to update the state variable. Finally, use the `useEffect()` hook to set an appropriate listener for the `'resize'` event on mount and clean it up when unmounting.

```jsx
const useWindowSize = () => {
  const [windowSize, setWindowSize] = React.useState({
    width: undefined,
    height: undefined,
  });

  React.useEffect(() => {
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowSize;
};

const MyApp = () => {
  const { width, height } = useWindowSize();

  return (
    <p>
      Window size: ({width} x {height})
    </p>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <MyApp />
);
```

## `useOnWindowResize`

All's good and well, but what about when you want to execute a callback whenever the **window is resized**? The `useOnWindowResize` hook can help you with that.

In order to implement it, you'll need to listen for the `'resize'` event on the `Window` global object. The `useRef()` hook is used to create a variable, `listener`, which will hold the listener reference.

The `useEffect()` hook is used to listen to the `'resize'` event of the `Window` global object. Finally, `EventTarget.removeEventListener()` is used to remove any existing listeners and clean up when the component unmounts.

```jsx
const useOnWindowResize = callback => {
  const listener = React.useRef(null);

  React.useEffect(() => {
    if (listener.current)
      window.removeEventListener('resize', listener.current);
    listener.current = window.addEventListener('resize', callback);
    return () => {
      window.removeEventListener('resize', listener.current);
    };
  }, [callback]);
};

const App = () => {
  useOnWindowResize(() =>
    console.log(`window size: (${window.innerWidth}, ${window.innerHeight})`)
  );
  return <p>Resize the window and check the console</p>;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
);
```

## `useOnWindowScroll` hook

Similar to the `useOnWindowResize` hook, the `useOnWindowScroll` hook executes a callback whenever the **window is scrolled**.

The implementation is virtually identical to the previous hook, except that it listens for the `'scroll'` event instead of the `'resize'` event.

```jsx
const useOnWindowScroll = callback => {
  const listener = React.useRef(null);

  React.useEffect(() => {
    if (listener.current)
      window.removeEventListener('scroll', listener.current);
    listener.current = window.addEventListener('scroll', callback);
    return () => {
      window.removeEventListener('scroll', listener.current);
    };
  }, [callback]);
};

const App = () => {
  useOnWindowScroll(() => console.log(`scroll Y: ${window.pageYOffset}`));
  return <p style={{ height: '300vh' }}>Scroll and check the console</p>;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
);
```

## `useMediaQuery` hook

Speaking of responsive design, the `useMediaQuery` hook can be used to check if the current environment matches a given **media query** and return the appropriate value.

In order to implement this hook, you'll need to check if `Window` and `Window.matchMedia()` exist. If not, return `whenFalse` (e.g., in an SSR environment or unsupported browser).

Use `Window.matchMedia()` to match the given `query`. Cast its `matches` property to a boolean and store it in a state variable, `match`, using the `useState()` hook.

Then, use the `useEffect()` hook to add a listener for changes and clean up the listeners after the hook is destroyed. Finally, return either `whenTrue` or `whenFalse` based on the value of `match`.

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

const ResponsiveText = () => {
  const text = useMediaQuery(
    '(max-width: 400px)',
    'Less than 400px wide',
    'More than 400px wide'
  );

  return <span>{text}</span>;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <ResponsiveText />
);
```

## `useSSR` hook

As we've already touched upon the subject of **server-side rendering** (SSR), it's worth mentioning the `useSSR` hook. This hook can be used to check if the code is running on the browser or the server.

To implement this hook, you'll need to check if `Window`, `Window.document`, and `Document.createElement()` exist. Use the `useState()` hook to define the `inBrowser` state variable and store the result of the check in it.

Then, use the `useEffect()` hook to update the `inBrowser` state variable and clean up at the end. Finally, use the `useMemo()` hook to memoize the return values of the custom hook.

```jsx
const isDOMavailable = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

const useSSR = () => {
  const [inBrowser, setInBrowser] = React.useState(isDOMavailable);

  React.useEffect(() => {
    setInBrowser(isDOMavailable);
    return () => {
      setInBrowser(false);
    };
  }, []);

  const useSSRObject = React.useMemo(
    () => ({
      isBrowser: inBrowser,
      isServer: !inBrowser,
      canUseWorkers: typeof Worker !== 'undefined',
      canUseEventListeners: inBrowser && !!window.addEventListener,
      canUseViewport: inBrowser && !!window.screen
    }),
    [inBrowser]
  );

  return React.useMemo(
    () => Object.assign(Object.values(useSSRObject), useSSRObject),
    [inBrowser]
  );
};

const SSRChecker = props => {
  let { isBrowser, isServer } = useSSR();

  return <p>{isBrowser ? 'Running on browser' : 'Running on server'}</p>;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <SSRChecker />
);
```

## `useIsomorphicEffect` hook

A further use-case for handling window and environment events is the `useIsomorphicEffect` hook. This hook resolves to `useEffect()` on the server and `useLayoutEffect()` on the client.

To implement this hook, use `typeof` to check if the `Window` object is defined. If it is, return the `useLayoutEffect()`. Otherwise, return `useEffect()`.

```jsx
const useIsomorphicEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

const MyApp = () => {
  useIsomorphicEffect(() => {
    window.console.log('Hello');
  }, []);

  return null;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <MyApp />
);
```
