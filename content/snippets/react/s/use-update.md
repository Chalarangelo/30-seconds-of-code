---
title: Force a React component to re-render
shortTitle: useUpdate hook
language: react
tags: [hooks,reducer]
cover: lavender-shelf
excerpt: Ever wanted to force update a React component? Here's a custom hook that does just that.
listed: true
dateModified: 2024-06-27
---

React's rendering loop is based on the state and props of a component. If you want to **force a component to re-render**, there is no built-in way to do it. However, you can create a custom hook that forces a component to re-render when called.

Leveraging the way `useReducer()` works, every time it's updated, it creates a **new object** and returns its dispatch. This can be used to force a component to re-render.

Thus, creating a custom `useUpdate` hook is as simple as using the `useReducer()` hook and returning its **dispatch**. Then, you can call the `update` function to force the component to re-render.

```jsx
const useUpdate = () => {
  const [, update] = React.useReducer(() => ({}));
  return update;
};

const MyApp = () => {
  const update = useUpdate();

  return (
    <>
      <div>Time: {Date.now()}</div>
      <button onClick={update}>Update</button>
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <MyApp />
);
```
