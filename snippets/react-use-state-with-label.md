---
title: "Tip: Label your useState values in React developer tools"
shortTitle: Labelling useState values
type: tip
tags: [react,hooks]
author: chalarangelo
cover: bunny-poster
excerpt: Multiple `useState` hooks in React can complicate things while debugging. Luckily, there's an easy way to label these values.
dateModified: 2021-11-07T16:34:37+03:00
---

When working with multiple `useState()` hooks in React, things can get a bit complicated while debugging. Luckily, there's an easy way to label these values, using the `useDebugValue()` hook to create a custom `useStateWithLabel` hook:

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

ReactDOM.createRoot(document.getElementById('root')).render(
  <Counter />
);
// Inspecting `Counter` in React developer tools will display:
//  StateWithLabel: "counter: 0"
```

This hook is obviously meant mainly for development, but it can also be useful when creating React component or hook libraries. Additionally, you can easily abstract it in a way that the label is ignored in production builds. An example would be exporting a hook that defaults back to `useState()` when building for a production environment.
