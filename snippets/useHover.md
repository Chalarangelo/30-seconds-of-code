---
title: React useHover hook
tags: hooks,state,callback
author: chalarangelo
cover: blog_images/pink-flower-tree.jpg
firstSeen: 2021-10-05T05:00:00-04:00
---

Handles the event of hovering over the wrapped component.

- Use the `useState()` hook to create a variable that holds the hovering state.
- Use the `useCallback()` hook to memoize two handler functions that update the state.
- Use the `useCallback()` hook to create a callback ref and create or update the listeners for the `'mouseover'` and `'mouseout'` events.
- Use the `useRef()` hook to keep track of the last node passed to `callbackRef` to be able to remove its listeners.

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
```

```jsx
const MyApp = () => {
  const [hoverRef, isHovering] = useHover();

  return <div ref={hoverRef}>{isHovering ? 'Hovering' : 'Not hovering'}</div>;
};

ReactDOM.render(<MyApp />, document.getElementById('root'));
```
