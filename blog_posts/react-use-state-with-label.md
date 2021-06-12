---
title: "Tip: Label your useState values in React developer tools"
type: tip
tags: react,hooks
authors: chalarangelo
cover: blog_images/bunny-poster.jpg
excerpt: When working with multiple `useState` hooks in React, things can get a bit complicated while debugging. Luckily, there's an easy way to label these values.
---

When working with multiple `useState` hooks in React, things can get a bit complicated while debugging. Luckily, there's an easy way to label these values, using the [`useDebugValue`](https://reactjs.org/docs/hooks-reference.html#usedebugvalue) hook to create a custom `useStateWithLabel` hook:

```jsx
const useStateWithLabel = (initialValue, label) => {
  const [value, setValue] = useState(initialValue);
  useDebugValue(`${label}: ${value}`);
  return [value, setValue];
};

const Counter = () => {
  const [value, setValue] = useStateWithLabel(0, 'counter');
  return (
    <p>{value}</p>
  );
};

ReactDOM.render(<Counter />, document.getElementById('root'));
// Inspecting `Counter` in React developer tools will display:
//  StateWithLabel: "counter: 0"
```

This hook is obviously meant mainly for development, but it can also be useful when creating React component or hook libraries. Additionally, you can easily abstract it in a way that the label is ignored in production builds (i.e. by exporting a hook that defaults back to `useState` when building for a production environment).
