---
title: Listening for events with React hooks
shortTitle: Event listener hooks
language: react
tags: [hooks,state,effect,event]
cover: beach-riders
excerpt: Learn how to create custom hooks to listen for events in React.
listed: true
dateModified: 2024-06-28
---

React already provides a way to handle events on components. However, there may be occasions where you need to **listen for events** on the `Window` object or other elements. In such cases, you can create custom hooks to handle these events.

## `useEventListener` hook

A simple `useEventListener` hook can be useful for adding **event listeners** to elements and cleaning them up when the component unmounts.

In order to implement it, you can use the `useRef()` hook to create a ref that will hold the handler, and the `useEffect()` hook to update the value of the `savedHandler` ref any time the `handler` changes. You can then add an event listener to the given element and clean up when unmounting.

```jsx
const useEventListener = (type, handler, el = window) => {
  const savedHandler = React.useRef();

  React.useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  React.useEffect(() => {
    const listener = e => savedHandler.current(e);

    el.addEventListener(type, listener);

    return () => {
      el.removeEventListener(type, listener);
    };
  }, [type, el]);
};

const MyApp = () => {
  const [coords, setCoords] = React.useState({ x: 0, y: 0 });

  const updateCoords = React.useCallback(
    ({ clientX, clientY }) => {
      setCoords({ x: clientX, y: clientY });
    },
    [setCoords]
  );

  useEventListener('mousemove', updateCoords);

  return (
    <p>Mouse coordinates: {coords.x}, {coords.y}</p>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <MyApp />
);
```

## `useKeyPress` hook

A very common use-case for event listeners is to listen for **key presses**. The `useKeyPress` hook listens for changes in the pressed state of a given key.

Its implementation uses the `useState()` hook to create a state variable that holds the pressed state of the given key. It then defines two handler functions that update the state variable on key down or key up accordingly.

Finally, using the `useEffect()` hook and `EventTarget.addEventListener()`, it handles the `'keydown'` and `'keyup'` events, and uses `EventTarget.removeEventListener()` to perform cleanup after the component is unmounted.

```jsx
const useKeyPress = targetKey => {
  const [keyPressed, setKeyPressed] = React.useState(false);

  const downHandler = ({ key }) => {
    if (key === targetKey) setKeyPressed(true);
  };

  const upHandler = ({ key }) => {
    if (key === targetKey) setKeyPressed(false);
  };

  React.useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, []);

  return keyPressed;
};

const MyApp = () => {
  const wPressed = useKeyPress('w');

  return <p>The "w" key is {!wPressed ? 'not ' : ''}pressed!</p>;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <MyApp />
);
```

## `useHover` hook

A variation of the `useEventListener` hook is the `useHover` hook, which listens for the `'mouseover'` and `'mouseout'` events on a given element. As these mouse events are common, this hook can be useful for handling hover states.

The implementation is similar to the `useEventListener` hook, but it uses two separate handlers for `'mouseover'` and `'mouseout'` events. It also uses a ref to keep track of the last node passed to the `callbackRef` function, allowing it to remove the listeners when the component unmounts.

```jsx
const useHover = () => {
  const [isHovering, setIsHovering] = React.useState(false);

  const handleMouseOver = React.useCallback(() => setIsHovering(true), []);
  const handleMouseOut = React.useCallback(() => setIsHovering(false), []);

  const nodeRef = React.useRef();

  const callbackRef = React.useCallback(
    node => {
      if (nodeRef.current) {
        nodeRef.current.removeEventListener('mouseover', handleMouseOver);
        nodeRef.current.removeEventListener('mouseout', handleMouseOut);
      }

      nodeRef.current = node;

      if (nodeRef.current) {
        nodeRef.current.addEventListener('mouseover', handleMouseOver);
        nodeRef.current.addEventListener('mouseout', handleMouseOut);
      }
    },
    [handleMouseOver, handleMouseOut]
  );

  return [callbackRef, isHovering];
};

const MyApp = () => {
  const [hoverRef, isHovering] = useHover();

  return <div ref={hoverRef}>{isHovering ? 'Hovering' : 'Not hovering'}</div>;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <MyApp />
);
```

## `useOnGlobalEvent` hook

Listening for events on the **global object** can be useful in some cases. The `useOnGlobalEvent` hook listens for events on the global object and executes a callback whenever an event occurs.

The implementation is not much different from the `useEventListener` hook. It uses the `useRef()` hook to create a variable that holds the listener reference and another variable to hold the previous values of the `type` and `options` arguments. Then, it wires up the listener using the `useEffect()` hook and `EventTarget.addEventListener()`, and cleans up when the component unmounts.

```jsx
const useOnGlobalEvent = (type, callback, options) => {
  const listener = React.useRef(null);
  const previousProps = React.useRef({ type, options });

  React.useEffect(() => {
    const { type: previousType, options: previousOptions } = previousProps;

    if (listener.current) {
      window.removeEventListener(
        previousType,
        listener.current,
        previousOptions
      );
    }

    listener.current = window.addEventListener(type, callback, options);
    previousProps.current = { type, options };

    return () => {
      window.removeEventListener(type, listener.current, options);
    };
  }, [callback, type, options]);
};

const App = () => {
  useOnGlobalEvent('mousemove', e => {
    console.log(`(${e.x}, ${e.y})`);
  });

  return <p>Move your mouse around</p>;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
);
```
