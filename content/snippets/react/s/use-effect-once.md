---
title: React useEffectOnce hook
shortTitle: useEffectOnce hook
language: react
tags: [hooks,effect]
cover: pop-of-green
excerpt: Run a callback at most once when a condition becomes true, using a custom React hook.
listed: true
dateModified: 2024-06-26
---

The way `useEffect()` works in React is that it runs every time the component renders. Sure, you can control when it runs by providing a dependency array, but what if you want it to **run only once** when a condition becomes `true`? You can create a custom hook to achieve this.

As mentioned already, the second argument of the `useEffect()` hook is an **array of dependencies**. When any of these dependencies change, the effect runs. By using a `useRef()` hook to keep track of the **execution status** of the effect, you can ensure that the effect runs only once when the condition becomes `true`.

Then, inside the `useEffect()`, you can check if the condition is `true` and the effect **has not executed before**. If both are `true`, you can run the callback and set the execution status to `true`.

In order to then use the custom hook, you can pass the callback and the condition as arguments, same as a regular `useEffect()` call. The custom hook will then run the callback at most once when the condition becomes `true` the first time.

```jsx
const useEffectOnce = (callback, when) => {
  const hasRunOnce = React.useRef(false);

  React.useEffect(() => {
    if (when && !hasRunOnce.current) {
      callback();
      hasRunOnce.current = true;
    }
  }, [when]);
};

const App = () => {
  const [clicked, setClicked] = React.useState(false);
  useEffectOnce(() => {
    console.log('mounted');
  }, clicked);
  return <button onClick={() => setClicked(true)}>Click me</button>;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
);
```
