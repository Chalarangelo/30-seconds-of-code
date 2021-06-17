---
title: Write a useInterval hook in React
type: story
tags: react,hooks,effect
authors: chalarangelo
cover: blog_images/clock.jpg
excerpt: Wrapping your mind around React hooks and how they interact with `setInterval()` can be difficult. Here's a guide to get you started.
firstSeen: 2021-04-15T12:00:00+03:00
lastUpdated: 2021-06-12T19:30:41+03:00
---

Wrapping your mind around React hooks can be daunting at first, especially if you stumble into anything remotely related to timing, such as `setInterval()`. In order to solve such issues, you have to get used to the way hooks work, their limitations and potential workarounds.

First and foremost, it should be clear that `setInterval()` is a side effect. After all, it's not directly tied to a component's render method. Therefore we should call it inside a `useEffect()` hook and use the `return` of said hook to call `clearInterval()` when unmounting. In order to avoid creating multiple intervals, we can use the hook's second argument to pass an empty dependency array (`[]`), running the side effect only when the component is mounted.

```jsx
React.useEffect(() => {
  let id = setInterval(callback, delay);
  return () => clearInterval(id);
}, []);
```

The closure inside `setInterval()` will only ever have access to whatever variables and values were available when it got instantiated. This means we have to be extra careful about the first argument we pass it in order to make sure that fresh values will be available every time the interval runs. The easiest way to handle this issue is to use the `useRef()` hook to create a variable that's considered mutable by React. This will allow us to have access to new values when we need them.

```jsx
const savedCallback = React.useRef(callback);

React.useEffect(() => {
  let id = setInterval(savedCallback.current, delay);
  return () => clearInterval(id);
}, []);
```

However, using the `useRef()` hook might have just shifted the problem, as the value of the created ref needs to be refreshed inside `setInterval()`. Luckily, this is an easy problem to solve as we could just create a wrapper function that pass that function to `setInterval()` instead. This way the function passed to `setInterval()` will never change, but the value of the enclosed ref will always be up to date when it's called.

```jsx
const savedCallback = React.useRef(callback);

React.useEffect(() => {
  function tick() {
    savedCallback.current();
  }
  let id = setInterval(tick, delay);
  return () => clearInterval(id);
}, []);
```

Finally, let's extract all of this into a custom hook to make it reusable. We can extract `callback` as an argument for the custom hook and use it as the sole dependency of an additional `useEffect()` hook that will update the ref for the callback.

```jsx
const useInterval = callback => {
  const savedCallback = React.useRef();

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    let id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, []);
};
```

That's pretty much it. With a little bit of extra effort, we can add `delay` to the arguments of our custom hook and have a complete hook version of `setInterval()`. You can find an implementation of the hook with this final adjustment, as well as some usage examples in the [useInterval snippet](/react/s/use-interval).
