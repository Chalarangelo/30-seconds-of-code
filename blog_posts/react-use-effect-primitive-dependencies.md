---
title: "Tip: Prefer primitives in useEffect dependencies"
shortTitle: Primitive useEffect dependencies
type: tip
tags: react,hooks,effect,object,comparison
author: chalarangelo
cover: automaton
excerpt: Avoid unnecessary re-runs by using primitive dependencies in your React effect.
firstSeen: 2022-06-12T05:00:00-04:00
---

Conditionally firing an effect is a pretty common requirement when working with React. In most cases, this is as simple as passing a dependency array to `useEffect()`. Turns out that, in some cases, this can cause unnecessary performance degradation.

Such issues arise when entire objects are passed as dependencies when you only need a primitive value. Due to the nature of objects, [being pass-by-reference](/articles/s/javascript-pass-by-reference-or-pass-by-value), comparing the dependencies will always trigger a re-run. This ends up causing effects to run unnecessarily.

```jsx
const CartItem = ({ item }) => {
  useEffect(() => {
    console.log(`${item.name} quantity has changed to ${item.quantity}.`);
  }, [item]);

  return (
    <>
      <h3>{item.name}</h3>
      <span>
        {item.price} x {item.quantity}
      </span>
    </>
  );
};
```

The solution is to use only the parts of the object that the effect relies on. Oftentimes, these are primitives, such as strings and numbers. Comparing their values to the previous dependencies is more efficient and avoids unnecessary re-runs.

```jsx
const CartItem = ({ item }) => {
  const { name, quantity, price } = item;

  useEffect(() => {
    console.log(`${name} quantity has changed to ${quantity}.`);
  }, [name, quantity]);

  return (
    <>
      <h3>{name}</h3>
      <span>
        {price} x {quantity}
      </span>
    </>
  );
};
```
