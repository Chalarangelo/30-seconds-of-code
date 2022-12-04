---
title: React useUpdate hook
tags: components,reducer
author: chalarangelo
cover: blog_images/lavender-shelf.jpg
firstSeen: 2021-09-24T05:00:00-04:00
---

Forces the component to re-render when called.

- Use the `useReducer()` hook that creates a new object every time it's updated and return its dispatch.

```jsx
const useUpdate = () => {
  const [, update] = React.useReducer(() => ({}));
  return update;
};
```

```jsx
const MyApp = () => {
  const update = useUpdate();

  return (
    <>
      <div>Time: {Date.now()}</div>
      <button onClick={update}>Update</button>
    </>
  );
};

ReactDOM.render(<MyApp />, document.getElementById('root'));
```
