---
title: React useOnWindowScroll hook
tags: hooks,effect,event
author: chalarangelo
cover: blog_images/planning.jpg
firstSeen: 2021-12-08T05:00:00-04:00
---

Executes a callback whenever the window is scrolled.

- Use the `useRef()` hook to create a variable, `listener`, which will hold the listener reference.
- Use the `useEffect()` hook and `EventTarget.addEventListener()` to listen to the `'scroll'` event of the `Window` global object.
- Use `EventTarget.removeEventListener()` to remove any existing listeners and clean up when the component unmounts.

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
```

```jsx
const App = () => {
  useOnWindowScroll(() => console.log(`scroll Y: ${window.pageYOffset}`));
  return <p style={{ height: '300vh' }}>Scroll and check the console</p>;
};

ReactDOM.render(<App />, document.getElementById('root'));
```
