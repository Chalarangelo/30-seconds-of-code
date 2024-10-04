---
title: React usePortal hook
shortTitle: usePortal hook
language: react
tags: [hooks,state,effect]
cover: interior-3
excerpt: Create a portal, allowing rendering of children outside the parent component, with this custom hook.
listed: true
dateModified: 2024-06-27
---

React's portals allow you to **render children outside the parent component**. Sometimes, however, you may want to create a portal programmatically. You can create a custom hook to achieve this.

First off, we will start by creating a **state variable**, using the `useState()` hook. This state variable will hold the `render()` and `remove()` functions for the portal.

Then, using `ReactDOM.createPortal()` and `ReactDOM.unmountComponentAtNode()`, we will **create a portal** and a function to **remove it**. We will wrap and **memoize** these functions as `createPortal()` using the `useCallback()` hook.

Finally, we will use the `useEffect()` hook to call `createPortal()` and update the state variable any time the `el` value changes. We will return the `render()` function of the state variable.

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

const App = () => {
  const Portal = usePortal(document.querySelector('title'));

  return (
    <p>
      Hello world!
      <Portal>Portalized Title</Portal>
    </p>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
);
```
