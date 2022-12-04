---
title: React usePortal hook
tags: hooks,state,effect
author: chalarangelo
cover: blog_images/interior-3.jpg
firstSeen: 2022-01-05T05:00:00-04:00
---

Creates a portal, allowing rendering of children outside the parent component.

- Use the `useState()` hook to create a state variable that holds the `render()` and `remove()` functions for the portal.
- Use `ReactDOM.createPortal()` and `ReactDOM.unmountComponentAtNode()` to create a portal and a function to remove it. Use the `useCallback()` hook to wrap and memoize these functions as `createPortal()`.
- Use the `useEffect()` hook to call `createPortal()` and update the state variable any time `el`'s value changes.
- Finally, return the `render()` function of the state variable.

```jsx
const usePortal = el => {
  const [portal, setPortal] = React.useState({
    render: () => null,
    remove: () => null,
  });

  const createPortal = React.useCallback(el => {
    const Portal = ({ children }) => ReactDOM.createPortal(children, el);
    const remove = () => ReactDOM.unmountComponentAtNode(el);
    return { render: Portal, remove };
  }, []);

  React.useEffect(() => {
    if (el) portal.remove();
    const newPortal = createPortal(el);
    setPortal(newPortal);
    return () => newPortal.remove(el);
  }, [el]);

  return portal.render;
};
```

```jsx
const App = () => {
  const Portal = usePortal(document.querySelector('title'));

  return (
    <p>
      Hello world!
      <Portal>Portalized Title</Portal>
    </p>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```
