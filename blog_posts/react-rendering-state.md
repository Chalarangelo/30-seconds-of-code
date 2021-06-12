---
title: React rendering state
type: story
tags: react,render
authors: chalarangelo
cover: blog_images/comic-glasses.jpg
excerpt: Take a deeper dive into React's rendering process and understand the role of the Context API and Redux in it.
---

#### React rendering

- [React rendering basics](/blog/s/react-rendering-basics)
- [React rendering optimization](/blog/s/react-rendering-optimization)
- React rendering state (this blog post)

### Context API

React's **Context API** provides a way to pass data through the component tree without using `props`, but should not be used for state management as it requires manual updating. Any component inside a context's `Provider` can access the data in the context instance using a `Consumer` component or, for function components only, the `useContext` hook.

When a new reference is passed to a context `Provider` it will cause any connected components to update. React will look for any components consuming the context in the component tree and update them to reflect the change in the context's value. Passing a new object to a context `Provider` is essentially a new reference, as the context holds a single value (in this case an object).

### Context optimization

By default, any update to a parent component that renders a context `Provider` will cause all of the child components to re-render regardless of changes in the context, due to React's rendering process. To avoid re-rendering child components when a parent changes, **memoization** can be used, which will cause React to skip the whole subtree of a skipped component.

When the context is updated, React additionally checks for components consuming the context down the subtree. This allows context-consuming components under a memoized parent that does not re-render to consume the updated context and render as necessary. After a context-consuming component re-renders, React will keep on recursively rendering its child components as usual.

Oftentimes, it's a good idea to memoize the component immediately under a context `Provider`. That way updates to the parent component will not cause a re-render for the whole subtree, but only the components that consume the context.

### React-Redux

React-Redux provides bindings for **Redux**, a state container for JavaScript applications, and works a little differently from React's Context API. One of the key differences is that React-Redux only re-renders components that need to render, due to the fact that components subscribed to the Redux store read the latest store state, diff the values and force re-render only if the relevant data has changed, while React is not involved at all in the subscription callback process.

While this most likely means that fewer components will have to re-render compared to using a context, React-Redux always executes its `mapStateToProps` and `useSelector` functions for every connected component in the tree whenever the store state is updated. These calculations are usually less expensive than React's rendering, but if there are costly calculations performed or new references returned when they shouldn't, it might become problematic.

### React-Redux optimization

React-Redux provides two ways of connecting to its store, performing the necessary work and returning the combined `props`:

- `connect` (any component): Higher-order component (HOC) that wraps any given component
- `useSeletor` (function components): Hook called inside function components

`connect` acts a lot like memoizing a React component (i.e. using `React.PureComponent` or `React.memo()`), updating the wrapped component only when the combined `props` have changed. This means that passing new references from the parent or the passed functions will still cause a re-render. Components wrapped with `connect` usually read smaller pieces of data from the store state, are less likely to re-render due to that and usually affect fewer components down their tree.

On the other hand, `useSelector` has no way of stopping a component from rendering when its parent component renders. When exclusively using `useSelector`, larger parts of the component tree will re-render due to Redux store updates than they would with `connect`, since there aren't other components using `connect` to prevent them from doing so. You can use `React.memo()` as necessary, to optimize this behavior by preventing unnecessary re-rendering.
