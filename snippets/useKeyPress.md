---
title: React useKeyPress hook
tags: hooks,state,effect,event
author: chalarangelo
cover: blog_images/yellow-white-mug-1.jpg
firstSeen: 2021-09-07T05:00:00-04:00
---

Listens for changes in the pressed state of a given key.

- Use the `useState()` hook to create a state variable that holds the pressed state of the given key.
- Define two handler functions that update the state variable on key down or key up accordingly.
- Use the `useEffect()` hook and `EventTarget.addEventListener()` to handle the `'keydown'` and `'keyup'` events.
- Use `EventTarget.removeEventListener()` to perform cleanup after the component is unmounted.

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
```

```jsx
const MyApp = () => {
  const wPressed = useKeyPress('w');

  return <p>The "w" key is {!wPressed ? 'not ' : ''}pressed!</p>;
};

ReactDOM.render(<MyApp />, document.getElementById('root'));
```
