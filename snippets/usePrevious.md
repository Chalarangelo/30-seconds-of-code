---
title: React usePrevious hook
tags: hooks,state,effect
author: chalarangelo
cover: blog_images/couch-laptop.jpg
firstSeen: 2020-01-03T09:50:22+02:00
lastUpdated: 2020-11-16T14:17:53+02:00
---

Stores the previous state or props.

- Create a custom hook that takes a `value`.
- Use the `useRef()` hook to create a `ref` for the `value`.
- Use the `useEffect()` hook to remember the latest `value`.

```jsx
const usePrevious = value => {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
```

```jsx
const Counter = () => {
  const [value, setValue] = React.useState(0);
  const lastValue = usePrevious(value);

  return (
    <div>
      <p>
        Current: {value} - Previous: {lastValue}
      </p>
      <button onClick={() => setValue(value + 1)}>Increment</button>
    </div>
  );
};

ReactDOM.render(<Counter />, document.getElementById('root'));
```
